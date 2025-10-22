import { useState, useEffect } from "react";
import FormField from "@/components/forms/formField";
import CancelButton from "@/components/actionButtons/cancelButton";
import SubmitButton from "@/components/actionButtons/submitButton";
import toast from "react-hot-toast";

export default function UnitForm({ initialData = null, unitsData = [], onClose, onSubmit }) {
    const initialFormState = { title: "", unit_id: "" };
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    // ✅ Populate form if editing
    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                unit_id: initialData.unit_id?.toString() || "",
                id: initialData.id || null,
            });
        } else {
            setForm(initialFormState);
        }
    }, [initialData]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Validation
    const validate = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = "Title is required";
        if (!form.unit_id) newErrors.unit_id = "Please select a unit";
        return newErrors;
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        try {
            if (onSubmit) {
                const payload = {
                    ...form,
                    unit_id: Number(form.unit_id),
                };
                console.log("Submitting payload:", payload);
                await onSubmit(payload);
            }
            toast.success(initialData ? "Unit updated successfully!" : "Unit added successfully!");
            if (onClose) onClose();
        } catch (error) {
            toast.error(error.message || "Something went wrong ❌");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="mb-6 text-center text-xl font-bold text-slate-700 dark:text-slate-200">
                {initialData ? "Edit Unit" : "Add Unit"}
            </h2>

            {/* Title Field */}
            <FormField
                label="Title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter unit title"
                error={errors.title}
            />

            {/* Unit Selection Dropdown */}
            <div className="mb-4">
                <label className="mb-2 block font-medium">Select Unit</label>
                <select
                    name="unit_id"
                    value={form.unit_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                    <option value="">-- Select a Unit --</option>
                    {unitsData.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                            {unit.title}
                        </option>
                    ))}
                </select>
                {errors.unit_id && (
                    <p className="mt-1 text-sm text-red-500">{errors.unit_id}</p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-around">
                <CancelButton onClick={onClose} theme="red" />
                <SubmitButton
                    label={initialData ? "Update Unit" : "Add Unit"}
                    type="submit"
                    theme="green"
                />
            </div>
        </form>
    );
}
