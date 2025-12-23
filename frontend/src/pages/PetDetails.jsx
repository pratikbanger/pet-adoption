import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

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
            toast.success("Application submitted successfully!")
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to apply")
        }
        setSubmitting(false);
    };

    if (loading) return <p className="p-6">Loading...</p>;
    if (!pet) return <p className="p-6">Pet not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
            <img
                src={pet.photoUrl || "https://via.placeholder.com/400"}
                alt={pet.name}
                className="w-full md:w-1/2 h-80 object-cover rounded"
            />

            <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{pet.name}</h1>
                <p className="text-gray-700 mb-1">
                    <strong>Species:</strong> {pet.species}
                </p>
                <p className="text-gray-700 mb-1">
                    <strong>Breed:</strong> {pet.breed}
                </p>
                <p className="text-gray-700 mb-1">
                    <strong>Age:</strong> {pet.age}
                </p>
                <p className="text-gray-700 mb-4">{pet.description}</p>

                <button
                    disabled={applied || pet.status === "ADOPTED" || submitting}
                    onClick={handleApply}
                    className={`px-6 py-2 rounded text-white ${applied || pet.status === "ADOPTED"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {pet.status === "ADOPTED"
                        ? "Already Adopted"
                        : applied
                            ? "Already Applied"
                            : submitting
                                ? "Submitting..."
                                : "Apply for Adoption"}
                </button>
            </div>
        </div>
    );
};

export default PetDetails;
