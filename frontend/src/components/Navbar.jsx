import {
    Link,
    useNavigate,
    Outlet
} from "react-router-dom";


const getTokenPayload = () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const payload = token.split(".")[1];
        const normalized = payload
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        return JSON.parse(
            atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="))
        );
    } catch {
        return null;
    }
};


const Navbar = () => {
    const navigate = useNavigate();
    const user = getTokenPayload();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };



    return (
        <>
            <nav className="border-b border-gray-800 bg-gray-950">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

                    {/* Logo */}
                    <Link
                        to="/dashboard"
                        className="text-lg font-bold text-white"
                    >
                        <span className="text-blue-500">Scholar</span>
                        AI
                    </Link>

                    {/* Navigation */}
                    <div className="hidden items-center gap-6 md:flex">

                        <Link
                            to="/dashboard"
                            className="text-sm text-gray-300 transition hover:text-white"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/scholarships"
                            className="text-sm text-gray-300 transition hover:text-white"
                        >
                            Scholarships
                        </Link>

                        <Link
                            to="/recommendations"
                            className="text-sm text-gray-300 transition hover:text-white"
                        >
                            Recommendations
                        </Link>

                        <Link
                            to="/profile"
                            className="text-sm text-gray-300 transition hover:text-white"
                        >
                            Profile
                        </Link>

                        
{user?.role === "admin" && (
    <Link
        to="/admin/scholarships"
        className="text-sm text-blue-400 transition hover:text-white"
    >
        Admin
    </Link>
)}


                        <button
                            onClick={handleLogout}
                            className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800 hover:text-white"
                        >
                            Logout
                        </button>

                    </div>

                </div>
            </nav>

            {/* This renders Dashboard/Profile/etc. */}
            <Outlet />
        </>
    );
};

export default Navbar;