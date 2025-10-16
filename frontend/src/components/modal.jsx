import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 dark:bg-slate-900">
                    {/* Modal Body */}
                    <div>{children}</div>
                </div>
            </div>
        </>
    );
}
