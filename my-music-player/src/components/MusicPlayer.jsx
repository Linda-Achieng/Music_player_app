import React, { useState, useRef, useEffect } from 'react';
import { FaBackward, FaForward, FaPlay, FaPause, FaHeart, FaPlus, FaRandom, FaRedo } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import './MusicPlayer.css';

const CLIENT_ID = '57319966653740b2bf9478612ae7831e';
const CLIENT_SECRET = '3d33011c38de427fbf0f817126350162';

const MusicPlayer = () => {
  const navigate = useNavigate();
  const { trackId } = useParams(); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(1);
  const [trackInfo, setTrackInfo] = useState(null); 
  const audioRef = useRef(new Audio());

  
  const getAccessToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
      },
      body: 'grant_type=client_credentials',
    });
    const data = await response.json();
    return data.access_token; 
  };


  useEffect(() => {
    const fetchTrackInfo = async () => {
      const token = await getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTrackInfo(data); 
      if (data.preview_url) {
        audioRef.current.src = data.preview_url; 
      } else {
        alert('This track does not have a preview available.');
      }
    };

    fetchTrackInfo();
  }, [trackId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const togglePlayPause = () => {
    if (audioRef.current.src === '') {
      alert('No audio source available.');
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipBackward = () => {
    console.log('Skipping to the previous track');
  };

  const handleSkipForward = () => {
    console.log('Skipping to the next track');
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume; 
  };

  return (
    <div className="music-player">
      <div className="top-bar">
        <button onClick={handleBackClick} className="back-btn" aria-label="Back">
          {"<"}
        </button>
        {trackInfo && <h3 className="track-info">{trackInfo.artists[0].name} - {trackInfo.name}</h3>}
      </div>

      <div className="album-art">
        {trackInfo && <img src={trackInfo.album.images[0].url} alt={`${trackInfo.name} album cover`} />}
      </div>

      <div className="playback-controls">
        <button onClick={handleSkipBackward} className="control-btn" aria-label="Previous track">
          <FaBackward />
        </button>
        <button className="control-btn play-pause" onClick={togglePlayPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleSkipForward} className="control-btn" aria-label="Next track">
          <FaForward />
        </button>
      </div>

      <div className="additional-controls">
        <button onClick={toggleShuffle} className={`control-btn ${isShuffling ? 'active' : ''}`} aria-label="Shuffle">
          <FaRandom />
        </button>
        <button onClick={toggleRepeat} className={`control-btn ${isRepeating ? 'active' : ''}`} aria-label="Repeat">
          <FaRedo />
        </button>
        <button onClick={toggleLike} className={`control-btn ${isLiked ? 'liked' : ''}`} aria-label={isLiked ? 'Unlike' : 'Like'}>
          <FaHeart />
        </button>
        <button className="control-btn" aria-label="Add to Playlist">
          <FaPlus /> Add to Playlist
        </button>
        <button className="control-btn" aria-label="Add to Queue">
          <FaPlus /> Add to Queue
        </button>
      </div>

      <div className="volume-control">
        <label htmlFor="volume" className="volume-label">Volume:</label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
