import { useEffect, useState } from "react";
import api from "../../api/axios";
import PetCard from "../../components/PetCard";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Plus, X, Edit2, Trash2, Save, Image as ImageIcon } from "lucide-react";

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const [form, setForm] = useState({
        name: "",
        species: "",
        breed: "",
        age: "",
        description: "",
        photoUrl: "",
        status: "Available"
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchPets();
    }, [page]);

    const fetchPets = async () => {
        setLoading(true);
        try {
            const res = await api.get("/pets", {
                params: { page }
            });
            setPets(res.data.data);
            setPages(res.data.pagination.pages);
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
                toast.success("Pet updated successfully");
            } else {
                await api.post("/pets", form);
                toast.success("Pet added successfully");
            }
            setForm({ name: "", species: "", breed: "", age: "", description: "", photoUrl: "", status: "Available" });
            setShowModal(false);
            fetchPets();
        } catch (error) {
            console.error("Failed to save pet", error);
            toast.error(error.response?.data?.message || "Error saving pet");
        }
    };

    const handleEdit = (pet) => {
        setEditingId(pet.id);
        setForm({ ...pet });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/pets/${id}`);
                Swal.fire(
                    'Deleted!',
                    'The pet has been deleted.',
                    'success'
                );
                fetchPets();
            } catch (error) {
                console.error("Failed to delete pet", error);
                Swal.fire(
                    'Error!',
                    'Failed to delete pet.',
                    'error'
                );
            }
        }
    };

    const openModal = () => {
        setEditingId(null);
        setForm({ name: "", species: "", breed: "", age: "", description: "", photoUrl: "", status: "Available" });
        setShowModal(true);
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Manage Pets</h1>
                    <p className="text-slate-500 mt-1">Add, edit, or remove pets from the inventory.</p>
                </div>
                <button
                    onClick={openModal}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all"
                >
                    <Plus size={20} />
                    Add New Pet
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {pets.map((pet) => (
                    <div key={pet.id} className="relative group">
                        <PetCard pet={pet} />

                        <div className="absolute top-2 right-2 flex gap-2">
                            <button
                                onClick={() => handleEdit(pet)}
                                className="p-2 bg-white/90 backdrop-blur text-indigo-600 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100"
                                title="Edit"
                            >
                                <Edit2 size={16} />
                            </button>
                            <button
                                onClick={() => handleDelete(pet.id)}
                                className="p-2 bg-white/90 backdrop-blur text-red-600 rounded-full shadow-md hover:bg-red-600 hover:text-white transition-all border border-red-100"
                                title="Delete"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {pets.length === 0 && !loading && (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500 text-lg">No pets found. Add one to get started!</p>
                    <button
                        onClick={openModal}
                        className="mt-4 text-indigo-600 font-medium hover:underline"
                    >
                        Add your first pet
                    </button>
                </div>
            )}

            <div className="flex justify-center mt-8">
                <Pagination page={page} pages={pages} onPageChange={setPage} />
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                {editingId ? <Edit2 size={20} className="text-indigo-600" /> : <Plus size={20} className="text-indigo-600" />}
                                {editingId ? "Edit Pet Details" : "Add New Pet"}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Pet Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Max"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Species</label>
                                <select
                                    value={form.species}
                                    onChange={(e) => setForm({ ...form, species: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    required
                                >
                                    <option value="">Select Species</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Breed</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Golden Retriever"
                                    value={form.breed}
                                    onChange={(e) => setForm({ ...form, breed: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Age (Years)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 2"
                                    value={form.age}
                                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <ImageIcon size={16} /> Photo URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/photo.jpg"
                                    value={form.photoUrl}
                                    onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700">Description</label>
                                <textarea
                                    placeholder="Tell us about the pet..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all min-h-[100px]"
                                />
                            </div>

                            <div className="md:col-span-2 flex justify-end gap-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
                                >
                                    <Save size={18} />
                                    {editingId ? "Update Pet" : "Save Pet"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pets;
