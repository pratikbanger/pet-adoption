import { useEffect, useState } from "react";
import api from "../../api/axios";
import PetCard from "../../components/PetCard";

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    // For form
    const [form, setForm] = useState({
        name: "",
        species: "",
        breed: "",
        age: "",
        description: "",
        photoUrl: "",
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        setLoading(true);
        try {
            const res = await api.get("/pets");
            setPets(res.data.data);
        } catch (error) {
            console.error("Failed to fetch pets", error);
        }
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/pets/${editingId}`, form);
                setEditingId(null);
            } else {
                await api.post("/pets", form);
            }
            setForm({ name: "", species: "", breed: "", age: "", description: "", photoUrl: "" });
            fetchPets();
        } catch (error) {
            console.error("Failed to save pet", error);
            alert(error.response?.data?.message || "Error saving pet");
        }
    };

    const handleEdit = (pet) => {
        setEditingId(pet.id);
        setForm({ ...pet });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete this pet?")) return;
        try {
            await api.delete(`/pets/${id}`);
            fetchPets();
        } catch (error) {
            console.error("Failed to delete pet", error);
        }
    };

    if (loading) return <p className="p-6">Loading pets...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Pets</h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="border p-4 rounded mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border px-2 py-1 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Species"
                    value={form.species}
                    onChange={(e) => setForm({ ...form, species: e.target.value })}
                    className="border px-2 py-1 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Breed"
                    value={form.breed}
                    onChange={(e) => setForm({ ...form, breed: e.target.value })}
                    className="border px-2 py-1 rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="border px-2 py-1 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Photo URL"
                    value={form.photoUrl}
                    onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="border px-2 py-1 rounded md:col-span-3"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded md:col-span-3"
                >
                    {editingId ? "Update Pet" : "Add Pet"}
                </button>
            </form>

            {/* Pet List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {pets.map((pet) => (
                    <div key={pet.id} className="border rounded p-2 shadow relative">
                        <PetCard pet={pet} />
                        <div className="flex justify-between mt-2">
                            <button
                                onClick={() => handleEdit(pet)}
                                className="bg-yellow-500 px-2 py-1 rounded text-white"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(pet.id)}
                                className="bg-red-600 px-2 py-1 rounded text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pets;
