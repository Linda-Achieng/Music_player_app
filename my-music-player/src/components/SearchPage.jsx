import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaHome, FaMusic, FaPlay, FaPause } from 'react-icons/fa';
import './SearchPage.css';
import { Link } from 'react-router-dom';

const DEEZER_API_URL = 'https://api.deezer.com/search';
const DEEZER_TRACK_URL = 'https://www.deezer.com/track';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('songs'); // Filter state (songs, albums, artists)
  const [results, setResults] = useState([]); // Deezer API results
  const [playingTrack, setPlayingTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Suggested songs (you can modify this)
  const suggestedSongs = [
    { id: 9, title: 'Thunder', artist: 'Imagine Dragons' },
    { id: 10, title: 'Someone You Loved', artist: 'Lewis Capaldi' },
    { id: 11, title: 'Perfect', artist: 'Ed Sheeran' },
    { id: 12, title: 'Blinding Lights', artist: 'The Weeknd' },
  ];

  // Fetch data from Deezer API
  const fetchDeezerData = async (query) => {
    try {
      const response = await axios.get(DEEZER_API_URL, {
        params: { q: query },
      });
      setResults(response.data.data);
    } catch (error) {
      console.error('Error fetching data from Deezer:', error);
    }
  };

  // Handle search input change
  useEffect(() => {
    if (searchTerm) {
      fetchDeezerData(searchTerm);
    }
  }, [searchTerm]);

  // Handle song play/pause
  const playTrack = (track) => {
    setPlayingTrack(track);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle cancel button (clears the search)
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
          <button
            className={filter === 'songs' ? 'active' : ''}
            onClick={() => setFilter('songs')}
          >
            Songs
          </button>
          <button
            className={filter === 'albums' ? 'active' : ''}
            onClick={() => setFilter('albums')}
          >
            Albums
          </button>
          <button
            className={filter === 'artists' ? 'active' : ''}
            onClick={() => setFilter('artists')}
          >
            Artists
          </button>
        </div>
      </header>

      <section className="search-results">
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
                Play
              </button>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}

        {/* Suggested Songs Section */}
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

      {/* Mini music player */}
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
          {/* Deezer song link */}
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
