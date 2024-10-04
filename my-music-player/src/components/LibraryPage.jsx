import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making API requests

const LibraryPage = () => {
  const [contentType, setContentType] = useState('playlists'); // default view
  const [libraryData, setLibraryData] = useState([]);

  // Function to fetch data from Deezer API
  const fetchLibraryData = async (type) => {
    try {
      const response = await axios.get(`https://api.deezer.com/user/me/${type}`, {
        params: { access_token: 'YOUR_DEEZER_ACCESS_TOKEN' },
      });
      setLibraryData(response.data.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching library data', error);
    }
  };

  useEffect(() => {
    fetchLibraryData(contentType); // Fetch data when component loads or contentType changes
  }, [contentType]);

  return (
    <div className="library-page">
      <header className="library-header">
        <h1>Your Library</h1>
        <div className="header-actions">
          <button className="search-btn">🔍</button>
          <button className="add-btn">➕</button>
        </div>
      </header>

      <div className="filter-buttons">
        <button onClick={() => setContentType('playlists')}>Playlists</button>
        <button onClick={() => setContentType('podcasts')}>Podcasts</button>
        <button onClick={() => setContentType('albums')}>Albums</button>
        <button onClick={() => setContentType('artists')}>Artists</button>
      </div>

      <div className="library-content">
        {libraryData.map((item) => (
          <div className="library-item" key={item.id}>
            <img src={item.picture || item.cover} alt={item.title || item.name} />
            <div className="item-details">
              <h3>{item.title || item.name}</h3>
              <p>{item.artist ? item.artist.name : ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
