
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    let user = null;

    try {
        // Decode JWT payload to read the role.
        const payload = token.split(".")[1];
        const normalized = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        user = JSON.parse(
            atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="))
        );
    } catch {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    if (user.exp && user.exp * 1000 <= Date.now()) {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
