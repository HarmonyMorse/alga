# Milestone A: Connect Supabase Auth and Database

This document provides a granular, step-by-step guide to completing **Milestone A** for the MVP phase, as outlined in the PRD. The goal is to integrate Supabase authentication and database functionality, ensuring users can sign up, log in, and store basic data. 

---

## 1. Set Up Supabase Project

1. Log into the Supabase dashboard (https://app.supabase.com/).
2. Create a new project, selecting your preferred region and database password. 
3. Wait for the project to initialize; note the "API URL" and "anon" and "service_role" keys. You will need these in your environment variables.

---

## 2. Configure Environment Variables

1. In your local development environment, create a file named .env at the root of your project (ensure it's included in your .gitignore).  
2. Define the following variables (replace placeholder values with your actual Supabase project details):
   ```
   SUPABASE_URL=https://<YOUR-PROJECT-REF>.supabase.co
   SUPABASE_ANON_KEY=<YOUR-ANON-KEY>
   SUPABASE_SERVICE_ROLE_KEY=<YOUR-SERVICE-ROLE-KEY>
   SUPABASE_JWT_SECRET=<YOUR-JWT-SECRET>
   ```
3. Save the .env file and confirm it's ignored by Git so that private keys do not leak.

---

## 3. Install & Initialize Supabase Client

1. In the server-side codebase (Node + Express), install @supabase/supabase-js:
   ```bash
   npm install @supabase/supabase-js
   ```
2. Create a supabaseClient.js (or similar) file in your backend to initialize the client:
   ```js
   // supabaseClient.js
   const { createClient } = require('@supabase/supabase-js');

   const supabaseUrl = process.env.SUPABASE_URL;
   const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

   const supabase = createClient(supabaseUrl, supabaseAnonKey);

   module.exports = supabase;
   ```

3. Import supabaseClient.js in your main server file (e.g., index.js or app.js) to ensure it's ready for future database and authentication operations.

---

## 4. Create Database Schemas/Tables

1. In the Supabase dashboard, navigate to the "Table editor."  
2. Create tables for:
   - Users (if not already auto-created by Supabase Auth)
     - id (uuid)  
     - email (text)  
     - created_at (timestamp)  
   - Solutions
     - id (uuid)  
     - user_id (references users.id)  
     - challenge_id (uuid or text, depending on how you structure challenges)  
     - solution_code (text)  
     - created_at (timestamp)  
   - Challenges
     - id (uuid)  
     - title (text)  
     - description (text)  
     - created_at (timestamp)  
3. Generate the schema by applying migrations directly in the Supabase dashboard. Confirm that the tables and references appear correctly.
4. (Optional) Configure row-level security policies on each table. By default, Supabase provides secure policies for the "users" table. Modify or add policies for "solutions" and "challenges" if you need advanced read/write restrictions.

---

## 5. Configure Supabase Auth

1. In the Supabase dashboard, open "Authentication" → "Settings."  
2. Under "Provider Settings," enable email/password signups (and any additional providers you want, e.g., Google, GitHub).  
3. In your backend code, set up an Express route for signing up. For example:
   ```js
   // authRoutes.js
   const express = require('express');
   const router = express.Router();
   const supabase = require('./supabaseClient');

   // POST /signup
   router.post('/signup', async (req, res) => {
     const { email, password } = req.body;
     const { user, error } = await supabase.auth.signUp({
       email,
       password
     });
     if (error) {
       return res.status(400).json({ error: error.message });
     }
     return res.status(200).json({ user });
   });

   // POST /login
   router.post('/login', async (req, res) => {
     const { email, password } = req.body;
     const { user, error } = await supabase.auth.signInWithPassword({
       email,
       password
     });
     if (error) {
       return res.status(400).json({ error: error.message });
     }
     return res.status(200).json({ user });
   });

   module.exports = router;
   ```
4. Add these routes to your main Express application:
   ```js
   // app.js
   const express = require('express');
   const cors = require('cors');
   const bodyParser = require('body-parser');
   const authRoutes = require('./authRoutes');

   const app = express();
   app.use(cors());
   app.use(bodyParser.json());

   app.use('/auth', authRoutes);

   app.listen(3000, () => {
     console.log('Server running on port 3000');
   });
   ```
5. Test your signup and login endpoints with a tool like Postman or cURL to verify they return valid responses and that new users appear in the Supabase "users" table.

---

## 6. Verify End-to-End Functionality

1. Start your local server:
   ```bash
   npm run start
   ```
2. Use Postman or another REST client to:
   - POST /auth/signup with a new email and password, then confirm a new record is created in Supabase.  
   - POST /auth/login with valid credentials, ensure the auth token is returned or user details appear.  
3. Confirm that new user data is accessible in the Supabase Dashboard's "Table editor" → "users."

---

## 7. Document & Prepare for Next Milestones

1. Create or update project documentation to reflect the new Auth routes and database schema (for both developers and potential test users).  
2. Verify .env is correctly configured and not committed to Git.  
3. Ensure that local environment variables precisely match your Supabase project details.  
4. Confirm you're ready to move onto **Milestone B**: implementing React + Blockly integration.

---

**Completion of these steps ensures that Supabase Auth and Database are fully integrated, allowing the system to create and store user information in alignment with the PRD's requirement for secure user authentication and persistent data management.** 