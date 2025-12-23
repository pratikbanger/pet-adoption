import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle, AlertCircle, Heart } from "lucide-react";

const PetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applied, setApplied] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPet();
        if (auth.user) {
            checkApplication();
        }
    }, [auth.user]);

    const fetchPet = async () => {
        try {
            const res = await api.get(`/pets/${id}`);
            setPet(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch pet", error);
            setLoading(false);
        }
    };

    const checkApplication = async () => {
        try {
            const res = await api.get("/adoptions/my");
            const exists = res.data.some((app) => app.petId === parseInt(id));
            setApplied(exists);
        } catch (error) {
            console.error("Failed to check applications", error);
        }
    };

    const handleApply = async () => {
        if (!auth.user) {
            navigate("/login");
            return;
        }

        setSubmitting(true);
        try {
            await api.post("/adoptions/apply", { petId: id });
            setApplied(true);
            toast.success("Application submitted successfully!");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to apply");
        }
        setSubmitting(false);
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-slate-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!pet) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Pet Not Found</h2>
            <p className="text-slate-500 mb-6">The pet you are looking for doesn't exist or has been removed.</p>
            <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2">
                <ArrowLeft size={20} /> Back to Home
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <div className="bg-white shadow-sm border-b border-slate-200 sticky top-16 z-10 hidden md:block">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-slate-500 hover:text-slate-900 flex items-center gap-2 text-sm font-medium transition-colors">
                        <ArrowLeft size={18} /> Back to Pets
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${pet.status === "Available"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}>
                            {pet.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 md:mt-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 h-96 md:h-auto bg-slate-200 relative">
                        <img
                            src={pet.photoUrl || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1000"}
                            alt={pet.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:hidden">
                            <div className="text-white">
                                <h1 className="text-4xl font-bold mb-2">{pet.name}</h1>
                                <p className="text-white/90 font-medium">{pet.species} • {pet.breed}</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
                        <div className="hidden md:block mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{pet.name}</h1>
                            <p className="text-xl text-slate-500 font-medium">{pet.species} • {pet.breed}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-sm text-slate-500 mb-1">Age</p>
                                <p className="text-lg font-semibold text-slate-900">{pet.age} Years</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-sm text-slate-500 mb-1">Breed</p>
                                <p className="text-lg font-semibold text-slate-900">{pet.breed}</p>
                            </div>
                        </div>

                        <div className="prose prose-slate mb-10">
                            <h3 className="text-lg font-semibold text-slate-900 mb-3">About {pet.name}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {pet.description || "No description provided."}
                            </p>
                        </div>

                        <div className="mt-auto">
                            <button
                                disabled={applied || pet.status === "ADOPTED" || submitting}
                                onClick={handleApply}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md ${applied || pet.status === "ADOPTED"
                                    ? "bg-slate-200 text-slate-500 cursor-not-allowed shadow-none"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
                                    }`}
                            >
                                {pet.status === "ADOPTED" ? (
                                    <>
                                        Not Available
                                    </>
                                ) : applied ? (
                                    <>
                                        <CheckCircle size={24} /> Application Submitted
                                    </>
                                ) : submitting ? (
                                    "Submitting..."
                                ) : (
                                    <>
                                        <Heart className={`fill-current ${submitting ? 'animate-pulse' : ''}`} size={24} /> Apply to Adopt
                                    </>
                                )}
                            </button>
                            {applied && (
                                <p className="text-center text-sm text-slate-500 mt-3 flex items-center justify-center gap-1">
                                    <CheckCircle size={14} className="text-green-500" />
                                    You have already applied for this pet.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetails;
