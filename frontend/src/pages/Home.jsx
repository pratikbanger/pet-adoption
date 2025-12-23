import { useEffect, useState } from "react";
import api from "../api/axios";
import PetCard from "../components/PetCard";
import Pagination from "../components/Pagination";
import { Search, Filter } from "lucide-react";

const Home = () => {
    const [pets, setPets] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const [search, setSearch] = useState("");
    const [species, setSpecies] = useState("");

    useEffect(() => {
        fetchPets();
    }, [page, search, species]);

    const fetchPets = async () => {
        try {
            const res = await api.get("/pets", {
                params: { page, search, species },
            });

            setPets(res.data.data);
            setPages(res.data.pagination.pages);
        } catch (error) {
            console.error("Failed to load pets", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-12 px-4 mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Find Your New Best Friend
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
                        Browse our available pets and give them a loving home today.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or breed..."
                            value={search}
                            onChange={(e) => {
                                setPage(1);
                                setSearch(e.target.value);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>

                    <div className="relative w-full md:w-64">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <select
                            value={species}
                            onChange={(e) => {
                                setPage(1);
                                setSpecies(e.target.value);
                            }}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none bg-white text-slate-600"
                        >
                            <option value="">All Species</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                        </select>
                    </div>
                </div>

                {pets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {pets.map((pet) => (
                            <PetCard key={pet.id} pet={pet} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-500">
                        <p className="text-xl">No pets found matching your search.</p>
                    </div>
                )}

                <div className="mt-12 flex justify-center">
                    <Pagination page={page} pages={pages} onPageChange={setPage} />
                </div>
            </div>
        </div>
    );
};

export default Home;
