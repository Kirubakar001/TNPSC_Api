import { CircleX, Pencil } from "lucide-react";

export default function QuestionCard({ data, onEdit, onDelete }) {
    return (
        <>
            <div className="card w-full overflow-hidden rounded bg-white shadow-md dark:bg-slate-900">
                <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-3">
                        <div className="rounded-xl bg-slate-100 p-3 text-center dark:bg-slate-950">
                            <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{data.question}</p>
                        </div>
                        <p className="text font-semibold">Total Count : {data.id}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                        <div
                            className="group relative inline-block"
                            onClick={() => onEdit(data)}
                        >
                            <span className="z-1 absolute -top-9 left-1/2 -translate-x-1/2 scale-0 rounded bg-green-500 px-2 py-1 text-xs text-white transition-all duration-200 group-hover:scale-100">
                                Update
                            </span>
                            <Pencil className="h-5 w-5 cursor-pointer text-green-500 transition-colors hover:text-green-700" />
                        </div>
                        <div
                            className="group relative inline-block"
                            onClick={() => onDelete(data)}
                        >
                            <span className="z-1 absolute -top-9 left-1/2 -translate-x-1/2 scale-0 rounded bg-red-500 px-2 py-1 text-xs text-white transition-all duration-200 group-hover:scale-100">
                                Delete
                            </span>
                            <CircleX className="h-5 w-5 cursor-pointer text-red-500 transition-colors hover:text-red-700" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
