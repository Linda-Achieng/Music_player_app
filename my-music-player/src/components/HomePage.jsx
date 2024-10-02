import React, { useEffect, useState } from 'react';
import './homepage.css';
import { FaRegClock, FaCog, FaHome, FaSearch, FaMusic } from 'react-icons/fa';

const HomePage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

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
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    };

    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch(
          'https://cors-anywhere.herokuapp.com/https://api.deezer.com/user/me/history'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRecentlyPlayed(data.data.slice(0, 4)); // Limit to 4 recently played tracks
      } catch (error) {
        console.error('Error fetching recently played:', error);
      }
    };

    fetchPlaylists();
    fetchRecentlyPlayed();
  }, []);

  return (
    <div className="homepage">
      <header className="header">
        <h1 className="welcome-message">Let the music heal your soul</h1>
        <div className="icons">
          <FaRegClock className="icon" />
          <FaCog className="icon" />
        </div>
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
                  <button onClick={() => window.open(playlist.link, '_blank')}>
                    Play
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading playlists...</p>
          )}
        </div>
      </section>

      {/* Recently Played Section */}
      <section className="recently-played">
        <h2>Recently Played</h2>
        <div className="recently-played-container">
          {recentlyPlayed.length ? (
            recentlyPlayed.map((track) => (
              <div className="recently-played-track" key={track.id}>
                <img src={track.album.cover} alt={track.title} />
                <div className="track-details">
                  <h3>{track.title}</h3>
                  <p className="track-description">{track.artist.name}</p>
                  <button onClick={() => window.open(track.link, '_blank')}>
                    Play
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading recently played tracks...</p>
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
