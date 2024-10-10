import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaHome, FaMusic, FaPlay, FaPause } from 'react-icons/fa';
import './SearchPage.css';
import { Link } from 'react-router-dom';

const DEEZER_API_URL = 'https://api.deezer.com/search';
const DEEZER_TRACK_URL = 'https://www.deezer.com/track';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('songs'); 
  const [results, setResults] = useState([]); 
  const [playingTrack, setPlayingTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const suggestedSongs = [
    { id: 9, title: 'Thunder', artist: 'Imagine Dragons' },
    { id: 10, title: 'Someone You Loved', artist: 'Lewis Capaldi' },
    { id: 11, title: 'Perfect', artist: 'Ed Sheeran' },
    { id: 12, title: 'Blinding Lights', artist: 'The Weeknd' },
  ];

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchDeezerData(searchTerm);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchDeezerData = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(DEEZER_API_URL, {
        params: { q: query },
      });
      setResults(response.data.data);
    } catch (error) {
      setError('Error fetching data from Deezer. Please try again later.');
      console.error('Error fetching data from Deezer:', error);
    } finally {
      setLoading(false);
    }
  };

  const playTrack = (track) => {
    if (playingTrack && playingTrack.id === track.id && isPlaying) {
      setIsPlaying(false); // Pause if the same track is playing
    } else {
      setPlayingTrack(track);
      setIsPlaying(true); // Play the selected track
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev); // Toggle play/pause
  };

  const handleCancel = () => {
    setSearchTerm('');
    setResults([]);
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <div className="search-input-container">
          <input
            type="text"
            placeholder={`Search ${filter}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
        <div className="filter-btns">
          {['songs', 'albums', 'artists'].map((option) => (
            <button
              key={option}
              className={filter === option ? 'active' : ''}
              onClick={() => setFilter(option)}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </header>

      <section className="search-results">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {results.length > 0 ? (
          results.map((result) => (
            <div className="result-item" key={result.id}>
              <img
                src={result.album.cover_medium}
                alt={result.title || result.name}
                className="result-cover"
              />
              <div className="result-details">
                <h3 className="result-title">{result.title || result.name}</h3>
                <p className="result-artist">{result.artist.name}</p>
              </div>
              <button
                className="result-play-btn"
                onClick={() => playTrack(result)}
              >
                {playingTrack && playingTrack.id === result.id && isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          ))
        ) : (
          <p>No results found. Please try a different search.</p>
        )}

        <div className="suggested-songs">
          <h2>Suggested Songs</h2>
          <ul>
            {suggestedSongs.map((song) => (
              <li key={song.id} onClick={() => playTrack(song)}>
                {song.title} by {song.artist}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-item">
          <Link to="/">
            <FaHome className="footer-icon" /> Home
          </Link>
        </div>
        <div className="footer-item active">
          <Link to="/search">
            <FaSearch className="footer-icon" /> Search
          </Link>
        </div>
        <div className="footer-item">
          <Link to="/library">
            <FaMusic className="footer-icon" /> Your Library
          </Link>
        </div>
      </footer>

      {playingTrack && (
        <div className="mini-player">
          <img
            src={playingTrack.album.cover_medium}
            alt={playingTrack.title}
            className="mini-player-cover"
          />
          <div className="mini-player-details">
            <h3>{playingTrack.title}</h3>
            <p>{playingTrack.artist.name}</p>
          </div>
          <button className="mini-player-play-btn" onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          {isPlaying && (
            <audio
              src={`${DEEZER_TRACK_URL}/${playingTrack.id}`}
              autoPlay
              onEnded={() => setIsPlaying(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
