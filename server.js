const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Let the app use everything in the public folder (like your .json file)
app.use(express.static(path.join(__dirname, 'public')));

// When people visit the site, show them index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// For any other page, also show index.html (like a catch-all)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the app!
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
