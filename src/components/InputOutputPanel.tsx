import React, { useState } from "react";

interface InputOutputPanelProps {
  onEncrypt: (message: string) => string;
}

const InputOutputPanel: React.FC<InputOutputPanelProps> = ({ onEncrypt }) => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
  
    const handleEncrypt = () => {
      setOutput(onEncrypt(input));
    };
  
    return (
      <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4">Chiffrement</h3>
        <textarea
          className="w-full p-2 text-sm bg-gray-700 text-white border border-gray-600 rounded mb-4"
          placeholder="Entrez le texte à chiffrer"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
        />
        <button
          className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleEncrypt}
        >
          Chiffrer
        </button>
        <textarea
          className="w-full p-2 mt-4 text-sm bg-gray-700 text-white border border-gray-600 rounded"
          placeholder="Texte chiffré"
          value={output}
          readOnly
        />
      </div>
    );
  };
  
  export default InputOutputPanel;
  