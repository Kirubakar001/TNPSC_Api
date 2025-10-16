import Input from "@/components/Input";

const FormField = ({ label, type, name, value, onChange, placeholder, error }) => (
    <div className="mb-4 text">
        <Input
            label={label}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
        {error && <p className="mt-1 text-sm font-semibold text-red-500">{error}</p>}
    </div>
);

export default FormField;
