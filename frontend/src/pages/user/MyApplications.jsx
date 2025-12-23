import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Check, X, Clock, Search, ExternalLink } from "lucide-react";

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

    const getStatusBadge = (status) => {
        const styles = {
            APPROVED: "bg-emerald-100 text-emerald-700 border-emerald-200",
            REJECTED: "bg-red-100 text-red-700 border-red-200",
            PENDING: "bg-amber-100 text-amber-700 border-amber-200"
        };
        const icons = {
            APPROVED: <Check size={12} className="mr-1" />,
            REJECTED: <X size={12} className="mr-1" />,
            PENDING: <Clock size={12} className="mr-1" />
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.PENDING}`}>
                {icons[status]}
                {status}
            </span>
        );
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">My Adoption Applications</h1>
                <p className="text-slate-500 mt-1">Track the status of your adoption requests.</p>
            </div>

            {applications.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-slate-400" size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No applications yet</h3>
                    <p className="text-slate-500 mb-6">You haven't applied for any pets yet.</p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-sm"
                    >
                        Browse Pets
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pet Details</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {app.Pet.photoUrl ? (
                                                    <img src={app.Pet.photoUrl} alt={app.Pet.name} className="w-12 h-12 rounded-lg object-cover shadow-sm bg-slate-100" />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                                        {app.Pet.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-semibold text-slate-900">{app.Pet.name}</p>
                                                    <p className="text-xs text-slate-500">{app.Pet.species} • {app.Pet.breed} • {app.Pet.age} yrs</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(app.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                to={`/pets/${app.Pet.id}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                                            >
                                                View Pet <ExternalLink size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyApplications;
