# Product Requirements Document (PRD)

## 1. Overview

**Product Name:** Alga  
**Description:** Alga is a “drag and drop” version of LeetCode, designed for users to solve coding challenges using visual blocks rather than writing full code by hand. The platform will support automatic AI-based feedback, as well as standard coding challenge features like a “question of the day,” user authentication, and solution submissions. Alga aims to lower the barrier to entry for coding exercises while providing a fun, interactive experience.

## 2. Objectives

1. **Enable visually guided coding**: Allow users to drag and drop code blocks (Blockly) to solve coding challenges without writing raw syntax.  
2. **Provide AI-driven support**: Offer quick feedback on code complexity, error hints, and ELI5 (Explain Like I’m 5) explanations.  
3. **Integrate daily challenges**: Display a “LeetCode question of the day.”  
4. **Facilitate code compilation**: Compile the visual blocks into JavaScript and send the code to an AI engine for evaluation and feedback.  
5. **Ensure secure code execution**: Protect the system from malicious user-submitted code or manipulations.  
6. **Incorporate gamification** (stretch goal): Leaderboard, badges, XP, and streak tracking to enhance engagement.  

## 3. Scope

**Primary Scope**  
- User authentication via Supabase Auth.  
- Database-driven user profiles, solutions, and challenge records via Supabase Database.  
- Drag-and-drop code editor using Blockly.  
- AI-based feedback using LangChain and OpenAI.  
- Daily coding challenge question (similar to “LeetCode question of the day”).  
- Code compilation to JavaScript for execution/evaluation.  
- Automated test harness (basic correctness checks and minimal complexity checks).  

**Stretch Features**  
- In-browser safe “sandbox” code evaluation.  
- Extended AI feedback mechanisms for advanced correctness checks.  
- Leaderboards and gamification with badges, XP, and streaks.  
- AI code generator or “hint provider” if users are stuck for an extended time.  

## 4. Tech Stack

| Layer        | Technology                                   |
| ------------ | -------------------------------------------- |
| **Frontend** | React, Vite, Shadcn, React Router, Blockly   |
| **Backend**  | Node.js, Express, Supabase (Database + Auth) |
| **AI**       | LangChain (JS), OpenAI                       |
| **Other**    | Axios (HTTP requests), Jest (testing)        |

1. **React + Vite + Shadcn**: Build a responsive, modern UI.  
2. **React Router**: Handle multi-page navigation (login, main editor, leaderboard, etc.).  
3. **Blockly**: Visual, drag-and-drop code editor.  
4. **Supabase**: Handle user data (profiles, challenge records) and authentication.  
5. **Node.js + Express**: Handle server-side logic, manage requests and data flow between frontend and AI engine, orchestrate code compilation tasks.  
6. **LangChain + OpenAI**: Generate AI feedback, code evaluations, and alternative solutions.  
7. **Axios**: Simplify HTTP requests from frontend to backend/AI endpoints.  
8. **Jest**: Ensure code quality and reliability through unit/integration tests.  

## 5. Features

### 5.1 Non-AI Features

1. **Daily LeetCode Question**  
   - Fetch and display daily challenge.  
   - Show instructions, examples, and required function signature.  

2. **Drag-and-Drop Answer Creation**  
   - Use Blockly to let users build their logical solutions with code blocks.  
   - Maintain a “toolbox” of code blocks (if-else, loops, data structures, etc.).  

3. **Compile to JavaScript**  
   - Transform the block-based solution into JavaScript.  
   - Send the JS code to the backend for basic compilation and execution or for AI analysis.  

### 5.2 AI Features

1. **Auto Feedback**  
   - Evaluate runtime complexity (simple guess based on code blocks used).  
   - Provide hints for potential errors or corner cases.  
   - Suggest improvements or optimizations (e.g., replacing loops, data structure proposals).  

2. **ELI5 Mode**  
   - Offer a simplified explanation of what the solution is doing.  
   - Break down the user’s code into plain English explanations.  

3. **AI-based Code Generation (Stretch)**  
   - For users who are stuck, dynamically propose partial solutions or next steps.  

### 5.3 Stretch Features

1. **In-Browser Code Execution**  
   - Implement a sandboxed environment (e.g., Docker-based or external API) to securely run user solutions in browser.  
2. **Leaderboard**  
   - Track user ranks based on points from solved questions, speed, or streaks.  
3. **Gamification**  
   - Earn badges for milestone achievements (e.g., first 10 solves).  
   - XP-based leveling system to encourage ongoing engagement.  

## 6. User Stories

1. **As a first-time user**, I want to sign up quickly via Supabase Auth so that I can begin solving challenges immediately.  
2. **As a returning user**, I want to see the daily challenge on my dashboard so that I can stay consistent in practicing.  
3. **As a novice programmer**, I want a drag-and-drop interface (Blockly) so that I can focus on problem logic without syntax errors.  
4. **As a user solving a challenge**, I want to easily test my solution and get feedback so that I know how to improve.  
5. **As a user struggling on a challenge**, I want immediate hints or partial solutions from the AI so that I can make progress.  
6. **As a competitive user**, I want a leaderboard so that I can compare my progress to others.  

## 7. Potential Challenges and Considerations

1. **Code Execution Security**  
   - Need sandboxing or remote execution for user-submitted code to prevent malicious operations.  
   - Evaluate reputable third-party solutions or container-based approaches.  

2. **AI Evaluation Complexity**  
   - Begin with simple checks for correct outputs or basic complexity.  
   - Strengthen with more robust AI or pattern analysis for deeper feedback.  

3. **Blockly Integration**  
   - Provide a flexible block structure to cover typical coding constructs.  
   - Maintain clarity and usability so the block library doesn’t overwhelm novices.  

4. **Performance and Scalability**  
   - Expect significant traffic during peak usage (especially if featured at hackathons).  
   - Optimize queries and server responses with Supabase/Node.  

## 8. Development Plan

1. **MVP Phase**  
   - *Milestone A*: Connect Supabase Auth and Database.  
   - *Milestone B*: Implement React/Blockly frontend with basic drag-and-drop blocks.  
   - *Milestone C*: Enable code compilation into JS and prepare test harness for correctness checks.  
   - *Milestone D*: Integrate LangChain + OpenAI for minimal AI feedback.  
   - *Milestone E*: Build the daily challenge workflow (fetching a question from LeetCode’s API or a custom dataset).  

2. **Alpha Release**  
   - UI improvements (Shadcn-based theming).  
   - ELI5 feature for plain English solutions.  
   - Basic analytics (track user time spent, completion rates).  

3. **Beta Release**  
   - AI-based code generator or advanced hints.  
   - Leaderboards and gamification.  
   - Enhanced security for code execution.  

4. **Production**  
   - Thorough testing (unit, integration, AI feedback correctness) using Jest.  
   - Performance tuning and final UI polish.  

## 9. References

- **Codewars** ([https://www.codewars.com/](https://www.codewars.com/)): An established community-driven coding challenge platform with feedback and ranking systems.  
- **Blockly** ([Google Developers - Blockly Guide](https://developers.google.com/blockly/guides/get-started/what-is-blockly)): Official documentation for setting up and customizing the drag-and-drop block environment.  
- **LeetCode** (Daily Challenges Model): Source of daily questions.  
- **Supabase** ([https://supabase.com/](https://supabase.com/)): Auth and database solution for user management, data persistence.  
- **LangChain** ([Langchain-JS GitHub](https://github.com/hwchase17/langchainjs)): Documentation and usage examples for chaining OpenAI queries and building advanced AI-driven logic.  
- **OpenAI** ([https://platform.openai.com/](https://platform.openai.com/)): Training and inference for GPT-based code solutions and feedback.  

---

**End of PRD**  
This document outlines the scope, objectives, tech stack, critical features, and development plan for Alga. Subsequent steps will detail specific user interface designs, API contracts, and acceptance criteria for each milestone.
