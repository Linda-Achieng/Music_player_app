import React, { useState, useRef } from 'react';
import { FaBackward, FaForward, FaPlay, FaPause, FaHeart, FaPlus, FaRandom, FaRedo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './MusicPlayer.css';

const MusicPlayer = ({ track, artist, albumArt, audioSrc }) => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(1); // Volume state
  const audioRef = useRef(new Audio(audioSrc)); // Ref for audio element

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page (search or library)
  };

  const togglePlayPause = () => {
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
    // Logic to skip to the previous track
    console.log('Skipping to the previous track');
  };

  const handleSkipForward = () => {
    // Logic to skip to the next track
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
    audioRef.current.volume = newVolume; // Update audio volume
  };

  return (
    <div className="music-player">
      {/* Top Bar with Back Button */}
      <div className="top-bar">
        <button onClick={handleBackClick} className="back-btn" aria-label="Back">
          {"<"}
        </button>
        <h3 className="track-info">{artist} - {track}</h3>
      </div>

      {/* Album Artwork */}
      <div className="album-art">
        <img src={albumArt} alt={`${track} album cover`} />
      </div>

      {/* Playback Controls */}
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

      {/* Additional Controls */}
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

      {/* Volume Control */}
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
