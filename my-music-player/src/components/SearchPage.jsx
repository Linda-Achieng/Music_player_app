import React, { useState, useEffect } from 'react';
import './searchpage.css';
import { FaHome, FaSearch, FaMusic } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const CLIENT_ID = '57319966653740b2bf9478612ae7831e';
const CLIENT_SECRET = '3d33011c38de427fbf0f817126350162';

const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
    },
    body: 'grant_type=client_credentials',
  });
  const data = await response.json();
  return data.access_token;
};

const searchSpotify = async (query, type) => {
  const token = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};

const fetchPopularTracks = async () => {
  const token = await getAccessToken();
  // Replace 'YOUR_PLAYLIST_ID' with an actual playlist ID from Spotify
  const PLAYLIST_ID = 'YOUR_PLAYLIST_ID'; 
  const response = await fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data.items.map(item => item.track); // Return the actual tracks
};

const SearchPage = ({ onTrackSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filterType, setFilterType] = useState('track');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [popularTracks, setPopularTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPopularTracks = async () => {
      const tracks = await fetchPopularTracks();
      setPopularTracks(tracks);
    };

    loadPopularTracks();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    setIsLoading(true);
    setErrorMessage('');
    const results = await searchSpotify(searchQuery, filterType);

    setIsLoading(false);

    if (results[`${filterType}s`].items.length > 0) {
      setSearchResults(results[`${filterType}s`].items);
    } else {
      setErrorMessage('No results found.');
      setSearchResults([]);
    }
  };

  const handleCancel = () => {
    setSearchQuery('');
    setSearchResults([]);
    setErrorMessage('');
  };

  const handlePlayTrack = (track) => {
    onTrackSelect({
      name: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      albumArt: track.album.images[0].url,
      audioSrc: track.preview_url,
    });
    navigate(`/music-player/${track.id}`);
  };

  return (
    <div className="search-page">
      <header className="header">
        <h1 className="welcome-message">Search for Your Favorite Music</h1>
      </header>

      <section className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for tracks, albums, artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="search-buttons">
            <button
              type="button"
              onClick={() => setFilterType('track')}
              className={filterType === 'track' ? 'active' : ''}
            >
              Songs
            </button>
            <button
              type="button"
              onClick={() => setFilterType('album')}
              className={filterType === 'album' ? 'active' : ''}
            >
              Albums
            </button>
            <button
              type="button"
              onClick={() => setFilterType('artist')}
              className={filterType === 'artist' ? 'active' : ''}
            >
              Artists
            </button>
          </div>
          <button type="submit" className="search-btn">Search</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </form>

        {isLoading && <p>Searching...</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {searchResults.length > 0 && (
          <div className="search-results">
            <h2>Search Results</h2>
            <ul>
              {searchResults.map(item => (
                <li key={item.id} className="result-item">
                  {filterType === 'track' && (
                    <>
                      <img src={item.album.images[0].url} alt={item.name} />
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.artists?.map(artist => artist.name).join(', ')}</p>
                        <button onClick={() => handlePlayTrack(item)} className="play-button">Play</button>
                      </div>
                    </>
                  )}
                  {filterType === 'album' && (
                    <>
                      <img src={item.images[0].url} alt={item.name} />
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.artists?.map(artist => artist.name).join(', ')}</p>
                      </div>
                    </>
                  )}
                  {filterType === 'artist' && (
                    <>
                      <img src={item.images[0]?.url || '/default-artist.png'} alt={item.name} />
                      <div>
                        <h3>{item.name}</h3>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {popularTracks.length > 0 && (
          <div className="popular-tracks">
            <h2>Popular Tracks</h2>
            <ul>
              {popularTracks.map(track => (
                <li key={track.id} className="result-item">
                  <img src={track.album.images[0]?.url} alt={track.name} />
                  <div>
                    <h3>{track.name}</h3>
                    <p>{track.artists?.map(artist => artist.name).join(', ')}</p>
                    <button onClick={() => handlePlayTrack(track)} className="play-button">Play</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="footer-item">
          <Link to="/"><FaHome className="footer-icon" /> Home</Link>
        </div>
        <div className="footer-item">
          <Link to="/search"><FaSearch className="footer-icon" /> Search</Link>
        </div>
        <div className="footer-item">
          <Link to="/library"><FaMusic className="footer-icon" /> My Library</Link>
        </div>
      </footer>
    </div>
  );
};

export default SearchPage;
