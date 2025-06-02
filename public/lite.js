async function decodePlayer() {
  const playerName = document.getElementById("playerInput").value.trim().toLowerCase();
  const resultDiv = document.getElementById("result");

  try {
    const response = await fetch("players.json");
    const data = await response.json();

    let match = null;
    let league = "";

    for (const [key, players] of Object.entries(data)) {
      match = players.find(p => p.name.toLowerCase() === playerName);
      if (match) {
        league = key;
        break;
      }
    }

    if (!match) {
      resultDiv.innerHTML = `<p>No match found for "${playerName}"</p>`;
      return;
    }

    // Build result based on league
    let details = `
      <div class="card">
        <h3>${match.name} (${league})</h3>
        <p>Team: ${match.team}</p>
        <p>Jersey #: ${match.jersey}</p>
        <p>Birthdate: ${match.birthdate}</p>
    `;

    if (league === "MLB") {
      details += `
        <p>Career HRs: ${match.careerHR}</p>
        <p>Season HRs: ${match.seasonHR}</p>
      `;
    } else if (league === "NBA") {
      if (match.careerPoints) {
        details += `<p>Career Points: ${match.careerPoints}</p><p>Season Points: ${match.seasonPoints}</p>`;
      } else if (match.career3P) {
        details += `<p>Career 3P Made: ${match.career3P}</p><p>Season 3P: ${match.season3P}</p>`;
      }
    } else if (league === "NFL") {
      if (match.careerTD) {
        details += `<p>Career TDs: ${match.careerTD}</p><p>Season TDs: ${match.seasonTD}</p>`;
      } else if (match.careerRecYds) {
        details += `<p>Career Rec Yards: ${match.careerRecYds}</p><p>Season Rec Yards: ${match.seasonRecYds}</p>`;
      }
    } else if (league === "NHL") {
      details += `<p>Career Goals: ${match.careerGoals}</p><p>Season Goals: ${match.seasonGoals}</p>`;
    }

    details += `</div>`;
    resultDiv.innerHTML = details;

  } catch (err) {
    resultDiv.innerHTML = `<p>Error loading player data.</p>`;
    console.error(err);
  }
}
