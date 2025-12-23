import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
    const { auth } = useAuth();

    // If user is logged in, redirect to home
    if (auth.user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
