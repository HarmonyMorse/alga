const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabaseClient');

// GET /challenges - Get all challenges
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('challenges')
            .select('id, title, description, difficulty_level, posted_date')
            .order('posted_date', { ascending: false });

        if (error) {
            console.error('Error fetching challenges:', error);
            return res.status(500).json({ error: 'Failed to fetch challenges' });
        }

        // Map the response to match the client's expected format
        const formattedChallenges = data.map(challenge => ({
            id: challenge.id,
            title: challenge.title,
            description: challenge.description,
            difficulty: challenge.difficulty_level,
            postedDate: challenge.posted_date
        }));

        return res.json(formattedChallenges);
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /challenges/:id - Get a specific challenge
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('challenges')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching challenge:', error);
            return res.status(404).json({ error: 'Challenge not found' });
        }

        // Format the response to match the client's expected format
        const formattedChallenge = {
            id: data.id,
            title: data.title,
            description: data.description,
            difficulty: data.difficulty_level,
            examples: data.examples,
            approach: data.approach,
            starterCode: data.sample_code.starter
        };

        return res.json(formattedChallenge);
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /challenges - Create a new challenge
router.post('/', async (req, res) => {
    try {
        const {
            title,
            description,
            examples,
            approach,
            sampleCode,
            level,
            date
        } = req.body;

        // Validate required fields
        if (!title || !description || !examples || !approach || !sampleCode || !level || !date) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate level enum
        const validLevels = ['basic', 'easy', 'medium', 'hard', 'complex'];
        if (!validLevels.includes(level)) {
            return res.status(400).json({ error: 'Invalid difficulty level' });
        }

        // Insert the challenge into the database
        const { data, error } = await supabase
            .from('challenges')
            .insert([{
                title,
                description,
                examples,
                approach,
                sample_code: sampleCode,
                difficulty_level: level,
                posted_date: date
            }])
            .select()
            .single();

        if (error) {
            console.error('Error creating challenge:', error);
            return res.status(500).json({ error: 'Failed to create challenge' });
        }

        return res.status(201).json(data);
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /challenges/:id/submit - Submit a solution
router.post('/:id/submit', async (req, res) => {
    try {
        const { id } = req.params;
        const { code, userId } = req.body;

        if (!code) {
            return res.status(400).json({ error: 'No code provided' });
        }

        // Store the solution
        const { error: solutionError } = await supabase
            .from('solutions')
            .insert([{
                user_id: userId,
                challenge_id: id,
                solution_code: code
            }]);

        if (solutionError) {
            console.error('Error storing solution:', solutionError);
            return res.status(500).json({ error: 'Failed to store solution' });
        }

        // In a real implementation, we would:
        // 1. Run the code in a sandbox
        // 2. Test it against examples
        // 3. Return detailed results

        return res.json({
            success: true,
            message: 'Solution submitted successfully'
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 