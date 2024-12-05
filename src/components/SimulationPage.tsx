import React, { useState } from "react";
import EnigmaKeyboard from "./EnigmaKeyboard";
import RotorDisplay from "./RotorDisplay";
import { EnigmaConfig, Rotor } from "../models/EnigmaTypes";
import "./SimulationPage.css";
import { chiffrerLettre, chiffrerMessage } from "../services/ServiceEnigma";
import ControlPanel from "./ControlPanel";
import InputOutputPanel from "./InputOutputPanel";
import PlugboardSettings from "./PlugBoardSettings";
import RotorSettings from "./RotorSettings";
import Lightboard from "./Lightboard";

const SimulationPage: React.FC = () => {
  const defaultConfig: EnigmaConfig = {
    rotors: [
      { cablage: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q", position: 0, ringSetting: 0 },
      { cablage: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E", position: 0, ringSetting: 0 },
      { cablage: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V", position: 0, ringSetting: 0 },
    ],
    reflecteur: {
      wiring: {
        A: "Y", B: "R", C: "U", D: "H", E: "Q", F: "S", G: "L", H: "D",
        I: "P", J: "X", K: "N", L: "G", M: "O", N: "K", O: "M", P: "I",
        Q: "E", R: "B", S: "F", T: "Z", U: "C", V: "W", W: "V", X: "J",
        Y: "A", Z: "T",
      },
    },
    plugboard: { connections: {} },
  };

  const [config, setConfig] = useState<EnigmaConfig>(defaultConfig);
  const [encryptedText, setEncryptedText] = useState("");
  const [highlightedLetter, setHighlightedLetter] = useState<string | null>(null);

  const handleLetterClick = (letter: string) => {
    const encryptedLetter = chiffrerLettre(config, letter, setConfig);
    setEncryptedText((prev) => prev + encryptedLetter);
    setHighlightedLetter(encryptedLetter);
    setTimeout(() => setHighlightedLetter(null), 2000);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    setEncryptedText("");
    setHighlightedLetter(null);
  };

  const handleUpdateRotor = (index: number, updatedRotor: Rotor) => {
    const updatedRotors = [...config.rotors];
    updatedRotors[index] = updatedRotor;
    setConfig({ ...config, rotors: updatedRotors });
  };

  const handleUpdatePlugboard = (connections: Record<string, string>) => {
    setConfig({ ...config, plugboard: { connections } });
  };

  const handleEncryptMessage = (message: string): string =>
    chiffrerMessage(config, message, setConfig);

  return (
    <div className="simulation-page min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Enigma Simulator</h1>

        {/* Settings and Input/Output Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RotorSettings rotors={config.rotors} onUpdateRotor={handleUpdateRotor} />
          <PlugboardSettings plugboard={config.plugboard} onUpdatePlugboard={handleUpdatePlugboard} />
          {/* <InputOutputPanel onEncrypt={handleEncryptMessage} /> */}
        </div>

        {/* Rotor Display */}
        <RotorDisplay
          rotorPositions={config.rotors.map((rotor) => rotor.position)}
        />

        {/* Lightboard and Keyboard */}
        <div className="flex flex-col items-center mt-8">
          <Lightboard letter={highlightedLetter}/>
          <div className="w-full">
            <EnigmaKeyboard onLetterClick={handleLetterClick} />
          </div>
        </div>

        {/* Encrypted Message Output */}
        <div className="output mt-8 bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Encrypted Message:</h3>
          <p className="mt-2 text-yellow-300">{encryptedText}</p>
          <button
            onClick={handleReset}
            className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg shadow"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimulationPage;
