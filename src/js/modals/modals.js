import { openPopup, closePopup } from '../utils/handlePopups.js';

export function bindModals({onSettingsOpen, onSettingsClose, onAboutOpen, onAboutClose, onStartGame}) {
  const settingsBtn = document.getElementById('settings-btn');
  const saveSettingsBtn = document.getElementById('save-settings-btn');

  const aboutBtn = document.getElementById('about-btn');
  const closeAboutBtn = document.getElementById('close-about-btn');

  const msgBoxLoseBtn = document.getElementById('game-over-btn');
  const msgBoxWinBtn = document.getElementById('game-win-btn');

  const msgBoxLoseLBBtn = document.getElementById('game-over-leaderboard-btn');
  const msgBoxWinLBBtn = document.getElementById('game-win-leaderboard-btn');

  const timerDisplay = document.getElementById('timer');

  // Bind event listeners for modals
  settingsBtn.addEventListener('click', () => {
    onSettingsOpen?.();
    openPopup('settings-popup', 'flex', true);
  });

  saveSettingsBtn.addEventListener('click', () => {
    onSettingsClose?.();
    closePopup('settings-popup');
  });

  aboutBtn.addEventListener('click', () => {
    onAboutOpen?.();
    openPopup('about-popup', 'flex', true);
  });

  closeAboutBtn.addEventListener('click', () => {
    onAboutClose?.();
    closePopup('about-popup');
  });

  msgBoxLoseBtn.addEventListener('click', () => {
    onStartGame?.();
    closePopup('game-over');
  });

  msgBoxWinBtn.addEventListener('click', () => {
    onStartGame?.();
    closePopup('game-win');
    timerDisplay.textContent = '00:00';
  });

  msgBoxLoseLBBtn.addEventListener('click', () => {
    closePopup('game-over');
    openPopup('leaderboard-popup', 'flex', true);
  });

  msgBoxWinLBBtn.addEventListener('click', () => {
    closePopup('game-win');
    openPopup('leaderboard-popup', 'flex', true);
  });
}
