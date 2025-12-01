"use client";

import { useState } from "react";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState("");
  const [operation, setOperation] = useState("");
  const [waitingForNewValue, setWaitingForNewValue] = useState(true);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPrevious("");
    setOperation("");
    setWaitingForNewValue(true);
  };

  const performOperation = (nextOp) => {
    const inputValue = parseFloat(display);

    if (previous === "") {
      setPrevious(display);
    } else if (operation) {
      const prevValue = parseFloat(previous);
      const result = calculate(prevValue, inputValue, operation);
      setDisplay(String(result));
      setPrevious(String(result));
    }

    setWaitingForNewValue(true);
    setOperation(nextOp);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "×": return a * b;
      case "÷": return b !== 0 ? a / b : a;
      default: return b;
    }
  };

  const performEquals = () => {
    if (previous && operation) {
      performOperation(operation);
      setOperation("");
      setPrevious("");
    }
  };

  // Button classes
  const btn = "rounded-2xl bg-gray-200 py-6 text-3xl text-gray-900 shadow hover:bg-gray-300 active:scale-95 transition";
  const btnOp = "rounded-2xl bg-indigo-200 py-6 text-3xl text-indigo-700 shadow hover:bg-indigo-300 active:scale-95 transition";
  const btnRed = "rounded-2xl bg-red-500 py-6 text-white shadow hover:bg-red-600 active:scale-95 transition";
  const btnEq = "rounded-2xl bg-indigo-600 py-14 text-4xl font-bold text-white shadow hover:bg-indigo-700 active:scale-95 transition";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      
     
      <div
        className="w-[420px] rounded-3xl p-8 shadow-2xl border border-gray-200 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/tanjiro.jpg')" }}

      >
        {/* Overlay*/}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} //  opacity
        ></div>

        {/* Calculator content */}
        <div className="relative z-10">
          
          {/* Display */}
          <div className="mb-8 rounded-2xl bg-black/30 p-4 text-right text-white shadow-inner select-none">
            <div className="text-xl text-gray-300 h-6">
              {previous && operation ? `${previous} ${operation}` : ""}
            </div>
            <div className="text-6xl font-light tracking-wide mt-1">{display}</div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-4">
            <button onClick={clear} className={`col-span-2 ${btnRed}`}>C</button>
            <button onClick={() => performOperation("÷")} className={btnOp}>÷</button>
            <button onClick={() => performOperation("×")} className={btnOp}>×</button>

            {[7, 8, 9].map((n) => (
              <button key={n} onClick={() => inputNumber(n)} className={btn}>{n}</button>
            ))}
            <button onClick={() => performOperation("-")} className={btnOp}>-</button>

            {[4, 5, 6].map((n) => (
              <button key={n} onClick={() => inputNumber(n)} className={btn}>{n}</button>
            ))}
            <button onClick={() => performOperation("+")} className={btnOp}>+</button>

            {[1, 2, 3].map((n) => (
              <button key={n} onClick={() => inputNumber(n)} className={btn}>{n}</button>
            ))}

            <button onClick={performEquals} className={`row-span-2 ${btnEq}`}>=</button>

            <button onClick={() => inputNumber(0)} className={`col-span-2 ${btn}`}>0</button>
            <button onClick={inputDecimal} className={btn}>.</button>
          </div>
        </div>
      </div>
    </div>
  );
}
