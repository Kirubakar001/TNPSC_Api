import { signIn } from "@/service/authService";

export const validateForm = (form) => {
    const newErrors = {};
    if (!form.emp_id.trim()) newErrors.emp_id = "Employee ID is required";
    if (!form.password.trim()) newErrors.password = "Password is required";

    return newErrors;
};

export const handleSignIn = async (form, setForm, toast, navigate, initialFormState) => {
    try {
        const response = await signIn({
            emp_id: form.emp_id,
            password: form.password,
        });
        console.log(response);

        if (response.status === 200) {
            console.log("passed");
            toast.success(response.message, "!!!");
            localStorage.setItem("authToken", JSON.stringify(response.data));
            setForm(initialFormState);
            navigate("/");
        }
    } catch (err) {
        toast.error(err.response.data.message || "Login failed");
        setForm(initialFormState);
    }
};
