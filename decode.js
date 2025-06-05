function runPregameDecode() {
  const name = document.getElementById("playerName").value.trim();
  const resultDiv = document.getElementById("decodeResults");

  if (!name) {
    resultDiv.innerText = "Please enter a player name.";
    return;
  }

  const aligned = isGematriaAligned(name);
  resultDiv.innerText = aligned
    ? `🔥 ${name} is aligned with cosmic numerology!`
    : `⛔ ${name} has no match today.`;
}