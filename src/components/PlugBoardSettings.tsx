import React, { useState } from "react";
import { Plugboard } from "../models/EnigmaTypes";
import "./PlugboardSettings.css";

interface PlugboardSettingsProps {
  plugboard: Plugboard;
  onUpdatePlugboard: (connections: Record<string, string>) => void;
}

const PlugboardSettings: React.FC<PlugboardSettingsProps> = ({ plugboard, onUpdatePlugboard }) => {
  const [input, setInput] = useState("");

  const handleAddConnection = () => {
    const [a, b] = input.toUpperCase().split("");
    if (a && b && a !== b) {
      onUpdatePlugboard({ ...plugboard.connections, [a]: b, [b]: a });
      setInput("");
    }
  };

  const handleRemoveConnection = (letter: string) => {
    const updatedConnections = { ...plugboard.connections };
    const pairedLetter = updatedConnections[letter];
    delete updatedConnections[letter];
    delete updatedConnections[pairedLetter];
    onUpdatePlugboard(updatedConnections);
  };

  return (
    <div className="plugboard-settings">
      <div className="add-connection">
        <input
          type="text"
          maxLength={2}
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          placeholder="Enter Pair (e.g., AB)"
          className="connection-input"
        />
        <button onClick={handleAddConnection} className="add-button">
          Add Connection
        </button>
      </div>
      <div className="plugboard-display">
        <h4>Current Connections</h4>
        <div className="connections">
          {Object.entries(plugboard.connections).map(([letter, pairedLetter]) => (
            <div key={letter} className="connection">
              <span className="letter">{letter}</span>
              <span className="arrow">↔</span>
              <span className="letter">{pairedLetter}</span>
              <button
                className="remove-button"
                onClick={() => handleRemoveConnection(letter)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlugboardSettings;
