import { toast } from "react-hot-toast";

/**
 * Show a success toast with dark/light mode styling
 * @param {string} message - The message to display
 */
export const showSuccessToast = (message) => {
    const isDark = document.documentElement.classList.contains("dark");

    toast.success(message, {
        style: {
            fontWeight: 600,
            background: isDark ? "#1e293b" : "#f1f5f9",
            color: isDark ? "#f8fafc" : "#1e293b",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
        },
        duration: 3000, // auto close after 3 seconds
    });
};
