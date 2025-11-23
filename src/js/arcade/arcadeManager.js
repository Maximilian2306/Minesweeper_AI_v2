import { PongGame } from './pong.js';
import { SnakeGame } from './snake.js';
import { InvadersGame } from './invaders.js';
import { openPopup, closePopup } from '../utils/handlePopups.js';

export class ArcadeManager {
    constructor() {
        this.arcadeView = document.getElementById('arcade-view');
        this.arcadeMenu = document.getElementById('arcade-menu');
        this.canvas = document.getElementById('pong-canvas');
        this.exitButton = document.getElementById('exit-arcade');
        this.currentGame = null;
        this.escHandler = null;

        this.bindEvents();
        this.setupCanvas();
    }

    setupCanvas() {
        this.canvas.width = 800;
        this.canvas.height = 500;
    }

    bindEvents() {
        document.querySelectorAll('#arcade-menu [data-game]').forEach(button => {
            button.addEventListener('click', () => this.startGame(button.dataset.game));
        });

        this.exitButton.addEventListener('click', () => this.exit());
    }

    show() {
        document.body.style.overflow = 'hidden';
        openPopup('arcade-view', 'flex', true);
        this.arcadeMenu.style.display = 'flex';
        this.canvas.style.display = 'none';
    }

    startGame(gameName) {
        this.arcadeMenu.style.display = 'none';
        this.canvas.style.display = 'block';

        switch(gameName) {
            case 'pong':
                this.currentGame = new PongGame(this.canvas);
                break;
            case 'snake':
                this.currentGame = new SnakeGame(this.canvas);
                break;
            case 'invaders':
                this.currentGame = new InvadersGame(this.canvas);
                break;
        }

        if (this.currentGame) {
            this.currentGame.start();
        }

        // ESC key listener to exit game
        this.escHandler = (e) => {
            if (e.key === 'Escape') {
                this.exitGame();
            }
        };
        document.addEventListener('keydown', this.escHandler);
    }

    exitGame() {
        if (this.currentGame) {
            this.currentGame.stop();
            this.currentGame = null;
        }
        if (this.escHandler) {
            document.removeEventListener('keydown', this.escHandler);
            this.escHandler = null;
        }
        this.canvas.style.display = 'none';
        this.arcadeMenu.style.display = 'flex';
    }

    exit() {
        if (this.currentGame) {
            this.currentGame.stop();
            this.currentGame = null;
        }
        if (this.escHandler) {
            document.removeEventListener('keydown', this.escHandler);
            this.escHandler = null;
        }
        closePopup('arcade-view');
        document.body.style.overflow = 'auto';
        this.canvas.style.display = 'none';
        this.arcadeMenu.style.display = 'flex';
    }
}