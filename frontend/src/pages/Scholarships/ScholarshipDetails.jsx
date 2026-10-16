import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ScholarshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [scholarship, setScholarship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchScholarship = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/scholarships/${id}`
                );

                setScholarship(response.data.data);
            } catch (err) {
                console.error(err);

                setError(
                    err.response?.data?.message ||
                    "Failed to load scholarship details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchScholarship();
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
                Loading scholarship details...
            </div>
        );
    }

    if (error || !scholarship) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6 text-white">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-red-400">
                        Scholarship not found
                    </h2>

                    <p className="mt-2 text-gray-400">
                        {error || "The requested scholarship could not be found."}
                    </p>

                    <button
                        onClick={() => navigate("/scholarships")}
                        className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-medium hover:bg-blue-700"
                    >
                        Back to Scholarships
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Back */}
                <button
                    onClick={() => navigate("/scholarships")}
                    className="mb-6 text-sm text-blue-400 hover:text-blue-300"
                >
                    ← Back to Scholarships
                </button>

                {/* Header */}
                <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">

                    <div className="flex flex-col justify-between gap-6 md:flex-row">

                        <div>
                            <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                                Scholarship
                            </span>

                            <h1 className="mt-4 text-3xl font-bold">
                                {scholarship.name}
                            </h1>

                            <p className="mt-2 text-gray-400">
                                Provided by {scholarship.provider}
                            </p>
                        </div>

                        <div className="rounded-xl bg-green-500/10 p-5 text-center">
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

                    <p className="mt-6 leading-7 text-gray-300">
                        {scholarship.description}
                    </p>
                </div>

                {/* Eligibility */}
                <section className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">

                    <h2 className="text-2xl font-bold">
                        Eligibility Criteria
                    </h2>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">

                        <Detail
                            label="Education Level"
                            value={
                                scholarship.educationLevels?.join(", ") ||
                                "Not specified"
                            }
                        />

                        <Detail
                            label="Eligible Courses"
                            value={
                                scholarship.eligibleCourses?.join(", ") ||
                                "Not specified"
                            }
                        />

                        <Detail
                            label="Eligible States"
                            value={
                                scholarship.eligibleStates?.join(", ") ||
                                "All states"
                            }
                        />

                        <Detail
                            label="Eligible Categories"
                            value={
                                scholarship.eligibleCategories?.join(", ") ||
                                "All categories"
                            }
                        />

                        <Detail
                            label="Gender Eligibility"
                            value={
                                scholarship.genderEligibility?.join(", ") ||
                                "All"
                            }
                        />

                        <Detail
                            label="Minimum CGPA"
                            value={
                                scholarship.minimumCGPA ??
                                "No requirement"
                            }
                        />

                        <Detail
                            label="Minimum Percentage"
                            value={
                                scholarship.minimumPercentage !== null &&
                                scholarship.minimumPercentage !== undefined
                                    ? `${scholarship.minimumPercentage}%`
                                    : "No requirement"
                            }
                        />

                        <Detail
                            label="Family Income Limit"
                            value={
                                scholarship.incomeLimit !== null &&
                                scholarship.incomeLimit !== undefined
                                    ? `₹${scholarship.incomeLimit.toLocaleString(
                                          "en-IN"
                                      )}`
                                    : "No limit"
                            }
                        />

                    </div>
                </section>

                {/* Documents */}
                <section className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">

                    <h2 className="text-2xl font-bold">
                        Required Documents
                    </h2>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">

                        {scholarship.documentsRequired?.map(
                            (document, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg bg-gray-800/70 px-4 py-3 text-gray-300"
                                >
                                    ✓ {document}
                                </div>
                            )
                        )}

                    </div>
                </section>

                {/* Additional Information */}
                <section className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-6 sm:p-8">

                    <h2 className="text-2xl font-bold">
                        Additional Information
                    </h2>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">

                        <Detail
                            label="Application Deadline"
                            value={
                                scholarship.deadline
                                    ? new Date(
                                          scholarship.deadline
                                      ).toLocaleDateString("en-IN")
                                    : "Not specified"
                            }
                        />

                        <Detail
                            label="Scholarship ID"
                            value={scholarship.scholarshipId}
                        />

                        <Detail
                            label="Source Type"
                            value={scholarship.sourceType}
                        />

                    </div>
                </section>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">

                    {scholarship.applicationUrl && (
                        <a
                            href={scholarship.applicationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
                        >
                            Apply Now →
                        </a>
                    )}

                    {scholarship.sourceUrl && (
                        <a
                            href={scholarship.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-gray-700 px-6 py-3 font-semibold hover:bg-gray-800"
                        >
                            View Official Source
                        </a>
                    )}

                </div>

            </div>
        </div>
    );
};

const Detail = ({ label, value }) => (
    <div className="rounded-lg bg-gray-800/60 p-4">
        <p className="text-sm text-gray-400">
            {label}
        </p>

        <p className="mt-1 font-medium text-gray-100">
            {value}
        </p>
    </div>
);

export default ScholarshipDetails;