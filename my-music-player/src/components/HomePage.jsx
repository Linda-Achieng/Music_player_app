// src/components/HomePage.jsx

import React from 'react';
import './homepage.css'; // Import your CSS file
import { FaRegClock, FaCog, FaHome, FaSearch, FaMusic } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <h1 className="welcome-message">Let the music heal your soul</h1>
        <div className="icons">
          <FaRegClock className="icon" />
          <FaCog className="icon" />
        </div>
      </header>

      {/* Playlists Section */}
      <section className="playlists">
        <h2>Playlists</h2>
        <div className="playlist-container">
          <div className="playlist">
            <img src="https://via.placeholder.com/150" alt="Playlist 1" />
            <div className="playlist-details">
              <h3>Playlist Title 1</h3>
              <p className="playlist-description">Song 1 - Artist 1</p>
            </div>
          </div>
          <div className="playlist">
            <img src="https://via.placeholder.com/150" alt="Playlist 2" />
            <div className="playlist-details">
              <h3>Playlist Title 2</h3>
              <p className="playlist-description">Song 2 - Artist 2</p>
            </div>
          </div>
          <div className="playlist">
            <img src="https://via.placeholder.com/150" alt="Playlist 3" />
            <div className="playlist-details">
              <h3>Playlist Title 3</h3>
              <p className="playlist-description">Song 3 - Artist 3</p>
            </div>
          </div>
          <div className="playlist">
            <img src="https://via.placeholder.com/150" alt="Playlist 4" />
            <div className="playlist-details">
              <h3>Playlist Title 4</h3>
              <p className="playlist-description">Song 4 - Artist 4</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Played Section */}
      <section className="shows">
        <h2>Recently Played</h2>
        <div className="show-container">
          <div className="show">
            <img src="https://via.placeholder.com/150" alt="Recently Played 1" />
            <h3>Recently Played Title 1</h3>
            <p className="playlist-description">Song A - Artist A</p>
          </div>
          <div className="show">
            <img src="https://via.placeholder.com/150" alt="Recently Played 2" />
            <h3>Recently Played Title 2</h3>
            <p className="playlist-description">Song B - Artist B</p>
          </div>
          <div className="show">
            <img src="https://via.placeholder.com/150" alt="Recently Played 3" />
            <h3>Recently Played Title 3</h3>
            <p className="playlist-description">Song C - Artist C</p>
          </div>
          <div className="show">
            <img src="https://via.placeholder.com/150" alt="Recently Played 4" />
            <h3>Recently Played Title 4</h3>
            <p className="playlist-description">Song D - Artist D</p>
          </div>
        </div>
      </section>

      {/* Your Shows Section */}
      <section className="shows">
        <h2>Your Shows</h2>
        <div className="show-container">
          <div className="show">
            <img src="https://via.placeholder.com/150" alt="Show 1" />
            <h3>Your Show Title 1</h3>
            <p className="playlist-description">Show Details 1</p>
          </div>
          <div className="show">
            <img src="https://via.placeholder.com/150" alt="Show 2" />
            <h3>Your Show Title 2</h3>
            <p className="playlist-description">Show Details 2</p>
          </div>
          <div className="show">
            <img src="https://via.placeholder.com/150" alt="Show 3" />
            <h3>Your Show Title 3</h3>
            <p className="playlist-description">Show Details 3</p>
          </div>
          <div className="show">
            <img src="https://via.placeholder.com/150" alt="Show 4" />
            <h3>Your Show Title 4</h3>
            <p className="playlist-description">Show Details 4</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
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
