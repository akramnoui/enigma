import React from "react";
import "./RotorDisplay.css";

interface RotorDisplayProps {
  rotorPositions: number[]; // Positions of the rotors
}

const RotorDisplay: React.FC<RotorDisplayProps> = ({ rotorPositions }) => {
  return (
    <div className="rotor-display flex justify-center gap-6 mt-8">
      {rotorPositions.map((position, index) => (
        <div key={index} className="rotor-container">
          <div className="rotor-circle">
            <div className="rotor-inner">
              <p className="rotor-number">{position}</p>
            </div>
          </div>
          <p className="rotor-label">Rotor {index + 1}</p>
        </div>
      ))}
    </div>
  );
};

export default RotorDisplay;
