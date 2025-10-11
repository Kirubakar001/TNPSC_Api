import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AuthLayout from "@/layouts/AuthLayout";
import { signUp } from "@/service/authService";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const SignUp = () => {
    const [form, setForm] = useState({
        emp_id: "",
        name: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Handle input changes and clear field-specific error when user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Remove error dynamically for that field
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    // Validate all fields
    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) newErrors.name = "Employee Name is required";
        if (!form.emp_id.trim()) newErrors.emp_id = "Employee ID is required";
        if (!form.password.trim()) newErrors.password = "Password is required";
        if (!form.confirmPassword.trim()) newErrors.confirmPassword = "Please confirm your password";

        if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await signUp({
                emp_id: form.emp_id,
                password: form.password,
                name: form.name,
            });
            console.log(response);

            if (response.status === 200) {
                toast.success("Good Job! Employee registered successfully!", {
                    icon: "👏",
                });
                toast.success("Sign to continue");
                navigate("/signin");
            }
        } catch (err) {
            toast.error(err.response.data.message || "Sign up failed");
        }
    };

    return (
        <AuthLayout>
            <h2 className="mb-6 text-center text-2xl font-bold max-sm:mb-3">Sign Up</h2>

            <form onSubmit={handleSubmit}>
                {/* Employee Name */}
                <div className="mb-4">
                    <Input
                        label="Employee Name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your Name"
                    />
                    {errors.name && <p className="mt-1 text-sm font-semibold text-red-500">{errors.name}</p>}
                </div>

                {/* Employee ID */}
                <div className="mb-4">
                    <Input
                        label="Employee ID"
                        type="text"
                        name="emp_id"
                        value={form.emp_id}
                        onChange={handleChange}
                        placeholder="Enter your Employee ID"
                    />
                    {errors.emp_id && <p className="mt-1 text-sm font-semibold text-red-500">{errors.emp_id}</p>}
                </div>

                {/* Password field */}
                <div className="relative mb-4">
                    <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    <span
                        className="absolute right-3 top-9 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </span>
                    {errors.password && <p className="mt-1 text-sm font-semibold text-red-500">{errors.password}</p>}
                </div>

                {/* Confirm password field */}
                <div className="mb-4">
                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm font-semibold text-red-500">{errors.confirmPassword}</p>}
                </div>

                <Button
                    type="submit"
                    className="mt-2 w-full bg-green-500 hover:bg-green-700"
                >
                    Sign Up
                </Button>

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
        </AuthLayout>
    );
};

export default SignUp;
