import { useEffect, useState } from "react";
import api from "../api/axios";
import PetCard from "../components/PetCard";
import Pagination from "../components/Pagination";

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
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Available Pets</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name or breed"
                    value={search}
                    onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                    }}
                    className="border px-3 py-2 rounded w-full md:w-1/3"
                />

                <select
                    value={species}
                    onChange={(e) => {
                        setPage(1);
                        setSpecies(e.target.value);
                    }}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">All Species</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                </select>
            </div>

            {/* Pet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {pets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                ))}
            </div>

            {/* Pagination */}
            <Pagination page={page} pages={pages} onPageChange={setPage} />
        </div>
    );
};

export default Home;
