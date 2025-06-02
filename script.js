
document.getElementById("scanButton").addEventListener("click", () => {
  document.getElementById("status").textContent = "Scanning for cosmic alignment...🔮";

  // Simulated delay and result
  setTimeout(() => {
    const detected = Math.random() > 0.5;
    document.getElementById("status").textContent = detected
      ? "⚾ Home Run Energy Detected! 🌟"
      : "No cosmic alignment detected.";
    document.getElementById("results").innerHTML = detected
      ? "<p>🔥 Player Match: Jersey #27 — Career HR: 137 — Season HR: 9</p>"
      : "";
  }, 2000);
});
