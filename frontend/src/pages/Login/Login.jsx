import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                formData
            );

            if (response.data.success) {
                localStorage.setItem(
                    "token",
                    response.data.token
                );

                navigate("/dashboard");
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            {/* Header */}
            <header className="border-b border-gray-800 bg-gray-950">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                    <Link
                        to="/"
                        className="text-xl font-bold"
                    >
                        <span className="text-blue-500">
                            Scholar
                        </span>
                        AI
                    </Link>

                    <Link
                        to="/register"
                        className="text-sm text-gray-400 transition hover:text-white"
                    >
                        Create Account →
                    </Link>

                </div>
            </header>

            {/* Login */}
            <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">

                    <div className="mb-8 text-center">

                        <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
                            ScholarAI
                        </p>

                        <h1 className="mt-2 text-3xl font-bold">
                            Welcome Back
                        </h1>

                        <p className="mt-3 text-sm text-gray-400">
                            Sign in to discover scholarships matched
                            to your profile.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">

                        {error && (
                            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Email
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Signing In..."
                                    : "Login"
                                }
                            </button>

                        </form>

                        <div className="mt-6 border-t border-gray-800 pt-6 text-center">

                            <p className="text-sm text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="font-medium text-blue-400 hover:text-blue-300"
                                >
                                    Create one
                                </Link>
                            </p>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default Login;