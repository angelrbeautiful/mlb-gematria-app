let playerData = null; // Start as null

fetch('lite_cosmic_player_data.json')
  .then(response => response.json())
  .then(data => {
    console.log('✅ Player data loaded');
    playerData = data;
  })
  .catch(error => {
    console.error('❌ Error loading player data:', error);
  });

function decodePlayer() {
  const input = document.getElementById("playerInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");

  if (!playerData) {
    resultDiv.textContent = "⏳ Player data is still loading. Try again in a moment.";
    return;
  }

  if (!input) {
    resultDiv.textContent = "Please enter a player name.";
    return;
  }

  const player = playerData.players.find(p => p.name.toLowerCase() === input);

  if (player) {
    resultDiv.innerHTML = `
      <div class="card">
        <h2>${player.name}</h2>
        <p><strong>Sport:</strong> ${player.sport}</p>
        <p><strong>Jersey #:</strong> ${player.jersey}</p>
        <p><strong>Career Total:</strong> ${player.careerStat}</p>
        <p><strong>Season Total:</strong> ${player.seasonStat}</p>
        <p><strong>Birthdate:</strong> ${player.birthdate}</p>
      </div>
    `;
  } else {
    resultDiv.textContent = "Player not found.";
  }
}
