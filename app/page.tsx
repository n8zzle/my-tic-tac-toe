"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

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
        className="h-full w-full square rounded-md shadow-md"
        onClick={() => handleSquareClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="h-screen w-screen bg-google bg-cover font-mono space-y-10">
      <motion.header
        className="glassmorphism p-10 flex flex-row items-center justify-between rounded-b-md"
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1,
        }}
      >
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => window.location.reload()}
        >
          TicTacToe
        </h1>
        <div className="text-sm">
          {gameStatus || `Player ${isPlayerX ? "X" : "O"}'s turn`}
        </div>
      </motion.header>

      <motion.div
        className="glassmorphism rounded-lg  p-10 grid grid-rows-4 grid-cols-3 gap-4  text-center items-center max-w-5xl mx-auto h-2/3"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ rotate: 360, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 50,
        }}
      >
        <div className="w-full h-full ">{renderSquare(0)}</div>
        <div className="w-full h-full">{renderSquare(1)}</div>
        <div className="w-full h-full">{renderSquare(2)}</div>
        <div className="w-full h-full">{renderSquare(3)}</div>
        <div className="w-full h-full">{renderSquare(4)}</div>
        <div className="w-full h-full">{renderSquare(5)}</div>
        <div className="w-full h-full">{renderSquare(6)}</div>
        <div className="w-full h-full">{renderSquare(7)}</div>
        <div className="w-full h-full">{renderSquare(8)}</div>
        <button
          className="square flex flex-row justify-center h-full items-center col-span-3 "
          onClick={() => window.location.reload()}
        >
          New Game
        </button>
      </motion.div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
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
