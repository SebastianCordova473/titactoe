import "./styles.css";
import React, { useState } from "react";
export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
    setCurrentPlayer(currentPlayer === "X" ? "0" : "X");
  };

  const calculateWinner = (board) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((cell) => cell !== null)) {
      return "draw";
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };
  return (
    <div className="App">
      <div className="tica-tac-toe">
        <div className="board">
          {board.map(function (cell, index) {
            return (
              <div key={index} onClick={() => handleClick(index)}>
                {cell}
              </div>
            );
          })}
        </div>
        {winner && <div className="winner"> Winner: {winner}</div>}
        {!winner && (
          <div className="current-player"> current Player {currentPlayer} </div>
        )}
        {winner && <button onClick={resetGame}> Reset Game</button>}
      </div>
    </div>
  );
}
