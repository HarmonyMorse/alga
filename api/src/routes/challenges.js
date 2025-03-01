const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabaseClient');

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

module.exports = router; 