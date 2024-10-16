import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import LibraryPage from './components/LibraryPage';
import MusicPlayer from './components/MusicPlayer';

function App() {  
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleTrackSelection = (track) => {
    setCurrentTrack(track); 
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<HomePage />} />
          
          {/* Search Page */}
          <Route path="/search" element={<SearchPage onTrackSelect={handleTrackSelection} />} />
          
          {/* Library Page */}
          <Route path="/library" element={<LibraryPage onTrackSelect={handleTrackSelection} />} />
          
          {/* Music Player Route with dynamic trackId */}
          <Route 
            path="/music-player/:trackId" 
            element={
              currentTrack ? (
                <MusicPlayer
                  track={currentTrack.name}
                  artist={currentTrack.artist}
                  albumArt={currentTrack.albumArt}
                  audioSrc={currentTrack.audioSrc}
                  onBack={() => window.history.back()} 
                />
              ) : (
                <div>No track selected</div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
