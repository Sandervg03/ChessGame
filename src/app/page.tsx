"use client";

import { useState } from "react";
import { Bishop, Board, ChessEngine, Coordinate, King, Knight, Pawn, PieceColor, Queen, Rook } from "ts-chess-engine";
import ChessBoard from "./components/chessboard";

export default function Home() {
  const [engine] = useState(
    () => new ChessEngine(new Board(
      [
        new Rook(PieceColor.white, new Coordinate(1, 1)),
        new Knight(PieceColor.white, new Coordinate(2, 1)),
        new Bishop(PieceColor.white, new Coordinate(3, 1)),
        new Queen(PieceColor.white, new Coordinate(4, 1)),
        new King(PieceColor.white, new Coordinate(5, 1)),
        new Rook(PieceColor.white, new Coordinate(8, 1)),
        new Knight(PieceColor.white, new Coordinate(7, 1)),
        new Bishop(PieceColor.white, new Coordinate(6, 1)),
        new Pawn(PieceColor.white, new Coordinate(1, 2)),
        new Pawn(PieceColor.white, new Coordinate(2, 2)),
        new Pawn(PieceColor.white, new Coordinate(3, 2)),
        new Pawn(PieceColor.white, new Coordinate(4, 2)),
        new Pawn(PieceColor.white, new Coordinate(5, 2)),
        new Pawn(PieceColor.white, new Coordinate(6, 2)),
        new Pawn(PieceColor.white, new Coordinate(7, 2)),
        new Pawn(PieceColor.white, new Coordinate(8, 2)),
        new Rook(PieceColor.black, new Coordinate(1, 8)),
        new Knight(PieceColor.black, new Coordinate(2, 8)),
        new Bishop(PieceColor.black, new Coordinate(3, 8)),
        new Queen(PieceColor.black, new Coordinate(4, 8)),
        new King(PieceColor.black, new Coordinate(5, 8)),
        new Rook(PieceColor.black, new Coordinate(8, 8)),
        new Knight(PieceColor.black, new Coordinate(7, 8)),
        new Bishop(PieceColor.black, new Coordinate(6, 8)),
        new Pawn(PieceColor.black, new Coordinate(1, 7)),
        new Pawn(PieceColor.black, new Coordinate(2, 7)),
        new Pawn(PieceColor.black, new Coordinate(3, 7)),
        new Pawn(PieceColor.black, new Coordinate(4, 7)),
        new Pawn(PieceColor.black, new Coordinate(5, 7)),
        new Pawn(PieceColor.black, new Coordinate(6, 7)),
        new Pawn(PieceColor.black, new Coordinate(7, 7)),
        new Pawn(PieceColor.black, new Coordinate(8, 7))
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
