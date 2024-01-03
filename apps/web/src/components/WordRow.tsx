import React from "react";
import { Result } from "./Wordle";

const WordRow = ({
  result,
}: {
  result: Result[];
}) => {
  return (
    <div className="flex flex-row space-x-3">
      {result.map((value, index) => (
        <div
          key={index}
          className={`w-16 h-16 rounded-full ${
            result[index]?.isCorrectPos
              ? "bg-green-500"
              : result[index]?.isLetterInWord
              ? "bg-orange-400"
              : "bg-white"
          } shadow-md flex justify-center items-center`}
        >
          <input
            type="text"
            id={index.toString()}
            maxLength={1}
            disabled={true}
            value={result[index]?.letter}
            className="text-center w-full h-full bg-transparent border-none outline-none text-2xl text-gray-700"
          />
        </div>
      ))}
    </div>
  );
};

export default WordRow;
