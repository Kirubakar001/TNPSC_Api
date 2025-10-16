import { CircleX, Pencil } from "lucide-react";

export default function SubjectCard({ data, onEdit, onDelete }) {
    return (
        <>
            <div className="card overflow-hidden rounded-2xl bg-white shadow-md dark:bg-slate-900">
                <div className="flex items-center justify-between gap-20 p-3 max-sm:gap-10">
                    <div className="flex items-center gap-5">
                        {data.img && (
                            <img
                                src={data.img}
                                alt={data.title}
                                className="h-28 w-28 rounded-full object-cover"
                            />
                        )}
                        {/* <p className="font-semibold text-slate-600 dark:text-slate-300">{data.sub_title}</p> */}
                    </div>
                    <div className="flex gap-4">
                        <Pencil
                            className="h-5 w-5 cursor-pointer text-green-500 hover:text-green-700"
                            onClick={() => onEdit(data)}
                        />
                        <CircleX
                            className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
                            onClick={() => onDelete(data)}
                        />
                    </div>
                </div>
                <div className="rounded-xl bg-slate-100 p-5 text-center dark:bg-slate-950">
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">{data.title}</p>
                </div>
            </div>
        </>
    );
}
