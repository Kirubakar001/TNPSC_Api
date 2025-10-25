import QuestionCard from "./questionCard";

export default function QuestionList({ questionData, onEdit, onDelete }) {
    return (
        <>
            <div className="gap-y-2">
                {questionData.map((data) => (
                    <QuestionCard
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
