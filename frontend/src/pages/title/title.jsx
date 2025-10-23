import { useEffect, useState } from "react";
import photo from "../../assets/product-image.jpg";
import TitleHeader from "@/UI/title/titleHeader";
import LoadingSpinner from "@/components/loading/loadingSpinner";
import toast from "react-hot-toast";
import ConfirmDialog from "../../components/deleteModal/deleteModal";
import { addTitle, deleteTitle, fetchTitles, updateTitle } from "../../api/titleService";
import Modal from "../../components/modal";
import { showSuccessToast } from "@/utils/toastHelper";
import TitleList from "../../UI/title/titleList";
import TitleForm from "../../UI/title/titleForm";

export default function TitlePage() {
    const [title, setTitle] = useState([]); // master list
    const [filteredTitles, setFilteredTitles] = useState([]); // derived filtered list
    const [units, setUnits] = useState([]); //sub list
    const [loading, setLoading] = useState(true);
    const [selectedUnitId, setSelectedUnitId] = useState("all");

    const data = localStorage.getItem("tnpscUser");
    const user = JSON.parse(data);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [openFormModal, setOpenFormModal] = useState(false);

    // Fetch all titles and units once
    useEffect(() => {
        const fetchTitle = async () => {
            try {
                setLoading(true);
                const response = await fetchTitles();

                if (response.status === 200 && response.success === true) {
                    setTitle(response.data);
                    setFilteredTitles(response.data);
                    setUnits(response.unitData || []);
                } else toast.error(response.message);
            } catch (error) {
                toast.error(error.message || "Something went wrong ❌");
                setTitle([]);
                setFilteredTitles([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTitle();
    }, []);

    // Filter logic — re-run when either title data or selected unit changes
    useEffect(() => {
        if (selectedUnitId === "all") {
            setFilteredTitles(title);
        } else {
            const idNum = Number(selectedUnitId);
            setFilteredTitles(title.filter((item) => Number(item.unit_id) === idNum));
        }
    }, [title, selectedUnitId]);

    const handleUnitSelect = (id) => {
        setSelectedUnitId(id ?? "all");
    };

    const confirmDelete = async () => {
        try {
            const response = await deleteTitle({
                id: selectedTitle.id,
                user_id: user.emp_id,
            });

            if (response.status === 200 && response.success === true) {
                setTitle((prev) => prev.filter((data) => data.id !== selectedTitle.id));
                showSuccessToast(`${selectedTitle.title} deleted successfully !!`);
                setOpenDialog(false);
                setSelectedTitle(null);
            } else {
                toast.error(response.message || response.error);
            }
        } catch (error) {
            toast.error(error.message || `Error deleting ${selectedTitle?.title}`);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (!formData) throw new Error("Invalid form data");

            const isEditing = Boolean(selectedTitle);
            let response;

            if (isEditing) {
                response = await updateTitle({
                    title: formData.title,
                    unit_id: formData.unit_id,
                    user_id: user.emp_id,
                    id: formData.id,
                });
            } else {
                response = await addTitle({
                    title: formData.title,
                    unit_id: formData.unit_id,
                    user_id: user.emp_id,
                });
            }

            if (response.status === 200 && response.success === true) {
                // const updatedData = {
                //     ...response.data,
                //     unit_id:
                //         response.data.unit_id ??
                //         (response.data.exam_parts_id != null ? Number(response.data.exam_parts_id) : null),
                // };
                const updatedData = response.data;

                setTitle((prev) => {
                    if (isEditing) {
                        return prev.map((item) => (item.id === selectedTitle.id ? updatedData : item));
                    } else {
                        return [...prev, updatedData];
                    }
                });

                showSuccessToast(
                    `${updatedData.title} ${isEditing ? "updated" : "added"} successfully!`
                );

                setSelectedTitle(null);
                setOpenFormModal(false);
            } else {
                throw new Error(response.message || "Failed to save title");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong ❌");
        }
    };

    return (
        <div>
            <p className="title mb-5 text-center">Titles</p>
            <TitleHeader
                unitsData={units}
                onClick={() => setOpenFormModal(true)}
                onSelectUnit={handleUnitSelect}
            />

            {loading ? (
                <LoadingSpinner message={"Loading Titles..."} />
            ) : filteredTitles.length === 0 ? (
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
                            <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">
                                No Titles Found
                            </h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                It looks like there are no Titles created yet.
                                <br />
                                Click{" "}
                                <span className="font-medium text-green-600 dark:text-green-400">
                                    Add Titles
                                </span>{" "}
                                to get started.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <TitleList
                    titleData={filteredTitles}
                    onEdit={(data) => {
                        setSelectedTitle(data);
                        setOpenFormModal(true);
                    }}
                    onDelete={(data) => {
                        setSelectedTitle(data);
                        setOpenDialog(true);
                    }}
                />
            )}

            {/* delete dialog */}
            <ConfirmDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message={
                    <p className="card-title text-center font-semibold text-gray-700">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-red-500">
                            {selectedTitle?.title}
                        </span>
                        ?
                    </p>
                }
            />

            {/* Add or update Modal form */}
            <Modal
                open={openFormModal}
                onClose={() => {
                    setSelectedTitle(null);
                    setOpenFormModal(false);
                }}
                title={selectedTitle ? "Edit Title" : "Add New Title"}
            >
                <TitleForm
                    initialData={selectedTitle}
                    unitsData={units}
                    onClose={() => {
                        setSelectedTitle(null);
                        setOpenFormModal(false);
                    }}
                    onSubmit={handleFormSubmit}
                />
            </Modal>
        </div>
    );
}
