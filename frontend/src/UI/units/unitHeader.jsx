import AddButton from "@/components/addButton/addButton";

export default function UnitsHeader({ onClick }) {
    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <p className="text text-lg">Units</p>
                <AddButton
                    label="Add Units"
                    onClick={onClick}
                    theme="green"
                />
            </div>
        </>
    );
}
