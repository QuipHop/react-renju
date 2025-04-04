import { useState } from "react";
import clsx from "clsx";
import { BOARD_SIZE, CELL_SIZE, examples, WIN_STREAK } from "../constants";

export enum Stone {
  Empty = 0,
  Black = 1,
  White = 2,
}

export type Board = Stone[][];

interface GameResult {
  winner: Stone;
  startPosition?: { row: number; col: number };
}

const DIRECTIONS = [
  { deltaRow: 0, deltaCol: 1 },   // horizontal
  { deltaRow: 1, deltaCol: 0 },   // vertical
  { deltaRow: 1, deltaCol: 1 },   // diagonal right down
  { deltaRow: -1, deltaCol: 1 },  // diagonal right up
];

const checkWinner = (board: Board): GameResult => {
  const isInBounds = (r: number, c: number) => r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const stone = board[row][col];
      if (stone === Stone.Empty) continue;

      for (const { deltaRow, deltaCol } of DIRECTIONS) {
        let count = 1;
        let nextRow = row + deltaRow;
        let nextCol = col + deltaCol;

        while (isInBounds(nextRow, nextCol) && board[nextRow][nextCol] === stone) {
          count++;
          nextRow += deltaRow;
          nextCol += deltaCol;
        }

        if (count === WIN_STREAK) {
          const prevR = row - deltaRow;
          const prevC = col - deltaCol;
          const nextR = row + deltaRow * WIN_STREAK;
          const nextC = col + deltaCol * WIN_STREAK;

          const overBefore = isInBounds(prevR, prevC) && board[prevR][prevC] === stone;
          const overAfter = isInBounds(nextR, nextC) && board[nextR][nextC] === stone;

          if (!overBefore && !overAfter) {
            return { winner: stone, startPosition: { row: row, col: col } };
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
    if (result.winner === Stone.Empty) return "0";
    const { row, col } = result.startPosition!;
    return `${result.winner === Stone.Black ? "black" : "white"}\n${row + 1} ${col + 1}`;
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
                    stone === Stone.Black && "bg-black text-white",
                    stone === Stone.White && "bg-white text-black",
                    result?.startPosition?.row === rowIndex &&
                      result?.startPosition?.col === colIndex &&
                      "ring-2 ring-red-500"
                  )}
                >
                  {stone === Stone.Black ? "⚫" : stone === Stone.White ? "⚪" : ""}
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
