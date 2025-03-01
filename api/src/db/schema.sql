-- Drop existing tables if they exist
DROP TABLE IF EXISTS challenges CASCADE;
DROP TABLE IF EXISTS solutions CASCADE;

-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create challenges table
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    examples JSONB NOT NULL,
    approach TEXT NOT NULL,
    sample_code JSONB NOT NULL,
    difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('basic', 'easy', 'medium', 'hard', 'complex')),
    posted_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create solutions table
CREATE TABLE solutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE NOT NULL,
    solution_code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security on tables
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;

-- Create policies for challenges table
CREATE POLICY "Challenges are viewable by everyone" 
    ON challenges FOR SELECT 
    USING (true);

CREATE POLICY "Only admin can insert challenges" 
    ON challenges FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.email() = 'admin@alga.com');

CREATE POLICY "Only admin can update challenges" 
    ON challenges FOR UPDATE 
    TO authenticated 
    USING (auth.email() = 'admin@alga.com')
    WITH CHECK (auth.email() = 'admin@alga.com');

CREATE POLICY "Only admin can delete challenges" 
    ON challenges FOR DELETE 
    TO authenticated 
    USING (auth.email() = 'admin@alga.com');

-- Create policies for solutions table
CREATE POLICY "Users can view their own solutions" 
    ON solutions FOR SELECT 
    TO authenticated 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own solutions" 
    ON solutions FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own solutions" 
    ON solutions FOR UPDATE 
    TO authenticated 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_challenges_updated_at
    BEFORE UPDATE ON challenges
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_solutions_updated_at
    BEFORE UPDATE ON solutions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 