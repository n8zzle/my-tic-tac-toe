"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [board, setBoard] = React.useState(Array(9).fill(null));
  const [isPlayerX, setIsPlayerX] = React.useState(true);
  const [gameStatus, setGameStatus] = React.useState("");

  const handleSquareClick = (index) => {
    if (board[index] || gameStatus) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isPlayerX ? "X" : "O";
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameStatus(`Player ${winner} wins!`);
      toast(`🦄 Player ${winner} wins!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    if (!newBoard.includes(null)) {
      setGameStatus("Tie game!");
      toast("🦄 Tie game!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setIsPlayerX(!isPlayerX);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const renderSquare = (index) => {
    return (
      <button
        className="h-full w-full bg-white"
        onClick={() => handleSquareClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="h-screen w-screen bg-red-200 font-mono space-y-10">
      <header className="bg-blue-200 p-10 flex flex-row items-center justify-between">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => window.location.reload()}
        >
          TicTacToe
        </h1>
        <div className="text-sm">
          {gameStatus || `Player ${isPlayerX ? "X" : "O"}'s turn`}
        </div>
      </header>
      <div className="grid grid-rows-4 grid-cols-3 gap-4 bg-violet-300 text-center items-center max-w-3xl mx-auto h-2/3">
        <div className="w-full h-full">{renderSquare(0)}</div>
        <div className="w-full h-full">{renderSquare(1)}</div>
        <div className="w-full h-full">{renderSquare(2)}</div>
        <div className="w-full h-full">{renderSquare(3)}</div>
        <div className="w-full h-full">{renderSquare(4)}</div>
        <div className="w-full h-full">{renderSquare(5)}</div>
        <div className="w-full h-full">{renderSquare(6)}</div>
        <div className="w-full h-full">{renderSquare(7)}</div>
        <div className="w-full h-full">{renderSquare(8)}</div>
        <button
          className="flex flex-row justify-center bg-white h-full items-center col-span-3 "
          onClick={() => window.location.reload()}
        >
          New Game
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Home;
