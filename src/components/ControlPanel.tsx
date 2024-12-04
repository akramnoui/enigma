import React from "react";

interface ControlPanelProps {
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onReset }) => (
  <div>
    <button onClick={onReset}>Réinitialiser</button>
  </div>
);

export default ControlPanel;
