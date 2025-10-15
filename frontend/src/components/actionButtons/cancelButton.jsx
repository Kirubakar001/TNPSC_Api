const CancelButton = ({ onClick, theme = "gray" }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white bg-${theme}-500 hover:bg-${theme}-600 transition-colors`}
        >
            Cancel
        </button>
    );
};

export default CancelButton;
