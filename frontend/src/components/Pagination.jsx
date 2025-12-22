const Pagination = ({ page, pages, onPageChange }) => {
    if (pages <= 1) return null;

    return (
        <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`px-3 py-1 rounded ${p === page
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {p}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
