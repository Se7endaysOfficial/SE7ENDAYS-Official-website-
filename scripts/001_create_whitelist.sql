-- Create whitelist table for team members
CREATE TABLE IF NOT EXISTS public.team_whitelist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.team_whitelist ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read the whitelist (to check their own email)
CREATE POLICY "Allow authenticated users to read whitelist" 
  ON public.team_whitelist 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Insert the owner email (se7endays.official@gmail.com)
INSERT INTO public.team_whitelist (email, role) 
VALUES ('se7endays.official@gmail.com', 'owner')
ON CONFLICT (email) DO NOTHING;
