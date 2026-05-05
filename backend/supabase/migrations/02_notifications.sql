-- 1. Create Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- e.g., 'message', 'project_invite', 'swap_request'
  content TEXT NOT NULL,
  link VARCHAR(255), -- Optional link to click through (e.g., '/messages?conversationId=...')
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- ROW LEVEL SECURITY POLICIES
-- ==========================================

-- Users can view their own notifications
CREATE POLICY "Users can view their notifications"
  ON public.notifications FOR SELECT
  USING ( auth.uid() = user_id );

-- Any authenticated user can insert a notification (e.g., sending a message triggers a notification for the recipient)
CREATE POLICY "Users can insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK ( auth.uid() = sender_id );

-- Users can update their own notifications (e.g., marking as read)
CREATE POLICY "Users can update their notifications"
  ON public.notifications FOR UPDATE
  USING ( auth.uid() = user_id );

-- Users can delete their own notifications
CREATE POLICY "Users can delete their notifications"
  ON public.notifications FOR DELETE
  USING ( auth.uid() = user_id );

-- Allow realtime broadcasts for notifications
alter publication supabase_realtime add table public.notifications;
