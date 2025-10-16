// src/components/AddButton.jsx
import { CirclePlus } from "lucide-react";

const AddButton = ({ label = "Add", onClick, theme = "blue" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white bg-${theme}-500 hover:bg-${theme}-600 transition-colors`}
    >
      <CirclePlus className="h-5 w-5" />
      {label}
    </button>
  );
};

export default AddButton;
