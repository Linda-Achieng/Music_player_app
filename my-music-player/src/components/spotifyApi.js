const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// Function to fetch playlists
export const fetchSpotifyPlaylists = async (token) => {
  const response = await fetch(`${SPOTIFY_API_BASE}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch playlists');
  }

  const data = await response.json();
  return data.items;
};

// Function to fetch recently played tracks
export const fetchRecentlyPlayed = async (token) => {
  const response = await fetch(`${SPOTIFY_API_BASE}/me/player/recently-played`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recently played tracks');
  }

  const data = await response.json();
  return data.items;
};

// Function to fetch recommended tracks
export const fetchRecommendedTracks = async (token) => {
  const response = await fetch(`${SPOTIFY_API_BASE}/recommendations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recommended tracks');
  }

  const data = await response.json();
  return data.tracks;
};
