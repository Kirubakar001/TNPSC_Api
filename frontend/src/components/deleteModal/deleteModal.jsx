import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmDialog({ open, onClose, onConfirm, title = "Are you sure?", message = "This action cannot be undone." }) {
    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <h2 className="text-center text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
                    {typeof message === "string" ? (
                        <p className="mt-2 text-center text-base text-slate-600 dark:text-slate-400">{message}</p>
                    ) : (
                        <div className="mt-2 text-center text-base text-slate-600 dark:text-slate-400">{message}</div>
                    )}

                    <div className="mt-6 flex justify-around gap-3">
                        <button
                            onClick={onClose}
                            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
