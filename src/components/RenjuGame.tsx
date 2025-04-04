import { useState } from "react";
import { BOARD_SIZE, CELL_SIZE, examples, WIN_STREAK } from "../constants";
import { BoardDisplay } from "./BoardDisplay";
import { PresetSelector } from "./PresetSelector";

export enum Stone {
  Empty = 0,
  Black = 1,
  White = 2,
}

export type Board = Stone[][];

export interface IGameResult {
  winner: Stone;
  startPosition?: { row: number; col: number };
}

const DIRECTIONS = [
  { deltaRow: 0, deltaCol: 1 }, // horizontal
  { deltaRow: 1, deltaCol: 0 }, // vertical
  { deltaRow: 1, deltaCol: 1 }, // diagonal right down
  { deltaRow: -1, deltaCol: 1 }, // diagonal right up
];

const checkWinner = (board: Board): IGameResult => {
  const isInBounds = (r: number, c: number) =>
    r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE;

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const stone = board[row][col];
      if (stone === Stone.Empty) continue;

      for (const { deltaRow, deltaCol } of DIRECTIONS) {
        let count = 1;
        let nextRow = row + deltaRow;
        let nextCol = col + deltaCol;

        while (
          isInBounds(nextRow, nextCol) &&
          board[nextRow][nextCol] === stone
        ) {
          count++;
          nextRow += deltaRow;
          nextCol += deltaCol;
        }

        if (count === WIN_STREAK) {
          const prevR = row - deltaRow;
          const prevC = col - deltaCol;
          const nextR = row + deltaRow * WIN_STREAK;
          const nextC = col + deltaCol * WIN_STREAK;

          const overBefore =
            isInBounds(prevR, prevC) && board[prevR][prevC] === stone;
          const overAfter =
            isInBounds(nextR, nextC) && board[nextR][nextC] === stone;

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
    return `${result.winner === Stone.Black ? "black" : "white"}\n${row + 1} ${
      col + 1
    }`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Renju Static Evaluator</h2>

      <PresetSelector examples={examples} setInput={setInput} />

      <textarea
        className="w-full max-w-3xl h-64 font-mono text-sm p-2 border rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <BoardDisplay board={board} result={result} cellSizeClass={CELL_SIZE} />

      <div className="mt-2 text-center text-sm whitespace-pre bg-white px-4 py-2 rounded shadow">
        <p className="text-black">RESULT: {renderResult()}</p>
      </div>
    </div>
  );
};

export default RenjuBoardStatic;
