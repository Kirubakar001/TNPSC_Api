import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import AuthLayout from "@/layouts/AuthLayout";
import { signIn } from "@/service/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignIn = () => {
    const [form, setForm] = useState({ emp_id: "", password: "" });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.emp_id.trim()) newErrors.emp_id = "Employee ID is required";
        if (!form.password.trim()) newErrors.password = "Password is required";
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await signIn(form);
            console.log(response);
            
            if (response.status === 200) {
                toast.success("Signed in successfully!");
                localStorage.setItem("authToken", JSON.stringify(response.data));
                navigate("/");
            }
        } catch (err) {
            toast.error(err.response.data.message || "Login failed");
        }
    };

    return (
        <AuthLayout>
            <h2 className="mb-6 text-center text-2xl font-bold max-sm:mb-3">Sign In</h2>
            {error.form && <p className="mb-4 text-center font-semibold text-red-500">{error.form}</p>}

            <form onSubmit={handleSubmit}>
                <Input
                    label="Employee ID"
                    type="text"
                    name="emp_id"
                    value={form.emp_id}
                    onChange={handleChange}
                    placeholder="Enter your Employee ID"
                />
                {error.emp_id && <p className="mb-1 text-sm font-semibold text-red-500">{error.emp_id}</p>}

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                />
                {error.password && <p className="mb-1 text-sm font-semibold text-red-500">{error.password}</p>}

                <Button
                    type="submit"
                    className="mt-2 w-full bg-green-500 hover:bg-green-700"
                >
                    Sign In
                </Button>

                <div className="mt-3 flex items-center justify-around">
                    <p>Don&apos;t have an account?</p>
                    <Button
                        type="button"
                        onClick={() => navigate("/signup")}
                        className="w-max hover:bg-blue-700"
                    >
                        Sign&nbsp;Up
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
};

export default SignIn;
