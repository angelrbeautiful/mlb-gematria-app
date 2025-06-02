function runSearch() {
  const name = document.getElementById("playerSearch").value.toLowerCase();
  const resultBox = document.getElementById("results");
  if (players[name]) {
    const p = players[name];
    resultBox.innerHTML = `
      <h2>${p.name}</h2>
      <p>Jersey: ${p.jersey}, Career HRs: ${p.careerHR}, Season HRs: ${p.seasonHR}</p>
      <p>Props: Hits ${p.hits}, RBIs ${p.rbis}, TB ${p.tb}, Runs ${p.runs}</p>
      <p>Numerology Match: ${p.numerology.join(", ")}</p>
      <p>Jewish Civil Match: ${p.jewishCivil}</p>
      <p>Jewish Religious Match: ${p.jewishReligious}</p>
    `;
  } else {
    resultBox.innerHTML = "<p>Player not found.</p>";
  }
}

const players = {
  "aaron judge": {
    name: "Aaron Judge",
    jersey: 99,
    careerHR: 270,
    seasonHR: 18,
    hits: 60,
    rbis: 55,
    tb: 120,
    runs: 50,
    numerology: ["99", "18", "270"],
    jewishCivil: "Matched to 10/25 (Tishrei)",
    jewishReligious: "Matched to 5/15 (Iyar)"
  }
  // Add more players here
};