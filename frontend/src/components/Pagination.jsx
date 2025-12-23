import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, pages, onPageChange }) => {
    if (pages <= 1) return null;

    return (
        <div className="flex justify-center mt-8 gap-2">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={20} />
            </button>

            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`min-w-[40px] h-10 rounded-lg font-medium transition-colors ${p === page
                            ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === pages}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
