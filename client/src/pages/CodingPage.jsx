import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import challengesApi from '../services/challenges';

const CodingPage = () => {
    const { challengeId } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const blocklyDiv = useRef(null);
    const toolboxRef = useRef(null);
    const [workspace, setWorkspace] = useState(null);
    const [generatedCode, setGeneratedCode] = useState('');

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const data = await challengesApi.getChallenge(challengeId);
                setChallenge(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching challenge:', err);
                setError('Failed to load challenge. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, [challengeId]);

    useEffect(() => {
        if (blocklyDiv.current && toolboxRef.current && challenge) {
            // Initialize Blockly
            const newWorkspace = Blockly.inject(blocklyDiv.current, {
                toolbox: toolboxRef.current,
                grid: {
                    spacing: 20,
                    length: 3,
                    colour: '#ccc',
                    snap: true,
                },
                zoom: {
                    controls: true,
                    wheel: true,
                    startScale: 1.0,
                    maxScale: 3,
                    minScale: 0.3,
                    scaleSpeed: 1.2,
                },
                trashcan: true,
            });

            // Load starter code if available
            if (challenge.starterCode) {
                try {
                    const xml = Blockly.Xml.textToDom(challenge.starterCode);
                    Blockly.Xml.domToWorkspace(xml, newWorkspace);
                } catch (err) {
                    console.error('Error loading starter code:', err);
                }
            }

            setWorkspace(newWorkspace);

            // Clean up on unmount
            return () => {
                if (newWorkspace) {
                    newWorkspace.dispose();
                }
            };
        }
    }, [challenge]);

    const onGenerateCode = () => {
        if (workspace) {
            const code = javascriptGenerator.workspaceToCode(workspace);
            setGeneratedCode(code);
            console.log(code);
        }
    };

    const onSubmitSolution = async () => {
        if (!generatedCode) {
            alert('Please generate code before submitting');
            return;
        }

        setSubmitting(true);
        setSubmitSuccess(false);
        try {
            const result = await challengesApi.submitSolution(challengeId, generatedCode);
            if (result.success) {
                setSubmitSuccess(true);
            }
        } catch (err) {
            console.error('Error submitting solution:', err);
            alert('Failed to submit solution. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading challenge...</p>
                </div>
            </div>
        );
    }

    if (error || !challenge) {
        return (
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error || 'Challenge not found'}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                {/* Challenge Header */}
                <div className="border-b pb-4 mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl font-bold">{challenge.title}</h1>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                        </span>
                    </div>
                </div>

                {/* Challenge Description */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-gray-600">{challenge.description}</p>
                </div>

                {/* Examples */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Examples</h2>
                    <div className="bg-gray-50 rounded-lg p-4">
                        {Object.entries(challenge.examples).map(([key, value]) => (
                            <div key={key} className="mb-4 last:mb-0">
                                <h3 className="font-medium mb-2">{key}:</h3>
                                <div className="font-mono text-sm bg-white p-3 rounded border border-gray-200">
                                    <pre>{JSON.stringify(value, null, 2)}</pre>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Approach */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Approach</h2>
                    <div className="prose max-w-none">
                        {challenge.approach}
                    </div>
                </div>

                {/* Blockly Editor */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Code Editor</h2>
                    <div className="flex flex-col md:flex-row gap-4 h-[600px]">
                        <div className="blockly-container border border-gray-300 rounded-lg flex-grow h-full">
                            <div
                                ref={blocklyDiv}
                                className="h-full w-full"
                            />
                        </div>

                        <div className="w-full md:w-1/3 h-full">
                            <div className="bg-gray-100 p-4 rounded-lg h-full overflow-auto">
                                <h3 className="text-lg font-semibold mb-2">Generated JavaScript</h3>
                                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto h-[calc(100%-3rem)]">
                                    {generatedCode || '// Your code will appear here'}
                                </pre>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={onGenerateCode}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Generate Code
                        </button>
                        <div className="flex items-center gap-4">
                            {submitSuccess && (
                                <span className="text-green-600">Solution submitted successfully!</span>
                            )}
                            <button
                                onClick={onSubmitSolution}
                                disabled={submitting}
                                className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${submitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-600 hover:bg-green-700'
                                    }`}
                            >
                                {submitting ? 'Submitting...' : 'Submit Solution'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blockly Toolbox */}
            <xml
                id="toolbox"
                style={{ display: 'none' }}
                ref={toolboxRef}
            >
                <category name="Logic" colour="210">
                    <block type="controls_if"></block>
                    <block type="logic_compare"></block>
                    <block type="logic_operation"></block>
                    <block type="logic_negate"></block>
                    <block type="logic_boolean"></block>
                </category>
                <category name="Loops" colour="120">
                    <block type="controls_repeat_ext"></block>
                    <block type="controls_whileUntil"></block>
                    <block type="controls_for"></block>
                    <block type="controls_forEach"></block>
                </category>
                <category name="Math" colour="230">
                    <block type="math_number"></block>
                    <block type="math_arithmetic"></block>
                    <block type="math_single"></block>
                    <block type="math_round"></block>
                    <block type="math_modulo"></block>
                </category>
                <category name="Text" colour="160">
                    <block type="text"></block>
                    <block type="text_join"></block>
                    <block type="text_append"></block>
                    <block type="text_length"></block>
                    <block type="text_isEmpty"></block>
                </category>
                <category name="Lists" colour="260">
                    <block type="lists_create_empty"></block>
                    <block type="lists_create_with"></block>
                    <block type="lists_repeat"></block>
                    <block type="lists_length"></block>
                    <block type="lists_isEmpty"></block>
                    <block type="lists_indexOf"></block>
                    <block type="lists_getIndex"></block>
                    <block type="lists_setIndex"></block>
                </category>
                <category name="Variables" colour="330" custom="VARIABLE"></category>
                <category name="Functions" colour="290" custom="PROCEDURE"></category>
            </xml>
        </div>
    );
};

// Utility function for difficulty colors
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

export default CodingPage; 