import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaHeart, FaPlus, FaRedoAlt, FaRandom } from 'react-icons/fa';
import './LibraryPage.css';

const DEEZER_PLAYLIST_ID = '13134819883'; 

const LibraryPage = () => {
  const [libraryData, setLibraryData] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contentType, setContentType] = useState('tracks'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`https://api.deezer.com/playlist/${DEEZER_PLAYLIST_ID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch playlist');
        }
        const data = await response.json();
        setLibraryData(data.tracks.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  const handlePlayPause = (track) => {
    if (currentTrack && track.id === currentTrack.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const navigateBack = () => {
    navigate(-1); 
  };


  const filteredLibraryData = libraryData.filter(track => {
    if (contentType === 'tracks') return true;
    if (contentType === 'albums') return track.album !== undefined; // Change as per your requirement
    if (contentType === 'artists') return track.artist !== undefined; // Change as per your requirement
    return true;
  });

  return (
    <div className="library-page">
      <header className="library-header">
        <button className="back-btn" onClick={navigateBack}>{'<'} Back</button>
        <h1>Your Playlist</h1>
      </header>

      <div className="filter-buttons">
        <button onClick={() => setContentType('tracks')} className={contentType === 'tracks' ? 'active' : ''}>Tracks</button>
        <button onClick={() => setContentType('albums')} className={contentType === 'albums' ? 'active' : ''}>Albums</button>
        <button onClick={() => setContentType('artists')} className={contentType === 'artists' ? 'active' : ''}>Artists</button>
      </div>

      <div className="library-content">
        {isLoading && <p>Loading your playlist...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && filteredLibraryData.length === 0 && <p>No tracks found in your playlist.</p>}
        {!isLoading && !error && filteredLibraryData.length > 0 && (
          filteredLibraryData.map((track) => (
            <div className="library-item" key={track.id}>
              <img
                src={track.album.cover_medium}
                alt={track.title}
                className="library-item-img"
              />
              <div className="item-details">
                <h3>{track.title}</h3>
                <p>{track.artist.name}</p>
                <button onClick={() => handlePlayPause(track)}>
                  {isPlaying && currentTrack && currentTrack.id === track.id ? <FaPause /> : <FaPlay />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {currentTrack && (
        <div className="music-player">
          <div className="player-details">
            <img src={currentTrack.album.cover_medium} alt={currentTrack.title} className="player-cover" />
            <div className="track-info">
              <h3>{currentTrack.title}</h3>
              <p>{currentTrack.artist.name}</p>
            </div>
          </div>
          <div className="player-controls">
            <button onClick={() => handlePlayPause(currentTrack)}><FaStepBackward /></button>
            <button onClick={() => handlePlayPause(currentTrack)}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button><FaStepForward /></button>
          </div>
          <div className="player-actions">
            <button><FaHeart /></button>
            <button><FaPlus /> Add to playlist</button>
            <button><FaRedoAlt /> Repeat</button>
            <button><FaRandom /> Shuffle</button>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-item">
          <Link to="/">Home</Link>
        </div>
        <div className="footer-item">
          <Link to="/search">Search</Link>
        </div>
        <div className="footer-item active">
          <Link to="/library">Library</Link>
        </div>
      </footer>
    </div>
  );
};

export default LibraryPage;
