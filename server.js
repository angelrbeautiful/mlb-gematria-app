const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.static("public"));

app.get("/api/player", (req, res) => {
  const playerName = req.query.name?.toLowerCase().trim();
  if (!playerName) return res.status(400).json({ error: "No player name provided." });

  const filePath = path.join(__dirname, "data", "players.json");

  fs.readFile(filePath, "utf8", (err, rawData) => {
    if (err) return res.status(500).json({ error: "Data file error." });

    const allPlayers = JSON.parse(rawData);
    const player = allPlayers.find(p => p.name.toLowerCase() === playerName);

    if (!player) return res.status(404).json({ error: "Player not found." });

    // Simulated numerology match
    const today = new Date();
    const mmdd = `${today.getMonth() + 1}${today.getDate()}`;
    const match = [player.jersey, player.careerHR, player.seasonHR].includes(parseInt(mmdd)) ? "🔥" : "";

    res.json({
      name: player.name,
      jersey: player.jersey,
      birthdate: player.birthdate,
      careerHR: player.careerHR,
      seasonHR: player.seasonHR,
      hits: player.hits,
      rbis: player.rbis,
      tb: player.tb,
      match
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
