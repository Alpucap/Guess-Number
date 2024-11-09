import './App.css';
import React, { useState, useEffect,  useRef} from 'react';
import backgroundMusic from './asset/backsound.mp3';
import failMusic from './asset/fail.mp3';
import winMusic from './asset/win.mp3';

function App() {
  const [text, setText] = useState('Please click one of the number buttons on the screen...');
  const [ptext, setpText] = useState();
  const [winStreaks, setWinStreaks] = useState(() => {
    return parseInt(localStorage.getItem('winStreaks')) || 0;
  });
  const [loseStreaks, setLoseStreaks] = useState(() => {
    return parseInt(localStorage.getItem('loseStreaks')) || 0;
  });
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const maxNum = 5;
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

  const randomNumber = () => {
    let ChoosenOne = Math.floor(Math.random() * maxNum) + 1;

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
      }, 3000);
    };
    return handleButton;
  };

  function handleRefresh() {
    setText('Please click one of the number buttons on the screen...');
    setpText('');
  }

  const handleClick = randomNumber();

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
      <div onClick={toggleMusic} className="music-toggle">
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </div>
      <div className="wrapper">
        <h1>{text}</h1>
        <div className="Buttons">
          <button className="1" onClick={() => handleClick(1)}>1</button>
          <button className="2" onClick={() => handleClick(2)}>2</button>
          <button className="3" onClick={() => handleClick(3)}>3</button>
          <button className="4" onClick={() => handleClick(4)}>4</button>
          <button className="5" onClick={() => handleClick(5)}>5</button>
        </div>
        <p>{ptext}</p>
      </div>
      <div className = "score">
        <div className = "win">Win: {winStreaks}</div>
        <div className = "lose">Lose: {loseStreaks}</div>
      </div>
      <button onClick={handleResetScore} className="reset">
        Reset
      </button>
      <footer>Made by Hans Christian Handoto</footer>
    </div>
  );
}

export default App;
