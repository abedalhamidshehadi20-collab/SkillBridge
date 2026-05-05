import { SupabaseClient } from '@supabase/supabase-js';

export async function getOrCreateConversation(supabase: SupabaseClient, userId: string, targetUserId: string): Promise<string | null> {
  // Check if a conversation already exists between these two users
  // This is a bit tricky with Supabase and our schema. We need to find a conversation
  // where both users are participants and there are exactly 2 participants.
  // For simplicity MVP: we'll find any conversation that has both users.
  
  const { data: myConvos } = await supabase
    .from('conversation_participants')
    .select('conversation_id')
    .eq('user_id', userId);

  if (myConvos && myConvos.length > 0) {
    const convoIds = myConvos.map(c => c.conversation_id);
    
    const { data: targetConvos } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', targetUserId)
      .in('conversation_id', convoIds);

    if (targetConvos && targetConvos.length > 0) {
      // Found an existing conversation!
      return targetConvos[0].conversation_id;
    }
  }

  // No existing conversation, create a new one
  const { data: newConvo, error: createError } = await supabase
    .from('conversations')
    .insert({})
    .select('id')
    .single();

  if (createError || !newConvo) {
    console.error('Error creating conversation:', createError);
    return null;
  }

  const newConvoId = newConvo.id;

  // Add participants
  const { error: addError } = await supabase
    .from('conversation_participants')
    .insert([
      { conversation_id: newConvoId, user_id: userId },
      { conversation_id: newConvoId, user_id: targetUserId }
    ]);

  if (addError) {
    console.error('Error adding participants:', addError);
    return null;
  }

  return newConvoId;
}
