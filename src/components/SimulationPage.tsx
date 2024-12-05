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

  const [config, setConfig] = useState<EnigmaConfig>(defaultConfig);
  const [encryptedText, setEncryptedText] = useState("");
  const [highlightedLetter, setHighlightedLetter] = useState<string | null>(
    null
  );

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
        <h1 className="text-4xl font-bold mb-8 text-center">
          Enigma Simulator
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Rotor Settings</h2>
          <p className="text-gray-300 mb-6">
            Configure the rotor positions and settings to adjust how the Enigma
            machine encrypts messages. Rotors add layers of complexity to the
            encryption.
          </p>
          <RotorSettings
            rotors={config.rotors}
            onUpdateRotor={handleUpdateRotor}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Plugboard Settings</h2>
          <p className="text-gray-300 mb-6">
            Set up the plugboard to map letters to other letters. The plugboard
            increases the number of possible encryption combinations.
          </p>
          <PlugboardSettings
            plugboard={config.plugboard}
            onUpdatePlugboard={handleUpdatePlugboard}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Rotor Display</h2>
          <p className="text-gray-300 mb-6">
            View the current positions of the rotors as they rotate during
            encryption. The rotors simulate the mechanical behavior of the
            Enigma machine.
          </p>
          <RotorDisplay
            rotorPositions={config.rotors.map((rotor) => rotor.position)}
          />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Encryption Process</h2>
          <p className="text-gray-300 mb-6">
            Type a letter to see its encrypted counterpart light up on the
            lightboard. Observe the real-time simulation of the Enigma machine's
            behavior.
          </p>
          <div className="flex flex-col items-center">
            <Lightboard letter={highlightedLetter} />
            <div className="w-full mt-6">
              <EnigmaKeyboard onLetterClick={handleLetterClick} />
            </div>
          </div>
        </section>

        <section className="output-section bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Encrypted Message
          </h2>
          <p className="text-gray-400 mb-4">
            Below is the encrypted message generated by the Enigma machine. You
            can click "Reset" to clear the message and start over.
          </p>
          <div className="output-message bg-gray-900 text-yellow-300 text-xl font-mono px-4 py-6 rounded-lg shadow-inner">
            {encryptedText || "No message encrypted yet."}
          </div>
          <button
            onClick={handleReset}
            className="mt-6 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transition-all duration-200"
          >
            Reset
          </button>
        </section>
      </div>
    </div>
  );
};

export default SimulationPage;
