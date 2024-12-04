import React from "react";
import { Reflector } from "../models/EnigmaTypes";

interface ReflectorSettingsProps {
  reflector: Reflector;
  onUpdateReflector: (updatedReflector: Reflector) => void;
}

const ReflectorSettings: React.FC<ReflectorSettingsProps> = ({ reflector, onUpdateReflector }) => {
  return (
    <div>
      <h3>Réflecteur</h3>
      <p>Configuration: {JSON.stringify(reflector.wiring)}</p>
      {/* Add dropdown or options to change reflectors if needed */}
    </div>
  );
};

export default ReflectorSettings;
