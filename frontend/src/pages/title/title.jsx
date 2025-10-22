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
    const [title, setTitle] = useState([]);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    //user
    const data = localStorage.getItem("tnpscUser");
    const user = JSON.parse(data);
    //Delete units
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState(null);

    //Add or Edit units
    const [openFormModal, setOpenFormModal] = useState(false);

    useEffect(() => {
        const fetchTitle = async () => {
            try {
                setLoading(true);
                const response = await fetchTitles();
                // console.log(response);

                if (response.status === 200 && response.success === true) {
                    setTitle(response.data);
                    setUnits(response.unitData);
                } else toast.error(response.message);
            } catch (error) {
                toast.error(error.message || "Something went wrong ❌");
            } finally {
                setLoading(false);
            }
        };
        fetchTitle();
    }, []);

    const handleUnitSelect = async (id) => {
        try {
            setLoading(true);
            const payload = {};
            if (id !== "all") {
                payload.unit_id = id;
            }
            const response = await fetchTitles(payload);
            if (response.status === 200 && response.success === true) {
                setTitle(response.data);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            setTitle([]);
            toast.error("No units Found");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        try {
            console.log(selectedTitle);

            const response = await deleteTitle({ id: selectedTitle.id, part_id: selectedTitle.exam_parts_id, user_id: user.emp_id });
            if (response.status === 200 && response.success === true) {
                setTitle((prev) => prev.filter((data) => data.id !== selectedTitle.id));
                showSuccessToast(`${selectedTitle.title} deleted successfully !!`);
                setOpenDialog(false);
                setSelectedTitle(null);
            } else {
                toast.error(response.error);
            }
        } catch (error) {
            toast.error(`Error in deleting ${selectedTitle.title}` || error.message);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            console.log("title form ==>> ", formData);

            if (!formData) throw new Error("Invalid group data");

            const isEditing = Boolean(selectedTitle);
            console.log(isEditing);

            let response;
            if (isEditing) {
                console.log("edit passed");

                response = await updateTitle({ title: formData.title, unit_id: formData.unit_id, user_id: user.emp_id, id: formData.id });
            } else {
                console.log("add passed");

                response = await addTitle({ title: formData.title, unit_id: formData.unit_id, user_id: user.emp_id });
            }

            if (response.status === 200 && response.success === true) {
                console.log("response",response.data);
                
                const updatedData = response.data;
                if (isEditing) {
                    setTitle((prev) => prev.map((data) => (data.id === selectedTitle.id ? updatedData : data)));
                    showSuccessToast(`${updatedData.title} updated successfully!`);
                } else {
                    setTitle((prev) => [...prev, updatedData]);
                    showSuccessToast(`${updatedData.title} added successfully!`);
                }
                setSelectedTitle(null);
                setOpenFormModal(false);
            } else {
                throw new Error(response.message || "Failed to save group");
            }
        } catch (error) {
            toast.error();
        }
    };

    return (
        <>
            <div>
                <p className="title mb-5 text-center">Titles</p>
                <TitleHeader
                    unitsData={units}
                    onClick={() => setOpenFormModal(true)}
                    onSelectUnit={handleUnitSelect}
                />

                {loading ? (
                    <LoadingSpinner message={"Loading Units...."} />
                ) : title.length === 0 ? (
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
                                <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">No Titles Found</h3>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    It looks like there are no Titles created yet.
                                    <br />
                                    Click <span className="font-medium text-green-600 dark:text-green-400">Add Titles</span> to get started.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <TitleList
                        titleData={title}
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

                {/* delete dialog box */}
                <ConfirmDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    onConfirm={confirmDelete}
                    title="Confirm Deletion"
                    message={
                        <p className="card-title text-center font-semibold text-gray-700">
                            Are you sure you want to delete <span className="font-semibold text-red-500">{selectedTitle?.title}</span>?
                        </p>
                    }
                />

                {/* Add or update the Modal form */}
                <Modal
                    open={openFormModal}
                    onClose={() => {
                        setSelectedTitle(null);
                        setOpenFormModal(false);
                    }}
                    title={selectedTitle ? "Edit Unit" : "Add New Unit"}
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
        </>
    );
}
