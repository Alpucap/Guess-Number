import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('Please click one of the number buttons on the screen...');
  const [ptext, setpText] = useState();
  const [winStreaks, setWinStreaks] = useState(() => {
    return parseInt(localStorage.getItem('winStreaks')) || 0;
  });
  const [loseStreaks, setLoseStreaks] = useState(() => {
    return parseInt(localStorage.getItem('loseStreaks')) || 0;
  });

  const maxNum = 5;

  const randomNumber = () => {
    let ChoosenOne = Math.floor(Math.random() * maxNum) + 1;

    const handleButton = (buttonNumber) => {
      if (buttonNumber === ChoosenOne) {
        setText("You Win!");
        setpText("Please Wait...");
        const newWinStreak = winStreaks + 1;
        setWinStreaks(newWinStreak); 
        localStorage.setItem('winStreaks', newWinStreak); 
        setTimeout(() => {
          handleRefresh();
        }, 2000);
      } else {
        setText(`You Lose! The right number is ${ChoosenOne}`);
        setpText("Please Wait...");
        const newLoseStreak = loseStreaks + 1;
        setLoseStreaks(newLoseStreak); 
        localStorage.setItem('loseStreaks', newLoseStreak); 
        setTimeout(() => {
          handleRefresh();
        }, 2000);
      }
    };
    return handleButton;
  };

  function handleRefresh() {
    setText('Please click one of the number buttons on the screen...');
    setpText('');
  }

  const handleClick = randomNumber();

  const handleResetScore = () => {
    setWinStreaks(0);
    setLoseStreaks(0); 
    localStorage.removeItem('winStreaks'); 
    localStorage.removeItem('loseStreaks'); 
  };

  return (
    <div className="App">
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
