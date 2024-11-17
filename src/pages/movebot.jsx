import React, { useState, useEffect } from 'react';
import img from '../asset/warrior.png';

const MoveBot = () => {
    const [position, setPosition] = useState({ y: 0, x: 0 });
    const [keysPressed, setKeysPressed] = useState({
        w: false,
        a: false,
        s: false,
        d: false,
    });
    const [rotation, setRotation] = useState(0); 

    //Movement functions
    const moveUp = () => {
        setPosition((prev) => ({
            ...prev,
            y: prev.y <= -121 ? prev.y : prev.y - 10,
        }));
        setRotation(180);
    };
    const moveDown = () => {
        setPosition((prev) => ({
            ...prev,
            y: prev.y >= 121 ? prev.y : prev.y + 10,
        }));
        setRotation(0);
    };
    const moveLeft = () => {
        setPosition((prev) => ({
            ...prev,
            x: prev.x <= -121 ? prev.x : prev.x - 10,
        }));
        setRotation(90);
    };
    const moveRight = () => {
        setPosition((prev) => ({
            ...prev,
            x: prev.x >= 121 ? prev.x : prev.x + 10,
        }));
        setRotation(270); 
    };

    //Handle diagonal movement
    const moveDiagonally = () => {
        if (keysPressed.s && keysPressed.d) {
            //Down-Right
            setPosition((prev) => ({
                y: prev.y >= 135 ? prev.y : prev.y + 10,
                x: prev.x >= 135 ? prev.x : prev.x + 10,
            }));
            setRotation(315);
        } else if (keysPressed.s && keysPressed.a) {
            //Down-Left
            setPosition((prev) => ({
                y: prev.y >= 135 ? prev.y : prev.y + 10,
                x: prev.x <= -135 ? prev.x : prev.x - 10,
            }));
            setRotation(45); 
        } else if (keysPressed.w && keysPressed.d) {
            //Up-Right
            setPosition((prev) => ({
                y: prev.y <= -135 ? prev.y : prev.y - 10,
                x: prev.x >= 135 ? prev.x : prev.x + 10,
            }));
            setRotation(225); 
        } else if (keysPressed.w && keysPressed.a) {
            //Up-Left
            setPosition((prev) => ({
                y: prev.y <= -135 ? prev.y : prev.y - 10,
                x: prev.x <= -135 ? prev.x : prev.x - 10,
            }));
            setRotation(135); 
        }
    };

    const handleKeyDown = (event) => {
        const { key } = event;
        if (key === 'w' || key === 'ArrowUp') {
            setKeysPressed((prev) => ({ ...prev, w: true }));
        } else if (key === 'a' || key === 'ArrowLeft') {
            setKeysPressed((prev) => ({ ...prev, a: true }));
        } else if (key === 's' || key === 'ArrowDown') {
            setKeysPressed((prev) => ({ ...prev, s: true }));
        } else if (key === 'd' || key === 'ArrowRight') {
            setKeysPressed((prev) => ({ ...prev, d: true }));
        } else if (key === 'r') {
            handleReset();
        }
    };

    const handleKeyUp = (event) => {
        const { key } = event;
        if (key === 'w' || key === 'ArrowUp') {
            setKeysPressed((prev) => ({ ...prev, w: false }));
        } else if (key === 'a' || key === 'ArrowLeft') {
            setKeysPressed((prev) => ({ ...prev, a: false }));
        } else if (key === 's' || key === 'ArrowDown') {
            setKeysPressed((prev) => ({ ...prev, s: false }));
        } else if (key === 'd' || key === 'ArrowRight') {
            setKeysPressed((prev) => ({ ...prev, d: false }));
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (keysPressed.w) moveUp();
        if (keysPressed.s) moveDown();
        if (keysPressed.a) moveLeft();
        if (keysPressed.d) moveRight();
        moveDiagonally(); 
    }, [keysPressed]);

    const handleReset = () => {
        setPosition({ y: 0, x: 0 });
        setRotation(0); 
    };

    return (
        <div className="text-center h-screen flex flex-col items-center flex-grow mt-20 mx-2">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[#F0EDCC] text-2xl md:text-3xl lg:text-6xl font-light mb-20">
                    Move The Warrior
                </h1>
                <div className="flex flex-col md:flex-row lg:flex-row items-center gap-8 md:gap-16 lg:gap-20">
                    <div className="w-[300px] h-[300px] bg-[#117c13] relative flex justify-center items-center rounded-md border-4 border-black">
                        <img
                            src={img}
                            alt="Warrior"
                            className="w-[50px] h-[50px] bg-transparent"
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`, // Apply rotation based on direction
                                transition: 'transform 0.2s ease',
                            }}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col items-center space-y-2">
                            <button
                                className="w-16 h-16 bg-[#F0EDCC] rounded-lg shadow-md"
                                onClick={moveUp}
                            >
                                Up
                            </button>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="flex justify-center gap-4">
                                <button
                                    className="w-16 h-16 bg-[#F0EDCC] rounded-lg shadow-md"
                                    onClick={moveLeft}
                                >
                                    Left
                                </button>
                                <button
                                    className="w-16 h-16 bg-[#F0EDCC] rounded-lg shadow-md"
                                    onClick={handleReset}
                                >
                                    Reset
                                </button>
                                <button
                                    className="w-16 h-16 bg-[#F0EDCC] rounded-lg shadow-md"
                                    onClick={moveRight}
                                >
                                    Right
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <button
                                className="w-16 h-16 bg-[#F0EDCC] rounded-lg shadow-md"
                                onClick={moveDown}
                            >
                                Bottom
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-[#F0EDCC] text-sm md:text-md lg:text-lg font-light mt-6 md:mt-12 lg:mt-16">For PC</p>
            <p className="text-[#F0EDCC] text-sm md:text-md lg:text-lg font-light">w(↑): up, a(←): left, s(↓): bottom, d(→): right</p>
            <footer className="text-[#F0EDCC] font-sans mt-12 text-sm md:text-md lg:text-lg">Made by HC SANDBOX</footer>
        </div>
    );
};

export default MoveBot;
