import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        dateOfBirth: "",
        gender: "",
        state: "",
        category: "",
        educationLevel: "",
        course: "",
        branch: "",
        college: "",
        yearOfStudy: "",
        percentage: "",
        cgpa: "",
        annualFamilyIncome: "",
        disability: false,
        achievements: "",
        skills: "",
        preferredScholarshipAmount: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const profile = response.data.profile;

                if (profile) {
                    setError("");
                    setFormData({
                        dateOfBirth: profile.dateOfBirth
                            ? profile.dateOfBirth.substring(0, 10)
                            : "",
                        gender: profile.gender || "",
                        state: profile.state || "",
                        category: profile.category || "",
                        educationLevel:
                            profile.educationLevel || "",
                        course: profile.course || "",
                        branch: profile.branch || "",
                        college: profile.college || "",
                        yearOfStudy:
                            profile.yearOfStudy || "",
                        percentage:
                            profile.percentage || "",
                        cgpa: profile.cgpa || "",
                        annualFamilyIncome:
                            profile.annualFamilyIncome || "",
                        disability:
                            profile.disability || false,
                        achievements:
                            profile.achievements?.join(", ") || "",
                        skills:
                            profile.skills?.join(", ") || "",
                        preferredScholarshipAmount:
                            profile.preferredScholarshipAmount || ""
                    });
                }
            } catch (err) {
    if (err.response?.status === 404) {
        setError("");
    } else {
        setError(
            err.response?.data?.message ||
            "Failed to load profile."
        );
    }
} finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProfile();
        } else {
            setError("Please login first.");
            setLoading(false);
        }
    }, [token]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox"
                ? checked
                : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const payload = {
                ...formData,

                yearOfStudy: formData.yearOfStudy
                    ? Number(formData.yearOfStudy)
                    : undefined,

                percentage: formData.percentage
                    ? Number(formData.percentage)
                    : undefined,

                cgpa: formData.cgpa
                    ? Number(formData.cgpa)
                    : undefined,

                annualFamilyIncome:
                    Number(formData.annualFamilyIncome),

                preferredScholarshipAmount:
                    formData.preferredScholarshipAmount
                        ? Number(
                            formData.preferredScholarshipAmount
                        )
                        : undefined,

                achievements: formData.achievements
                    ? formData.achievements
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                    : [],

                skills: formData.skills
                    ? formData.skills
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                    : []
            };

            await axios.put(
                `${import.meta.env.VITE_API_URL}/profile`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage("Profile saved successfully.");

            setTimeout(() => {
                navigate("/dashboard");
            }, 700);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to save profile."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-blue-400">
                        Student Profile
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                        Complete Your Profile
                    </h1>

                    <p className="mt-2 text-gray-400">
                        Your profile information is used to determine
                        scholarship eligibility and recommendations.
                    </p>
                </div>

                {message && (
                    <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-green-400">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >

                    {/* Personal Information */}
                    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                        <h2 className="mb-6 text-xl font-semibold">
                            Personal Information
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">

                            <Input
                                label="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />

                            <Select
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                options={[
                                    "Male",
                                    "Female",
                                    "Other",
                                    "Prefer not to say"
                                ]}
                            />

                            <Input
                                label="State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="e.g. Maharashtra"
                            />

                            <Select
                                label="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                options={[
                                    "OPEN",
                                    "OBC",
                                    "SC",
                                    "ST",
                                    "EWS",
                                    "Other"
                                ]}
                            />

                        </div>
                    </section>

                    {/* Academic Information */}
                    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                        <h2 className="mb-6 text-xl font-semibold">
                            Academic Information
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">

                            <Select
                                label="Education Level"
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleChange}
                                options={[
                                    "10th",
                                    "12th",
                                    "UG",
                                    "PG",
                                    "PhD"
                                ]}
                            />

                            <Input
                                label="Course"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                placeholder="e.g. B.Tech"
                            />

                            <Input
                                label="Branch"
                                name="branch"
                                value={formData.branch}
                                onChange={handleChange}
                                placeholder="e.g. Electronics Engineering"
                            />

                            <Input
                                label="College"
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                            />

                            <Input
                                label="Year of Study"
                                name="yearOfStudy"
                                type="number"
                                min="1"
                                max="10"
                                value={formData.yearOfStudy}
                                onChange={handleChange}
                            />

                            <Input
                                label="Percentage"
                                name="percentage"
                                type="number"
                                min="0"
                                max="100"
                                step="0.01"
                                value={formData.percentage}
                                onChange={handleChange}
                            />

                            <Input
                                label="CGPA"
                                name="cgpa"
                                type="number"
                                min="0"
                                max="10"
                                step="0.01"
                                value={formData.cgpa}
                                onChange={handleChange}
                            />

                        </div>
                    </section>

                    {/* Financial Information */}
                    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                        <h2 className="mb-6 text-xl font-semibold">
                            Financial Information
                        </h2>

                        <div className="grid gap-5 md:grid-cols-2">

                            <Input
                                label="Annual Family Income (₹)"
                                name="annualFamilyIncome"
                                type="number"
                                min="0"
                                value={
                                    formData.annualFamilyIncome
                                }
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Preferred Scholarship Amount (₹)"
                                name="preferredScholarshipAmount"
                                type="number"
                                min="0"
                                value={
                                    formData.preferredScholarshipAmount
                                }
                                onChange={handleChange}
                            />

                        </div>
                    </section>

                    {/* Additional Information */}
                    <section className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                        <h2 className="mb-6 text-xl font-semibold">
                            Additional Information
                        </h2>

                        <div className="space-y-5">

                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="disability"
                                    checked={formData.disability}
                                    onChange={handleChange}
                                    className="h-4 w-4"
                                />

                                <span className="text-gray-300">
                                    I have a disability
                                </span>
                            </label>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Achievements
                                </label>

                                <textarea
                                    name="achievements"
                                    value={formData.achievements}
                                    onChange={handleChange}
                                    placeholder="Separate multiple achievements with commas"
                                    rows="3"
                                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm text-gray-300">
                                    Skills
                                </label>

                                <textarea
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="e.g. C++, Python, React"
                                    rows="3"
                                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />
                            </div>

                        </div>
                    </section>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Profile"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};


/* Reusable Input */
const Input = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    min,
    max,
    step
}) => (
    <div>
        <label className="mb-2 block text-sm text-gray-300">
            {label}
        </label>

        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            min={min}
            max={max}
            step={step}
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        />
    </div>
);


/* Reusable Select */
const Select = ({
    label,
    name,
    value,
    onChange,
    options
}) => (
    <div>
        <label className="mb-2 block text-sm text-gray-300">
            {label}
        </label>

        <select
            name={name}
            value={value}
            onChange={onChange}
            required
            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
            <option value="">
                Select {label}
            </option>

            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

export default Profile;