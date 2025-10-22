// src/components/AddButton.jsx
import { CirclePlus } from "lucide-react";

const AddButton = ({ label = "Add", onClick, theme = "blue" }) => {
    const themeClasses = {
        blue: "bg-blue-500 hover:bg-blue-600",
        green: "bg-green-500 hover:bg-green-600",
        red: "bg-red-500 hover:bg-red-600",
        teal: "bg-teal-500 hover:bg-teal-600",
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white ${themeClasses[theme] || themeClasses.blue} transition-colors`}
        >
            <CirclePlus className="h-5 w-5" />
            {label}
        </button>
    );
};

export default AddButton;
