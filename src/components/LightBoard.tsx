import React from "react";

interface LightboardProps {
  letter: string | null;
}

const Lightboard: React.FC<LightboardProps> = ({ letter }) => {
  // Full AZERTY keyboard layout
  const azertyLayout = [
    "A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P",
    "Q", "S", "D", "F", "G", "H", "J", "K", "L", "M",
    "W", "X", "C", "V", "B", "N"
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-800 rounded-md">
      {azertyLayout.map((key) => (
        <div
          key={key}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${
            letter === key ? "bg-yellow-500" : "bg-gray-500"
          }`}
        >
          {key}
        </div>
      ))}
    </div>
  );
};

export default Lightboard;
