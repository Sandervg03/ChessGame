"use client";

import { useState } from "react";
import { Board, Coordinate, Pawn, Piece } from "ts-chess-engine";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col">
      <header className="flex justify-center">
        <h1 className="text-black">Chess Game</h1>
      </header>
      <div className="flex-1 flex justify-center items-center">
        <p>Test</p>
      </div>
    </div>
  );
}
