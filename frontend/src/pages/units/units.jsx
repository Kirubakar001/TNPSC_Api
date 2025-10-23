import { useEffect, useState } from "react";
import photo from "../../assets/product-image.jpg";
import UnitsHeader from "@/UI/units/unitHeader";
import LoadingSpinner from "@/components/loading/loadingSpinner";
import UnitList from "../../UI/units/unitList";
import toast from "react-hot-toast";
import { fetchUnits, addUnit, deleteUnit, updateUnit } from "@/api/unitService";
import ConfirmDialog from "../../components/deleteModal/deleteModal";
import Modal from "../../components/modal";
import UnitForm from "../../UI/units/unitForm";
import { showSuccessToast } from "@/utils/toastHelper";

export default function UnitsPage() {
    const [units, setUnits] = useState([]);
    const [filteredUnits, setFilteredUnits] = useState([]);
    const [part, setPart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPartId, setSelectedPartId] = useState("all");

    const user = JSON.parse(localStorage.getItem("tnpscUser") || "{}");

    // Delete state
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);

    // Add/Edit modal
    const [openFormModal, setOpenFormModal] = useState(false);

    /** ✅ Fetch units once on mount */
    useEffect(() => {
        const fetchUnit = async () => {
            try {
                setLoading(true);
                const response = await fetchUnits();

                if (response.status === 200 && response.success === true) {
                    const normalizedUnits = (response.data || []).map((item) => ({
                        ...item,
                        part_id: item.part_id ?? (item.exam_parts_id != null ? Number(item.exam_parts_id) : null),
                    }));

                    setUnits(normalizedUnits);
                    setPart(response.partData || []);
                } else {
                    toast.error(response.message || "Failed to fetch units");
                }
            } catch (error) {
                toast.error(error.message || "Something went wrong ❌");
                setUnits([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUnit();
    }, []);

    /** ✅ Re-filter whenever `units` or `selectedPartId` changes */
    useEffect(() => {
        if (!Array.isArray(units)) return;

        if (selectedPartId === "all") {
            setFilteredUnits(units);
        } else {
            const idNum = Number(selectedPartId);
            const filtered = units.filter((item) => Number(item.part_id) === idNum);
            setFilteredUnits(filtered);
        }
    }, [units, selectedPartId]);

    /** ✅ Handle part selection from dropdown */
    const handlePartSelect = (id) => {
        setSelectedPartId(id ?? "all");
    };

    /** ✅ Delete confirmation */
    const confirmDelete = async () => {
        try {
            if (!selectedUnit) return toast.error("No unit selected for deletion");

            const response = await deleteUnit({
                id: selectedUnit.id,
                user_id: user.emp_id,
            });

            if (response.status === 200 && response.success === true) {
                setUnits((prev) => prev.filter((u) => u.id !== selectedUnit.id));
                showSuccessToast(`${selectedUnit.title} deleted successfully!`);
                setOpenDialog(false);
                setSelectedUnit(null);
            } else {
                toast.error(response.message || "Failed to delete unit ❌");
            }
        } catch (error) {
            toast.error(error.message || "Error deleting unit ❌");
        }
    };

    /** ✅ Add/Edit Unit */
    const handleFormSubmit = async (formData) => {
        try {
            if (!formData) throw new Error("Invalid unit data");

            const isEditing = Boolean(selectedUnit);
            let response;

            if (isEditing) {
                response = await updateUnit({
                    title: formData.title,
                    part_id: formData.part_id,
                    user_id: user.emp_id,
                    id: formData.id,
                });
            } else {
                response = await addUnit({
                    title: formData.title,
                    part_id: formData.part_id,
                    user_id: user.emp_id,
                });
            }

            if (response.status === 200 && response.success === true) {
                let updatedData = response.data;
                if (!updatedData || !updatedData.id) {
                    throw new Error("Invalid data received from server");
                }

                updatedData = {
                    ...updatedData,
                    part_id: updatedData.part_id ?? (updatedData.exam_parts_id != null ? Number(updatedData.exam_parts_id) : null),
                };

                if (isEditing) {
                    setUnits((prev) => prev.map((u) => (u.id === selectedUnit.id ? { ...u, ...updatedData } : u)));
                    showSuccessToast(`${updatedData.title} updated successfully!`);
                } else {
                    setUnits((prev) => [...prev, updatedData]);
                    showSuccessToast(`${updatedData.title} added successfully!`);
                }

                setSelectedUnit(null);
                setOpenFormModal(false);
            } else {
                throw new Error(response.message || "Failed to save unit");
            }
        } catch (error) {
            console.error("Error during save:", error);
            toast.error(error.message || "Error saving unit ❌");
        }
    };

    return (
        <div>
            <p className="title mb-5 text-center">Units</p>

            <UnitsHeader
                partsData={part}
                onClick={() => setOpenFormModal(true)}
                onSelectPart={handlePartSelect}
            />

            {loading ? (
                <LoadingSpinner message={"Loading Units..."} />
            ) : filteredUnits.length === 0 ? (
                <div className="m-5 flex w-full justify-center">
                    <div className="card w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-md dark:bg-slate-900">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                <img
                                    src={photo}
                                    alt="No Data"
                                    className="h-16 w-16 opacity-80"
                                />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">No Units Found</h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                It looks like there are no units created yet.
                                <br />
                                Click <span className="font-medium text-green-600 dark:text-green-400">Add Units</span> to get started.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <UnitList
                    unitsData={filteredUnits}
                    onEdit={(data) => {
                        setSelectedUnit(data);
                        setOpenFormModal(true);
                    }}
                    onDelete={(data) => {
                        setSelectedUnit(data);
                        setOpenDialog(true);
                    }}
                />
            )}

            {/* Delete confirmation */}
            <ConfirmDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message={
                    <p className="card-title text-center font-semibold text-gray-700">
                        Are you sure you want to delete <span className="font-semibold text-red-500">{selectedUnit?.title}</span>?
                    </p>
                }
            />

            {/* Add/Edit Modal */}
            <Modal
                open={openFormModal}
                onClose={() => {
                    setSelectedUnit(null);
                    setOpenFormModal(false);
                }}
                title={selectedUnit ? "Edit Unit" : "Add New Unit"}
            >
                <UnitForm
                    initialData={selectedUnit}
                    partsData={part}
                    onClose={() => {
                        setSelectedUnit(null);
                        setOpenFormModal(false);
                    }}
                    onSubmit={handleFormSubmit}
                />
            </Modal>
        </div>
    );
}
