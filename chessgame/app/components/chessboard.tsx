import { ChessEngine, Coordinate } from "ts-chess-engine";

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

  for (let row = board.ySize; row >= 1; row--) {
    for (let col = 1; col <= board.xSize; col++) {
      const piece = pieceByCoordinate.get(`${col}-${row}`);
      const isDarkSquare = (row + col) % 2 === 0;

      squares.push(
        <div
          key={`${row}-${col}`}
          className="square flex items-center justify-center"
          style={{
            backgroundColor: isDarkSquare ? "#769656" : "#eeeed2",
            aspectRatio: "1",
            width: "100%",
          }}
        >
          {piece ? (
            <div style={{
              color: piece.color === "white" ? "#ffffff" : "#000000"
            }}
              onClick={() => {
                if (piece.coordinate.y === 2) {
                  console.log(piece)
                  const moved = engine.move(piece.coordinate, new Coordinate(2, 4))
                  console.log(moved)
                  if (moved) {
                    onMove()
                    return
                  }
                }
                if(piece.coordinate.y === 4) {
                  console.log(piece)
                  const moved = engine.move(piece.coordinate, new Coordinate(2, 3))
                  console.log(moved)
                  if (moved) {
                    onMove()
                    console.log("works")
                    return
                  }
                }
                
                const moved = engine.move(piece.coordinate, new Coordinate(piece.coordinate.x, piece.coordinate.y + 1));
                if (moved) {
                  onMove()
                  console.log(JSON.stringify(board.pieces))
                }
              }}
            >
              {piece.name}
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
