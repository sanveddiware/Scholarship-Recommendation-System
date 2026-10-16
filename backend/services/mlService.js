const axios = require("axios");

const ML_SERVICE_URL =
    process.env.ML_SERVICE_URL || "http://localhost:8000";

const searchScholarships = async (query, topK = 5) => {
    try {
        const response = await axios.get(
    `${ML_SERVICE_URL}/search`,
    {
        params: {
            query,
            top_k: topK
        },
        timeout: 120000
    }
);

        return response.data;
    } catch (error) {
        console.error(
            "ML search error:",
            error.response?.data || error.message
        );

        throw new Error("ML search service unavailable");
    }
};




const generateExplanation = async (
    studentProfile,
    scholarships
) => {
    try {
        const response = await axios.post(
            `${ML_SERVICE_URL}/generate-explanation`,
            {
                studentProfile,
                scholarships
            }
        );

        return response.data;
    } catch (error) {
        console.error(
            "ML explanation error:",
            error.response?.data || error.message
        );

        throw new Error(
            "ML explanation service unavailable"
        );
    }
};



const refreshScholarshipIndex = async () => {
    try {
        const response = await axios.post(
            `${ML_SERVICE_URL}/rebuild-index`,
            {},
            { timeout: 120000 }
        );

        console.log("FAISS index refreshed successfully.");
        return response.data;
    } catch (error) {
        console.error(
            "FAISS index refresh failed:",
            error.response?.data || error.message
        );

        // MongoDB changes should remain successful even if
        // the ML index refresh fails.
        return null;
    }
};



module.exports = {
    searchScholarships,
    generateExplanation,
    refreshScholarshipIndex
};