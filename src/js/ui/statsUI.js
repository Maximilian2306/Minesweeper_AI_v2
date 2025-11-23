import { gameStats } from '../utils/statistics.js';
import { formatTime } from '../utils/helpers.js';

export function updateStatsDisplay() {
  const stats = gameStats.getStats();

  document.getElementById('stat-games-played').textContent = stats.human.gamesPlayed;
  document.getElementById('stat-win-rate').textContent = gameStats.getWinRate('human') + '%';

  const avgTime = gameStats.getAverageTime('human');
  document.getElementById('stat-avg-time').textContent = avgTime > 0 ? formatTime(avgTime) : '--';

  const bestTime = stats.human.bestTime;
  document.getElementById('stat-best-time').textContent = bestTime !== null ? formatTime(bestTime) : '--';
}

export function bindStatsControls() {
  const resetStatsBtn = document.getElementById('reset-stats-btn');
  resetStatsBtn.addEventListener('click', () => {
    if (confirm('Statistiken zurücksetzen?')) {
      gameStats.resetStats();
      updateStatsDisplay();
    }
  });
}
