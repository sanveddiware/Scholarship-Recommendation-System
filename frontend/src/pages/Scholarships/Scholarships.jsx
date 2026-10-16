import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Scholarships = () => {
    const navigate = useNavigate();

    const [scholarships, setScholarships] = useState([]);
    const [search, setSearch] = useState("");
    const [stateFilter, setStateFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [educationFilter, setEducationFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/scholarships`
                );

                setScholarships(
    response.data.data || []
);
            } catch (err) {
                console.error(err);

                setError(
                    err.response?.data?.message ||
                    "Failed to load scholarships."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchScholarships();
    }, []);

    const states = useMemo(() => {
        return [
            ...new Set(
                scholarships.flatMap(
                    (scholarship) =>
                        scholarship.eligibleStates || []
                )
            )
        ].sort();
    }, [scholarships]);

    const categories = useMemo(() => {
        return [
            ...new Set(
                scholarships.flatMap(
                    (scholarship) =>
                        scholarship.eligibleCategories || []
                )
            )
        ].sort();
    }, [scholarships]);

    const educationLevels = useMemo(() => {
        return [
            ...new Set(
                scholarships.flatMap(
                    (scholarship) =>
                        scholarship.educationLevels || []
                )
            )
        ].sort();
    }, [scholarships]);

    const filteredScholarships = useMemo(() => {
        const query = search.toLowerCase().trim();

        return scholarships.filter((scholarship) => {
            const matchesSearch =
                !query ||
                scholarship.name
                    ?.toLowerCase()
                    .includes(query) ||
                scholarship.provider
                    ?.toLowerCase()
                    .includes(query) ||
                scholarship.description
                    ?.toLowerCase()
                    .includes(query) ||
                scholarship.eligibleCourses?.some((course) =>
                    course.toLowerCase().includes(query)
                );

            const matchesState =
                !stateFilter ||
                scholarship.eligibleStates?.includes(
                    stateFilter
                );

            const matchesCategory =
                !categoryFilter ||
                scholarship.eligibleCategories?.includes(
                    categoryFilter
                );

            const matchesEducation =
                !educationFilter ||
                scholarship.educationLevels?.includes(
                    educationFilter
                );

            return (
                matchesSearch &&
                matchesState &&
                matchesCategory &&
                matchesEducation
            );
        });
    }, [
        scholarships,
        search,
        stateFilter,
        categoryFilter,
        educationFilter
    ]);

    const clearFilters = () => {
        setSearch("");
        setStateFilter("");
        setCategoryFilter("");
        setEducationFilter("");
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
                <p>Loading scholarships...</p>
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

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
                        Scholarship Explorer
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                        Explore Scholarships
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Browse scholarships and find opportunities
                        that match your academic profile.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 rounded-2xl border border-gray-800 bg-gray-900 p-5">

                    <div className="grid gap-4 lg:grid-cols-4">

                        {/* Search */}
                        <div className="lg:col-span-1">
                            <label className="mb-2 block text-sm text-gray-400">
                                Search
                            </label>

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search scholarships..."
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-blue-500"
                            />
                        </div>

                        {/* State */}
                        <FilterSelect
                            label="State"
                            value={stateFilter}
                            onChange={setStateFilter}
                            options={states}
                        />

                        {/* Category */}
                        <FilterSelect
                            label="Category"
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                            options={categories}
                        />

                        {/* Education */}
                        <FilterSelect
                            label="Education Level"
                            value={educationFilter}
                            onChange={setEducationFilter}
                            options={educationLevels}
                        />

                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

                        <p className="text-sm text-gray-400">
                            Showing{" "}
                            <span className="font-semibold text-white">
                                {filteredScholarships.length}
                            </span>{" "}
                            of{" "}
                            <span className="font-semibold text-white">
                                {scholarships.length}
                            </span>{" "}
                            scholarships
                        </p>

                        <button
                            onClick={clearFilters}
                            className="text-sm text-blue-400 hover:text-blue-300"
                        >
                            Clear Filters
                        </button>

                    </div>
                </div>

                {/* Scholarship List */}
                {filteredScholarships.length === 0 ? (
                    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-10 text-center">

                        <div className="mb-4 text-4xl">
                            🔍
                        </div>

                        <h2 className="text-xl font-semibold">
                            No scholarships found
                        </h2>

                        <p className="mt-2 text-gray-400">
                            Try changing your search or filters.
                        </p>

                        <button
                            onClick={clearFilters}
                            className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 font-medium hover:bg-blue-700"
                        >
                            Clear Filters
                        </button>

                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">

                        {filteredScholarships.map(
                            (scholarship) => (
                                <div
                                    key={scholarship.scholarshipId}
                                    className="flex flex-col rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition hover:-translate-y-1 hover:border-gray-700"
                                >

                                    {/* Title */}
                                    <div className="flex-1">

                                        <div className="mb-3 flex items-start justify-between gap-4">
                                            <div>
                                                <h2 className="text-xl font-bold">
                                                    {scholarship.name}
                                                </h2>

                                                <p className="mt-1 text-sm text-gray-400">
                                                    {scholarship.provider}
                                                </p>
                                            </div>

                                            <div className="whitespace-nowrap rounded-lg bg-green-500/10 px-3 py-2 text-sm font-semibold text-green-400">
                                                ₹
                                                {scholarship.amount?.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </div>
                                        </div>

                                        <p className="mb-5 text-sm leading-6 text-gray-300">
                                            {scholarship.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="mb-5 flex flex-wrap gap-2">

                                            {scholarship.educationLevels?.map(
                                                (level) => (
                                                    <span
                                                        key={level}
                                                        className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400"
                                                    >
                                                        {level}
                                                    </span>
                                                )
                                            )}

                                            {scholarship.eligibleCategories?.slice(
                                                0,
                                                3
                                            ).map((category) => (
                                                <span
                                                    key={category}
                                                    className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400"
                                                >
                                                    {category}
                                                </span>
                                            ))}

                                        </div>

                                        {/* Requirements */}
                                        <div className="space-y-2 text-sm text-gray-400">

                                            {scholarship.minimumCGPA !== null &&
                                                scholarship.minimumCGPA !==
                                                    undefined && (
                                                    <p>
                                                        <span className="text-gray-300">
                                                            Minimum CGPA:
                                                        </span>{" "}
                                                        {
                                                            scholarship.minimumCGPA
                                                        }
                                                    </p>
                                                )}

                                            {scholarship.minimumPercentage !==
                                                null &&
                                                scholarship.minimumPercentage !==
                                                    undefined && (
                                                    <p>
                                                        <span className="text-gray-300">
                                                            Minimum Percentage:
                                                        </span>{" "}
                                                        {
                                                            scholarship.minimumPercentage
                                                        }
                                                        %
                                                    </p>
                                                )}

                                            {scholarship.incomeLimit !==
                                                null &&
                                                scholarship.incomeLimit !==
                                                    undefined && (
                                                    <p>
                                                        <span className="text-gray-300">
                                                            Income Limit:
                                                        </span>{" "}
                                                        ₹
                                                        {scholarship.incomeLimit.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </p>
                                                )}

                                        </div>

                                    </div>

                                    {/* Actions */}
                                    <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-800 pt-5">

                                        <button
                                            onClick={() =>
    navigate(
        `/scholarships/${scholarship._id}`
    )
}
                                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700"
                                        >
                                            View Details
                                        </button>

                                        {scholarship.applicationUrl && (
                                            <a
                                                href={
                                                    scholarship.applicationUrl
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-lg border border-gray-700 px-4 py-2 font-medium hover:bg-gray-800"
                                            >
                                                Apply Now
                                            </a>
                                        )}

                                    </div>

                                </div>
                            )
                        )}

                    </div>
                )}

            </div>
        </div>
    );
};

const FilterSelect = ({
    label,
    value,
    onChange,
    options
}) => (
    <div>
        <label className="mb-2 block text-sm text-gray-400">
            {label}
        </label>

        <select
            value={value}
            onChange={(event) =>
                onChange(event.target.value)
            }
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
            <option value="">
                All {label}s
            </option>

            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

export default Scholarships;

