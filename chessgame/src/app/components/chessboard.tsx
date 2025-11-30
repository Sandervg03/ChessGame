import { useState } from "react";
import {
  ChessEngine,
  Coordinate,
  GameState,
  Move,
  Pawn,
  Piece,
  PieceColor,
  SpecialMove,
} from "ts-chess-engine";
import { Promotion } from "ts-chess-engine/dist/models/specialMove";

export default function ChessBoard({
  engine,
  onMove,
}: {
  engine: ChessEngine;
  onMove: () => void;
}) {
  if (engine.gameState !== GameState.playing) {
    setTimeout(
      () => alert(`The game has ended! ${GameState[engine.gameState]}`),
      100
    );
  }

  const board = engine.board;
  const squares = [];
  const pieceByCoordinate = new Map(
    board.pieces.map(
      (piece) => [`${piece.coordinate.x}-${piece.coordinate.y}`, piece] as const
    )
  );

  const [piecePreview, setPiecePreview] = useState<Piece>();
  const [preview, setPreview] = useState<Coordinate[]>([]);
  const [promotionData, setPromotionData] = useState<{
    move: Move;
    color: PieceColor;
  } | null>(null);

  const handleMove = (move: Move, promotion?: Promotion) => {
    const moved = engine.move(move, promotion);
    if (moved) {
      setPiecePreview(undefined);
      setPreview([]);
      onMove();
    }
  };

  const handleSquareClick = (targetCoord: Coordinate) => {
    if (
      piecePreview &&
      preview.find((c) => c.x === targetCoord.x && c.y === targetCoord.y)
    ) {
      const move = new Move(piecePreview, piecePreview.coordinate, targetCoord);

      const isPawn = piecePreview instanceof Pawn;
      const isWhitePromotion =
        piecePreview.color === PieceColor.white &&
        targetCoord.y === board.ySize;
      const isBlackPromotion =
        piecePreview.color === PieceColor.black && targetCoord.y === 1;

      if (isPawn && (isWhitePromotion || isBlackPromotion)) {
        setPromotionData({ move, color: piecePreview.color });
      } else {
        handleMove(move);
      }
    }
  };

  const handlePromotion = (promotionType: Promotion) => {
    if (promotionData) {
      handleMove(promotionData.move, promotionType);
      setPromotionData(null);
    }
  };

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
          className="square flex items-center justify-center relative"
          style={{
            backgroundColor: isDarkSquare ? "#769656" : "#eeeed2",
            aspectRatio: "1",
            width: "100%",
          }}
          onClick={() => handleSquareClick(new Coordinate(col, row))}
        >
          {piecePreview && previewDot ? (
            <div
              className="h-6 w-6 bg-gray-500 rounded-full absolute"
              style={{ cursor: "pointer", zIndex: 2  }}
            ></div>
          ) : null}
          {piece ? (
            <div
              className="square flex items-center justify-center relative"
              style={{
                backgroundColor: isDarkSquare ? "#769656" : "#eeeed2",
                aspectRatio: "1",
                width: "100%",
                fontSize: "4.5vmin",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setPiecePreview(piece);
                setPreview(engine.previewMoves(piece.coordinate));
              }}
            >
              {piece && (
                <span
                  style={{
                    color: piece.color === PieceColor.white ? "white" : "black",
                    filter:
                      piece.color === PieceColor.white
                        ? "drop-shadow(0 0 4px rgba(0,0,0,0.8))"
                        : "",
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  {piece.icon}
                </span>
              )}
            </div>
          ) : null}
        </div>
      );
    }
  }

  return (
    <>
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

      {promotionData && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4 text-black">
              Choose Promotion
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => handlePromotion(SpecialMove.PromoteQueen)}
                className="p-4 text-4xl hover:bg-gray-100 rounded transition text-black"
              >
                ♛
              </button>
              <button
                onClick={() => handlePromotion(SpecialMove.PromoteRook)}
                className="p-4 text-4xl hover:bg-gray-100 rounded transition text-black"
              >
                ♜
              </button>
              <button
                onClick={() => handlePromotion(SpecialMove.PromoteBishop)}
                className="p-4 text-4xl hover:bg-gray-100 rounded transition text-black"
              >
                ♝
              </button>
              <button
                onClick={() => handlePromotion(SpecialMove.PromoteKnight)}
                className="p-4 text-4xl hover:bg-gray-100 rounded transition text-black"
              >
                ♞
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
