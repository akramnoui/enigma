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
    <div className="p-4 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-lg font-semibold text-white mb-4">Rotor Settings</h1>
      <div className="space-y-2">
        {rotors.map((rotor, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-700 rounded-md p-3 shadow-sm"
          >
            <h4 className="text-sm font-medium text-yellow-300">Rotor {index + 1}</h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Pos:</label>
                <input
                  type="number"
                  className="w-12 p-1 text-sm bg-gray-900 text-yellow-300 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  min="0"
                  max="25"
                  value={rotor.position}
                  onChange={(e) => handleUpdate(index, "position", Number(e.target.value))}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">Ring:</label>
                <input
                  type="number"
                  className="w-12 p-1 text-sm bg-gray-900 text-yellow-300 border border-gray-600 rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  min="0"
                  max="25"
                  value={rotor.ringSetting}
                  onChange={(e) => handleUpdate(index, "ringSetting", Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RotorSettings;
