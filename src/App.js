import './App.css';
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Project from './pages/project';
import GuessGame from './pages/guessGame';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div className="project">
            <h1>HC SANDBOX</h1>
            <div className="project-item">
              <Link to="/guess-game">
                <div className="project-block">Guess Game</div>
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
              <Link to="/guess-game">
                <div className="project-block">Coming Soon</div>
              </Link>
            </div>
          </div>
        } />
        
        {/* Guess Game Route */}
        <Route path="/guess-game" element={<GuessGame />} />
        
        {/* Project Route */}
        <Route path="/project" element={<Project />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
