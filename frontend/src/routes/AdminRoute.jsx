import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const { auth } = useAuth();

    // Not logged in → login
    if (!auth.user) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but not admin → home
    if (auth.user.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AdminRoute;
