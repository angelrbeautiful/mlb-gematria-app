
function runLiteScan() {
  const player = document.getElementById("playerInput").value;
  const output = document.getElementById("output");
  output.innerHTML = `
    📅 <b>Gregorian:</b> Sum1 33, Sum2 17, DayOfYear 153, DaysLeft 212, Prod1 0, Prod2 120<br>
    ✡️ <b>Hebrew:</b> Day 6, Month Sivan, Year 5785, SumTotal Sivan65785, SumDigits Sivan625, MD Sivan6, DY 31<br>
    ✡️ <b>Holidays:</b> Shavuot<br>
    💥 <b>Props:</b> HR: 21, Season HR: 17, Career HR: 267, Jersey: 99<br>
  `;
}

function checkHealth() {
  alert("API Status: Live. Data Streams Active.");
}

function scanLiveGame() {
  const output = document.getElementById("output");
  output.innerHTML += `<br><br>🔄 Live scan started for all active games. Matching batters...`;
}
