import React from "react";
import "./EnigmaKeyboard.css";

interface EnigmaKeyboardProps {
  onLetterClick: (letter: string) => void;
}

const EnigmaKeyboard: React.FC<EnigmaKeyboardProps> = ({ onLetterClick }) => {
  const azertyLayout = [
    ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
    ["W", "X", "C", "V", "B", "N"]
  ];

  return (
    <div className="keyboard">
      {azertyLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => (
            <button
              key={letter}
              onClick={() => onLetterClick(letter)}
              className="key"
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EnigmaKeyboard;
