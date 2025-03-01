import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const HomePage = () => {
    const [apiStatus, setApiStatus] = useState(null);
    const [isChecking, setIsChecking] = useState(false);
    const [apiDetails, setApiDetails] = useState(null);

    const checkApiHealth = async () => {
        setIsChecking(true);
        setApiStatus(null);
        setApiDetails(null);

        try {
            const response = await apiService.checkHealth();
            const data = response.data;

            if (response.status === 200 && data.status === 'ok') {
                setApiStatus({
                    status: 'online',
                    message: 'API is online and responding'
                });
                setApiDetails(data);
            } else {
                setApiStatus({
                    status: 'error',
                    message: `API returned status: ${response.status}`
                });
            }
        } catch (error) {
            console.error('API health check error:', error);
            setApiStatus({
                status: 'error',
                message: 'Could not connect to API. Server might be down.'
            });
        } finally {
            setIsChecking(false);
        }
    };

    // Format memory usage to be more readable
    const formatMemory = (bytes) => {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };

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
                        to="/challenges"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        View Challenges
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

            <div className="bg-gray-100 p-6 rounded-lg mb-10">
                <h2 className="text-2xl font-bold mb-3">How It Works</h2>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Choose a coding challenge from our collection</li>
                    <li>Use the drag-and-drop block editor to build your solution</li>
                    <li>Submit your answer and get instant feedback</li>
                    <li>Learn from AI-powered suggestions and explanations</li>
                </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-3">System Status</h2>
                <p className="mb-4">Check if the API is available and responding.</p>

                <div className="flex items-center space-x-4 mb-4">
                    <button
                        onClick={checkApiHealth}
                        disabled={isChecking}
                        className={`px-4 py-2 rounded-md text-white ${isChecking ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {isChecking ? 'Checking...' : 'Check API Health'}
                    </button>

                    {apiStatus && (
                        <div className={`flex items-center ${apiStatus.status === 'online' ? 'text-green-600' : 'text-red-600'}`}>
                            <div className={`w-3 h-3 rounded-full mr-2 ${apiStatus.status === 'online' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                            <span>{apiStatus.message}</span>
                        </div>
                    )}
                </div>

                {apiDetails && (
                    <div className="bg-gray-50 p-4 rounded-lg text-sm">
                        <h3 className="font-semibold mb-2">API Details:</h3>
                        <ul className="space-y-1">
                            <li><span className="font-medium">Environment:</span> {apiDetails.environment}</li>
                            <li><span className="font-medium">Uptime:</span> {apiDetails.uptime.toFixed(2)} seconds</li>
                            <li><span className="font-medium">Timestamp:</span> {apiDetails.timestamp}</li>
                            {apiDetails.memory && (
                                <li>
                                    <span className="font-medium">Memory Usage:</span>
                                    <ul className="ml-4">
                                        <li>RSS: {formatMemory(apiDetails.memory.rss)}</li>
                                        <li>Heap Total: {formatMemory(apiDetails.memory.heapTotal)}</li>
                                        <li>Heap Used: {formatMemory(apiDetails.memory.heapUsed)}</li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
