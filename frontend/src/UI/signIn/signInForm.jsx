import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "@/components/forms/formField";
import Button from "@/components/Button";
import PasswordField from "@/components/forms/PasswordField";
import toast from "react-hot-toast";
import { validateForm, handleSignIn } from "@/utils/signIn/helper";

export default function SignInForm() {
    const initialFormState = { emp_id: "", password: "" };
    const [form, setForm] = useState(initialFormState);
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validateErrors = validateForm(form);
        setError(validateErrors);

        if (Object.values(validateErrors).length === 0) {
            await handleSignIn(form, setForm, toast, navigate, initialFormState);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormField
                    label="Employee ID"
                    type="text"
                    name="emp_id"
                    value={form.emp_id}
                    onChange={handleChange}
                    placeholder="Enter your Employee ID"
                />
                {error.emp_id && <p className="mb-1 text-sm font-semibold text-red-500">{error.emp_id}</p>}

                <PasswordField
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
        </div>
    );
}
