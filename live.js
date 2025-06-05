// live.js — ESPN Feed + Cosmic Logic
setInterval(() => {
  fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard')
    .then(res => res.json())
    .then(data => {
      document.getElementById('game-info').innerText = 'Live game data pulled!';
    });
}, 15000);