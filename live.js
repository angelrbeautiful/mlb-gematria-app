setInterval(() => {
  fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard')
    .then(res => res.json())
    .then(data => {
      const gameData = data.events?.[0]?.competitions?.[0];
      if (!gameData) return;
      const home = gameData.competitors.find(t => t.homeAway === 'home');
      const away = gameData.competitors.find(t => t.homeAway === 'away');
      const status = gameData.status.type.shortDetail;
      const info = `
        <strong>${away.team.displayName}</strong> vs <strong>${home.team.displayName}</strong><br/>
        Status: ${status}<br/>
        Score: ${away.score} - ${home.score}
      `;
      document.getElementById("game-info").innerHTML = info;
    });
}, 15000);