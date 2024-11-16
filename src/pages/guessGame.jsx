import React, { useState, useEffect, useRef } from 'react';
import backgroundMusic from '../asset/backsound.mp3';
import failMusic from '../asset/fail.mp3';
import winMusic from '../asset/win.mp3';
import '../App.css';

const GuessGame = () => {
  const [text, setText] = useState('Please click one of the number buttons on the screen...');
  const [ptext, setpText] = useState('');
  const [winStreaks, setWinStreaks] = useState(() => parseInt(localStorage.getItem('winStreaks')) || 0);
  const [loseStreaks, setLoseStreaks] = useState(() => parseInt(localStorage.getItem('loseStreaks')) || 0);
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [ChoosenOne, setChoosenOne] = useState(() => Math.floor(Math.random() * 4) + 1);

  const audioRef = useRef(new Audio(backgroundMusic));
  const failAudioRef = useRef(new Audio(failMusic));
  const winAudioRef = useRef(new Audio(winMusic));

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleButton = (buttonNumber) => {
    if (isGameInProgress) return;
    setIsGameInProgress(true);

    if (buttonNumber === ChoosenOne) {
      winAudioRef.current.play().catch(error => console.log('Failed to play sound:', error));
      setText("You Win!");
      setpText("Loading next game...");
      const newWinStreak = winStreaks + 1;
      setWinStreaks(newWinStreak);
      localStorage.setItem('winStreaks', newWinStreak);
    } else {
      failAudioRef.current.play().catch(error => console.log('Failed to play sound:', error));
      setText(`You Lose! The right number is ${ChoosenOne}`);
      setpText("Loading next game...");
      const newLoseStreak = loseStreaks + 1;
      setLoseStreaks(newLoseStreak);
      localStorage.setItem('loseStreaks', newLoseStreak);
    }
    setTimeout(() => {
      handleRefresh();
      setIsGameInProgress(false);
      setChoosenOne(Math.floor(Math.random() * 4) + 1);
    }, 3000);
  };

  const handleRefresh = () => {
    setText('Please click one of the number buttons on the screen...');
    setpText('');
  };

  const handleResetScore = () => {
    if (isGameInProgress) return;
    setIsGameInProgress(true);
    setWinStreaks(0);
    setLoseStreaks(0);
    localStorage.removeItem('winStreaks');
    localStorage.removeItem('loseStreaks');
    setIsGameInProgress(false);
  };

  return (
    <div className="text-center h-screen flex flex-col items-center flex-grow mt-20 mx-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[#F0EDCC] text-2xl md:text-3xl lg:text-6xl font-light mb-20">{text}</h1>
        <div className="flex flex-row flex-wrap items-center gap-2 md:gap-8 lg:gap-16">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className="w-20 h-16 md:w-24 md:h-20 lg:w-32 lg:h-24 bg-[#F0EDCC] text-[#02343F] rounded-lg cursor-pointer font-bold border-none shadow-md active:shadow-sm active:translate-y-1"
              onClick={() => handleButton(num)}
            >
              {num}
            </button>
          ))}
        </div>
        <p className="text-[#F0EDCC] text-sm md:text-md lg:text-lg font-light mt-6 md:mt-12 lg:mt-16 font-sans">{ptext}</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 lg:gap-16 mt-12">
        <div className="text-[#02343F] bg-[#F0EDCC] rounded-lg px-8 py-2 md:px-8 md:py-3 lg:px-16 lg:py-4 font-light font-sans">Win: {winStreaks}</div>
        <div className="text-[#02343F] bg-[#F0EDCC] rounded-lg px-8 py-2 md:px-8 md:py-3 lg:px-16 lg:py-4 font-light font-sans">Lose: {loseStreaks}</div>
      </div>
      <button
        onClick={handleResetScore}
        className="mt-6 md:mt-8 lg:mt-16 text-xl md:text-xl lg:text-2xl px-8 py-2 md:py-3 lg:px-16 lg:px-16 lg:py-4 bg-[#F0EDCC] text-[#02343F] rounded-lg shadow-md mx-auto block font-light"
      >
        Reset
      </button>
      <footer className="text-[#F0EDCC] font-sans mt-12 text-sm md:text-md lg:text-lg">Made by HC SANDBOX</footer>
    </div>
  );
};

export default GuessGame;
