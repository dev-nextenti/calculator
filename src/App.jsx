import React, { useState, useEffect } from "react";
import ButtonsContainer from "./components/ButtonsContainer";
import DisplayContainer from "./components/DisplayContainer";
import "./styles.css";

function App() {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");
  useEffect(() => {
    function handleKeyDown(e) {
      const { key } = e;

      if (!isNaN(key)) {
        setDisplay((prev) => prev + key);
      } else if (["+", "-", "*", "/"].includes(key)) {
        operatorClick(key);
      } else if (key === "Enter") {
        handleEqual();
      } else if (key === "Backspace") {
        backspace();
      } else if (key === "Escape") {
        clear();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [display]);

  function handleClick(e) {
    const targetValue = e.target.name;
    setDisplay(display + targetValue);
  }

  function operatorClick(operator) {
    let lastCharacter = display.slice(-2);
    let operatorsArray = ["+ ", "- ", "* ", "/ "];

    if (display === "" || operatorsArray.includes(lastCharacter)) return;

    setDisplay((prevDisplay) => {
      return prevDisplay + " " + operator + " ";
    });
  }

  function handleEqual() {
    console.log("checking");
    if (display.slice(-2).includes("+ ", "- ", "* ", "/ ")) return;
    console.log(display);
    setDisplay("");
    if (display.trim()) {
      const resultValue = calculate(display);
      setResult(resultValue);
    }
  }

  function calculate(expression) {
    const tokens = expression.split(" ");
    let resultValue = parseInt(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextNumber = parseInt(tokens[i + 1]);

      switch (operator) {
        case "+":
          resultValue += nextNumber;
          break;
        case "-":
          resultValue -= nextNumber;
          break;
        case "*":
          resultValue *= nextNumber;
          break;
        case "/":
          resultValue /= nextNumber;
          break;
        default:
          resultValue = "Error";
      }
    }
    return resultValue;
  }

  function clear() {
    setDisplay("");
    setResult("");
  }

  function backspace() {
    setDisplay(display.slice(0, -1));
  }

  return (
    <>
      <div className="container">
        <div className="calculator">
          <DisplayContainer
            display={display}
            result={result}
            backspace={backspace}
            clear={clear}
          />
          <ButtonsContainer
            operatorClick={operatorClick}
            handleClick={handleClick}
            handleEqual={handleEqual}
          />
        </div>
      </div>
    </>
  );
}

export default App;
