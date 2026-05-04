import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

type MatchResponse = {
  id: string;
  matchScore: number;
  matchReason: string;
};

export async function matchRoutes(fastify: FastifyInstance) {
  fastify.get('/matches/skills', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // 1. Authenticate Request
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.status(401).send({ error: 'Missing or invalid Authorization header' });
      }
      
      const token = authHeader.split(' ')[1];
      const { data: { user }, error: authError } = await fastify.supabase.auth.getUser(token);
      
      if (authError || !user) {
        return reply.status(401).send({ error: 'Unauthorized' });
      }

      // 2. Fetch User's Profile
      const { data: myProfile, error: myProfileError } = await fastify.supabase
        .from('profiles')
        .select('id, first_name, last_name, role, can_teach, wants_to_learn')
        .eq('id', user.id)
        .single();

      if (myProfileError || !myProfile) {
        return reply.status(404).send({ error: 'Profile not found' });
      }

      // 3. Fetch all other profiles
      const { data: otherProfiles, error: otherError } = await fastify.supabase
        .from('profiles')
        .select('id, first_name, last_name, role, can_teach, wants_to_learn')
        .neq('id', user.id);

      if (otherError || !otherProfiles || otherProfiles.length === 0) {
        return reply.send({ matches: [] }); // No one to match with
      }

      // 4. Calculate matches using OpenRouter LLM
      const openRouterKey = process.env.OPENROUTER_API_KEY;
      if (!openRouterKey) {
        fastify.log.warn('OPENROUTER_API_KEY is not set. Falling back to dummy scores.');
        return fallbackScores(myProfile, otherProfiles, reply);
      }

      const prompt = `
You are an expert matchmaking AI for a professional networking platform called SkillBridge.
Given the current user's profile and a list of other profiles, calculate a "match score" (0-100) for each profile based on how well their "can_teach" and "wants_to_learn" skills align with the current user's skills.
A perfect match is when User A can teach what User B wants to learn, AND User B can teach what User A wants to learn.

Current User:
Name: ${myProfile.first_name} ${myProfile.last_name}
Role: ${myProfile.role}
Can Teach: ${JSON.stringify(myProfile.can_teach)}
Wants To Learn: ${JSON.stringify(myProfile.wants_to_learn)}

Other Profiles:
${JSON.stringify(otherProfiles)}

Return the results as a JSON array exactly matching this schema:
[
  {
    "id": "uuid of the other profile",
    "matchScore": number (0-100),
    "matchReason": "A 1-sentence explanation of why they are a good match (or not)."
  }
]

ONLY RETURN VALID JSON. Do not wrap in markdown blocks.
      `;

      try {
        const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'user', content: prompt }
            ],
            response_format: { type: 'json_object' } // Help ensure JSON output
          })
        });

        if (!aiResponse.ok) {
          const errText = await aiResponse.text();
          fastify.log.error(`OpenRouter API Error: ${errText}`);
          return fallbackScores(myProfile, otherProfiles, reply);
        }

        const aiData: any = await aiResponse.json();
        let content = aiData.choices[0].message.content;
        
        // Clean up markdown wrapping if the model ignored instructions
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();

        const matchResults: MatchResponse[] = JSON.parse(content);
        
        // Merge match data with full profile data
        const enrichedMatches = matchResults.map(match => {
          const profile = otherProfiles.find(p => p.id === match.id);
          return {
            ...profile,
            matchScore: match.matchScore,
            matchReason: match.matchReason
          };
        }).filter(m => m.id); // Filter out any hallucinated IDs

        return reply.send({ matches: enrichedMatches });
      } catch (err: any) {
        fastify.log.error(`Failed to parse or fetch LLM response: ${err.message || String(err)}`);
        return fallbackScores(myProfile, otherProfiles, reply);
      }

    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}

function fallbackScores(myProfile: any, otherProfiles: any[], reply: FastifyReply) {
  const matches = otherProfiles.map((p, index) => ({
    ...p,
    matchScore: Math.max(0, 95 - index * 10), // Dummy calculation
    matchReason: 'AI service unavailable. Using default matching.'
  }));
  return reply.send({ matches });
}
