import { MinesweeperGame } from './game.js';
import { BoardUI } from '../ui/boardUI.js';
import { bindHeaderControls } from '../ui/header.js';

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


// Iitialize game and board UI
let game;
let boardUI;

document.addEventListener('DOMContentLoaded', () => {
  const boardElement = document.getElementById('game-board');
  const leaderboard = new Leaderboard();

  game = new MinesweeperGame(10, 10);
  boardUI = new BoardUI(game, boardElement, leaderboard);

  game.init();
  boardUI.renderBoard();

  bindLeaderboardButtons(leaderboard, game);

  const savedLang = localStorage.getItem('language') || 'de';
  loadLanguage(savedLang);

  // Set initial mine icon with correct base path
  const basePath = import.meta.env.BASE_URL || '/';
  const mineIconImg = document.getElementById('mineIconImg');
  if (mineIconImg) {
    mineIconImg.src = `${basePath}assets/Pictures/Bomb1.jpeg`;
  }

  // Set CSS custom properties for dynamic asset paths
  document.documentElement.style.setProperty('--bomb-image', `url('${basePath}assets/Pictures/Bomb1.jpeg')`);
  document.documentElement.style.setProperty('--flag-image', `url('${basePath}assets/Pictures/CellRevFlag_v2.png')`);

  boardUI.renderBoard();

  // Arcade Setup
  const arcade = new ArcadeManager();
  document.getElementById('arcade-btn').addEventListener('click', () => arcade.show());
  //

  bindHeaderControls({
    onRestart: () => {
      stopAI(game);
      game.resetGameState();
      game.init();
      boardUI.renderBoard();
      refreshUI();
    },
    onModeChange: ({ size, mines }) => {
      stopAI(game);
      game.resetGameState();
      game = new MinesweeperGame(size, mines);
      boardUI = new BoardUI(game, boardElement, leaderboard);
      game.init();
      boardUI.renderBoard();
      refreshUI();
    }
  });

  bindKIButtons({
    onStartRandom: () => startRandomAI(game, boardUI),
    onStartRule: () => startRuleAI(game, boardUI),
    onStop: () => stopAI(game)
  });

  bindModals({
    onSettingsOpen: () => console.log("Settings geöffnet"),
    onSettingsClose: () => {
      const langSelect = document.getElementById('language');
      const selectedLang = langSelect.value;
      loadLanguage(selectedLang);
      localStorage.setItem('language', selectedLang);
    },
    onAboutOpen: () => console.log("About geöffnet"),
    onAboutClose: () => console.log("About geschlossen"),
    onStartGame: () => {
      stopAI(game);
      game.resetGameState();
      game.init();
      boardUI.renderBoard();
    }
  });

  // Start the crash simulation
  CrashSim.init();

  // Initialize popup click-outside-to-close handlers
  initPopupHandlers();

});

