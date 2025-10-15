import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/Input";

const PasswordField = ({ showPassword, setShowPassword, value, onChange, error }) => (
    <div className="relative mb-4">
        <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={value}
            onChange={onChange}
            placeholder="Enter your password"
        />
        <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
        >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
        {error && <p className="mt-1 text-sm font-semibold text-red-500">{error}</p>}
    </div>
);

export default PasswordField;
