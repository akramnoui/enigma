import React from "react";
import { Rotor } from "../models/EnigmaTypes";

interface RotorSettingsProps {
  rotors: Rotor[];
  onUpdateRotor: (index: number, updatedRotor: Rotor) => void;
}

const RotorSettings: React.FC<RotorSettingsProps> = ({ rotors, onUpdateRotor }) => {
    const handleUpdate = (index: number, field: keyof Rotor, value: string | number) => {
      const updatedRotor = { ...rotors[index], [field]: value };
      onUpdateRotor(index, updatedRotor);
    };
  
    return (
      <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-lg font-bold text-white mb-4">Réglages des Rotors</h1>
        {rotors.map((rotor, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-sm text-gray-300">Rotor {index + 1}</h4>
            <div className="flex items-center gap-2 mt-2">
              <label className="text-sm text-gray-400">Position:</label>
              <input
                type="number"
                className="w-16 p-1 text-sm bg-gray-700 text-white border border-gray-600 rounded"
                min="0"
                max="25"
                value={rotor.position}
                onChange={(e) => handleUpdate(index, "position", Number(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="text-sm text-gray-400">Réglage de l'Anneau:</label>
              <input
                type="number"
                className="w-16 p-1 text-sm bg-gray-700 text-white border border-gray-600 rounded"
                min="0"
                max="25"
                value={rotor.ringSetting}
                onChange={(e) => handleUpdate(index, "ringSetting", Number(e.target.value))}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default RotorSettings;


  