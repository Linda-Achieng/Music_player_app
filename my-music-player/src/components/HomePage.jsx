import React, { useEffect, useState } from 'react';
import './homepage.css';
import { FaRegClock, FaCog, FaHome, FaSearch, FaMusic } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const toggleSchedule = () => {
    setShowSchedule(!showSchedule);
  };

  
  const playlists = [
    {
      id: 1,
      name: "Chill Vibes",
      owner: { display_name: "User" },
      images: [{ url: "https://via.placeholder.com/150" }],
    },
    {
      id: 2,
      name: "Workout Mix",
      owner: { display_name: "User" },
      images: [{ url: "https://via.placeholder.com/150" }],
    },
    {
      id: 3,
      name: "Party Hits",
      owner: { display_name: "User" },
      images: [{ url: "https://via.placeholder.com/150" }],
    },
    {
      id: 4,
      name: "Relaxing Tunes",
      owner: { display_name: "User" },
      images: [{ url: "https://via.placeholder.com/150" }],
    },
  ];

  const recentlyPlayed = [
    {
      track: {
        id: 1,
        name: "Song One",
        artists: [{ name: "Artist One" }],
        album: { images: [{ url: "https://via.placeholder.com/150" }] },
        external_urls: { spotify: "#" },
      },
    },
    {
      track: {
        id: 2,
        name: "Song Two",
        artists: [{ name: "Artist Two" }],
        album: { images: [{ url: "https://via.placeholder.com/150" }] },
        external_urls: { spotify: "#" },
      },
    },
    {
      track: {
        id: 3,
        name: "Song Three",
        artists: [{ name: "Artist Three" }],
        album: { images: [{ url: "https://via.placeholder.com/150" }] },
        external_urls: { spotify: "#" },
      },
    },
    {
      track: {
        id: 4,
        name: "Song Four",
        artists: [{ name: "Artist Four" }],
        album: { images: [{ url: "https://via.placeholder.com/150" }] },
        external_urls: { spotify: "#" },
      },
    },
  ];

  const recommended = [
    {
      id: 1,
      name: "Recommended Song One",
      artists: [{ name: "Recommended Artist One" }],
      album: { images: [{ url: "https://via.placeholder.com/150" }] },
      external_urls: { spotify: "#" },
    },
    {
      id: 2,
      name: "Recommended Song Two",
      artists: [{ name: "Recommended Artist Two" }],
      album: { images: [{ url: "https://via.placeholder.com/150" }] },
      external_urls: { spotify: "#" },
    },
    {
      id: 3,
      name: "Recommended Song Three",
      artists: [{ name: "Recommended Artist Three" }],
      album: { images: [{ url: "https://via.placeholder.com/150" }] },
      external_urls: { spotify: "#" },
    },
    {
      id: 4,
      name: "Recommended Song Four",
      artists: [{ name: "Recommended Artist Four" }],
      album: { images: [{ url: "https://via.placeholder.com/150" }] },
      external_urls: { spotify: "#" },
    },
  ];

  return (
    <div className="homepage">
      <header className="header">
        <h1 className="welcome-message">Let the music heal your soul</h1>
        <div className="icons">
          <FaRegClock className="icon" onClick={toggleSchedule} />
          <FaCog className="icon" onClick={toggleSettings} />
        </div>
        <button onClick={toggleTheme}>
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </header>

      {showSettings && (
        <div className="settings-modal">
          <h2>Settings</h2>
          <button onClick={toggleTheme}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
          <button onClick={toggleSettings}>Close</button>
        </div>
      )}

      {showSchedule && (
        <div className="schedule-modal">
          <h2>Upcoming Releases</h2>
          <ul>
            <li>Sasha Alex Slogan - Older (Release Date)</li>
            <li>KSHMR - Close Your Eyes (Release Date)</li>
            <li>Prince Inda - Nyar Jaduong</li>
          </ul>
          <button onClick={toggleSchedule}>Close</button>
        </div>
      )}

      <section className="playlists">
        <h2>Playlists</h2>
        <div className="playlist-container">
          {playlists.map((playlist) => (
            <div className="playlist" key={playlist.id}>
              <img src={playlist.images[0]?.url} alt={playlist.name} />
              <div className="playlist-details">
                <h3>{playlist.name}</h3>
                <p className="playlist-description">By {playlist.owner.display_name}</p>
                <button onClick={() => window.open(playlist.external_urls.spotify, '_blank')}>Play</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="recently-played">
        <h2>Recently Played</h2>
        <div className="show-container">
          {recentlyPlayed.map((track) => (
            <div className="show" key={track.track.id}>
              <img src={track.track.album.images[0]?.url} alt={track.track.name} />
              <div className="show-details">
                <h3>{track.track.name}</h3>
                <p className="show-description">{track.track.artists[0].name}</p>
                <button onClick={() => window.open(track.track.external_urls.spotify, '_blank')}>Play</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="recommended">
        <h2>Recommended for You</h2>
        <div className="show-container">
          {recommended.map((track) => (
            <div className="show" key={track.id}>
              <img src={track.album.images[0]?.url} alt={track.name} />
              <div className="show-details">
                <h3>{track.name}</h3>
                <p className="show-description">{track.artists[0].name}</p>
                <button onClick={() => window.open(track.external_urls.spotify, '_blank')}>Play</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-item">
          <Link to="/">
            <FaHome className="footer-icon" /> Home
          </Link>
        </div>
        <div className="footer-item">
          <Link to="/search">
            <FaSearch className="footer-icon" /> Search
          </Link>
        </div>
        <div className="footer-item">
          <Link to="/library">
            <FaMusic className="footer-icon" /> My Library
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
