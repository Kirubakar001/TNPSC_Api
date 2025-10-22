import { CircleX, Pencil } from "lucide-react";

export default function SubjectCard({ data, onEdit, onDelete }) {
    return (
        <>
            <div className="card overflow-hidden rounded-2xl bg-white shadow-md dark:bg-slate-900">
                <div className="flex items-centr justify-between gap-20 p-3 max-sm:gap-10">
                    <div className="flex items-center gap-5">
                        {data.img && (
                            <img
                                src={data.img}
                                alt={data.title}
                                className="h-28 w-28 rounded-full object-cover outline-double"
                            />
                        )}
                        {/* <p className="font-semibold text-slate-600 dark:text-slate-300">{data.sub_title}</p> */}
                    </div>
                    <div className="flex gap-4 mt-3">
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
                <div className="rounded-xl bg-slate-100 p-5 text-center dark:bg-slate-950">
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{data.title}</p>
                </div>
            </div>
        </>
    );
}
