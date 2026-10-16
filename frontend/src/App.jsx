
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Scholarships from "./pages/Scholarships/Scholarships";
import ScholarshipDetails from "./pages/Scholarships/ScholarshipDetails";
import Recommendations from "./pages/Recommendations/Recommendations";
import Home from "./pages/Home/Home";
import ManageScholarships from "./pages/Admin/ManageScholarships";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route
                    path="/"
                    element={
                        localStorage.getItem("token")
                            ? <Navigate to="/dashboard" replace />
                            : <Home />
                    }
                />

                {/* Protected Student Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<Navbar />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/recommendations" element={<Recommendations />} />
                        <Route path="/scholarships" element={<Scholarships />} />
                        <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
                    </Route>
                </Route>

                {/* Admin-Only Route */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route element={<Navbar />}>
                        <Route
                            path="/admin/scholarships"
                            element={<ManageScholarships />}
                        />
                    </Route>
                </Route>

                {/* Invalid Routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
