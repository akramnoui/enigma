import React, { useState } from "react";
import { Plugboard } from "../models/EnigmaTypes";

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
  
    return (
      <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4">Tableau de Connexion</h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="w-20 p-1 text-sm bg-gray-700 text-white border border-gray-600 rounded"
            maxLength={2}
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="Ex: AB"
          />
          <button
            className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAddConnection}
          >
            Ajouter
          </button>
        </div>
        <div className="mt-4">
          <h4 className="text-sm text-gray-400">Connexions Actuelles:</h4>
          {Object.entries(plugboard.connections).map(([key, value]) => (
            <p key={key} className="text-sm text-gray-300">
              {key} ↔ {value}
            </p>
          ))}
        </div>
      </div>
    );
  };
  
  export default PlugboardSettings;
  