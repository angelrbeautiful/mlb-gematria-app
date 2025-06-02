async function decodePlayer() {
  const playerName = document.getElementById("playerInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");

  try {
    const response = await fetch("players.json");
    const data = await response.json();

    const match = data.players.find(p => p.name.toLowerCase() === playerName);

    if (match) {
      resultDiv.innerHTML = `
        <div class="card">
          <h3>${match.name}</h3>
          <p>Jersey #: ${match.jersey}</p>
          <p>Career HRs: ${match.careerHR}</p>
          <p>Season HRs: ${match.seasonHR}</p>
          <p>Birthdate: ${match.birthdate}</p>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `<p>No match found for "${playerName}"</p>`;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p>Error loading player data.</p>`;
    console.error(err);
  }
}
