import { MinesweeperGame } from './game.js';
import { BoardUI } from '../ui/boardUI.js';
import { bindHeaderControls } from '../ui/header.js';
import { updateStatsDisplay, bindStatsControls } from '../ui/statsUI.js';

import { bindKIButtons, stopAI } from '../ai/AIMenu.js';
import { startRandomAI } from '../ai/randomAI.js';
import { startRuleAI } from '../ai/ruleAI.js';
import { Leaderboard, bindLeaderboardButtons } from '../modals/leaderboard.js';
import { bindModals } from '../modals/modals.js';
import { loadLanguage } from '../utils/lang.js';
import { CrashSim } from '../utils/crashSim.js';
import { ArcadeManager } from '../arcade/arcadeManager.js';
import { refreshUI } from '../utils/refreshUI.js';
import { initPopupHandlers } from '../utils/handlePopups.js';
import { Heatmap } from '../ui/heatmap.js';

// Game state
let game;
let boardUI;
let heatmap;

document.addEventListener('DOMContentLoaded', () => {
  const boardElement = document.getElementById('game-board');
  const leaderboard = new Leaderboard();

  // Initialize game components
  game = new MinesweeperGame(10, 10);
  boardUI = new BoardUI(game, boardElement, leaderboard);
  heatmap = new Heatmap(game, boardElement);
  boardUI.setHeatmap(heatmap);

  game.init();
  boardUI.renderBoard();

  // Initialize UI
  updateStatsDisplay();
  bindStatsControls();
  bindLeaderboardButtons(leaderboard, game);

  // Load language
  const savedLang = localStorage.getItem('language') || 'de';
  loadLanguage(savedLang);

  // Set asset paths
  const basePath = import.meta.env.BASE_URL || '/';
  const mineIconImg = document.getElementById('mineIconImg');
  if (mineIconImg) {
    mineIconImg.src = `${basePath}assets/Pictures/Bomb1.jpeg`;
  }
  document.documentElement.style.setProperty('--bomb-image', `url('${basePath}assets/Pictures/Bomb1.jpeg')`);
  document.documentElement.style.setProperty('--flag-image', `url('${basePath}assets/Pictures/CellRevFlag_v2.png')`);

  // Arcade
  const arcade = new ArcadeManager();
  document.getElementById('arcade-btn').addEventListener('click', () => arcade.show());

  // Heatmap toggle
  const heatmapToggle = document.getElementById('heatmap-toggle');
  heatmapToggle.addEventListener('change', () => {
    heatmap.setEnabled(heatmapToggle.checked);
  });

  // Header controls
  bindHeaderControls({
    onRestart: () => {
      stopAI(game);
      game.resetGameState();
      game.init();
      boardUI.renderBoard();
      heatmapToggle.checked ? heatmap.update() : heatmap.clear();
      refreshUI();
    },
    onModeChange: ({ size, mines }) => {
      stopAI(game);
      game.resetGameState();
      const wasHeatmapEnabled = heatmapToggle.checked;
      game = new MinesweeperGame(size, mines);
      boardUI = new BoardUI(game, boardElement, leaderboard);
      heatmap = new Heatmap(game, boardElement);
      boardUI.setHeatmap(heatmap);
      if (wasHeatmapEnabled) heatmap.setEnabled(true);
      game.init();
      boardUI.renderBoard();
      refreshUI();
    }
  });

  // KI controls
  bindKIButtons({
    onStartRandom: () => startRandomAI(game, boardUI),
    onStartRule: () => startRuleAI(game, boardUI),
    onStop: () => stopAI(game)
  });

  // Modal controls
  bindModals({
    onSettingsOpen: () => {},
    onSettingsClose: () => {
      const langSelect = document.getElementById('language');
      loadLanguage(langSelect.value);
      localStorage.setItem('language', langSelect.value);
    },
    onAboutOpen: () => {},
    onAboutClose: () => {},
    onStartGame: () => {
      stopAI(game);
      game.resetGameState();
      game.init();
      boardUI.renderBoard();
      heatmapToggle.checked ? heatmap.update() : heatmap.clear();
    }
  });

  // Initialize utilities
  CrashSim.init();
  initPopupHandlers();
});
