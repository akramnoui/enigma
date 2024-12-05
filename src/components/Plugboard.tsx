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
    if (letter1 && letter2 && letter1 !== letter2) {
      const updated = { ...plugboard, [letter1]: letter2, [letter2]: letter1 };
      onUpdate(updated);
      setPair(["", ""]);
    }
  };

  const removeConnection = (letter: string) => {
    const updated = { ...plugboard };
    const connectedTo = updated[letter];
    delete updated[letter];
    delete updated[connectedTo];
    onUpdate(updated);
  };

  return (
    <div className="plugboard">
      <h3 className="title">Plugboard</h3>
      <p className="description">
        Configure the connections by pairing letters. Each letter can only have one connection.
      </p>

      {/* Pair Input Section */}
      <div className="pair-inputs">
        <input
          type="text"
          maxLength={1}
          placeholder="A"
          value={pair[0]}
          onChange={(e) => setPair([e.target.value.toUpperCase(), pair[1]])}
        />
        <span className="connector">↔</span>
        <input
          type="text"
          maxLength={1}
          placeholder="B"
          value={pair[1]}
          onChange={(e) => setPair([pair[0], e.target.value.toUpperCase()])}
        />
        <button className="connect-button" onClick={updatePlugboard}>
          Connect
        </button>
      </div>

      {/* Plugboard Visual Map */}
      <div className="plugboard-visual">
        <div className="letters">
          {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
            <div key={letter} className="plug">
              <div className="letter">{letter}</div>
              {plugboard[letter] && (
                <div
                  className="connection"
                  title={`Connected to ${plugboard[letter]}`}
                  onClick={() => removeConnection(letter)}
                >
                  ↔ {plugboard[letter]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plugboard;
