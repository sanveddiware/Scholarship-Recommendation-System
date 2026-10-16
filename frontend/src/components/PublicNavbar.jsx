import { Link } from "react-router-dom";

const PublicNavbar = () => {
    return (
        <nav className="border-b border-gray-800 bg-gray-950">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-xl font-bold text-white"
                >
                    <span className="text-blue-500">Scholar</span>
                    AI
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-3">

                    <Link
                        to="/login"
                        className="rounded-lg px-4 py-2 text-sm text-gray-300 transition hover:text-white"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Get Started
                    </Link>

                </div>

            </div>
        </nav>
    );
};

export default PublicNavbar;