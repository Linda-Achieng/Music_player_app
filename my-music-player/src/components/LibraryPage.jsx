import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LibraryPage.css'; // Ensure this file exists

const LibraryPage = () => {
  const [contentType, setContentType] = useState('playlists');
  const [libraryData, setLibraryData] = useState([]);
  const navigate = useNavigate();

  const fetchLibraryData = async (type) => {
    try {
      const response = await axios.get(`https://api.deezer.com/user/me/${type}`, {
        params: { access_token: 'YOUR_DEEZER_ACCESS_TOKEN' }, // Replace with your actual token
      });
      setLibraryData(response.data.data);
    } catch (error) {
      console.error('Error fetching library data', error);
    }
  };

  useEffect(() => {
    fetchLibraryData(contentType);
  }, [contentType]);

  return (
    <div className="library-page">
      <header className="library-header">
        <h1>Your Library</h1>
        <button onClick={() => navigate('/search')} className="back-btn">← Back to Search</button>
      </header>

      <div className="filter-buttons">
        <button onClick={() => setContentType('playlists')}>Playlists</button>
        <button onClick={() => setContentType('podcasts')}>Podcasts</button>
        <button onClick={() => setContentType('albums')}>Albums</button>
        <button onClick={() => setContentType('artists')}>Artists</button>
      </div>

      <div className="library-content">
        {libraryData.length > 0 ? (
          libraryData.map((item) => (
            <div className="library-item" key={item.id}>
              <img src={item.picture || item.cover} alt={item.title || item.name} />
              <div className="item-details">
                <h3>{item.title || item.name}</h3>
                <p>{item.artist ? item.artist.name : ''}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
