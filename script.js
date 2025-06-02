document.getElementById('start-scan').addEventListener('click', async () => {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '🔄 Scanning for live MLB games...';

  try {
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');
    const data = await response.json();
    const games = data.events;

    if (games.length === 0) {
      resultsDiv.innerHTML = '😞 No games found.';
      return;
    }

    const gameList = games.map((game) => {
      const home = game.competitions[0].competitors.find(t => t.homeAway === 'home').team.displayName;
      const away = game.competitions[0].competitors.find(t => t.homeAway === 'away').team.displayName;
      const time = new Date(game.date).toLocaleTimeString();
      return `🧿 ${away} at ${home} - ${time}`;
    }).join('<br><br>');

    resultsDiv.innerHTML = `<strong>🔮 Detected Games:</strong><br><br>${gameList}`;
  } catch (error) {
    console.error('Error fetching games:', error);
    resultsDiv.innerHTML = '⚠️ Failed to fetch games.';
  }
});
