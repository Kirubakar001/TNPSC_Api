import { useState } from "react";
import AddButton from "@/components/addButton/addButton";

export default function TitleHeader({ unitsData = [], onClick, onSelectUnit }) {
    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        if (onSelectUnit) {
            onSelectUnit(selectedId);
        }
    };

    return (
        <div className="mb-5 flex items-center justify-between">
            {/* Dropdown replaces the "Units" text */}
            <select
                className="rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                defaultValue=""
                onChange={handleSelectChange}
            >
                <option value="all">All Title</option>
                {unitsData.map((data, index) => (
                    <option
                        key={index}
                        value={data.id}
                    >
                        {data.title}
                    </option>
                ))}
            </select>

            {/* Add button on the right */}
            <AddButton
                label="Add Titles"
                onClick={onClick}
                theme="green"
            />
        </div>
    );
}
