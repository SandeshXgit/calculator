'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previous, setPrevious] = useState('');
  const [operation, setOperation] = useState('');
  const [waitingForNewValue, setWaitingForNewValue] = useState(true);

  // (all your existing functions stay exactly the same – inputNumber, clear, etc.)
  // I'm keeping them here so it works 100%

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevious('');
    setOperation('');
    setWaitingForNewValue(true);
  };

  const performOperation = (nextOp) => {
    const inputValue = parseFloat(display);
    if (previous === '') {
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
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : a;
      default: return b;
    }
  };

  const performEquals = () => {
    if (previous && operation) {
      performOperation(operation);
      setOperation('');
      setPrevious('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-96 scale-500 rounded-3xl bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600 p-10 shadow-2xl ring-8 ring-lime-400/80 border-4 border-lime-300 origin-center animate-pulse">
        
        {/* Display */}
        <div className="mb-6 rounded-xl bg-black/40 p-6 text-right backdrop-blur-sm">
          <div className="text-5xl font-thin text-white">{display}</div>
        </div>

        {/* Buttons grid */}
        <div className="grid grid-cols-4 gap-4">
          <button onClick={clear} className="col-span-2 rounded-xl bg-red-600 py-6 text-3xl font-bold text-white hover:bg-red-700">C</button>
          <button onClick={() => performOperation('÷')} className="rounded-xl bg-gray-700 py-6 text-3xl text-white hover:bg-gray-600">÷</button>
          <button onClick={() => performOperation('×')} className="rounded-xl bg-gray-700 py-6 text-3xl text-white hover:bg-gray-600">×</button>

          <button onClick={() => inputNumber(7)} className="rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">7</button>
          <button onClick={() => inputNumber(8)} className="rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">8</button>
          <button onClick={() => inputNumber(9)} className="rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">9</button>
          <button onClick={() => performOperation('-')} className="rounded-xl bg-gray-700 py-6 text-3xl text-white hover:bg-gray-600">-</button>

          <button onClick={() => inputNumber(4)} className="rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">4</button>
          <button onClick={() => inputNumber(5)} className="rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">5</button>
          <button onClick={() => inputNumber(6)} className="rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">6</button>
          <button onClick={() => performOperation('+')} className="rounded-xl bg-gray-700 py-6 text-3xl text-white hover:bg-gray-600">+</button>

          <button onClick={() => inputNumber(1)} className="rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">1</button>
          <button onClick={() => inputNumber(2)} className="rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">2</button>
          <button onClick={() => inputNumber(3)} className="rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">3</button>
          <button onClick={performEquals} className="row-span-2 rounded-xl bg-orange-600 py-14 text-3xl font-bold text-white hover:bg-orange-700">=</button>

          <button onClick={() => inputNumber(0)} className="col-span-2 rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">0</button>
          <button onClick={inputDecimal} className="rounded-xl bg-gray-800 py-6 text-3xl text-white hover:bg-gray-700">.</button>
        </div>
      </div>
    </div>
  );
}