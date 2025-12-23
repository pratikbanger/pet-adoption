import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post("/auth/login", form);
            login(res.data.token);
            navigate("/");
            toast.success("Welcome back!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
                    <p className="text-slate-500">Sign in to continue your adoption journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-sm shadow-indigo-200"
                        disabled={loading}
                    >
                        {loading ? (
                            "Logging in..."
                        ) : (
                            <>
                                <LogIn size={20} /> Login
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-indigo-600 font-semibold hover:underline flex items-center justify-center gap-1 inline-flex">
                        Register here <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
