const gamesDiv = document.getElementById("games");
const startScanBtn = document.getElementById("start-scan");
const resultsDiv = document.getElementById("results");

let selectedGame = null;

// Load MLB games from ESPN API
async function loadGames() {
  try {
    const response = await fetch("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard");
    const data = await response.json();
    const events = data.events || [];

    gamesDiv.innerHTML = "";
    events.forEach(event => {
      const gameBtn = document.createElement("button");
      gameBtn.textContent = event.name;
      gameBtn.className = "game-button";
      gameBtn.onclick = () => {
        selectedGame = event;
        highlightSelectedGame(gameBtn);
        resultsDiv.innerHTML = `<p>🔭 Ready to scan <strong>${event.name}</strong>!</p>`;
      };
      gamesDiv.appendChild(gameBtn);
    });
  } catch (error) {
    console.error("Failed to load games:", error);
    gamesDiv.innerHTML = "<p>⚠️ Couldn't load games. Try again later.</p>";
  }
}

// Highlight the selected game button
function highlightSelectedGame(button) {
  const buttons = document.querySelectorAll(".game-button");
  buttons.forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");
}

// Handle scan button click
startScanBtn.onclick = async () => {
  if (!selectedGame) {
    resultsDiv.innerHTML = "<p>⚠️ Please select a game first.</p>";
    return;
  }

  const gameId = selectedGame.id;
  const summaryUrl = `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?event=${gameId}`;

  try {
    const res = await fetch(summaryUrl);
    const summary = await res.json();
    const status = summary.header?.competitions?.[0]?.status?.type?.name || "UNKNOWN";

    if (status !== "STATUS_IN_PROGRESS") {
      resultsDiv.innerHTML = `<p>⏳ <strong>${selectedGame.name}</strong> is not live yet.<br>Come back at game time!</p>`;
      return;
    }

    resultsDiv.innerHTML = `<p>🔍 Scanning <strong>${selectedGame.name}</strong>... game is live!</p>`;
    // 👇 Future scanning logic will go here
  } catch (error) {
    resultsDiv.innerHTML = `<p>⚠️ Error fetching game status. Try again later.</p>`;
    console.error("Error during scan:", error);
  }
};
