import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/navbar';
import RPS from './pages/rps';
import CoinFlip from './pages/coinflip'
import ColorSlider from './pages/colorslider'
import GuessGame from './pages/guessGame';
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
          <div className="text-center text-[#02343F] px-4 sm:px-8 md:px-12">
          <h1 className="text-center text-3xl md:text-4xl lg:text-8xl my-8 md:my-12 lg:my-16 font-bold text-[#F0EDCC]">HC Sandbox</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-16px mx-auto max-w-6xl">
            <Link to="/guess-game" className="project-block font-montserrat">
              <div className="bg-[#F0EDCC] h-24 w-full flex items-center justify-center rounded-lg text-lg font-semibold hover:bg-[#d8d5b7] hover:scale-105 transform transition-transform duration-300">
                Guess Game
              </div>
            </Link>
            <Link to="/rps" className="project-block">
              <div className="bg-[#F0EDCC] h-24 w-full flex items-center justify-center rounded-lg text-lg font-semibold hover:bg-[#d8d5b7] hover:scale-105 transform transition-transform duration-300">
                Rock, Paper, Scissors Game
              </div>
            </Link>
            <Link to="/coinflip" className="project-block">
              <div className="bg-[#F0EDCC] h-24 w-full flex items-center justify-center rounded-lg text-lg font-semibold hover:bg-[#d8d5b7] hover:scale-105 transform transition-transform duration-300">
                Coin Flip
              </div>
            </Link>
            <Link to="/colorslider" className="project-block">
              <div className="bg-[#F0EDCC] h-24 w-full flex items-center justify-center rounded-lg text-lg font-semibold hover:bg-[#d8d5b7] hover:scale-105 transform transition-transform duration-300">
                Color Slider
              </div>
            </Link>
            <Link to="#" className="project-block pointer-events-none opacity-50">
              <div className="bg-[#F0EDCC] h-24 w-full flex items-center justify-center rounded-lg text-lg font-semibold hover:bg-[#d8d5b7] hover:scale-105 transform transition-transform duration-300">
                Coming Soon
              </div>
            </Link>
          </div>
        </div>        
        } />
        
        {/* Guess Game Route */}
        <Route path="/guess-game" element={<GuessGame />} />
        
        {/* RPS (Rock, Paper, Scissors) Route */}
        <Route path="/rps" element={<RPS />} />

        {/* Coin Flip Route */}
        <Route path="/coinflip" element={<CoinFlip />} />

        {/* Color Slider Route */}
        <Route path="/colorslider" element={<ColorSlider />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
