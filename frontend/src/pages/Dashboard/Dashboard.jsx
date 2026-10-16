import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    const fetchDashboardData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`
        };

        try {
            // --------------------------------
            // 1. Fetch Student Profile
            // --------------------------------
            let profileResponse;

            try {
                profileResponse = await axios.get(
                    `${import.meta.env.VITE_API_URL}/profile`,
                    { headers }
                );

                console.log("PROFILE:", profileResponse.data);

            } catch (profileError) {

                console.error(
                    "Profile error:",
                    profileError
                );

                // New user doesn't have a profile yet
                if (
                    profileError.response?.status === 404 ||
                    profileError.response?.data?.message ===
                        "Student profile not found."
                ) {
                    navigate("/profile");
                    return;
                }

                // Invalid/expired token
                if (profileError.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                throw profileError;
            }

            // --------------------------------
            // 2. Fetch Recommendations
            // --------------------------------
            const recommendationResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/recommendations`,
                { headers }
            );

            console.log(
                "RECOMMENDATIONS:",
                recommendationResponse.data
            );

            // --------------------------------
            // 3. Store Data
            // --------------------------------
            setProfile(profileResponse.data.data);

            setRecommendations(
                recommendationResponse.data.recommendations || []
            );

        } catch (err) {

            console.error(
                "Dashboard error:",
                err
            );

            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            setError(
                err.response?.data?.message ||
                "Failed to load dashboard."
            );

        } finally {
            setLoading(false);
        }
    };

    fetchDashboardData();

}, [navigate]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
                Loading dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6 text-white">
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">
                    <h2 className="text-xl font-semibold text-red-400">
                        Something went wrong
                    </h2>

                    <p className="mt-2 text-gray-300">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    const profileFields = [
        profile?.state,
        profile?.category,
        profile?.educationLevel,
        profile?.course,
        profile?.branch,
        profile?.college,
        profile?.yearOfStudy,
        profile?.cgpa,
        profile?.annualFamilyIncome
    ];

    const completedFields = profileFields.filter(
        (field) =>
            field !== undefined &&
            field !== null &&
            field !== ""
    ).length;

    const profileCompletion = Math.round(
        (completedFields / profileFields.length) * 100
    );

    const topScholarship = recommendations[0];

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
                        Student Dashboard
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                        Welcome{profile?.user?.name
                            ? `, ${profile.user.name}`
                            : ""}
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Manage your profile and discover scholarships
                        matched to your eligibility.
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {/* Profile Completion */}
                    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-400">
                                Profile Completion
                            </p>

                            <span className="text-2xl">
                                👤
                            </span>
                        </div>

                        <p className="mt-4 text-3xl font-bold">
                            {profileCompletion}%
                        </p>

                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-800">
                            <div
                                className="h-full rounded-full bg-blue-500"
                                style={{
                                    width: `${profileCompletion}%`
                                }}
                            />
                        </div>

                        <button
                            onClick={() => navigate("/profile")}
                            className="mt-4 text-sm text-blue-400 hover:text-blue-300"
                        >
                            Update Profile →
                        </button>
                    </div>

                    {/* Scholarship Count */}
                    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-400">
                                Eligible Scholarships
                            </p>

                            <span className="text-2xl">
                                🎓
                            </span>
                        </div>

                        <p className="mt-4 text-3xl font-bold">
                            {recommendations.length}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Based on your current profile
                        </p>
                    </div>

                    {/* Top Scholarship */}
                    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-400">
                                Top Scholarship
                            </p>

                            <span className="text-2xl">
                                🏆
                            </span>
                        </div>

                        {topScholarship ? (
                            <>
                                <p className="mt-4 line-clamp-2 text-xl font-bold">
                                    {topScholarship.name}
                                </p>

                                <p className="mt-2 text-green-400">
                                    ₹
                                    {topScholarship.amount?.toLocaleString(
                                        "en-IN"
                                    )}
                                </p>
                            </>
                        ) : (
                            <p className="mt-4 text-gray-500">
                                No recommendation yet
                            </p>
                        )}
                    </div>

                </div>

                {/* Main Action */}
                <div className="mt-8 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8">

                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

                        <div>
                            <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
                                AI-Powered Matching
                            </p>

                            <h2 className="mt-2 text-2xl font-bold">
                                Find Scholarships for You
                            </h2>

                            <p className="mt-2 max-w-2xl text-gray-400">
                                Our system checks your eligibility and
                                uses semantic search to find scholarships
                                relevant to your profile.
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                navigate("/recommendations")
                            }
                            className="whitespace-nowrap rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
                        >
                            Find Scholarships →
                        </button>

                    </div>
                </div>

                {/* Top Recommendation */}
                {topScholarship && (
                    <div className="mt-8">

                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                Top Recommendation
                            </h2>

                            <button
                                onClick={() =>
                                    navigate("/recommendations")
                                }
                                className="text-sm text-blue-400 hover:text-blue-300"
                            >
                                View All →
                            </button>
                        </div>

                        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">

                            <div className="flex flex-col justify-between gap-5 md:flex-row">

                                <div>
                                    <div className="mb-3 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                                        AI Recommended
                                    </div>

                                    <h3 className="text-2xl font-bold">
                                        {topScholarship.name}
                                    </h3>

                                    <p className="mt-1 text-gray-400">
                                        {topScholarship.provider}
                                    </p>

                                    <p className="mt-4 text-gray-300">
                                        {topScholarship.description}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-green-500/10 p-5 text-center">
                                    <p className="text-sm text-green-400">
                                        Amount
                                    </p>

                                    <p className="text-2xl font-bold text-green-400">
                                        ₹
                                        {topScholarship.amount?.toLocaleString(
                                            "en-IN"
                                        )}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Dashboard;