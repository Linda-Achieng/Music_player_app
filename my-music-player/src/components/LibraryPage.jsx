import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaHeart, FaPlus, FaRedoAlt, FaRandom } from 'react-icons/fa';
import './LibraryPage.css';

const CLIENT_ID = '57319966653740b2bf9478612ae7831e'; 
const CLIENT_SECRET = '3d33011c38de427fbf0f817126350162'; 
const PLAYLIST_ID = '6fyZ3CYCQVeyoRQIIb4oJs'; 

const LibraryPage = () => {
  const [libraryData, setLibraryData] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('all'); // Added state for genre
  const audioRef = useRef(new Audio());
  const navigate = useNavigate();

  const getAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    return data.access_token;
  };

  const fetchPlaylist = async (playlistId) => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch playlist data: ${response.status} - ${errorMessage}`);
      }

      const data = await response.json();
      setLibraryData(data.items || []);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist(PLAYLIST_ID);
  }, []);

  const handlePlayPause = (track) => {
    if (currentTrack && track.id === currentTrack.id) {
      // Toggle play/pause
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // Set new track and play it
      setCurrentTrack(track);
      audioRef.current.src = track.preview_url; // Use preview_url for short clip
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const navigateBack = () => {
    navigate(-1);
  };

  // Filter songs by selected genre
  const filteredSongs = selectedGenre === 'all' 
    ? libraryData 
    : libraryData.filter(({ track }) => 
        track.genres && track.genres.includes(selectedGenre)
      );

  return (
    <div className="library-page">
      <header className="library-header">
        <button className="back-btn" onClick={navigateBack}>{'<'} Back</button>
        <h1>Your Playlist</h1>
      </header>

      {/* Genre Filter Section */}
      <div className="genre-filter">
        <button onClick={() => setSelectedGenre('all')}>All</button>
        <button onClick={() => setSelectedGenre('R&B')}>R&B</button>
        <button onClick={() => setSelectedGenre('Bongo')}>Bongo</button>
        <button onClick={() => setSelectedGenre('Reggae')}>Reggae</button>
      </div>

      <div className="library-content">
        {isLoading && <p>Loading your playlist...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && filteredSongs.length === 0 && <p>No tracks found in your playlist.</p>}
        {!isLoading && !error && filteredSongs.length > 0 && (
          filteredSongs.map(({ track }) => (
            <div className="library-item" key={track.id}>
              <img
                src={track.album?.images[0]?.url || 'default-image-url'} // Fallback image URL if undefined
                alt={track.name}
                className="library-item-img"
              />
              <div className="item-details">
                <h3>{track.name}</h3>
                <p>{track.artists[0]?.name || 'Unknown Artist'}</p>
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
            <img src={currentTrack.album?.images[0]?.url || 'default-image-url'} alt={currentTrack.name} className="player-cover" />
            <div className="track-info">
              <h3>{currentTrack.name}</h3>
              <p>{currentTrack.artists[0]?.name || 'Unknown Artist'}</p>
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
