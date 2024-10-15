import React, { useEffect, useState } from 'react';
import './homepage.css';
import { FaRegClock, FaCog, FaHome, FaSearch, FaMusic } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CLIENT_ID = '57319966653740b2bf9478612ae7831e'; // Your Spotify Client ID
const REDIRECT_URI = 'http://localhost:5173/callback'; // Replace with your redirect URI
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPE = 'user-library-read user-read-playback-state'; // Scopes you need for user playback info

const HomePage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [token, setToken] = useState('');

  // Handle theme toggle
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

  // Spotify Authentication - Extract token from URL after login
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find(elem => elem.startsWith('access_token'))
        .split('=')[1];

      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
  }, []);

  // Fetch user's playlists from Spotify API
  const fetchUserPlaylists = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }

      const data = await response.json();
      setPlaylists(data.items);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  // Fetch recently played tracks from Spotify API
  const fetchRecentlyPlayed = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recently played tracks');
      }

      const data = await response.json();
      setRecentlyPlayed(data.items.slice(0, 4)); // Store only the first 4 tracks
    } catch (error) {
      console.error('Error fetching recently played tracks:', error);
    }
  };

  // Fetch recommended tracks for the user
  const fetchRecommendedTracks = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/recommendations?limit=4', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommended tracks');
      }

      const data = await response.json();
      setRecommended(data.tracks);
    } catch (error) {
      console.error('Error fetching recommended tracks:', error);
    }
  };

  // Fetch playlists, recently played, and recommendations once token is available
  useEffect(() => {
    if (token) {
      fetchUserPlaylists();
      fetchRecentlyPlayed();
      fetchRecommendedTracks();
    }
  }, [token]);

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
          {playlists.length ? (
            playlists.map((playlist) => (
              <div className="playlist" key={playlist.id}>
                <img src={playlist.images[0]?.url} alt={playlist.name} />
                <div className="playlist-details">
                  <h3>{playlist.name}</h3>
                  <p className="playlist-description">By {playlist.owner.display_name}</p>
                  <button onClick={() => window.open(playlist.external_urls.spotify, '_blank')}>Play</button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading playlists...</p>
          )}
        </div>
      </section>

      <section className="recently-played">
        <h2>Recently Played</h2>
        <div className="show-container">
          {recentlyPlayed.length ? (
            recentlyPlayed.map((track) => (
              <div className="show" key={track.track.id}>
                <img src={track.track.album.images[0]?.url} alt={track.track.name} />
                <div className="show-details">
                  <h3>{track.track.name}</h3>
                  <p className="show-description">{track.track.artists[0].name}</p>
                  <button onClick={() => window.open(track.track.external_urls.spotify, '_blank')}>Play</button>
                </div>
              </div>
            ))
          ) : (
            <p>No recently played tracks found.</p>
          )}
        </div>
      </section>

      <section className="recommended">
        <h2>Recommended for You</h2>
        <div className="show-container">
          {recommended.length ? (
            recommended.map((track) => (
              <div className="show" key={track.id}>
                <img src={track.album.images[0]?.url} alt={track.name} />
                <div className="show-details">
                  <h3>{track.name}</h3>
                  <p className="show-description">{track.artists[0].name}</p>
                  <button onClick={() => window.open(track.external_urls.spotify, '_blank')}>Play</button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading recommended tracks...</p>
          )}
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
