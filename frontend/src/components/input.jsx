const Input = ({ label, name, type, value, onChange, placeholder, required }) => {
    return (
        <div className="mb-3 flex flex-col">
            {label && <label className="mb-1 font-medium">{label}</label>}
            <input
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="text rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default Input;
