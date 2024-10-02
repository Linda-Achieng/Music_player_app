const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 5000; // You can change the port if needed

// Endpoint to fetch playlist data by ID
app.get('/api/playlist/:id', async (req, res) => {
  const playlistId = req.params.id;

  try {
    // Fetching data from Deezer API
    const response = await fetch(`https://api.deezer.com/playlist/${playlistId}`);
    const data = await response.json();

    // Send the fetched data as a response
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Deezer:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
