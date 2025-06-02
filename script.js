document.getElementById("start-scan").addEventListener("click", () => {
  const results = document.getElementById("results");
  results.innerHTML = "<p>Scanning for cosmic alignment...🔮</p>";
  // Fake delay for fun effect
  setTimeout(() => {
    results.innerHTML += "<p>⚾ Home Run Energy Detected! 🌟</p>";
  }, 2000);
});
