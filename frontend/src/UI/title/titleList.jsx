import TitleCard from "./titleCard";

export default function TitleList({ titleData, onEdit, onDelete }) {
    return (
        <>
            <div className="flex flex-wrap justify-around gap-y-2">
                {titleData.map((data) => (
                    <TitleCard
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
