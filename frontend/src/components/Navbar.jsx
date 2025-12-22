import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { auth, logout } = useAuth();

    return (
        <nav className="p-4 bg-blue-600 text-white flex justify-between">
            <Link to="/" className="font-bold">Pet Adoption</Link>

            <div className="space-x-4">
                {!auth.token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <>
                        {auth.user.role === "ADMIN" && (
                            <>
                                <Link to="/admin/pets">Manage Pets</Link>
                                <Link to="/admin/applications">Applications</Link>
                            </>
                        )}
                        {auth.user.role === "USER" && (
                            <Link to="/my-applications">My Applications</Link>
                        )}
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
