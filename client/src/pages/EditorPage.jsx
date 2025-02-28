import React, { useEffect, useRef, useState } from 'react';
import * as Blockly from 'blockly';
import 'blockly/javascript';

const EditorPage = () => {
    const blocklyDiv = useRef(null);
    const toolboxRef = useRef(null);
    const [workspace, setWorkspace] = useState(null);
    const [generatedCode, setGeneratedCode] = useState('');

    useEffect(() => {
        if (blocklyDiv.current && toolboxRef.current) {
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

            setWorkspace(newWorkspace);

            // Clean up on unmount
            return () => {
                if (newWorkspace) {
                    newWorkspace.dispose();
                }
            };
        }
    }, []);

    const onGenerateCode = () => {
        if (workspace) {
            const code = Blockly.JavaScript.workspaceToCode(workspace);
            setGeneratedCode(code);
            console.log(code);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Alga Code Editor</h2>
                <p className="text-gray-600">Drag and drop blocks to create your solution</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-250px)]">
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

            <div className="mt-4 flex justify-between">
                <button
                    onClick={onGenerateCode}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Generate Code
                </button>
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Submit Solution
                </button>
            </div>

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

export default EditorPage;
