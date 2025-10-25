import { useState, useEffect } from "react";
import CancelButton from "@/components/actionButtons/cancelButton";
import SubmitButton from "@/components/actionButtons/submitButton";
import FormField from "@/components/forms/formField";
import toast from "react-hot-toast";
import { addQuestion, updateQuestion } from "@/api/questionService";
import { fetchPart } from "@/api/subjectService"; // updated names
import { fetchUnits } from "@/api/unitService"; // updated names
import { fetchTitles } from "@/api/titleService"; // updated names

export default function QuestionForm({ initialData = null, onSubmit,onClose }) {
    const isEditMode = !!initialData;

    const [form, setForm] = useState({
        question: "",
        optiona: "",
        optionb: "",
        optionc: "",
        optiond: "",
        coption: "",
        year: "",
        subject_id: "",
        unit_id: "",
        title_id: "",
    });

    const [subjects, setSubjects] = useState([]);
    const [units, setUnits] = useState([]);
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        if (isEditMode) {
            setForm({ ...initialData });
        }
    }, [initialData]);

    useEffect(() => {
        const loadDropdowns = async () => {
            try {
                const [subjectRes, unitRes, titleRes] = await Promise.all([fetchPart(), fetchUnits(), fetchTitles()]);
                console.log(subjectRes.data);

                setSubjects(subjectRes.data);
                setUnits(unitRes.data);
                setTitles(titleRes.data);
            } catch (error) {
                toast.error("Failed to load dropdown data");
            }
        };
        loadDropdowns();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateQuestion(form.id, form);
                toast.success("Question updated successfully!");
            } else {
                await addQuestion(form);
                toast.success("Question added successfully!");
            }
            if (onSubmit) onSubmit();
        } catch (error) {
            toast.error("Error saving question");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex h-[500px] flex-col gap-4 overflow-scroll rounded-xl bg-white p-6 shadow-md"
        >
            <h2 className="mb-2 text-xl font-semibold">{isEditMode ? "Update Question" : "Add New Question"}</h2>

            {/* Subject */}
            <div>
                <label className="mb-1 block text-sm font-medium">Subject</label>
                <select
                    name="subject_id"
                    value={form.subject_id}
                    onChange={handleChange}
                    className="w-full rounded-md border p-2"
                    // required
                >
                    <option value="">Select Subject</option>
                    {subjects.map((s) => (
                        <option
                            key={s.id}
                            value={s.id}
                        >
                            {s.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Unit */}
            <div>
                <label className="mb-1 block text-sm font-medium">Unit</label>
                <select
                    name="unit_id"
                    value={form.unit_id}
                    onChange={handleChange}
                    className="w-full rounded-md border p-2"
                    // required
                >
                    <option value="">Select Unit</option>
                    {units.map((u) => (
                        <option
                            key={u.id}
                            value={u.id}
                        >
                            {u.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Title */}
            <div>
                <label className="mb-1 block text-sm font-medium">Title</label>
                <select
                    name="title_id"
                    value={form.title_id}
                    onChange={handleChange}
                    className="w-full rounded-md border p-2"
                    // required
                >
                    <option value="">Select Title</option>
                    {titles.map((t) => (
                        <option
                            key={t.id}
                            value={t.id}
                        >
                            {t.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Question */}
            <FormField
                label="Question"
                name="question"
                value={form.question}
                onChange={handleChange}
                placeholder="Enter the question"
                required
            />

            {/* Options */}
            {["a", "b", "c", "d"].map((data) => (
                <FormField
                    key={data}
                    label={`Option ${data}`}
                    name={`option${data}`}
                    value={form[`option${data}`]}
                    onChange={handleChange}
                    placeholder={`Enter option ${data}`}
                    required
                />
            ))}

            {/* Correct Option */}
            <div>
                <label className="mb-1 block text-sm font-medium">Correct Option</label>
                <select
                    name="coption"
                    value={form.coption}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border p-2"
                >
                    <option value="">Select correct option</option>
                    {["a", "b", "c", "d"].map((data) => (
                        <option
                            key={data}
                            value={data}
                        >
                            Option {data}
                        </option>
                    ))}
                </select>
            </div>

            {/* Year */}
            <FormField
                label="Year"
                name="year"
                type="databer"
                value={form.year}
                onChange={handleChange}
                placeholder="Enter the year"
                required
            />

            <div className="mt-4 flex justify-around">
                <CancelButton
                    onClick={onClose}
                    theme="red"
                />
                <SubmitButton
                    label={isEditMode ? "Update Question" : "Add Question"}
                    type="submit"
                    theme="green"
                />
            </div>
        </form>
    );
}
