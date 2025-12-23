import { Link } from "react-router-dom";
import { Heart, Info, Clock } from "lucide-react";

const PetCard = ({ pet }) => {
    const isAvailable = pet.status === "Available";

    return (
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full">
            <div className="relative overflow-hidden h-48 sm:h-56">
                <img
                    src={pet.photoUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000"}
                    alt={pet.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-3 right-3">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm backdrop-blur-md ${isAvailable
                            ? "bg-emerald-100/90 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100/90 text-slate-600 border border-slate-200"
                            }`}
                    >
                        {pet.status || "Unknown"}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {pet.name}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 flex items-center gap-1">
                            {pet.species} • {pet.breed}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                        <Clock size={14} className="text-indigo-500" />
                        <span>{pet.age} yrs</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                    <Link
                        to={`/pets/${pet.id}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-600 transition-all duration-200 shadow-sm hover:shadow"
                    >
                        <Info size={18} />
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PetCard;
