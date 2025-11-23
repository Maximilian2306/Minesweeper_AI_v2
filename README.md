# Minesweeper AI

A modern Minesweeper implementation with intelligent AI opponents and arcade mini-games.

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.0-646CFF?style=flat&logo=vite&logoColor=white)
![Last Commit](https://img.shields.io/github/last-commit/Maximilian2306/Minesweeper_AI_v2?style=flat&logo=git&logoColor=white&color=0080ff)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [AI Modes](#ai-modes)
- [Installation](#installation)
- [Game Modes](#game-modes)
- [Hotkeys](#hotkeys)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **Multiple Difficulty Levels** - Beginner, Intermediate, Advanced, Expert, and Custom
- **Two AI Opponents** - Rule-based AI with pattern recognition and Random AI
- **Heatmap Visualization** - Visual mine probability overlay with color gradient
- **Statistics Tracking** - Win rates, best times, and per-difficulty stats
- **Leaderboard System** - Top 10 fastest times with persistent storage
- **Arcade Mini-Games** - Pong, Snake, and Space Invaders
- **Multi-Language** - German and English
- **Responsive Design** - Optimized for all screen sizes
- **Accessibility** - ARIA labels and keyboard navigation

## Tech Stack

- **JavaScript (ES6+)** - Modular architecture
- **Vite** - Build tool and dev server
- **CSS3** - Grid, Flexbox, Custom Properties
- **ESLint & Prettier** - Code quality
- **gh-pages** - Deployment

## AI Modes

### Rule-Based AI
Intelligent AI that applies pattern recognition rules to deduce safe cells. Uses advanced pattern detection (1-1, 1-2-1 patterns) and calculates safe guesses based on neighboring information.

### Random AI
Baseline AI that makes random moves on unrevealed cells. Useful for performance comparison against the rule-based AI.

Both AIs support adjustable speed control (0.00s - 100s per move).

## Installation

### Play Online

Visit the [Live Demo](https://Maximilian2306.github.io/Minesweeper_AI_v2/)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/Maximilian2306/Minesweeper_AI_v2
cd Minesweeper_AI_v2

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Game Modes

| Mode | Board Size | Mines |
|------|------------|-------|
| Beginner | 4×4 | 1 |
| Intermediate | 10×10 | 10 |
| Advanced | 14×14 | 30 |
| Expert | 18×18 | 50 |
| Custom | 4-100 | 1-1000 |

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).
