import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { PawPrint, Menu, X, LogIn, UserPlus, LogOut, LayoutDashboard, FileText, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = () => {
        logout();
        navigate("/login");
        setIsOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    const NavItem = ({ to, children, icon: Icon }) => (
        <Link
            to={to}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive(to)
                ? "bg-indigo-50 text-indigo-600 font-medium"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
        >
            {Icon && <Icon size={18} />}
            <span>{children}</span>
        </Link>
    );

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                            <div className="bg-indigo-600 p-2 rounded-lg">
                                <PawPrint className="text-white" size={24} />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                PetAdopt
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-2">
                        {!auth.token ? (
                            <>
                                <NavItem to="/login" icon={LogIn}>Login</NavItem>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow"
                                >
                                    <UserPlus size={18} />
                                    <span>Get Started</span>
                                </Link>
                            </>
                        ) : (
                            <>
                                {auth.user.role === "ADMIN" && (
                                    <>
                                        <NavItem to="/admin/pets" icon={LayoutDashboard}>Manage Pets</NavItem>
                                        <NavItem to="/admin/applications" icon={FileText}>Applications</NavItem>
                                    </>
                                )}
                                {auth.user.role === "USER" && (
                                    <NavItem to="/my-applications" icon={FileText}>My Applications</NavItem>
                                )}

                                <div className="h-6 w-px bg-slate-200 mx-2"></div>

                                <div className="flex items-center gap-3 pl-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                                        <User size={16} />
                                        <span className="font-medium">{auth.user.name || "User"}</span>
                                    </div>
                                    <button
                                        onClick={handleLogOut}
                                        className="text-slate-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {!auth.token ? (
                            <>
                                <NavItem to="/login" icon={LogIn}>Login</NavItem>
                                <NavItem to="/register" icon={UserPlus}>Register</NavItem>
                            </>
                        ) : (
                            <>
                                <div className="px-3 py-2 text-sm font-medium text-slate-400">Menu</div>
                                {auth.user.role === "ADMIN" && (
                                    <>
                                        <NavItem to="/admin/pets" icon={LayoutDashboard}>Manage Pets</NavItem>
                                        <NavItem to="/admin/applications" icon={FileText}>Applications</NavItem>
                                    </>
                                )}
                                {auth.user.role === "USER" && (
                                    <NavItem to="/my-applications" icon={FileText}>My Applications</NavItem>
                                )}
                                <div className="border-t border-slate-100 my-2"></div>
                                <button
                                    onClick={handleLogOut}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
