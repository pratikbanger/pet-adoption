import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Check, X, Clock, User, Mail, Calendar, Search } from "lucide-react";
import toast from "react-hot-toast";

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");

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
            toast.error("Failed to load applications");
        }
        setLoading(false);
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/adoptions/${id}`, { status });
            toast.success(`Application ${status.toLowerCase()}`);
            fetchApplications();
        } catch (error) {
            console.error("Failed to update status", error);
            toast.error("Failed to update status");
        }
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

    const filteredApplications = filter === "ALL"
        ? applications
        : applications.filter(app => app.status === filter);

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Adoption Requests</h1>
                    <p className="text-slate-500 mt-1">Manage and review incoming adoption applications.</p>
                </div>

                <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-fit">
                    {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === status
                                ? "bg-indigo-50 text-indigo-600 shadow-sm"
                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            {status.charAt(0) + status.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {filteredApplications.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-slate-400" size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900">No applications found</h3>
                    <p className="text-slate-500">There are no {filter !== 'ALL' ? filter.toLowerCase() : ''} applications to display.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pet</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Applicant</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {app.Pet.photoUrl ? (
                                                    <img src={app.Pet.photoUrl} alt={app.Pet.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                        {app.Pet.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-semibold text-slate-900">{app.Pet.name}</p>
                                                    <p className="text-xs text-slate-500">{app.Pet.breed} • {app.Pet.age} yrs</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 text-slate-900 font-medium text-sm">
                                                    <User size={14} className="text-slate-400" />
                                                    {app.User.name}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
                                                    <Mail size={14} className="text-slate-400" />
                                                    {app.User.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(app.status)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {app.status === "PENDING" ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, "APPROVED")}
                                                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100"
                                                        title="Approve"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app.id, "REJECTED")}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                                        title="Reject"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 font-medium italic">
                                                    {app.status === "APPROVED" ? "Approved" : "Rejected"}
                                                </span>
                                            )}
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

export default Applications;
