"use client";

import { useState } from "react";
import { Board, ChessEngine } from "ts-chess-engine";
import ChessBoard from "./components/chessboard";

export default function Home() {
  const [engine] = useState(
    () => new ChessEngine(new Board())
  );
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const handleMove = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col">
      <header className="flex justify-center">
        <h1 className="text-black">Chess Game</h1>
      </header>
      <div className="flex-1 flex justify-center items-center">
        <ChessBoard key={updateTrigger} engine={engine} onMove={handleMove} />
      </div>
    </div>
  );
}
