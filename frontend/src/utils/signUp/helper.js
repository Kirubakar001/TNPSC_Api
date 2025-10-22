import { signUp } from "@/api/authService";

export const validateForm = (form) => {
    const errors = {};

    if (!form.name.trim()) errors.name = "Employee Name is required";
    if (!form.emp_id.trim()) errors.emp_id = "Employee ID is required";
    if (!form.password.trim()) errors.password = "Password is required";
    if (!form.confirmPassword.trim()) errors.confirmPassword = "Please confirm your password";

    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};

export const handleSignUp = async (form, navigate, toast, setForm, initialFormState) => {
    try {
        const response = await signUp({
            emp_id: form.emp_id,
            password: form.password,
            name: form.name,
        });

        if (response.status === 200) {
            toast.success("Good Job! Employee registered successfully!", { icon: "👏" });
            toast.success("Sign in to continue");
            setForm(initialFormState);
            navigate("/signin");
        }
    } catch (err) {
        // toast.error(err.response?.data?.message || "Sign up failed");
        setForm(initialFormState);
    }
};
