
// ==========================
// COSMIC LITE SCANNER ENGINE – PHASE 2
// ==========================
function runLiteScan() {
  const players = document.querySelectorAll('.player');

  players.forEach(player => {
    const jersey = parseInt(player.dataset.jersey);
    const careerHR = parseInt(player.dataset.careerHr);
    const seasonHR = parseInt(player.dataset.seasonHr);
    const recentHRs = parseInt(player.dataset.recentHrs || 0); // new: cold streak flag

    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const daysLeft = (isLeapYear(today.getFullYear()) ? 366 : 365) - dayOfYear;
    const lifePath = getLifePath(today);
    const altSum = reduceToOneDigit("" + (today.getMonth() + 1) + today.getDate());

    let tag = '';
    let reasons = [];

    // Trigger tags based on numerology alignment
    if (jersey === lifePath) reasons.push('Jersey = Life Path');
    if (careerHR === dayOfYear) reasons.push('Career HR = DOY');
    if (seasonHR === daysLeft) reasons.push('Season HR = DLIY');
    if (careerHR === altSum) reasons.push('Career HR = Alt Sum');

    // Determine tag strength
    if (reasons.length >= 2) {
      tag = '🔥🔥';
    } else if (reasons.length === 1) {
      tag = '🔥';
    }

    // Decoy flag for cold streaks
    let decoyTag = '';
    if (recentHRs === 0) {
      decoyTag = '🌑';
      reasons.push('Cold streak – 0 recent HRs');
    }

    if (tag || decoyTag) {
      player.innerHTML += ` <span title="${reasons.join(', ')}">${tag}${decoyTag}</span>`;
    }

    // Miss logic (for learning)
    if (tag && !player.classList.contains('hit')) {
      console.log(`❌ Missed HR – ${player.textContent.trim()}`);
    }

    // Shadow pattern (soft match log)
    if (!tag && recentHRs > 0) {
      console.log(`👻 Shadow HR pattern detected: ${player.textContent.trim()}`);
    }
  });
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getLifePath(date) {
  const digits = (date.getMonth() + 1).toString() +
                 date.getDate().toString() +
                 date.getFullYear().toString();
  return reduceToOneDigit(digits);
}

function reduceToOneDigit(str) {
  let sum = str.split('').reduce((acc, n) => acc + parseInt(n), 0);
  while (sum > 9) {
    sum = sum.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }
  return sum;
}

// Auto-run scan
document.addEventListener('DOMContentLoaded', runLiteScan);
