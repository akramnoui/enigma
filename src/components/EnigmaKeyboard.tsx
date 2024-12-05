import React from "react";
import "./EnigmaKeyboard.css";

interface EnigmaKeyboardProps {
  onLetterClick: (letter: string) => void;
}

const EnigmaKeyboard: React.FC<EnigmaKeyboardProps> = ({ onLetterClick }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="keyboard">
      {letters.map((letter) => (
        <button
          key={letter}
          onClick={() => onLetterClick(letter)}
          className="key"
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default EnigmaKeyboard;
