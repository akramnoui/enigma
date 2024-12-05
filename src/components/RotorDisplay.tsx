import React from "react";
import "./RotorDisplay.css";

interface RotorDisplayProps {
  rotorPositions: number[]; // Positions des rotors
}

const RotorDisplay: React.FC<RotorDisplayProps> = ({ rotorPositions }) => {
  return (
    <div className="rotor-display">
      {rotorPositions.map((position, index) => (
        <div key={index} className="rotor">
          <p>Rotor {index + 1}</p>
          <div className="position">{position}</div>
        </div>
      ))}
    </div>
  );
};

export default RotorDisplay;
