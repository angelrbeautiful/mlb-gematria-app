
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/player/:name', (req, res) => {
    const players = JSON.parse(fs.readFileSync('./players.json'));
    const player = players.find(p => p.name.toLowerCase() === req.params.name.toLowerCase());
    if (player) {
        res.json(player);
    } else {
        res.status(404).json({ error: 'Player not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
