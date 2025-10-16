import AddButton from "@/components/addButton/addButton";

export default function SubjectHeader({ Onclick }) {
    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Subjects</h2>
                <AddButton
                    label="Add Part"
                    onClick={Onclick}
                    theme="green"
                />
            </div>
        </>
    );
}
