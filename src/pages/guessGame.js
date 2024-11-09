import './guessGame.css';
import React, { useState, useEffect, useRef } from 'react';
import backgroundMusic from '../asset/backsound.mp3';
import failMusic from '../asset/fail.mp3';
import winMusic from '../asset/win.mp3';

const GuessGame = () => {
  const [text, setText] = useState('Please click one of the number buttons on the screen...');
  const [ptext, setpText] = useState('');
  const [winStreaks, setWinStreaks] = useState(() => parseInt(localStorage.getItem('winStreaks')) || 0);
  const [loseStreaks, setLoseStreaks] = useState(() => parseInt(localStorage.getItem('loseStreaks')) || 0);
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ChoosenOne, setChoosenOne] = useState(() => Math.floor(Math.random() * 5) + 1);

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

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => console.log('Audio playback failed:', error));
    }
    setIsPlaying(!isPlaying);
  };

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
      setChoosenOne(Math.floor(Math.random() * 5) + 1); 
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
    <div className="App">
      <div className="wrapper">
        <h1>{text}</h1>
        <div className="Buttons">
          {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} className={`${num}`} onClick={() => handleButton(num)}>
              {num}
            </button>
          ))}
        </div>
        <p>{ptext}</p>
      </div>
      <div className="score">
        <div className="win">Win: {winStreaks}</div>
        <div className="lose">Lose: {loseStreaks}</div>
      </div>
      <button onClick={handleResetScore} className="reset">
        Reset
      </button>
      <div onClick={toggleMusic} className="music-toggle">
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </div>
      <footer>Made by Hans Christian Handoto</footer>
    </div>
  );
};

export default GuessGame;
