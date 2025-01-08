import { useState } from "react";
import { NeuralNetwork } from "./network/NeuralNetwork";
import useLocalStorage from "./hooks/useLocalStorage";
const net = new NeuralNetwork(10, 10, 3); // 3 input nodes, 3 hidden nodes, 3 output nodes

const PLAYER_CHOICES = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
};
function App() {
  const [isGameStart, setIsGameStart] = useState(false);
  const [aiValueGuess, setAiValueGuess] = useState(null);
  const [showAiChoice, setShowAiChoice] = useState(false);

  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [playerChoices, setPlayerChoices] = useLocalStorage("ROOK_PAPER" , [
    PLAYER_CHOICES.ROCK,
    PLAYER_CHOICES.PAPER,
    PLAYER_CHOICES.SCISSORS,
    PLAYER_CHOICES.ROCK,
    PLAYER_CHOICES.PAPER,
    PLAYER_CHOICES.SCISSORS,
    PLAYER_CHOICES.ROCK,
    PLAYER_CHOICES.PAPER,
    PLAYER_CHOICES.SCISSORS,
    PLAYER_CHOICES.ROCK,
    PLAYER_CHOICES.PAPER,
    PLAYER_CHOICES.SCISSORS,
  ]);

  const getOutputShape = (choice = Math.floor(Math.random() * 3)) => {
    console.log({
      choice,
      isRock: choice === PLAYER_CHOICES.ROCK,
      isPaper: choice === PLAYER_CHOICES.PAPER,
      isScissors: choice === PLAYER_CHOICES.SCISSORS,
    });
    if (choice === PLAYER_CHOICES.ROCK) return [1, 0, 0];
    if (choice === PLAYER_CHOICES.PAPER) return [0, 1, 0];
    if (choice === PLAYER_CHOICES.SCISSORS) return [0, 0, 1];
  };

  const calcScore = (player, ai) => {
    if (player === ai) return { player: score.player, ai: score.ai };
    if (
      (player === PLAYER_CHOICES.ROCK && ai === PLAYER_CHOICES.SCISSORS) ||
      (player === PLAYER_CHOICES.PAPER && ai === PLAYER_CHOICES.ROCK) ||
      (player === PLAYER_CHOICES.SCISSORS && ai === PLAYER_CHOICES.PAPER)
    ) {
      return { player: score.player + 1, ai: score.ai };
    }
    return { player: score.player, ai: score.ai + 1 };
  };

  const playerChoice = (choice) => {
    let trainData = [];
    for (let i = 0; i < playerChoices.length - 10; i++) {
      trainData.push({
        input: [...playerChoices.slice(i, i + 10)],
        output: [...getOutputShape(playerChoices[i + 11])],
      });
    }
    trainData = trainData.map((data) => ({
      ...data,
      input: new Array(trainData[trainData?.length - 1]?.input.length)
        .fill(0)
        .map((_, i) => data.input[i] || 0),
    }));

    trainData.forEach((data) => {
      net.train(data.input, data.output);
    });

    console.log({ playerChoices });
    const prediction = net.predict(
      playerChoices.slice(playerChoices.length - 10, playerChoices.length)
    );

    const aiPlay =
      prediction.indexOf(Math.max(...prediction)) === PLAYER_CHOICES.ROCK
        ? PLAYER_CHOICES.PAPER
        : prediction.indexOf(Math.max(...prediction)) === PLAYER_CHOICES.PAPER
        ? PLAYER_CHOICES.SCISSORS
        : PLAYER_CHOICES.ROCK;

    setScore(calcScore(choice, aiPlay));
    setAiValueGuess(aiPlay);
    setShowAiChoice(true);
    setIsGameStart(false);
    setPlayerChoices((prev) => [...prev, choice]);
  };

  const playAgain = () => {
    setIsGameStart(true);
  };

  const resetScores = () => {
    setScore({ player: 0, ai: 0 });
  };

  return (
    <div>
      <h1>Rock Paper Scissors Game</h1>
      <h2>Challenge the AI and see who wins!</h2>
      <div className="scoreboard">
        Player: <span id="player-score">{score.player}</span> | AI:{" "}
        <span id="ai-score">{score.ai}</span>
      </div>
      {!isGameStart && showAiChoice && (
        <center className="results" id="result">
          {aiValueGuess === PLAYER_CHOICES.ROCK && (
            <div className="choice-button">🪨</div>
          )}
          {aiValueGuess === PLAYER_CHOICES.PAPER && (
            <div className="choice-button">📄</div>
          )}
          {aiValueGuess === PLAYER_CHOICES.SCISSORS && (
            <div className="choice-button">✂️</div>
          )}
        </center>
      )}

      {!isGameStart && (
        <div className="results" id="result">
          Let's Play!
        </div>
      )}

      {!isGameStart && (
        <center className="results" id="result">
          {playerChoices[playerChoices.length - 1] === PLAYER_CHOICES.ROCK && (
            <div className="choice-button">🪨</div>
          )}
          {playerChoices[playerChoices.length - 1] === PLAYER_CHOICES.PAPER && (
            <div className="choice-button">📄</div>
          )}
          {playerChoices[playerChoices.length - 1] ===
            PLAYER_CHOICES.SCISSORS && <div className="choice-button">✂️</div>}
        </center>
      )}

      {isGameStart && (
        <div className="choices">
          <div
            className="choice-button"
            onClick={() => {
              playerChoice(PLAYER_CHOICES.ROCK);
            }}
          >
            🪨
          </div>
          <div
            className="choice-button"
            onClick={() => {
              playerChoice(PLAYER_CHOICES.PAPER);
            }}
          >
            📄
          </div>
          <div
            className="choice-button"
            onClick={() => {
              playerChoice(PLAYER_CHOICES.SCISSORS);
            }}
          >
            ✂️
          </div>
        </div>
      )}
      <div className="actions">
        {!isGameStart && (
          <button
            className="action-button"
            disabled={isGameStart}
            onClick={playAgain}
          >
            Play Again
          </button>
        )}
        <button className="action-button" onClick={resetScores}>
          Reset Scores
        </button>
      </div>
    </div>
  );
}

export default App;
