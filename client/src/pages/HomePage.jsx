import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-4">Welcome to Alga</h1>
                <p className="text-xl text-gray-600">
                    A drag-and-drop version of LeetCode, designed for visual coding challenges
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-3">Daily Challenge</h2>
                    <p className="mb-4">Solve today's coding challenge using our visual block editor.</p>
                    <Link
                        to="/editor"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Start Coding
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-3">Your Progress</h2>
                    <p className="mb-4">Track your solutions and improve your coding skills.</p>
                    <Link
                        to="/login"
                        className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Sign In
                    </Link>
                </div>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-3">How It Works</h2>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Choose a coding challenge from our collection</li>
                    <li>Use the drag-and-drop block editor to build your solution</li>
                    <li>Submit your answer and get instant feedback</li>
                    <li>Learn from AI-powered suggestions and explanations</li>
                </ol>
            </div>
        </div>
    );
};

export default HomePage;
