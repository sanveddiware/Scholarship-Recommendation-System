
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
    scholarshipId: "",
    name: "",
    provider: "",
    description: "",
    amount: "",
    educationLevels: "UG",
    eligibleCourses: "",
    eligibleStates: "",
    eligibleCategories: "OPEN, OBC, SC, ST, EWS",
    genderEligibility: "All",
    incomeLimit: "",
    minimumPercentage: "",
    minimumCGPA: "",
    ageLimit: "",
    deadline: "",
    documentsRequired: "",
    applicationUrl: "",
    sourceUrl: ""
};

const toArray = (value) =>
    value.split(",").map((item) => item.trim()).filter(Boolean);

const ManageScholarships = () => {
    const [scholarships, setScholarships] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchScholarships = async () => {
        try {
            const response = await axios.get(`${API_URL}/scholarships`);
            const data =
                response.data.scholarships ??
                response.data.data ??
                response.data;

            setScholarships(Array.isArray(data) ? data : []);
        } catch {
            setError("Failed to load scholarships.");
        }
    };

    useEffect(() => {
        fetchScholarships();
    }, []);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        const token = localStorage.getItem("token");

        const payload = {
            ...form,
            amount: Number(form.amount),
            educationLevels: toArray(form.educationLevels),
            eligibleCourses: toArray(form.eligibleCourses),
            eligibleStates: toArray(form.eligibleStates),
            eligibleCategories: toArray(form.eligibleCategories),
            genderEligibility: toArray(form.genderEligibility),
            documentsRequired: toArray(form.documentsRequired),
            incomeLimit: form.incomeLimit === "" ? null : Number(form.incomeLimit),
            minimumPercentage:
                form.minimumPercentage === ""
                    ? null
                    : Number(form.minimumPercentage),
            minimumCGPA:
                form.minimumCGPA === "" ? null : Number(form.minimumCGPA),
            ageLimit: form.ageLimit === "" ? null : Number(form.ageLimit),
            deadline: form.deadline || null,
            sourceType: "manual"
        };

        try {
           
const requestConfig = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
};

if (editingId) {
    await axios.put(
        `${API_URL}/scholarships/${editingId}`,
        payload,
        requestConfig
    );
    setMessage("Scholarship updated successfully!");
} else {
    await axios.post(
        `${API_URL}/scholarships`,
        payload,
        requestConfig
    );
    setMessage("Scholarship added successfully!");
}

setForm(initialForm);
setEditingId(null);
setShowForm(false);
await fetchScholarships();


        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to add scholarship. Check your admin access and form data."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this scholarship?")) {
            return;
        }

        setError("");
        setMessage("");

        try {
            await axios.delete(`${API_URL}/scholarships/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setMessage("Scholarship deleted successfully.");
            await fetchScholarships();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to delete scholarship."
            );
        }
    };

    const fields = [
        ["scholarshipId", "Scholarship ID", true],
        ["name", "Scholarship Name", true],
        ["provider", "Provider", true],
        ["description", "Description", false],
        ["amount", "Amount (₹)", true],
        ["educationLevels", "Education Levels (comma-separated)", true],
        ["eligibleCourses", "Eligible Courses (comma-separated)", false],
        ["eligibleStates", "Eligible States (comma-separated)", false],
        ["eligibleCategories", "Eligible Categories (comma-separated)", false],
        ["genderEligibility", "Gender Eligibility (e.g. All)", false],
        ["incomeLimit", "Annual Income Limit (₹)", false],
        ["minimumPercentage", "Minimum Percentage", false],
        ["minimumCGPA", "Minimum CGPA", false],
        ["ageLimit", "Maximum Age", false],
        ["deadline", "Application Deadline", false],
        ["documentsRequired", "Required Documents (comma-separated)", false],
        ["applicationUrl", "Application URL", false],
        ["sourceUrl", "Source URL", false]
    ];

    
const handleEdit = (scholarship) => {
    setEditingId(scholarship._id);

    setForm({
        scholarshipId: scholarship.scholarshipId || "",
        name: scholarship.name || "",
        provider: scholarship.provider || "",
        description: scholarship.description || "",
        amount: String(scholarship.amount ?? ""),
        educationLevels: (scholarship.educationLevels || []).join(", "),
        eligibleCourses: (scholarship.eligibleCourses || []).join(", "),
        eligibleStates: (scholarship.eligibleStates || []).join(", "),
        eligibleCategories: (scholarship.eligibleCategories || []).join(", "),
        genderEligibility: (scholarship.genderEligibility || ["All"]).join(", "),
        incomeLimit: scholarship.incomeLimit ?? "",
        minimumPercentage: scholarship.minimumPercentage ?? "",
        minimumCGPA: scholarship.minimumCGPA ?? "",
        ageLimit: scholarship.ageLimit ?? "",
        deadline: scholarship.deadline
            ? String(scholarship.deadline).slice(0, 10)
            : "",
        documentsRequired: (scholarship.documentsRequired || []).join(", "),
        applicationUrl: scholarship.applicationUrl || "",
        sourceUrl: scholarship.sourceUrl || ""
    });

    setMessage("");
    setError("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
};


    return (
        <div className="min-h-screen bg-gray-950 px-4 py-10 text-white sm:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="mb-2 text-sm font-medium text-blue-400">
                            ADMIN PANEL
                        </p>
                        <h1 className="text-3xl font-bold">
                            Manage Scholarships
                        </h1>
                        <p className="mt-2 text-gray-400">
                            Add and manage scholarship opportunities.
                        </p>
                    </div>

                    <button
                        
onClick={() => {
    if (showForm) {
        setForm(initialForm);
        setEditingId(null);
    }

    setShowForm(!showForm);
    setMessage("");
    setError("");
}}

                        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
                    >
                        {showForm ? "Cancel" : "+ Add Scholarship"}
                    </button>
                </div>

                {message && (
                    <p className="mb-4 rounded-lg bg-green-900/40 p-3 text-green-300">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="mb-4 rounded-lg bg-red-900/40 p-3 text-red-300">
                        {error}
                    </p>
                )}

                {showForm && (
                    <form
                        onSubmit={handleSubmit}
                        className="mb-10 rounded-2xl border border-gray-800 bg-gray-900 p-6"
                    >
                        
<h2 className="mb-6 text-xl font-semibold">
    {editingId ? "Edit Scholarship" : "Add New Scholarship"}
</h2>


                        <div className="grid gap-5 md:grid-cols-2">
                            {fields.map(([name, label, required]) => (
                                <label
                                    key={name}
                                    className="flex flex-col gap-2"
                                >
                                    <span className="text-sm text-gray-300">
                                        {label}
                                        {required && " *"}
                                    </span>

                                    {name === "description" ? (
                                        <textarea
                                            name={name}
                                            value={form[name]}
                                            onChange={handleChange}
                                            rows={3}
                                            className="rounded-lg border border-gray-700 bg-gray-950 p-3 outline-none focus:border-blue-500"
                                        />
                                    ) : (
                                        <input
                                            name={name}
                                            type={
                                                name === "deadline"
                                                    ? "date"
                                                    : [
                                                        "amount",
                                                        "incomeLimit",
                                                        "minimumPercentage",
                                                        "minimumCGPA",
                                                        "ageLimit"
                                                    ].includes(name)
                                                        ? "number"
                                                        : "text"
                                            }
                                            step={
                                                ["minimumPercentage", "minimumCGPA"].includes(name)
                                                    ? "any"
                                                    : "1"
                                            }
                                            min={
                                                name === "deadline"
                                                    ? undefined
                                                    : "0"
                                            }
                                            value={form[name]}
                                            onChange={handleChange}
                                            required={required}
                                            className="rounded-lg border border-gray-700 bg-gray-950 p-3 outline-none focus:border-blue-500"
                                        />
                                    )}
                                </label>
                            ))}
                        </div>

                        <p className="mt-4 text-sm text-gray-400">
                            For list fields, separate multiple values with commas.
                            Leave a field blank if that criterion does not apply.
                        </p>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 disabled:opacity-50"
                        >
                            
{loading
    ? "Saving..."
    : editingId
        ? "Update Scholarship"
        : "Save Scholarship"}

                        </button>
                    </form>
                )}

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        Existing Scholarships
                    </h2>
                    <span className="text-sm text-gray-400">
                        {scholarships.length} total
                    </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {scholarships.map((scholarship) => (
                        <div
                            key={scholarship._id || scholarship.scholarshipId}
                            className="rounded-xl border border-gray-800 bg-gray-900 p-5"
                        >
                            <h3 className="text-lg font-semibold">
                                {scholarship.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                                {scholarship.provider}
                            </p>
                            <p className="mt-4 text-xl font-bold text-blue-400">
                                ₹{Number(scholarship.amount || 0).toLocaleString("en-IN")}
                            </p>

                            <button
                                onClick={() => handleDelete(scholarship._id)}
                                className="mt-5 rounded-lg border border-red-800 px-4 py-2 text-sm text-red-300 hover:bg-red-950"
                            >
                                Delete
                            </button>
                            
<button
    onClick={() => handleEdit(scholarship)}
    className="mr-3 mt-5 rounded-lg border border-blue-700 px-4 py-2 text-sm text-blue-300 hover:bg-blue-950"
>
    Edit
</button>

                        </div>
                    ))}
                </div>

                {scholarships.length === 0 && (
                    <p className="rounded-xl border border-gray-800 p-8 text-center text-gray-400">
                        No scholarships found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ManageScholarships;
