import { CircleX, Pencil } from "lucide-react";
import { useTheme } from "../../hooks/use-theme";
import { useEffect, useState } from "react";
import ConfirmDialog from "../../components/deleteModal/deleteModal";
import { showSuccessToast } from "@/utils/toastHelper";
import AddButton from "@/components/addButton/addButton";
import toast from "react-hot-toast";
import Modal from "../../components/modal";
import { addGroup, deleteGroup, fetchGroups, updateGroup } from "../../api/groupService";
import photo from "../../assets/product-image.jpg";
import GroupForm from "../../UI/group/groupForm";

export default function GroupPage() {
    const theme = useTheme();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    // Delete
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    // Add/Edit Modal
    const [openFormModal, setOpenFormModal] = useState(false);

    // Fetch all groups on load
    useEffect(() => {
        const fetchGroup = async () => {
            try {
                setLoading(true);
                const response = await fetchGroups();
                if (response.status === 200 && response.success === true) {
                    setGroups(response.data);
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error(error.message || "Something went wrong ❌");
            } finally {
                setLoading(false);
            }
        };
        fetchGroup();
    }, []);

    // Add or Update Group (Unified handler)
    const handleFormSubmit = async (formData) => {
        try {
            console.log("formData", formData);

            if (!formData) throw new Error("Invalid Subject data");

            const isEditing = Boolean(selectedPart);
            console.log(isEditing);

            const payload = new FormData();

            payload.append("title", formData.title);
            payload.append("sub_title", formData.sub_title);

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
                payload.append("id", selectedGroup.id);
                response = await updateGroup(payload);
            } else {
                response = await addGroup(payload);
            }

            if (response.status === 200 || response.success) {
                const updatedData = response.data;

                if (isEditing) {
                    setGroups((prev) => prev.map((grp) => (grp.id === selectedGroup.id ? updatedData : grp)));
                    showSuccessToast(`${updatedData.title} updated successfully!`);
                } else {
                    setGroups((prev) => [...prev, updatedData]);
                    showSuccessToast(`${updatedData.title} added successfully!`);
                }

                setSelectedGroup(null);
                setOpenFormModal(false);
            } else {
                throw new Error(response.message || "Failed to save group");
            }
        } catch (error) {
            console.error("Error saving group:", error);
            toast.error(error.message || "Error in saving group");
        }
    };

    // Open edit modal
    const openEditModal = (grp) => {
        setSelectedGroup(grp);
        setOpenFormModal(true);
    };

    // Delete group
    const handleDelete = (grp) => {
        setSelectedGroup(grp);
        setOpenDialog(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await deleteGroup({ id: selectedGroup.id });
            if (response.status === 200) {
                setGroups((prev) => prev.filter((grp) => grp.id !== selectedGroup.id));
                showSuccessToast(`${selectedGroup.title} deleted successfully !!`);
                setOpenDialog(false);
                setSelectedGroup(null);
            }
        } catch (error) {
            console.error("Error Deleting group:", error);
            toast.error(error.message || "Error in Deleting group");
        }
    };

    return (
        <>
            <div className="title mb-4 text-center text-2xl font-bold">Exam Category</div>

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Groups</h2>
                <AddButton
                    label="Add Group"
                    onClick={() => setOpenFormModal(true)}
                    theme="green"
                />
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex h-60 flex-col items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-green-500"></div>
                    <p className="mt-3 text-gray-500">Loading groups...</p>
                </div>
            )}

            {/* Empty State */}
            {!loading && groups.length === 0 && (
                <div className="flex w-full justify-center">
                    <div className="card w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-md dark:bg-slate-900">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                <img
                                    src={photo}
                                    alt="No Data"
                                    className="h-16 w-16 opacity-80"
                                />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">No Groups Found</h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                It looks like there are no groups created yet.
                                <br />
                                Click <span className="font-medium text-green-600 dark:text-green-400">Add Subject</span> to get started.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Group Cards */}
            {!loading && groups.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4">
                    {groups.map((grp) => (
                        <div
                            key={grp.id}
                            className="card w-full overflow-hidden rounded-2xl bg-white shadow-md dark:bg-slate-900 lg:w-1/3"
                        >
                            <div className="card-title flex items-center justify-between p-3 text-center">
                                <div className="flex items-center gap-5">
                                    {grp.img && (
                                        <img
                                            src={grp.img}
                                            alt={grp.title}
                                            className="h-16 w-16 rounded-full object-cover opacity-80"
                                        />
                                    )}
                                    <p className="card-title text-center font-semibold text-slate-600 dark:text-slate-300">{grp.sub_title}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div
                                        className="group relative inline-block"
                                        onClick={() => openEditModal(grp)}
                                    >
                                        <span className="z-1 absolute -top-9 left-1/2 -translate-x-1/2 scale-0 rounded bg-green-500 px-2 py-1 text-xs text-white transition-all duration-200 group-hover:scale-100">
                                            Update
                                        </span>
                                        <Pencil className="h-5 w-5 cursor-pointer text-green-500 transition-colors hover:text-green-700" />
                                    </div>
                                    <div
                                        className="group relative inline-block"
                                        onClick={() => handleDelete(grp)}
                                    >
                                        <span className="z-1 absolute -top-9 left-1/2 -translate-x-1/2 scale-0 rounded bg-red-500 px-2 py-1 text-xs text-white transition-all duration-200 group-hover:scale-100">
                                            Delete
                                        </span>
                                        <CircleX className="h-5 w-5 cursor-pointer text-red-500 transition-colors hover:text-red-700" />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body bg-slate-100 p-5 text-center transition-colors dark:bg-slate-950">
                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{grp.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message={
                    <p className="card-title text-center font-semibold text-gray-700">
                        Are you sure you want to delete <span className="font-semibold text-red-500">{selectedGroup?.title}</span>?
                    </p>
                }
            />

            {/* Add/Edit Modal */}
            <Modal
                open={openFormModal}
                onClose={() => {
                    setSelectedGroup(null);
                    setOpenFormModal(false);
                }}
                title={selectedGroup ? "Edit Group" : "Add New Group"}
            >
                <GroupForm
                    initialData={selectedGroup}
                    onSubmit={handleFormSubmit}
                    onClose={() => {
                        setSelectedGroup(null);
                        setOpenFormModal(false);
                    }}
                />
            </Modal>
        </>
    );
}
