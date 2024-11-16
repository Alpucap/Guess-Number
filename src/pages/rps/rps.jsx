import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import backgroundMusic from '../../asset/backsound.mp3';
import failMusic from '../../asset/fail.mp3';
import winMusic from '../../asset/win.mp3';
import drawMusic from '../../asset/draw.mp3';
import rockImg from '../../asset/Rock.png';
import paperImg from '../../asset/Paper.png';
import scissorsImg from '../../asset/Scissors.png';
import '../../App.css';

const RPS = () => {
    const [text, setText] = useState('Pick your weapon!');
    const [ptext, setpText] = useState('');
    const [winRPSStreaks, setWinRPS] = useState(() => parseInt(localStorage.getItem('winRPSStreaks')) || 0);
    const [loseRPSStreaks, setLoseRPS] = useState(() => parseInt(localStorage.getItem('loseRPSStreaks')) || 0);
    const [drawRPSStreaks, setDrawRPS] = useState(() => parseInt(localStorage.getItem('drawRPSStreaks')) || 0);
    const [isGameInProgress, setIsGameInProgress] = useState(false);
    const [ChoosenOne, setChoosenOne] = useState(() => {
        const choices = ['Rock', 'Paper', 'Scissors'];
        return choices[Math.floor(Math.random() * 3)];
    });

    const audioRef = useRef(new Audio(backgroundMusic));
    const failAudioRef = useRef(new Audio(failMusic));
    const winAudioRef = useRef(new Audio(winMusic));
    const drawAudioRef = useRef(new Audio(drawMusic));

    useEffect(() => {
        const audio = audioRef.current;
        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    const battle = (playerChoice, computerChoice) => {
        if (playerChoice === computerChoice) {
            return 'Draw';
        }
        if (
            (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
            (playerChoice === 'Paper' && computerChoice === 'Rock') ||
            (playerChoice === 'Scissors' && computerChoice === 'Paper')
        ) {
            return 'Win';
        }
        return 'Lose';
    };

    const handleButton = (buttonNumber) => {
        if (isGameInProgress) return; 
        setIsGameInProgress(true);

        let choosen = '';
        if (ChoosenOne === 1){
            choosen = 'Rock'
        } else if (ChoosenOne === 2) {
            choosen = 'Paper';
        } else if (ChoosenOne === 3) {
            choosen = 'Scissors';
        }

        let result = battle(buttonNumber, choosen);
        if (result === 'Draw'){
            drawAudioRef.current.play().catch(error => console.log('Failed to play sound:', error));
            setText(`Draw! You both picked ${choosen}`);
            setpText("Loading next game...");
            const newDrawStreak = drawRPSStreaks + 1;
            setDrawRPS(newDrawStreak); 
            localStorage.setItem('drawRPSStreaks', newDrawStreak); 
        }
        else if (result === 'Win') {
            winAudioRef.current.play().catch(error => console.log('Failed to play sound:', error));
            setText("You Win!");
            setpText("Loading next game...");
            const newWinStreak = winRPSStreaks + 1;
            setWinRPS(newWinStreak); 
            localStorage.setItem('winRPSStreaks', newWinStreak); 
        } else {
            failAudioRef.current.play().catch(error => console.log('Failed to play sound:', error));
            setText(`You Lose! The enemy is choosing ${choosen}`);
            setpText("Loading next game...");
            const newLoseStreak = loseRPSStreaks + 1;
            setLoseRPS(newLoseStreak); 
            localStorage.setItem('loseRPSStreaks', newLoseStreak); 
        }

        setTimeout(() => {
            handleRefresh();
            setIsGameInProgress(false);
            let randomChoice = Math.floor(Math.random() * 3) + 1; 
            setChoosenOne(randomChoice);
        }, 3000);
    };

    const handleRefresh = () => {
        setText('Pick your weapon!');
        setpText('');
    };

    const handleResetScore = () => {
        if (isGameInProgress) return; 
        setIsGameInProgress(true);
        setWinRPS(0);
        setLoseRPS(0); 
        setDrawRPS(0);
        localStorage.removeItem('winRPSStreaks'); 
        localStorage.removeItem('loseRPSStreaks'); 
        setIsGameInProgress(false);
    };

    return (
        <div className="text-center h-screen flex flex-col items-center m-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[#F0EDCC] text-4xl md:text-5xl lg:text-6xl font-light mb-12">{text}</h1>
                <div className="flex flex-row items-center justify-center gap-5 md:gap-8 lg:gap-16 mt-4">
                    <button onClick={() => handleButton('Rock')} className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32 bg-[#F0EDCC] text-[#02343F] rounded-lg font-bold shadow-md active:shadow-sm active:translate-y-1 flex items-center justify-center">
                        <img src={rockImg} alt="Rock" className="w-20 h-16 md:w-24 md:h-20 lg:w-32 lg:h-24 bg-transparent"/>
                    </button>
                    <button onClick={() => handleButton('Paper')} className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32  bg-[#F0EDCC] text-[#02343F] rounded-lg font-bold shadow-md active:shadow-sm active:translate-y-1 flex items-center justify-center">
                        <img src={paperImg} alt="Paper" className="w-20 h-16 md:w-24 md:h-20 lg:w-32 lg:h-24 bg-transparent"/>
                    </button>
                    <button onClick={() => handleButton('Scissors')} className="w-24 h-20 md:w-32 md:h-24 lg:w-48 lg:h-32  bg-[#F0EDCC] text-[#02343F] rounded-lg font-bold shadow-md active:shadow-sm active:translate-y-1 flex items-center justify-center">
                        <img src={scissorsImg} alt="Scissors" className="w-20 h-16 md:w-24 md:h-20 lg:w-32 lg:h-24 bg-transparent"/>
                    </button>
                </div>
                <p className="text-[#F0EDCC] text-sm md:text-md lg:text-lg font-light mt-12 font-sans ">{ptext}</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-2 lg:gap-16 mt-12">
                <div className="text-[#02343F] bg-[#F0EDCC] rounded-lg px-8 py-2 md:px-8 md:py-3 lg:px-16 lg:py-4 font-light font-sans">Win: {winRPSStreaks}</div>
                <div className="text-[#02343F] bg-[#F0EDCC] rounded-lg px-8 py-2 md:px-8 md:py-3 lg:px-16 lg:py-4 font-light font-sans">Lose: {loseRPSStreaks}</div>
                <div className="text-[#02343F] bg-[#F0EDCC] rounded-lg px-8 py-2 md:px-8 md:py-3 lg:px-16 lg:py-4 font-light font-sans">Draw: {drawRPSStreaks}</div>
            </div>
            <button onClick={handleResetScore} className="mt-6 md:mt-8 lg:mt-16 text-xl md:text-1xl lg:text-2xl px-8 py-2 md:py-3 lg:px-16 lg:px-16 lg:py-4 bg-[#F0EDCC] text-[#02343F] rounded-lg shadow-md mx-auto block font-light">
                Reset
            </button>
            <footer className="text-[#F0EDCC] font-sans mt-12 text-sm md:text-md lg:text-lg">Made by HC SANDBOX</footer>
        </div>
    );
}

export default RPS;
