import { useState, useEffect } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = board.every(cell => cell !== null) && !winner;

  // Alert logic
  useEffect(() => {
    if (winner) {
      setTimeout(() => alert(`🎉 Player ${winner} wins!`), 100);
    } else if (isDraw) {
      setTimeout(() => alert("😐 It's a draw!"), 100);
    }
  }, [winner, isDraw]);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isX ? "X" : "O";

    setBoard(newBoard);
    setIsX(!isX);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsX(true);
  }

  return (
    <div className="text-center text-white">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>

      <p className="mb-4">
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "Draw Game"
          : `Turn: ${isX ? "X" : "O"}`}
      </p>

      <div className="grid grid-cols-3 gap-2 w-64 mx-auto">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-gray-800 hover:bg-gray-700 text-2xl font-bold rounded"
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded"
      >
        Reset Game
      </button>
    </div>
  );
}

// IMPORTANT: This MUST be in same file OR imported
function calculateWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}