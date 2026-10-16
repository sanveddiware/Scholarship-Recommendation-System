import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [explanation, setExplanation] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Please login first.");
                    return;
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/recommendations`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setRecommendations(
                    response.data.recommendations || []
                );

                setExplanation(
                    response.data.explanation || ""
                );
            } catch (err) {
    console.error("Recommendation error:", err);

    // User is logged in but has not created a profile
    if (
        err.response?.status === 404 ||
        err.response?.data?.message === "Student profile not found."
    ) {
        navigate("/profile");
        return;
    }

    // Token is invalid/expired
    if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
    }

    setError(
        err.response?.data?.message ||
        "Failed to generate recommendations."
    );
} finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
                <div className="text-center">
                    <div className="mb-4 text-4xl">🎓</div>
                    <p className="text-lg">
                        Finding the best scholarships for you...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6 text-white">
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">
                    <h2 className="mb-2 text-xl font-semibold text-red-400">
                        Something went wrong
                    </h2>

                    <p className="text-gray-300">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-10 text-center">
                    <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-400">
                        AI-Powered Recommendation
                    </p>

                    <h1 className="text-3xl font-bold sm:text-4xl">
                        Scholarship Recommendations
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-gray-400">
                        Scholarships selected based on your eligibility,
                        academic profile and semantic relevance.
                    </p>
                </div>

                {recommendations.length === 0 ? (
                    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center">
                        <div className="mb-4 text-4xl">🔍</div>

                        <h2 className="text-xl font-semibold">
                            No scholarships found
                        </h2>

                        <p className="mt-2 text-gray-400">
                            We couldn't find scholarships matching
                            your current profile.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-8">

                        {/* Recommendation Cards */}
                        {recommendations.map(
                            (scholarship) => (
                                <div
                                    key={scholarship.scholarshipId}
                                    className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl"
                                >

                                    {/* Card Header */}
                                    <div className="border-b border-gray-800 p-6">
                                        <div className="flex flex-col justify-between gap-5 md:flex-row">

                                            <div>
                                                <div className="mb-3 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                                                    AI Recommended
                                                </div>

                                                <h2 className="text-2xl font-bold">
                                                    {scholarship.name}
                                                </h2>

                                                <p className="mt-1 text-gray-400">
                                                    Provided by{" "}
                                                    <span className="font-medium text-gray-300">
                                                        {scholarship.provider}
                                                    </span>
                                                </p>

                                                <p className="mt-4 max-w-2xl text-gray-300">
                                                    {scholarship.description}
                                                </p>
                                                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

    <div className="rounded-lg bg-gray-800/60 p-4">
        <p className="text-sm text-gray-400">
            Minimum CGPA
        </p>

        <p className="mt-1 text-lg font-semibold">
            {scholarship.minimumCGPA ?? "No requirement"}
        </p>
    </div>

    <div className="rounded-lg bg-gray-800/60 p-4">
        <p className="text-sm text-gray-400">
            Income Limit
        </p>

        <p className="mt-1 text-lg font-semibold">
            {scholarship.incomeLimit
                ? `₹${scholarship.incomeLimit.toLocaleString("en-IN")}`
                : "No limit"}
        </p>
    </div>

    <div className="rounded-lg bg-gray-800/60 p-4">
        <p className="text-sm text-gray-400">
            Minimum Percentage
        </p>

        <p className="mt-1 text-lg font-semibold">
            {scholarship.minimumPercentage
                ? `${scholarship.minimumPercentage}%`
                : "No requirement"}
        </p>
    </div>

</div>
                                            </div>

                                            <div className="min-w-[180px] rounded-xl bg-green-500/10 p-5 text-center">
                                                <p className="text-sm text-green-400">
                                                    Scholarship Amount
                                                </p>

                                                <p className="mt-1 text-3xl font-bold text-green-400">
                                                    ₹
                                                    {scholarship.amount?.toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="grid gap-8 p-6 md:grid-cols-2">

                                        {/* Eligibility */}
                                        <div>
                                            <h3 className="mb-4 text-lg font-semibold">
                                                ✓ Why you are eligible
                                            </h3>

                                            <div className="space-y-2">
                                                {scholarship.eligibilityReasons?.map(
                                                    (reason, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-start gap-3 rounded-lg bg-gray-800/60 px-4 py-3"
                                                        >
                                                            <span className="mt-0.5 text-green-400">
                                                                ✓
                                                            </span>

                                                            <span className="text-sm text-gray-300">
                                                                {reason}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {/* Documents */}
                                        <div>
                                            <h3 className="mb-4 text-lg font-semibold">
                                                📄 Required Documents
                                            </h3>

                                            <div className="space-y-2">
                                                {scholarship.documentsRequired?.map(
                                                    (document, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-3 rounded-lg bg-gray-800/60 px-4 py-3"
                                                        >
                                                            <span className="text-blue-400">
                                                                •
                                                            </span>

                                                            <span className="text-sm text-gray-300">
                                                                {document}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-3 border-t border-gray-800 p-6">

                                        {scholarship.applicationUrl && (
                                            <a
                                                href={scholarship.applicationUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium transition hover:bg-blue-700"
                                            >
                                                Apply Now →
                                            </a>
                                        )}

                                        {scholarship.sourceUrl && (
                                            <a
                                                href={scholarship.sourceUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-lg border border-gray-700 px-5 py-2.5 font-medium transition hover:bg-gray-800"
                                            >
                                                View Source
                                            </a>
                                        )}

                                    </div>

                                </div>
                            )
                        )}

                        {/* AI Explanation */}
                        {explanation && (
                            <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 shadow-xl sm:p-8">

                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-xl">
                                        🤖
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold">
                                            AI Explanation
                                        </h2>

                                        <p className="text-sm text-gray-400">
                                            Generated using your profile,
                                            scholarship data and RAG.
                                        </p>
                                    </div>
                                </div>

                                <div className="prose prose-invert max-w-none text-left text-gray-300">
                                    <ReactMarkdown>
                                        {explanation}
                                    </ReactMarkdown>
                                </div>

                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
};

export default Recommendations;