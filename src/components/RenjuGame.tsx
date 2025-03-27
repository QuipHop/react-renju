import { useState } from "react";
import clsx from "clsx";
import { BOARD_SIZE, CELL_SIZE, examples, WIN_STREAK } from "../constants";

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
  const isInBounds = (r: number, c: number) => r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
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

        if (count === WIN_STREAK) {
          const prevR = r - dr;
          const prevC = c - dc;
          const nextR = r + dr * WIN_STREAK;
          const nextC = c + dc * WIN_STREAK;

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

const parseBoardInput = (input: string): Board => {
  const lines = input.trim().split(/\n|\r/);
  return lines.map((line) => line.trim().split(/\s+/).map(Number) as Stone[]);
};

const data: Record<string, string> = examples;

const RenjuBoardStatic = () => {
  const [input, setInput] = useState(data["Horizontal Win (Black)"]);
  const board = parseBoardInput(input);
  const result = checkWinner(board);

  const renderResult = () => {
    if (result.winner === 0) return "0";
    const { row, col } = result.startPosition!;
    return `${result.winner === 1 ? "black" : "white"}\n${row + 1} ${col + 1}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Renju Static Evaluator</h2>

      <div className="flex gap-2 items-center">
        <label htmlFor="preset-select" className="text-sm font-medium">Preset:</label>
        <select
          id="preset-select"
          className="px-2 py-1 border rounded text-sm"
          onChange={(e) => setInput(examples[e.target.value])}
        >
          {Object.keys(examples).map((label) => (
            <option key={label} value={label}>{label}</option>
          ))}
        </select>
      </div>

      <textarea
        className="w-full max-w-3xl h-64 font-mono text-sm p-2 border rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="bg-gray-300 p-1 rounded shadow">
        <div className="flex">
          <div className={`${CELL_SIZE}`} />
          {Array.from({ length: BOARD_SIZE }, (_, i) => (
            <div key={i} className={clsx(CELL_SIZE, "flex flex-grow items-center justify-center text-xs text-gray-700")}>{i + 1}</div>
          ))}
        </div>

        <div className="flex">
          <div className="flex flex-col">
            {Array.from({ length: BOARD_SIZE }, (_, i) => (
              <div key={i} className={clsx(CELL_SIZE, "flex flex-grow items-center justify-center text-xs text-gray-700")}>{i + 1}</div>
            ))}
          </div>

          <div className="grid grid-cols-19 gap-px">
            {board.map((row, rowIndex) =>
              row.map((stone, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={clsx(
                    `${CELL_SIZE} border border-gray-200`,
                    "flex items-center justify-center text-lg",
                    "bg-gray-100",
                    stone === 1 && "bg-black text-white",
                    stone === 2 && "bg-white text-black",
                    result?.startPosition?.row === rowIndex &&
                      result?.startPosition?.col === colIndex &&
                      "ring-2 ring-red-500"
                  )}
                >
                  {stone === 1 ? "⚫" : stone === 2 ? "⚪" : ""}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-2 text-center text-sm whitespace-pre bg-white px-4 py-2 rounded shadow">
        <p className="text-black">RESULT: {renderResult()}</p>
      </div>
    </div>
  );
};

export default RenjuBoardStatic;
