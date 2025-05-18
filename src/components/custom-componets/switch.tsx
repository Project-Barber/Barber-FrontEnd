import React, { useState } from "react";

type ToggleButtonProps = {
  onChange: (value: "barbeiros" | "secretarios") => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ onChange }) => {
  const [active, setActive] = useState<"barbeiros" | "secretarios">("barbeiros");

  const handleClick = (value: "barbeiros" | "secretarios") => {
    setActive(value);
    onChange(value);
  };

  return (
    <div className="inline-flex rounded-md border border-gray-300 bg-gray-100 p-1">
      <button
        className={`px-4 py-2 rounded-md font-medium ${
          active === "barbeiros"
            ? "bg-white shadow text-black"
            : "text-gray-500 hover:bg-gray-200 cursor-pointer"
        }`}
        onClick={() => handleClick("barbeiros")}
      >
        Barbeiros
      </button>
      <button
        className={`ml-1 px-4 py-2 rounded-md font-medium ${
          active === "secretarios"
            ? "bg-white shadow text-black"
            : "text-gray-500 hover:bg-gray-200 cursor-pointer"
        }`}
        onClick={() => handleClick("secretarios")}
      >
        Secretários
      </button>
    </div>
  );
};

export default ToggleButton;
