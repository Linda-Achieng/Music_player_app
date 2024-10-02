// src/main.jsx

import React from 'react'; // Make sure to import React
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import your global CSS file

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
