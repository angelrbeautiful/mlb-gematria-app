
async function runLiteScan() {
  document.getElementById('games').innerHTML = "🔮 Scanning...";
  // Simulate scan delay
  setTimeout(() => {
    document.getElementById('games').innerHTML = "✅ Gematria Lite Scan Complete";
  }, 2000);
}
