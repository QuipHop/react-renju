import { useState } from "react";
import clsx from "clsx";

export type Stone = 0 | 1 | 2;
export type Board = Stone[][];

interface GameResult {
  winner: Stone;
  startPosition?: { row: number; col: number };
}

const DIRECTIONS = [
  { dr: 0, dc: 1 },
  { dr: 1, dc: 0 },
  { dr: 1, dc: 1 },
  { dr: -1, dc: 1 },
];

const checkWinner = (board: Board): GameResult => {
  const size = 19;
  const isInBounds = (r: number, c: number) => r >= 0 && r < size && c >= 0 && c < size;

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const stone = board[r][c];
      if (stone === 0) continue;

      for (const { dr, dc } of DIRECTIONS) {
        let count = 1;
        let nr = r + dr;
        let nc = c + dc;

        while (isInBounds(nr, nc) && board[nr][nc] === stone) {
          count++;
          nr += dr;
          nc += dc;
        }

        if (count === 5) {
          const prevR = r - dr;
          const prevC = c - dc;
          const nextR = r + dr * 5;
          const nextC = c + dc * 5;

          const overBefore = isInBounds(prevR, prevC) && board[prevR][prevC] === stone;
          const overAfter = isInBounds(nextR, nextC) && board[nextR][nextC] === stone;

          if (!overBefore && !overAfter) {
            return { winner: stone, startPosition: { row: r, col: c } };
          }
        }
      }
    }
  }
  return { winner: 0 };
};

const createEmptyBoard = (): Board => Array.from({ length: 19 }, () => Array(19).fill(0));

const CELL_SIZE = "w-10 aspect-square";

const RenjuGame = () => {
  const [board, setBoard] = useState<Board>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Stone>(1);
  const result = checkWinner(board);

  const handleClick = (row: number, col: number) => {
    if (board[row][col] !== 0 || result.winner !== 0) return;
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const renderResult = (): string => {
    if (result.winner === 0) return "0";
    const { row, col } = result.startPosition!;
    return `${result.winner == 1 ? 'black' : 'white'}\n${row + 1} ${col + 1}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Renju Game</h2>
      <p className="text-sm">
        {result.winner === 0
          ? `Current turn: ${currentPlayer === 1 ? "Black (1)" : "White (2)"}`
          : `Game Over: Player ${result.winner} Wins!`}
      </p>

      <div className="bg-gray-300 p-1 rounded shadow">
        {/* Column Numbers */}
        <div className="flex">
          <div className={`${CELL_SIZE}`} />
          {Array.from({ length: 19 }, (_, i) => (
            <div
              key={i}
              className={clsx(
                CELL_SIZE,
                "flex-grow flex items-center justify-center text-xs text-gray-700"
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex">
          {/* Row Numbers */}
          <div className="flex flex-col">
            {Array.from({ length: 19 }, (_, i) => (
              <div
                key={i}
                className={clsx(
                  CELL_SIZE,
                  "flex-grow flex items-center justify-center text-xs text-gray-700"
                )}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Game Grid */}
          <div className="grid grid-cols-19 gap-px">
            {board.map((row, rowIndex) =>
              row.map((stone, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className={clsx(
                    `${CELL_SIZE} border border-gray-200`,
                    "flex items-center justify-center",
                    "bg-gray-100 hover:bg-gray-200 p-0",
                    stone === 1 && "bg-black text-white",
                    stone === 2 && "bg-white text-black",
                    result?.startPosition?.row === rowIndex &&
                      result?.startPosition?.col === colIndex &&
                      "ring-2 ring-red-500"
                  )}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  disabled={stone !== 0 || result.winner !== 0}
                >
                  {stone === 1 ? "⚫" : stone === 2 ? "⚪" : ""}
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => {
            setBoard(createEmptyBoard());
            setCurrentPlayer(1);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow"
        >
          Restart
        </button>
      </div>

      {result.winner !== 0 && (
        <div className="mt-2 text-center text-sm whitespace-pre bg-white px-4 py-2 rounded shadow">
          <p className="text-black">WINNER: {renderResult()}</p>
        </div>
      )}
    </div>
  );
};

export default RenjuGame;
