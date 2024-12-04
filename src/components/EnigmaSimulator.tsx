import React, { useState } from "react";
import { EnigmaConfig, Rotor } from "../models/EnigmaTypes";
import RotorSettings from "./RotorSettings";
import PlugboardSettings from "./PlugBoardSettings";
import ReflectorSettings from "./ReflectorSettings";
import InputOutputPanel from "./InputOutputPanel";
import ControlPanel from "./ControlPanel";
import { chiffrerMessage } from "../services/ServiceEnigma";

const EnigmaSimulator: React.FC = () => {
  const [config, setConfig] = useState<EnigmaConfig>({
    rotors: [
      { cablage: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", notch: "Q", position: 0, ringSetting: 0 },
      { cablage: "AJDKSIRUXBLHWTMCQGZNPYFVOE", notch: "E", position: 0, ringSetting: 0 },
      { cablage: "BDFHJLCPRTXVZNYEIWGAKMUSQO", notch: "V", position: 0, ringSetting: 0 },
    ],
    reflecteur: { wiring: { A: "Y", B: "R", C: "U", D: "H", /* etc. */ } },
    plugboard: { connections: {} },
  });

  const handleUpdateRotor = (index: number, updatedRotor: Rotor) => {
    const updatedRotors = [...config.rotors];
    updatedRotors[index] = updatedRotor;
    setConfig({ ...config, rotors: updatedRotors });
  };

  const handleUpdatePlugboard = (connections: Record<string, string>) => {
    setConfig({ ...config, plugboard: { connections } });
  };

  const handleEncryptMessage = (message: string): string =>
    chiffrerMessage(config, message);

  const handleReset = () => {
    // Reset the configuration
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Simulateur Enigma</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">

      <RotorSettings rotors={config.rotors} onUpdateRotor={handleUpdateRotor} />
      <PlugboardSettings
        plugboard={config.plugboard}
        onUpdatePlugboard={handleUpdatePlugboard}
      />
      <ReflectorSettings reflector={config.reflecteur} onUpdateReflector={() => {}} />
      <InputOutputPanel onEncrypt={handleEncryptMessage} />
      <ControlPanel onReset={handleReset} />
      </div>

    </div>
  );
};

export default EnigmaSimulator;
