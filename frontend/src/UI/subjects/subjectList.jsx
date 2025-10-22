import SubjectCard from "./subjectCard";

export default function SubjectList({ data, onEdit, onDelete }) {
    return (
        <>
            <div className="flex flex-wrap justify-center gap-4">
                {data.map((data) => (
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
