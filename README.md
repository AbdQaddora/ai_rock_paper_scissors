# AI Rock Paper Scissors

This repository contains an AI-powered Rock Paper Scissors game built with React and a simple Neural Network. The AI opponent uses a neural network to predict the player's moves and make decisions accordingly. This project is a fun demonstration of how machine learning can be integrated into a simple game.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Neural Network Integration**: The AI uses a simple neural network to predict the player's next move based on their previous choices.
- **Dynamic Training**: The neural network is trained in real-time as the player makes choices.
- **Score Tracking**: The game keeps track of the player's and AI's scores.
- **Interactive UI**: A clean and intuitive user interface for playing the game.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **JavaScript (ES6+)**: Modern JavaScript for logic and functionality.
- **Neural Network**: A custom implementation of a simple neural network for AI decision-making.
- **HTML/CSS**: For structuring and styling the game.

## How It Works

The game uses a neural network with 3 input nodes, TRANING_DATA_SIZE hidden nodes, and 3 output nodes. The AI predicts the player's next move based on their last TRANING_DATA_SIZE choices. The neural network is trained in real-time using the player's historical choices.

### Neural Network Details

- **Input Layer**: TRANING_DATA_SIZE nodes representing Rock, Paper, and Scissors.
- **Hidden Layer**: TRANING_DATA_SIZE nodes for processing the input data.
- **Output Layer**: 3 nodes representing the AI's predicted move.

### Game Logic

1. The player makes a choice (Rock, Paper, or Scissors).
2. The AI predicts the player's move based on their last TRANING_DATA_SIZE choices.
3. The AI makes a counter-move to try to win.
4. The result of the round is calculated, and the scores are updated.
5. The player's choice is added to the history, and the neural network is retrained.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ai_rock_paper_scissors.git
   cd ai_rock_paper_scissors
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open the app**:
   Visit `http://localhost:3000` in your browser to play the game.

## Usage

- Click on the Rock, Paper, or Scissors buttons to make your choice.
- The AI will predict your move and make its choice.
- The result of the round will be displayed, and the scores will be updated.
- Use the "Play Again" button to continue playing or the "Reset Scores" button to start over.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request.