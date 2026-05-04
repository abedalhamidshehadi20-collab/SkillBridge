-- Run this script in your Supabase SQL Editor

-- 1. Create a Profiles table to store public data (skills, roles) for the Skill Swap page
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  role TEXT,
  avatar_url TEXT,
  can_teach TEXT[] DEFAULT '{}',
  wants_to_learn TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles are viewable by everyone
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

-- Users can insert/update their own profile
CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 2. Trigger to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists (for safe re-runs)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Create Projects table for the Team Finder & Projects pages
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  client TEXT,
  description TEXT,
  status TEXT DEFAULT 'Planning', -- e.g. Planning, In Progress, Review
  progress INTEGER DEFAULT 0,
  commitment TEXT, -- e.g. '5-10 hrs/wk'
  required_skills TEXT[] DEFAULT '{}',
  tasks TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Projects are viewable by everyone
CREATE POLICY "Projects are viewable by everyone."
  ON public.projects FOR SELECT
  USING ( true );

-- Users can insert/update their own projects
CREATE POLICY "Users can insert their own projects."
  ON public.projects FOR INSERT
  WITH CHECK ( auth.uid() = owner_id );

CREATE POLICY "Users can update their own projects."
  ON public.projects FOR UPDATE
  USING ( auth.uid() = owner_id );

CREATE POLICY "Users can delete their own projects."
  ON public.projects FOR DELETE
  USING ( auth.uid() = owner_id );

-- 4. Create Project Members table
CREATE TABLE IF NOT EXISTS public.project_members (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (project_id, user_id)
);

-- Enable RLS for project members
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Project members are viewable by everyone."
  ON public.project_members FOR SELECT
  USING ( true );

CREATE POLICY "Users can join projects."
  ON public.project_members FOR INSERT
  WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can leave projects."
  ON public.project_members FOR DELETE
  USING ( auth.uid() = user_id );

-- 5. Backfill profiles for existing users
INSERT INTO public.profiles (id, first_name, last_name, avatar_url)
SELECT 
  id, 
  raw_user_meta_data->>'first_name', 
  raw_user_meta_data->>'last_name',
  raw_user_meta_data->>'avatar_url'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

