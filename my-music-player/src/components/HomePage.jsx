import React, { useEffect, useState } from 'react';
import './homepage.css';
import { FaRegClock, FaCog, FaHome, FaSearch, FaMusic } from 'react-icons/fa';

const HomePage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(
          'https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/13134819883'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlaylists(data.tracks.data);

        const recentTracks = data.tracks.data.slice(0, 4);
        setRecentlyPlayed(recentTracks);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const response = await fetch(
          'https://cors-anywhere.herokuapp.com/https://api.deezer.com/playlist/3155776842'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlaylists((prevPlaylists) => [...prevPlaylists, ...data.tracks.data.slice(0, 4)]);
      } catch (error) {
        console.error('Error fetching recommended content:', error);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <div className="homepage">
      <header className="header">
        <h1 className="welcome-message">Let the music heal your soul</h1>
        <div className="icons">
          <FaRegClock className="icon" />
          <FaCog className="icon" />
        </div>
        <button onClick={toggleTheme}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>

      <section className="playlists">
        <h2>Playlists</h2>
        <div className="playlist-container">
          {playlists.length ? (
            playlists.map((playlist) => (
              <div className="playlist" key={playlist.id}>
                <img src={playlist.album.cover} alt={playlist.title} />
                <div className="playlist-details">
                  <h3>{playlist.title}</h3>
                  <p className="playlist-description">{playlist.artist.name}</p>
                  <button onClick={() => window.open(playlist.link, '_blank')}>Play</button>
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
              <div className="show" key={track.id}>
                <img src={track.album.cover} alt={track.title} />
                <div className="show-details">
                  <h3>{track.title}</h3>
                  <p className="show-description">{track.artist.name}</p>
                  <button onClick={() => window.open(track.link, '_blank')}>Play</button>
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
          {playlists.length ? (
            playlists.slice(-4).map((track) => (
              <div className="show" key={track.id}>
                <img src={track.album.cover} alt={track.title} />
                <div className="show-details">
                  <h3>{track.title}</h3>
                  <p className="show-description">{track.artist.name}</p>
                  <button onClick={() => window.open(track.link, '_blank')}>Play</button>
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
          <FaHome className="footer-icon" />
          Home
        </div>
        <div className="footer-item">
          <FaSearch className="footer-icon" />
          Search
        </div>
        <div className="footer-item">
          <FaMusic className="footer-icon" />
          My Library
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
