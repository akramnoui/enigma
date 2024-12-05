import React, { useState } from "react";
import "./Plugboard.css";

interface PlugboardProps {
  plugboard: Record<string, string>;
  onUpdate: (newPlugboard: Record<string, string>) => void;
}

const Plugboard: React.FC<PlugboardProps> = ({ plugboard, onUpdate }) => {
  const [pair, setPair] = useState(["", ""]);

  const updatePlugboard = () => {
    const [letter1, letter2] = pair;
    if (letter1 && letter2) {
      const updated = { ...plugboard, [letter1]: letter2, [letter2]: letter1 };
      onUpdate(updated);
      setPair(["", ""]);
    }
  };

  return (
    <div className="plugboard">
      <h3>Plugboard</h3>
      <div className="pair-inputs">
        <input
          type="text"
          maxLength={1}
          value={pair[0]}
          onChange={(e) => setPair([e.target.value.toUpperCase(), pair[1]])}
        />
        <input
          type="text"
          maxLength={1}
          value={pair[1]}
          onChange={(e) => setPair([pair[0], e.target.value.toUpperCase()])}
        />
        <button onClick={updatePlugboard}>Connect</button>
      </div>
      <div className="plugboard-map">
        {Object.entries(plugboard).map(([key, value]) => (
          <p key={key}>
            {key} ↔ {value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Plugboard;
