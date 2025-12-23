import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PetDetails from "../pages/PetDetails";
import MyApplications from "../pages/user/MyApplications";
import Pets from "../pages/admin/Pets";
import Applications from "../pages/admin/Applications";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute"
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets/:id" element={<PetDetails />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

            <Route path="/my-applications" element={<MyApplications />} />

            <Route path="/admin/pets" element={<AdminRoute><Pets /></AdminRoute>} />
            <Route path="/admin/applications" element={<AdminRoute><Applications /></AdminRoute>} />
        </Routes>
    );
};

export default AppRoutes;
