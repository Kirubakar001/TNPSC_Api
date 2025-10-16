import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import FormField from "@/components/forms/FormField";
import PasswordField from "@/components/forms/PasswordField";
import toast from "react-hot-toast";
import { validateForm, handleSignUp } from "@/utils/signUp/helper";

export default function SignUpForm() {
    const fields = [
        { label: "Employee Name", name: "name", type: "text", placeholder: "Enter your Name" },
        { label: "Employee ID", name: "emp_id", type: "text", placeholder: "Enter your Employee ID" },
    ];
    const initialFormState = {
        emp_id: "",
        name: "",
        password: "",
        confirmPassword: "",
    };
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            await handleSignUp(form, navigate, toast, setForm, initialFormState);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Dynamic Fields */}
                {fields.map(({ label, name, type, placeholder }) => (
                    <FormField
                        key={name}
                        label={label}
                        name={name}
                        type={type}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        error={errors[name]}
                    />
                ))}

                {/* Password Field (custom behavior) */}
                <PasswordField
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    value={form.password}
                    onChange={handleChange}
                    error={errors.password}
                />

                {/* Confirm Password Field */}
                <FormField
                    key="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    error={errors.confirmPassword}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="mt-2 w-full bg-green-500 hover:bg-green-700"
                >
                    Sign Up
                </Button>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-around">
                    <p>Already have an account?</p>
                    <Button
                        type="button"
                        onClick={() => navigate("/signin")}
                        className="w-max hover:bg-blue-700"
                    >
                        Sign&nbsp;In
                    </Button>
                </div>
            </form>
        </div>
    );
}
