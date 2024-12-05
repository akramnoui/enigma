import React, { useState } from "react";
import EnigmaKeyboard from "./EnigmaKeyboard";
import RotorDisplay from "./RotorDisplay";
import EnigmaSimulator from "./EnigmaSimulator";
import { EnigmaConfig, Rotor } from "../models/EnigmaTypes";
import "./SimulationPage.css";
import { chiffrerLettre, chiffrerMessage } from "../services/ServiceEnigma";
import ControlPanel from "./ControlPanel";
import InputOutputPanel from "./InputOutputPanel";
import PlugboardSettings from "./PlugBoardSettings";
import ReflectorSettings from "./ReflectorSettings";
import RotorSettings from "./RotorSettings";
import Lightboard from "./Lightboard";

const SimulationPage: React.FC = () => {
  const defaultConfig: EnigmaConfig = {
    rotors: [
      {
        cablage: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        notch: "Q",
        position: 0,
        ringSetting: 0,
      },
      {
        cablage: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        notch: "E",
        position: 0,
        ringSetting: 0,
      },
      {
        cablage: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        notch: "V",
        position: 0,
        ringSetting: 0,
      },
    ],
    reflecteur: {
      wiring: {
        A: "Y",
        B: "R",
        C: "U",
        D: "H",
        E: "Q",
        F: "S",
        G: "L",
        H: "D",
        I: "P",
        J: "X",
        K: "N",
        L: "G",
        M: "O",
        N: "K",
        O: "M",
        P: "I",
        Q: "E",
        R: "B",
        S: "F",
        T: "Z",
        U: "C",
        V: "W",
        W: "V",
        X: "J",
        Y: "A",
        Z: "T",
      },
    },
    plugboard: { connections: {} },
  };

  // Manage the shared Enigma configuration state in SimulationPage
  const [config, setConfig] = useState<EnigmaConfig>(defaultConfig);
  const [encryptedText, setEncryptedText] = useState("");
  const [highlightedLetter, setHighlightedLetter] = useState<string | null>(
    null
  );

  const handleLetterClick = (letter: string) => {
    // Encrypt the letter using the shared Enigma configuration
    const encryptedLetter = chiffrerLettre(config, letter, setConfig);
    setEncryptedText((prev) => prev + encryptedLetter);
    setHighlightedLetter(encryptedLetter);
    setTimeout(() => setHighlightedLetter(null), 500);
  };

  const handleReset = () => {
    setConfig(defaultConfig); // Reset the entire Enigma configuration
    setEncryptedText(""); // Clear the encrypted text
    setHighlightedLetter(null); // Clear any highlights
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

  //   const handleReset = () => {
  //     setConfig(null); // Reset the Enigma configuration
  //   };

  return (
    <div className="simulation-page">
      {/* Pass the shared state and handlers to EnigmaSimulator */}
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-8">Simulateur Enigma</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          <RotorSettings
            rotors={config.rotors}
            onUpdateRotor={handleUpdateRotor}
          />
          <PlugboardSettings
            plugboard={config.plugboard}
            onUpdatePlugboard={handleUpdatePlugboard}
          />
          {/* <ReflectorSettings
            reflector={config.reflecteur}
            onUpdateReflector={() => {}}
          /> */}
          <InputOutputPanel onEncrypt={handleEncryptMessage} />
          <ControlPanel onReset={handleReset} />
        </div>
      </div>
      {/* <RotorDisplay rotors={config.rotors} /> */}
      <RotorDisplay rotorPositions={config.rotors.map((rotor) => rotor.position)} />
      <EnigmaKeyboard onLetterClick={handleLetterClick} />
      <Lightboard letter={highlightedLetter} />
      <div className="output">
        <h3>Encrypted Message:</h3>
        <p>{encryptedText}</p>
      </div>
    </div>
  );
};

export default SimulationPage;
