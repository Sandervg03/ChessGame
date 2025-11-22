"use client";

import { useState } from "react";
import { Board, ChessEngine, Coordinate, King, Pawn, PieceColor } from "ts-chess-engine";
import ChessBoard from "./components/chessboard";

export default function Home() {
  const [engine] = useState(
    () => new ChessEngine(new Board(
      [
        new Pawn(PieceColor.white, new Coordinate(2, 3)), 
        new Pawn(PieceColor.black, new Coordinate(2, 4)),
        new King(PieceColor.white, new Coordinate(2, 1)),
        new King(PieceColor.black, new Coordinate(1, 8))
      ]
    ))
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
