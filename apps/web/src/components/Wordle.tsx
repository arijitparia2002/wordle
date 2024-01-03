// Your React component file
"use client";
import React, { useState, useEffect } from "react";
import WordRow from "./WordRow";

export interface Result {
  isCorrectPos: string;
  isLetterInWord: string;
  letter: string;
}

const Wordle = () => {
  const [inputValues, setInputValues] = useState(["", "", "", "", ""]);
  const [prevResult, setPrevResult] = useState<any[]>([]);

  //get previous result from local storage
  useEffect(() => {
    const prevResult = localStorage.getItem("prevResult");
    console.log(prevResult);
    if (prevResult) {
      setPrevResult(JSON.parse(prevResult));
    }
    const currentInput = localStorage.getItem("currentInput");
    if (currentInput) {
      setInputValues(JSON.parse(currentInput));
    }
  }, []);

  //set previous result to local storage
  useEffect(() => {
    localStorage.setItem("prevResult", JSON.stringify(prevResult));
  }, [prevResult]);

  //set current input to local storage
  useEffect(() => {
    localStorage.setItem("currentInput", JSON.stringify(inputValues));
  }, [inputValues]);

  const handleChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value.toUpperCase();
    setInputValues(newInputValues);
    //go to the next input box
    if (index < inputValues.length - 1) {
      const nextInput = document.getElementById((index + 1).toString());
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(index);
    if (e.key === "Backspace" && index > 0) {
      const curInput = document.getElementById(
        index.toString()
      ) as HTMLInputElement;
      curInput.value = "";
      const prevInput = document.getElementById(
        (index - 1).toString()
      ) as HTMLInputElement;
      prevInput?.focus();
    }
    //for the last input box and enter press
    if (e.key === "Enter" && index === inputValues.length - 1) {
      handleSubmit();
      const firstInput = document.getElementById("0");
      firstInput?.focus();
    }

    //arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      const prevInput = document.getElementById((index - 1).toString());
      prevInput?.focus();
    }
    if (e.key === "ArrowRight" && index < inputValues.length - 1) {
      const nextInput = document.getElementById((index + 1).toString());
      nextInput?.focus();
    }
  };

  const handleSubmit = () => {
    if (inputValues.some((value) => value === "")) {
      return;
    }
    const data = {
      word: inputValues.join("").toLowerCase(),
    };

    setInputValues(["", "", "", "", ""]);

    fetch("https://specialties-chapel-replies-dl.trycloudflare.com/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const result = await res.json();
        setPrevResult([...prevResult, result]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center space-x-4 mt-5 flex-col">
      <div className="flex flex-row space-x-3">
        {inputValues.map((value, index) => (
          <div
            key={index}
            className={`w-20 h-20 rounded-xl bg-white shadow-md flex justify-center items-center`}
          >
            <input
              type="text"
              id={index.toString()}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              className="text-center w-full h-full bg-transparent border-none outline-none text-2xl text-gray-700"
            />
          </div>
        ))}
      </div>
      <button
        className="mt-4 px-4 py-2 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 transition duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring focus:border-blue-300 rounded-xl"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <div className="flex flex-col space-y-3 mt-5">
        {prevResult.map((result, index) => (
          <WordRow key={index} result={result} />
        ))}
      </div>
    </div>
  );
};

export default Wordle;
