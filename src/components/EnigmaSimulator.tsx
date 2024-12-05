import React, { useState } from "react";
import { EnigmaConfig, Rotor } from "../models/EnigmaTypes";
import RotorSettings from "./RotorSettings";
import PlugboardSettings from "./PlugBoardSettings";
import ReflectorSettings from "./ReflectorSettings";
import InputOutputPanel from "./InputOutputPanel";
import ControlPanel from "./ControlPanel";
import { chiffrerMessage } from "../services/ServiceEnigma";

interface EnigmaSimulatorProps {
  config: EnigmaConfig;
  setConfig: React.Dispatch<React.SetStateAction<EnigmaConfig>>;
  onReset: () => void;
}

const EnigmaSimulator: React.FC<EnigmaSimulatorProps> = ({
  config,
  setConfig,
  onReset,
}) => {  

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

  const handleReset = () => {
    // setConfig(null); // Reset the Enigma configuration
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
