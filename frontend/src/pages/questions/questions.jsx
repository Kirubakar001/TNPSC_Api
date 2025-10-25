import { useEffect, useState } from "react";
import QuestionHeader from "../../UI/questions/questionHeader";
import photo from "../../assets/product-image.jpg";
import LoadingSpinner from "../../components/loading/loadingSpinner";
import QuestionList from "../../UI/questions/questionList";
import ConfirmDialog from "../../components/deleteModal/deleteModal";
import Modal from "../../components/modal";
import { fetchQuestions } from "@/api/questionService";
import QuestionForm from "../../UI/questions/questionForm";

export default function QuestionPage() {
    const [title, setTitle] = useState([]);
    const [question, setQuestion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [openFormModal, setOpenFormModal] = useState(false);

    const data = localStorage.getItem("user");
    const user = JSON.parse(data);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                setLoading(true);
                const response = await fetchQuestions();
                if (response.status === 200 && response.success === true) {
                    setQuestion(response.data);
                    setTitle(response.titleData);
                }
            } catch (error) {
                toast.error(error.message || "Error in Fetching Questions");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestion();
    }, []);

    const confirmDelete = async () => {
        // const response = await
    };
    return (
        <>
            <div className="title text-center">Question Page</div>

            <QuestionHeader
                titlesData={title}
                onClick={() => {
                    setOpenFormModal(true);
                }}
            />

            {loading ? (
                <LoadingSpinner message={"Loading Questions..."} />
            ) : filteredQuestions.length === 0 ? (
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
                            <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-slate-200">No Questions Found</h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                It looks like there are no Questions created yet.
                                <br />
                                Click <span className="font-medium text-green-600 dark:text-green-400">Add Questions</span> to get started.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <QuestionList
                    questionData={filteredQuestions}
                    onEdit={(data) => {
                        setSelectedQuestion(data);
                        setOpenFormModal(true);
                    }}
                    onDelete={(data) => {
                        setSelectedQuestion(data);
                        setOpenDialog(true);
                    }}
                />
            )}

            {/* delete dialog */}
            <ConfirmDialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                }}
                onConfirm={confirmDelete}
                title={`Confirm Deletion`}
                message={
                    <p className="card-title text-center font-semibold text-gray-50">
                        Are you sure you want to delete
                        <span className="font-semibold text-red-50">{selectedQuestion.question}</span> ?
                    </p>
                }
            />

            {/* add or update modal */}
            <Modal
                open={openFormModal}
                onClose={() => {
                    setOpenFormModal(false);
                    setSelectedQuestion(null);
                }}
                title={selectedQuestion ? "Edit Question" : "Add New Question"}
            >
                <QuestionForm
                    onClose={() => {
                        setOpenFormModal(false);
                        setFilteredQuestions(null);
                    }}
                />
            </Modal>
        </>
    );
}
