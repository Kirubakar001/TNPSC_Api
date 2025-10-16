import ConfirmDialog from "../../components/deleteModal/deleteModal";
import { useEffect, useState } from "react";
import { showSuccessToast } from "@/utils/toastHelper";
import toast from "react-hot-toast";
import SubjectHeader from "../../UI/subjects/subjectHeader";
import LoadingSpinner from "@/components/loading/loadingSpinner";
import photo from "../../assets/product-image.jpg";
import SubjectList from "../../UI/subjects/subjectList";
import { addPart, deletePart, fetchPart, updatePart } from "../../api/subjectService";
import Modal from "../../components/modal";
import SubjectForm from "../../UI/subjects/subjectForm";

export default function SubjectsPage() {
    const subjects = [
        { id: 1, title: "Subjects 1", subtitle: "CCSE - 1" },
        { id: 2, title: "Subjects 2", subtitle: "CCSE - 2" },
        { id: 4, title: "Subjects 3", subtitle: "CCSE - 3" },
    ];
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Delete
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPart, setSelectedPart] = useState(null);

    // Add/Edit Modal
    const [openFormModal, setOpenFormModal] = useState(false);

    useEffect(() => {
        const fetchParts = async () => {
            try {
                setLoading(true);
                const response = await fetchPart();
                if (response.status === 200 && response.success === true) {
                    setParts(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                console.log(error.message);
                toast.error(error.message || "Error in Fetching Parts");
            } finally {
                setLoading(false);
            }
        };
        fetchParts();
    }, []);

    const handleFormSubmit = async (formData) => {
        try {
            console.log("passed here");

            if (!formData) throw new Error("Invalid group data");

            const isEditing = Boolean(selectedPart);
            console.log(isEditing);

            const payload = new FormData();

            payload.append("title", formData.title);
            payload.append("exam_id", formData.exam_id);

            // Handle image upload logic
            if (isEditing) {
                // If existing image URL (unchanged)
                if (typeof formData.img === "string") {
                    payload.append("img_url", formData.img);
                } else if (formData.img instanceof File) {
                    payload.append("img", formData.img);
                }
            } else {
                if (formData.img) payload.append("img", formData.img);
            }

            let response;
            if (isEditing) {
                payload.append("id", selectedPart.id);
                response = await updatePart(payload);
            } else {
                response = await addPart(payload);
            }

            if (response.status === 200 || response.success) {
                console.log(response.data);

                const updatedData = response.data;

                if (isEditing) {
                    setParts((prev) => prev.map((data) => (data.id === selectedPart.id ? updatedData : data)));
                    showSuccessToast(`${updatedData.title} updated successfully!`);
                } else {
                    setParts((prev) => [...prev, updatedData]);
                    showSuccessToast(`${updatedData.title} added successfully!`);
                }

                setSelectedPart(null);
                setOpenFormModal(false);
            } else {
                throw new Error(response.message || "Failed to save group");
            }
        } catch (error) {
            console.error("Error saving group:", error);
            toast.error(error.message || "Error in saving group");
        }
    };

    const confirmDelete = async () => {
        try {
            const response = await deletePart({ id: selectedPart.id });
            if (response.status === 200 && response.success === true) {
                showSuccessToast(`${selectedPart.title} deleted successfully !!`);
                setOpenDialog(false);
                setSelectedPart(null);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(response.error || `Error in deleting ${selectedPart.id}`);
        }
    };

    return (
        <>
            <div className="title mb-4 text-center text-2xl font-bold">Exam Parts</div>
            <SubjectHeader
                Onclick={() => {
                    setOpenFormModal(true);
                }}
            />
            {loading ? (
                <LoadingSpinner message={"Loading Parts..."} />
            ) : parts.length === 0 ? (
                <div className="py-12 text-center">
                    <img
                        src={photo}
                        alt="No Data"
                        className="mx-auto h-20 w-20 opacity-70"
                    />
                    <p className="mt-2 text-gray-500">No Parts Found. Click “Add Part” to get started.</p>
                </div>
            ) : (
                <SubjectList
                    parts={parts}
                    onEdit={(data) => {
                        setSelectedPart(data);
                        setOpenFormModal(true);
                    }}
                    onDelete={(data) => {
                        console.log("yes i am here", data);

                        setSelectedPart(data);
                        setOpenDialog(true);
                    }}
                />
            )}

            {/* delete Dialog */}
            <ConfirmDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message={
                    <p className="card-title text-center font-semibold text-gray-700">
                        Are you sure you want to delete <span className="font-semibold text-red-500">{selectedPart?.title}</span>?
                    </p>
                }
            />

            {/* Add and Update Modal Form */}
            <Modal
                open={openFormModal}
                onClose={() => {
                    setSelectedPart(null);
                    setOpenFormModal(false);
                }}
                title={selectedPart ? "Edit Group" : "Add New Group"}
            >
                <SubjectForm
                    initialData={selectedPart}
                    onSubmit={handleFormSubmit}
                    onClose={() => {
                        setSelectedPart(null);
                        setOpenFormModal(false);
                    }}
                />
            </Modal>
        </>
    );
}
