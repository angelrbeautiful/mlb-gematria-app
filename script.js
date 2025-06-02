async function loadGames() {
  const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');
  const data = await response.json();
  const events = data.events || [];
  const gameList = document.getElementById('gameList');
  gameList.innerHTML = '';

  events.forEach((event, index) => {
    const button = document.createElement('button');
    button.textContent = event.name;
    button.onclick = () => selectGame(index, event);
    gameList.appendChild(button);
  });
}

function selectGame(index, event) {
  alert(`You selected: ${event.name}`);
  // Later we will add gematria scanning here
}

window.onload = loadGames;
