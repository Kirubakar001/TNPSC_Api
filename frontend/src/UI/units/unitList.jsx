import UnitCard from "./unitCard";

export default function UnitList({ data, onEdit, onDelete }) {
    return (
        <>
            <div className="">
                {data.map((data) => {
                    <UnitCard
                        key={data.id}
                        data={data}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />;
                })}
            </div>
        </>
    );
}
