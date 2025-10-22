import UnitCard from "./unitCard";

export default function UnitList({ unitsData, onEdit, onDelete }) {
    console.log("unitList", unitsData);

    return (
        <>
            <div className="flex flex-wrap justify-around gap-y-2">
                {unitsData.map((data) => (
                    <UnitCard
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
