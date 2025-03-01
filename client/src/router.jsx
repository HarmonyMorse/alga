import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import EditorPage from "./pages/EditorPage";
import ChallengesPage from "./pages/ChallengesPage";
import CodingPage from "./pages/CodingPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "signup",
                element: <SignupPage />
            },
            {
                path: "editor",
                element: <EditorPage />
            },
            {
                path: "challenges",
                element: <ChallengesPage />
            },
            {
                path: "coding/:challengeId",
                element: <CodingPage />
            }
        ]
    }
]);