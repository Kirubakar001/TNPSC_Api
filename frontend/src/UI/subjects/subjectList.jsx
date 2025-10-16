import SubjectCard from "./subjectCard";

export default function SubjectList({ parts, onEdit, onDelete }) {
    return (
        <>
            <div className="flex flex-wrap justify-center gap-4">
                {parts.map((data) => (
                    <SubjectCard
                        key={data.id}
                        data={data}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    );
}
