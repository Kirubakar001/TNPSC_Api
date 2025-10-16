import { useState, useEffect } from "react";
import FormField from "@/components/forms/formField";
import SubmitButton from "@/components/actionButtons/SubmitButton";
import CancelButton from "@/components/actionButtons/CancelButton";

export default function GroupForm({ initialData = null, onSubmit, onClose }) {
    const initialFormState = { title: "", sub_title: "", img: null };
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    // Populate form if initialData is provided (for editing)
    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                sub_title: initialData.sub_title || "",
                img: initialData.img || null, // could be URL or File
                id: initialData.id,
            });
        }
    }, [initialData]);

    // ✅ Handle input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "img") {
            // ✅ Only take the first file (FileList → File)
            const file = files && files[0] ? files[0] : null;
            setForm({ ...form, img: file });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // ✅ Simple validation
    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.sub_title.trim()) newErrors.sub_title = "Sub-title is required";
        return newErrors;
    };

    // ✅ Handle form submit (Add or Edit)
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        // 🟢 If user didn't change image while editing, keep URL
        const formToSend = {
            ...form,
            ...(initialData && typeof form.img === "string"
                ? { img_url: form.img } // send existing URL
                : { img: form.img }), // send new File
        };

        console.log("Final form data to submit:", formToSend);
        if (onSubmit) onSubmit(formToSend);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md dark:bg-slate-900"
        >
            <h2 className="mb-6 text-center text-xl font-bold text-slate-700 dark:text-slate-200">{initialData ? "Edit Group" : "Add Group"}</h2>

            {/* Title */}
            <FormField
                label="Title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter group title"
                error={errors.title}
            />

            {/* Sub-title */}
            <FormField
                label="Sub-title"
                type="text"
                name="sub_title"
                value={form.sub_title}
                onChange={handleChange}
                placeholder="Enter sub-title"
                error={errors.sub_title}
            />

            {/* 🟢 File Input */}
            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-slate-600 dark:text-slate-300">Image</label>
                <input
                    type="file"
                    name="img"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.img && <p className="mt-1 text-xs text-red-500">{errors.img}</p>}
            </div>

            {/* 🟢 Preview Image */}
            {form.img && (
                <div className="mb-4 flex justify-center">
                    <img
                        src={typeof form.img === "string" ? form.img : URL.createObjectURL(form.img)}
                        alt="Preview"
                        className="h-24 w-24 rounded-lg object-cover"
                    />
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-around">
                <CancelButton
                    onClick={onClose}
                    theme="red"
                />
                <SubmitButton
                    label={initialData ? "Update Group" : "Add Group"}
                    type="submit"
                    theme="green"
                />
            </div>
        </form>
    );
}
