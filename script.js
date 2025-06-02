// Utility: Fetch Hebrew date numerology via Hebcal API
async function fetchHebrewDateNumerology(date) {
  const url = `https://www.hebcal.com/converter?cfg=json&gy=${date.getFullYear()}&gm=${date.getMonth()+1}&gd=${date.getDate()}&g2h=1`;
  const res = await fetch(url);
  const data = await res.json();
  const hDay = parseInt(data.hd);
  const hMonth = data.hm;
  const hYear = parseInt(data.hy);
  const hYearDigits = hYear.toString().split('').map(Number);
  const hYearSum = hYearDigits.reduce((a,b) => a + b, 0);
  return {
    hDay,
    hMonth,
    hYear,
    hYearSum,
    // Basic sums
    sumTotal: hMonth + hDay + hYear,
    sumDigits: hMonth + hDay + hYearSum,
    sumMD: hMonth + hDay,
    sumDY: hDay + hYearSum
  };
}

// Compute Gregorian date numerology
function computeGregorianNumerology(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const sum1 = month + day + parseInt(year.toString().slice(2));
  const yearDigits = year.toString().split('').map(Number);
  const sum2 = month + day + yearDigits.reduce((a,b) => a + b, 0);
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  const daysLeft = (date.getFullYear() % 4 === 0 ? 366 : 365) - dayOfYear;
  const prod1 = month * day * yearDigits.reduce((a,b) => a * b, 1);
  const prod2 = month * day * yearDigits[2] * yearDigits[3];
  return { sum1, sum2, dayOfYear, daysLeft, prod1, prod2 };
}

// Detect holidays (simplified examples)
function detectHolidays(date, hebDate) {
  const holidays = [];
  // Simple: check fixed holidays
  if (date.getMonth() === 6 && date.getDate() === 4) holidays.push("Independence Day");
  // Add more Gregorian holidays as needed...
  // Jewish holidays by month/day
  if (hebDate.hMonth === "Sivan" && hebDate.hDay === 6) holidays.push("Shavuot");
  // Return array of holidays
  return holidays;
}

// Format date numerology display
async function displayDateNumerology() {
  const now = new Date();
  const gNum = computeGregorianNumerology(now);
  const hNum = await fetchHebrewDateNumerology(now);
  const holidays = detectHolidays(now, hNum);
  const container = document.getElementById('dateNumerology');
  container.innerHTML = `
    <div>📅 Gregorian: Sum1 ${gNum.sum1}, Sum2 ${gNum.sum2}, DayOfYear ${gNum.dayOfYear}, DaysLeft ${gNum.daysLeft}, Prod1 ${gNum.prod1}, Prod2 ${gNum.prod2}</div>
    <div>✡️ Hebrew: Day ${hNum.hDay}, Month ${hNum.hMonth}, Year ${hNum.hYear}, SumTotal ${hNum.sumTotal}, SumDigits ${hNum.sumDigits}, MD ${hNum.sumMD}, DY ${hNum.sumDY}</div>
    <div>🔯 Holidays: ${holidays.join(', ') || 'None'}</div>
  `;
}

// Search players from last scan
let playersCache = [];

// Search bar functionality
function searchPlayer() {
  const input = document.getElementById('playerSearch').value.toLowerCase();
  const results = playersCache.filter(p => p.name.toLowerCase().includes(input));
  const list = document.getElementById('searchResults');
  list.innerHTML = '';
  results.forEach(p => {
    const div = document.createElement('div');
    div.className = 'player-card';
    div.innerHTML = `<strong>${p.name}</strong> (#${p.jersey}) - Career HR: ${p.careerHR}, Season HR: ${p.seasonHR}`;
    list.appendChild(div);
  });
}

// Match numerology to props
function getPropMatches(player, gNum, hNum) {
  const matches = [];
  const props = {
    careerHR: parseInt(player.careerHR),
    seasonHR: parseInt(player.seasonHR),
    hits: parseInt(player.hits),
    runs: parseInt(player.runs),
    rbis: parseInt(player.rbis),
    totalBases: parseInt(player.totalBases)
  };
  const nums = [gNum.sum1, gNum.sum2, gNum.dayOfYear, gNum.daysLeft, gNum.prod1, gNum.prod2,
    hNum.sumTotal, hNum.sumDigits, hNum.sumMD, hNum.sumDY];
  for (const [key, val] of Object.entries(props)) {
    if (nums.includes(val)) matches.push({ prop: key, value: val });
  }
  return matches;
}

// Build player card HTML
function buildPlayerCard(player, gNum, hNum, holidays) {
  const matches = getPropMatches(player, gNum, hNum);
  const matchTags = matches.map(m => `<span class="match-tag">🟩 ${m.prop}=${m.value}</span>`).join('');
  const holidayTags = holidays.length ? `<div class="match-tag">🔯 Holiday: ${holidays.join(', ')}</div>` : '';
  return `
    <div class="player-card">
      <div><strong>${player.name}</strong> (#${player.jersey})</div>
      <div>Career HR: ${player.careerHR}, Season HR: ${player.seasonHR}</div>
      <div>Hits: ${player.hits}, Runs: ${player.runs}, RBIs: ${player.rbis}, TB: ${player.totalBases}</div>
      ${matchTags}
      ${holidayTags}
    </div>
  `;
}

// Main Lite Scan
async function runLiteScan() {
  await displayDateNumerology();
  const output = document.getElementById('output');
  output.innerHTML = '<p>Loading players...</p>';
  try {
    const res = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');
    const data = await res.json();
    const events = data.events || [];
    if (!events.length) return output.innerHTML = '<p>No games live right now.</p>';
    const gameId = events[0].id;
    const gameData = await fetch(`https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?event=${gameId}`).then(r => r.json());
    const players = [];
    gameData.boxscore.teams.forEach(team => {
      team.statistics.forEach(stat => {
        if (stat.name === "Batting") {
          stat.athletes.forEach(p => {
            players.push({
              name: p.athlete.displayName,
              jersey: p.athlete.jersey,
              careerHR: p.stats[3],
              seasonHR: p.stats[2],
              hits: p.stats[7],
              runs: p.stats[8],
              rbis: p.stats[9],
              totalBases: p.stats[12]
            });
          });
        }
      });
    });
    playersCache = players;
    // Compute date numerology
    const now = new Date();
    const gNum = computeGregorianNumerology(now);
    const hNum = await fetchHebrewDateNumerology(now);
    const holidays = detectHolidays(now, hNum);
    // Build output
    const cards = players.map(p => buildPlayerCard(p, gNum, hNum, holidays)).join('');
    output.innerHTML = cards;
  } catch (e) {
    output.innerHTML = '<p>Error loading players.</p>';
  }
}

// Health check
async function runHealthCheck() {
  const now = new Date();
  let message = '✅ All systems OK (Lite Mode)';
  try {
    // Test ESPN API
    const res = await fetch('https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard');
    if (!res.ok) throw new Error('Scoreboard fetch failed');
    // Test date numerology
    computeGregorianNumerology(now);
    await fetchHebrewDateNumerology(now);
  } catch (err) {
    message = '❌ ' + err.message;
  }
  alert(message);
}

// Initialize date section on load
window.onload = () => { displayDateNumerology(); };
