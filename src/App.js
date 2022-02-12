import "./App.css";
import { useState, useEffect } from "react";
import Square from "./Components/Square";
import { Patterns } from "./Patterns";

const PLAYERS = {
  X: "X",
  O: "O",
};

const generateGameStatus = (player) => ({
  NONE: { winner: "none", state: "none" },
  NO_ONE: { winner: "No One", state: "Tie" },
  WINNER: { winner: player, state: "Won" },
});

function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("");
  const [result, setResult] = useState({ ...generateGameStatus().NONE });

  useEffect(() => {
    checkIfTie();
    checkWin();
    setPlayer(player === PLAYERS.X ? PLAYERS.O : PLAYERS.X);
  }, [board]);

  useEffect(() => {
    if (result.state !== generateGameStatus().NONE.state) {
      alert(`Game Finished! Winning Player: ${result.winner}`);
      restartGame();
    }
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(
      board.map((val, i) => {
        if (i === square && !val) return player;
        return val;
      })
    );
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      let foundWinningPattern = true;
      const firstPlayer = board[currPattern[0]];
      if (!firstPlayer) return;

      currPattern.forEach((i) => {
        if (board[i] !== firstPlayer) foundWinningPattern = false;
      });

      if (foundWinningPattern)
        setResult({ ...generateGameStatus(player).WINNER });
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (!square) filled = false;
    });

    if (filled) setResult({ ...generateGameStatus().NO_ONE });
  };

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setPlayer("");
  };

  return (
    <div className="App">
      <div className="board">
        {Array(3)
          .fill("")
          .map((e, i) => (
            <div className="row" key={i * 3}>
              <Square
                val={board[0 + i * 3]}
                chooseSquare={() => chooseSquare(0 + i * 3)}
              />
              <Square
                val={board[1 + i * 3]}
                chooseSquare={() => chooseSquare(1 + i * 3)}
              />
              <Square
                val={board[2 + i * 3]}
                chooseSquare={() => chooseSquare(2 + i * 3)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
