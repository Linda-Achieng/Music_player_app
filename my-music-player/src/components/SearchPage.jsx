import React, { useState } from 'react';
import { FaSearch, FaHome, FaMusic, FaPlay, FaPause } from 'react-icons/fa';
import './SearchPage.css';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('songs'); // Filter state (songs, albums, artists)
  const [playingTrack, setPlayingTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const results = [
    {
      id: 1,
      type: 'song',
      title: 'Candle in the dark',
      artist: 'Quadrant, Iris, Dummy',
      cover: 'song-cover-url',
    },
    {
      id: 2,
      type: 'song',
      title: 'Can We Go Back',
      artist: 'Scientist',
      cover: 'song-cover-url',
    },
    {
      id: 3,
      type: 'album',
      title: 'Dark Memories',
      artist: 'Black Barrel',
      cover: 'album-cover-url',
    },
    {
      id: 4,
      type: 'artist',
      name: 'Alan Thompson',
      cover: 'artist-cover-url',
    },
  ];

  // Filter and search logic
  const filteredResults = results.filter((item) => {
    if (filter === 'songs') {
      return item.type === 'song' && item.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filter === 'albums') {
      return item.type === 'album' && item.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filter === 'artists') {
      return item.type === 'artist' && item.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

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
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <div className="result-item" key={result.id}>
              <img
                src={result.cover}
                alt={result.title || result.name}
                className="result-cover"
              />
              <div className="result-details">
                <h3 className="result-title">{result.title || result.name}</h3>
                <p className="result-artist">{result.artist}</p>
              </div>
              {result.type === 'song' && (
                <button
                  className="result-play-btn"
                  onClick={() => playTrack(result)}
                >
                  Play
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </section>

      <footer className="footer">
        <div className="footer-item">
          <FaHome className="footer-icon" />
          Home
        </div>
        <div className="footer-item active">
          <FaSearch className="footer-icon" />
          Search
        </div>
        <div className="footer-item">
          <FaMusic className="footer-icon" />
          Your Library
        </div>
      </footer>

      {/* Mini music player */}
      {playingTrack && (
        <div className="mini-player">
          <img
            src={playingTrack.cover}
            alt={playingTrack.title}
            className="mini-player-cover"
          />
          <div className="mini-player-details">
            <h3>{playingTrack.title}</h3>
            <p>{playingTrack.artist}</p>
          </div>
          <button className="mini-player-play-btn" onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
