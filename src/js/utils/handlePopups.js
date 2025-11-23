// Track currently open popup for outside click handling
let currentOpenPopup = null;

export function closePopup(id) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.style.display = 'none';
        document.body.classList.remove('popup-open');
        if (currentOpenPopup === id) {
            currentOpenPopup = null;
        }
        // Reset overflow when closing arcade-view
        if (id === 'arcade-view') {
            document.body.style.overflow = 'auto';
        }
    }
}

export function closeAllPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.style.display = 'none';
    });
    document.body.classList.remove('popup-open');
    currentOpenPopup = null;
}

export function openPopup(id, displayType, bodyClass) {
  const popup = document.getElementById(id);
  if (popup) {
    popup.style.display = displayType || 'block';
    if (bodyClass) {
      document.body.classList.add('popup-open');
    }
    currentOpenPopup = id;
  }
}

// Initialize click-outside-to-close functionality
export function initPopupHandlers() {
  document.addEventListener('click', (e) => {
    // Check if clicked element is a popup overlay (not the content)
    if (e.target.classList.contains('popup') && currentOpenPopup) {
      if (currentOpenPopup === 'arcade-view') {
        const canvas = document.getElementById('pong-canvas');
        if (canvas && canvas.style.display !== 'none') {
          return;
        }
      }
      closePopup(currentOpenPopup);
    }
  });
}

export function getCurrentPopup() {
  return currentOpenPopup;
}