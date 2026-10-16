import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
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
                "Registration failed. Please try again."
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
                        to="/login"
                        className="text-sm text-gray-400 transition hover:text-white"
                    >
                        Already have an account? Login →
                    </Link>

                </div>
            </header>

            {/* Register */}
            <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">

                    <div className="mb-8 text-center">

                        <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
                            ScholarAI
                        </p>

                        <h1 className="mt-2 text-3xl font-bold">
                            Create Your Account
                        </h1>

                        <p className="mt-3 text-sm text-gray-400">
                            Start discovering scholarships matched
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

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
                                />
                            </div>

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
                                    placeholder="Minimum 6 characters"
                                    required
                                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Confirm Password
                                </label>

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Re-enter your password"
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
                                    ? "Creating Account..."
                                    : "Create Account"
                                }
                            </button>

                        </form>

                        <div className="mt-6 border-t border-gray-800 pt-6 text-center">

                            <p className="text-sm text-gray-400">
                                Already have an account?{" "}

                                <Link
                                    to="/login"
                                    className="font-medium text-blue-400 hover:text-blue-300"
                                >
                                    Login
                                </Link>
                            </p>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default Register;