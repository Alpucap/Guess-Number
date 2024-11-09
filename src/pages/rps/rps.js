import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import './rps.css'
import backgroundMusic from '../../asset/backsound.mp3';
import failMusic from '../../asset/fail.mp3';
import winMusic from '../../asset/win.mp3';
import drawMusic from '../../asset/draw.mp3';
import rockImg from '../../asset/Rock.png';
import paperImg from '../../asset/Paper.png';
import scissorsImg from '../../asset/Scissors.png';

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
        }else if (ChoosenOne === 2) {
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
        <div className="rps">
        <div className="wrapper">
            <h1>{text}</h1>
            <div className="Buttons">
                    <button onClick={() => handleButton('Rock')}>
                        <img src={rockImg} alt="Rock" />
                    </button>
                    <button onClick={() => handleButton('Paper')}>
                        <img src={paperImg} alt="Paper" />
                    </button>
                    <button onClick={() => handleButton('Scissors')}>
                        <img src={scissorsImg} alt="Scissors" />
                    </button>
                </div>
            <p>{ptext}</p>
        </div>
        <div className="score">
            <div className="win">Win: {winRPSStreaks}</div>
            <div className="lose">Lose: {loseRPSStreaks}</div>
            <div className="draw">Draw: {drawRPSStreaks}</div>
        </div>
        <button onClick={handleResetScore} className="reset">
            Reset
        </button>
        <footer>Made by HC SANDBOX</footer>
        </div>
    );
}

export default RPS;