import { useState } from "react";
import { ChessEngine, Coordinate, Piece, PieceColor, PieceName } from "ts-chess-engine";

export default function ChessBoard({
  engine,
  onMove,
}: {
  engine: ChessEngine;
  onMove: () => void;
}) {
  const board = engine.board;
  const squares = [];
  const pieceByCoordinate = new Map(
    board.pieces.map(
      (piece) => [`${piece.coordinate.x}-${piece.coordinate.y}`, piece] as const
    )
  );

  const [piecePreview, setPiecePreview] = useState<Piece>();
  const [preview, setPreview] = useState<Coordinate[]>([]);

  for (let row = board.ySize; row >= 1; row--) {
    for (let col = 1; col <= board.xSize; col++) {
      const piece = pieceByCoordinate.get(`${col}-${row}`);
      const isDarkSquare = (row + col) % 2 === 0;
      const previewDot = preview.find(
        (coordinate) => coordinate.x === col && coordinate.y === row
      );

      squares.push(
        <div
          key={`${row}-${col}`}
          className="square flex items-center justify-center"
          style={{
            backgroundColor: isDarkSquare ? "#769656" : "#eeeed2",
            aspectRatio: "1",
            width: "100%",
          }}
          onClick={() => {
            if (piecePreview && previewDot) {
              const moved = engine.move(piecePreview.coordinate, previewDot);
              if (moved) {
                onMove();
              }
            }
          }}
        >
          {piecePreview && previewDot ? (
            <div className="h-6 w-6 bg-gray-500 rounded-full absolute"></div>
          ) : null}
          {piece ? (
            <div
              style={{
                color: piece.color === PieceColor.white ? "#ffffff" : "#000000",
                cursor: "pointer",
              }}
              onClick={() => {
                setPiecePreview(piece);
                setPreview(engine.previewMoves(piece.coordinate));
              }}
            >
              {PieceName[piece.name]}
            </div>
          ) : null}
        </div>
      );
    }
  }

  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${board.xSize}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${board.ySize}, minmax(0, 1fr))`,
        width: "min(90vmin, 520px)",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      {squares}
    </div>
  );
}
