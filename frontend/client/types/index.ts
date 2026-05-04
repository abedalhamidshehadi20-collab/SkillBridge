// ──────────────────────────────────────────────
// Enums (mirrors Prisma enums)
// ──────────────────────────────────────────────

export type ExperienceLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type SkillType = 'TEACH' | 'LEARN';
export type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
export type SwapStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
export type SessionType = 'VIDEO' | 'SCREEN_SHARE' | 'COLLABORATION';
export type SessionStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type ProjectStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
export type ProjectRole = 'OWNER' | 'ADMIN' | 'MEMBER';
export type NotificationType =
  | 'SWAP_REQUEST'
  | 'SWAP_ACCEPTED'
  | 'SWAP_REJECTED'
  | 'SESSION_SCHEDULED'
  | 'PROJECT_INVITE'
  | 'TEAM_MATCH'
  | 'MESSAGE'
  | 'SYSTEM';
export type MatchType = 'SKILL_SWAP' | 'TEAM_MEMBER';

// ──────────────────────────────────────────────
// Models
// ──────────────────────────────────────────────

export interface User {
  id: string;
  supabaseId: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profile?: Profile;
  userSkills?: UserSkill[];
}

export interface Profile {
  id: string;
  userId: string;
  username: string;
  bio?: string;
  experienceLevel: ExperienceLevel;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  createdAt: string;
}

export interface UserSkill {
  id: string;
  userId: string;
  skillId: string;
  type: SkillType;
  proficiencyLevel: ProficiencyLevel;
  createdAt: string;
  skill?: Skill;
}

export interface SkillSwapRequest {
  id: string;
  senderId: string;
  receiverId: string;
  offeredSkillId: string;
  requestedSkillId: string;
  status: SwapStatus;
  message?: string;
  createdAt: string;
  updatedAt: string;
  sender?: User;
  receiver?: User;
  offeredSkill?: Skill;
  requestedSkill?: Skill;
  sessions?: SwapSession[];
}

export interface SwapSession {
  id: string;
  swapRequestId: string;
  sessionType: SessionType;
  sessionLink?: string;
  scheduledAt: string;
  status: SessionStatus;
  notes?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  owner?: User;
  members?: ProjectMember[];
  skills?: ProjectSkill[];
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: ProjectRole;
  joinedAt: string;
  user?: User;
}

export interface ProjectSkill {
  id: string;
  projectId: string;
  skillId: string;
  skill?: Skill;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
  sender?: User;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body?: string;
  read: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface AiMatch {
  id: string;
  userId: string;
  matchedUserId: string;
  matchType: MatchType;
  compatibilityScore: number;
  reasoning?: string;
  createdAt: string;
  matchedUser?: User;
}

// ──────────────────────────────────────────────
// API Response
// ──────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    statusCode: number;
  };
}
