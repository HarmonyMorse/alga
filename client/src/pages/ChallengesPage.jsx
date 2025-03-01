import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import challengesApi from '../services/challenges';

const ChallengesPage = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const data = await challengesApi.getAllChallenges();
                setChallenges(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching challenges:', err);
                setError('Failed to load challenges. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'basic':
                return 'bg-blue-100 text-blue-800';
            case 'easy':
                return 'bg-green-100 text-green-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'hard':
                return 'bg-orange-100 text-orange-800';
            case 'complex':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading challenges...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Coding Challenges</h1>
            <div className="grid gap-6">
                {challenges.map((challenge) => (
                    <div key={challenge.id} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">{challenge.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Posted on {formatDate(challenge.postedDate)}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                                {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4">{challenge.description}</p>
                        <Link
                            to={`/coding/${challenge.id}`}
                            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Start Coding!
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChallengesPage; 