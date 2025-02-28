const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabaseClient');

// POST /signup
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ user: data.user });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ user: data.user, session: data.session });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /logout
router.post('/logout', async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 