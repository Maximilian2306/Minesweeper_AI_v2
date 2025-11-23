import { openPopup } from '../utils/handlePopups.js';
import { gameStats } from '../utils/statistics.js';
import { formatTime } from '../utils/helpers.js';

export class BoardUI {
  constructor(game, element, leaderboard) {
    this.game = game;
    this.element = element;
    this.leaderboard = leaderboard;
    this.heatmap = null;
    this.gameStartedAsAI = false; 
  }

  setHeatmap(heatmap) {
    this.heatmap = heatmap;
  }

  updateStatsDisplay() {
    const stats = gameStats.getStats();
    document.getElementById('stat-games-played').textContent = stats.human.gamesPlayed;
    document.getElementById('stat-win-rate').textContent = gameStats.getWinRate('human') + '%';
    const avgTime = gameStats.getAverageTime('human');
    document.getElementById('stat-avg-time').textContent = avgTime > 0 ? formatTime(avgTime) : '--';
    const bestTime = stats.human.bestTime;
    document.getElementById('stat-best-time').textContent = bestTime !== null ? formatTime(bestTime) : '--';
  }

  renderBoard() {
    this.element.innerHTML = '';

    this.element.style.gridTemplateColumns = `repeat(${this.game.boardSize}, 30px)`;
    this.element.style.gridTemplateRows = `repeat(${this.game.boardSize}, 30px)`;

    for (let y = 0; y < this.game.boardSize; y++) {
      for (let x = 0; x < this.game.boardSize; x++) {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.dataset.x = x;
        div.dataset.y = y;

        div.addEventListener('click', () => this.onLeftClick(x, y));
        div.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          this.onRightClick(x, y);
        });

        this.element.appendChild(div);
      }
    }
  }

  onLeftClick(x, y) {
    if (!this.game.startTime) {
      this.game.startTimer();
      this.gameStartedAsAI = this.game.kiRunning;
      gameStats.recordGameStart(this.gameStartedAsAI, this.game.boardSize, this.game.mineCount);
    }

    const result = this.game.revealCell(x, y);
    result.changed.forEach(({x: cellX, y: cellY}) => this.updateCell(cellX, cellY));

    // Update heatmap after each move
    if (this.heatmap) {
      this.heatmap.update();
    }

    if (result.result === 'ki') {
      this.revealAllMinesUI();
      this.updateBoard();
    }

    if (result.result === 'lose') {
      this.revealAllMinesUI();
      gameStats.recordGameEnd(this.gameStartedAsAI, false, 0, this.game.boardSize, this.game.mineCount);
      this.updateStatsDisplay();
      if (this.heatmap) this.heatmap.clear();
      openPopup('game-over', 'flex', true);
    }

    if (result.result === 'win') {
      this.revealAllMinesUI();
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - this.game.startTime) / 1000);

      gameStats.recordGameEnd(this.gameStartedAsAI, true, elapsedSeconds, this.game.boardSize, this.game.mineCount);
      this.updateStatsDisplay();
      if (this.heatmap) this.heatmap.clear();

      openPopup('game-win', 'flex', true);

      try {
        this.leaderboard.saveWinToLeaderboard(elapsedSeconds);
      } catch (err) {
        console.error("Failed to save in leaderboard:", err);
      }
    }
  }

  onRightClick(x, y) {
    if (!this.game.startTime) {
      this.game.startTimer();
      this.gameStartedAsAI = this.game.kiRunning;
      gameStats.recordGameStart(this.gameStartedAsAI, this.game.boardSize, this.game.mineCount);
    }

    this.game.toggleFlag(x, y);
    this.updateCell(x, y);

    // Update heatmap after flagging
    if (this.heatmap) {
      this.heatmap.update();
    }
  }

  updateBoard() {
    for (let y = 0; y < this.game.boardSize; y++) {
      for (let x = 0; x < this.game.boardSize; x++) {
        this.updateCell(x, y);
      }
    }
  }

  updateCell(x, y) {
    const cell = this.game.getCell(x, y);
    const index = y * this.game.boardSize + x;
    const div = this.element.children[index];

    div.classList.toggle('revealed', cell.revealed);
    div.classList.toggle('mine', cell.revealed && cell.mine);
    div.classList.toggle('flagged', cell.flagged && !cell.revealed);

    if (cell.revealed && cell.number > 0 && !cell.mine) {
      div.dataset.number = cell.number;
    } else {
      delete div.dataset.number;
    }

    div.textContent = '';

    if (cell.revealed && cell.number > 0 && !cell.mine) {
      div.textContent = cell.number;
    }
  }

  revealAllMinesUI() {
    for (let y = 0; y < this.game.boardSize; y++) {
      for (let x = 0; x < this.game.boardSize; x++) {
        const cell = this.game.getCell(x, y);
        if (cell.mine) {
          cell.revealed = true;
          this.updateCell(x, y);
        }
      }
    }
  }
}

