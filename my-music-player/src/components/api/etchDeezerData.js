// /api/fetchDeezerData.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Replace this with your actual Deezer API endpoint
    const response = await axios.get('https://api.deezer.com/some-endpoint');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching Deezer data:', error);
    res.status(500).json({ error: 'Error fetching data from Deezer' });
  }
}
