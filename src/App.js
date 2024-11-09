import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/navbar';
import RPS from './pages/rps/rps';
import GuessGame from './pages/guessgame/guessGame';
import { Analytics } from '@vercel/analytics/react';
import backgroundMusic from './asset/backsound.mp3';
import { FaPlay, FaPause } from 'react-icons/fa';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(backgroundMusic));

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

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div className="project">
            <h1>HC <span onClick={toggleMusic} className="music-toggle">SANDBOX</span></h1>
            <div className="project-item">
              <Link to="/guess-game">
                <div className="project-block">Guess Game</div>
              </Link>
              <Link to="/rps">
                <div className="project-block">Rock, Paper, Scissors Game</div>
              </Link>
              <Link to="/guess-game">
                <div className="project-block">Coming Soon</div>
              </Link>
              <Link to="/guess-game">
                <div className="project-block">Coming Soon</div>
              </Link>
              <Link to="/guess-game">
                <div className="project-block">Coming Soon</div>
              </Link>
            </div>
          </div>
        } />
        
        {/* Guess Game Route */}
        <Route path="/guess-game" element={<GuessGame />} />
        
        {/* RPS (Rock, Paper, Scissors) Route */}
        <Route path="/rps" element={<RPS />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
