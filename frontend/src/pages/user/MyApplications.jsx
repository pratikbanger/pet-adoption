import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const MyApplications = () => {
    const { auth } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        if (!auth.user) return;
        setLoading(true);
        try {
            const res = await api.get("/adoptions/my");
            setApplications(res.data);
        } catch (error) {
            console.error("Failed to fetch applications", error);
        }
        setLoading(false);
    };

    if (loading) return <p className="p-6">Loading applications...</p>;

    if (applications.length === 0)
        return <p className="p-6">You have not applied for any pets yet.</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Adoption Applications</h1>

            <div className="space-y-4">
                {applications.map((app) => (
                    <div
                        key={app.id}
                        className="border rounded p-4 flex justify-between items-center shadow"
                    >
                        <div>
                            <h3 className="text-lg font-semibold">{app.Pet.name}</h3>
                            <p className="text-gray-600">
                                {app.Pet.species} • {app.Pet.breed} • Age: {app.Pet.age}
                            </p>
                        </div>

                        <div className="text-right">
                            <p
                                className={`font-semibold ${app.status === "APPROVED"
                                        ? "text-green-600"
                                        : app.status === "REJECTED"
                                            ? "text-red-600"
                                            : "text-yellow-600"
                                    }`}
                            >
                                {app.status}
                            </p>

                            <Link
                                to={`/pets/${app.Pet.id}`}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                View Pet
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyApplications;
