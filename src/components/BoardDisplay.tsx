import clsx from "clsx";
import { BOARD_SIZE } from "../constants";
import { Board, IGameResult } from "./RenjuGame";

export interface BoardDisplayProps {
  board: Board;
  result: IGameResult;
  cellSizeClass: string;
}

export const BoardDisplay = ({
  board,
  result,
  cellSizeClass,
}: BoardDisplayProps) => (
  <div className="bg-gray-300 p-1 rounded shadow">
    <div className="flex">
      <div className={cellSizeClass} />
      {Array.from({ length: BOARD_SIZE }, (_, i) => (
        <div
          key={i}
          className={clsx(
            cellSizeClass,
            "flex flex-grow items-center justify-center text-xs text-gray-700"
          )}
        >
          {i + 1}
        </div>
      ))}
    </div>

    <div className="flex">
      <div className="flex flex-col">
        {Array.from({ length: BOARD_SIZE }, (_, i) => (
          <div
            key={i}
            className={clsx(
              cellSizeClass,
              "flex flex-grow items-center justify-center text-xs text-gray-700"
            )}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-19 gap-px">
        {board.map((row, rowIndex) =>
          row.map((stone, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={clsx(
                `${cellSizeClass} border border-gray-200`,
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
);
