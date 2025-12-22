import { useEffect, useState } from "react";
import api from "../../api/axios";

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const res = await api.get("/adoptions");
            setApplications(res.data);
        } catch (error) {
            console.error("Failed to fetch applications", error);
        }
        setLoading(false);
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/adoptions/${id}`, { status });
            fetchApplications();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    if (loading) return <p className="p-6">Loading applications...</p>;

    if (applications.length === 0)
        return <p className="p-6">No adoption applications yet.</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Adoption Applications</h1>

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
                            <p className="text-gray-700">
                                Applicant: {app.User.name} ({app.User.email})
                            </p>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
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

                            {app.status === "PENDING" && (
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleStatusUpdate(app.id, "APPROVED")}
                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Applications;
