# Milestone B: Implement React/Blockly Frontend

This document provides a granular, step-by-step guide to completing **Milestone B** for the MVP phase, as outlined in the PRD. The goal is to implement a React + Vite frontend, integrate Shadcn (for UI styling), set up React Router for multi-page support, and introduce Blockly as a draggable code editor.

---

## 1. Initialize the React + Vite Project

1. In your terminal, navigate to the directory where you want to create the frontend.  
2. Run the Vite setup command (using npm or yarn):  
   npm create vite@latest alga-frontend -- --template react  
   - This creates a new folder called “alga-frontend” with a basic React + Vite template.  
3. Navigate into the new folder:  
   cd alga-frontend  
4. Install dependencies if prompted, or manually do:  
   npm install  

---

## 2. Install and Configure Shadcn

1. From within the “alga-frontend” directory, install Shadcn UI and other dependencies required:  
   npm install @shadcn/ui class-variance-authority tailwind-merge  
2. If using Tailwind CSS (recommended as Shadcn relies on utility classes), install and configure Tailwind per Shadcn’s instructions:  
   - Install Tailwind:  
     npm install -D tailwindcss postcss autoprefixer  
   - Initialize Tailwind config files:  
     npx tailwindcss init -p  
   - Add Tailwind directives in your main CSS file (e.g., index.css):  
     @tailwind base;  
     @tailwind components;  
     @tailwind utilities;  
3. Integrate Shadcn components into your app layout (e.g., create a top-level Layout component that uses Shadcn’s styling for navigation, headers, etc.).  
4. Confirm the UI is rendering by running:  
   npm run dev  
   - Open http://localhost:5173 (default Vite dev port) and ensure the Shadcn components appear.

---

## 3. Set Up React Router

1. Install React Router (v6+):  
   npm install react-router-dom  
2. In your “src” folder, create a file named router.jsx (or router.tsx if using TypeScript) to define your app’s routes. Example:
   ```jsx
   import { createBrowserRouter } from "react-router-dom";
   import App from "./App";
   import LoginPage from "./pages/LoginPage";
   import EditorPage from "./pages/EditorPage";

   export const router = createBrowserRouter([
     {
       path: "/",
       element: <App />,
       children: [
         {
           path: "login",
           element: <LoginPage />
         },
         {
           path: "editor",
           element: <EditorPage />
         }
       ]
     }
   ]);
   ```
3. In your main entry point (e.g., main.jsx), wrap the top-level component with RouterProvider:
   ```jsx
   import React from "react";
   import ReactDOM from "react-dom/client";
   import { RouterProvider } from "react-router-dom";
   import { router } from "./router";
   import "./index.css"; // or your chosen global CSS

   ReactDOM.createRoot(document.getElementById("root")).render(
     <React.StrictMode>
       <RouterProvider router={router} />
     </React.StrictMode>
   );
   ```
4. Create placeholder components for LoginPage and EditorPage to confirm routing works (each can just return a simple “Hello from [Page]!” message).

---

## 4. Integrate Blockly into a Dedicated Code Editor Page

1. Install the Blockly library:  
   npm install blockly  
2. In your “pages” folder (or a dedicated “editor” folder), create EditorPage.jsx. Within EditorPage.jsx:  
   - Import the Blockly library.  
   - Create a div to contain the Blockly workspace.  
   - Use the useEffect hook to initialize Blockly on that div. Example:
     ```jsx
     import React, { useEffect, useRef } from "react";
     import Blockly from "blockly";

     const EditorPage = () => {
       const blocklyDiv = useRef(null);
       const toolboxRef = useRef(null);

       useEffect(() => {
         const workspace = Blockly.inject(blocklyDiv.current, {
           toolbox: toolboxRef.current
         });
         // Additional Blockly config here
       }, []);

       return (
         <div className="blockly-container">
           <xml
             id="toolbox"
             style={{ display: "none" }}
             ref={toolboxRef}
           >
             {/* Blocks will be defined here in step 5 */}
           </xml>
           <div
             ref={blocklyDiv}
             style={{ width: "100%", height: "600px" }}
           />
         </div>
       );
     };

     export default EditorPage;
     ```
3. Add some minimal styling for .blockly-container in your main stylesheet or a dedicated CSS file to ensure the workspace has a visible area.

---

## 5. Create a Basic Toolbox of Blocks

1. In the <xml> tag with id="toolbox", define blocks for loops, conditionals, data manipulation, etc. For example:
   ```jsx
   <block type="controls_if"></block>
   <block type="controls_repeat_ext"></block>
   <block type="math_number"></block>
   <block type="math_arithmetic"></block>
   <block type="text"></block>
   <block type="text_print"></block>
   ```
2. Confirm basic drag-and-drop functionality by reloading the EditorPage and dragging blocks onto the workspace.
3. (Optional) Add categories to organize blocks:
   ```jsx
   <category name="Logic" colour="210">
     <block type="controls_if"></block>
   </category>
   <category name="Loops" colour="120">
     <block type="controls_repeat_ext"></block>
   </category>
   ```
4. Verify blocks appear correctly and that you can snap them together in the editor.

---

## 6. Prepare Code for Future Integration

1. Ensure that EditorPage or a dedicated service file will eventually export the workspace’s JavaScript code for compilation. For now, simply keep a note or placeholder function that logs the generated code:
   ```jsx
   const onGenerateCode = () => {
     const code = Blockly.JavaScript.workspaceToCode(workspace);
     console.log(code);
   };
   ```
2. Provide a button in EditorPage that triggers onGenerateCode:
   ```jsx
   <button onClick={onGenerateCode}>Generate Code</button>
   ```
3. This sets up the forward path for Milestone C (enabling code compilation to JavaScript).

---

## 7. Test the Frontend

1. In your terminal, run npm run dev and navigate to http://localhost:5173.  
2. Confirm that:  
   - The Login page loads at /login.  
   - The Editor page loads at /editor and shows the Blockly workspace with draggable blocks.  
   - Shadcn styles are applied across the app for a cohesive design.  
3. If any errors arise (e.g., missing dependencies, TypeScript conflicts), fix them immediately in this milestone before proceeding.

---

## 8. Document & Prepare for the Next Milestones

1. Update your project’s documentation with instructions on how to run the frontend, where the EditorPage is located, and how the Blockly toolbox is defined.  
2. Ensure you have placeholders or notes for how code generation will feed into the backend.  
3. Confirm readiness to move on to **Milestone C**: enabling code compilation to JavaScript and adding a test harness for correctness checks.

---

**Completion of these steps ensures that the React + Vite frontend is established, Shadcn components are styled, React Router is configured, and Blockly is integrated. This aligns with the PRD’s requirement for a drag-and-drop interface to solve coding challenges.**  