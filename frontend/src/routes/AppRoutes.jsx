import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PetDetails from "../pages/PetDetails";
import MyApplications from "../pages/user/MyApplications";
import Pets from "../pages/admin/Pets";
import Applications from "../pages/admin/Applications";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets/:id" element={<PetDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User */}
            <Route path="/my-applications" element={<MyApplications />} />

            {/* Admin */}
            <Route path="/admin/pets" element={<Pets />} />
            <Route path="/admin/applications" element={<Applications />} />
        </Routes>
    );
};

export default AppRoutes;
