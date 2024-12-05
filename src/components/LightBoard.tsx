import React from "react";
import "./Lightboard.css";

interface LightboardProps {
  letter: string | null;
}

const Lightboard: React.FC<LightboardProps> = ({ letter }) => {
  return (
    <div className="lightboard">
      {letter && <div className="light">{letter}</div>}
    </div>
  );
};

export default Lightboard;
