import toast from "react-hot-toast";
import api from "./apiConfig";

export const signIn = async ({ emp_id, password }) => {
    try {
        const response = await api.post("/admin/login", { emp_id, password });

        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message || "Invalid credentials.");
        } else if (error.request) {
            toast.error("No response from server. Please check your connection.");
        } else {
            toast.error("An unexpected error occurred.");
        }
        return null;
    }
};

export const signUp = async ({ emp_id, password, name }) => {
    try {
        const response = await api.post("/admin/add", { emp_id, password, name });

        return response.data;
    } catch (error) {
        if (error.response) {
            // Handle specific backend error codes
            if (error.response.status === 409) {
                toast.error("Employee ID already exists.");
            } else if (error.response.status === 400) {
                toast.error("Invalid data. Please check the fields.");
            } else {
                toast.error(error.response.data.message || "Sign-up failed.");
            }
        } else if (error.request) {
            toast.error("No response from server. Check your connection.");
        } else {
            toast.error("An unexpected error occurred.");
        }
        return null;
    }
};
