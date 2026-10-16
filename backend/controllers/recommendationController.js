const StudentProfile = require("../models/StudentProfile");
const Scholarship = require("../models/Scholarship");

const checkEligibility = require("../services/eligibilityService");

const {
    searchScholarships,
    generateExplanation
} = require("../services/mlService");


const getEligibleScholarships = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({
            user: req.user.id
        });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found."
            });
        }

        const scholarships = await Scholarship.find({
            isActive: true
        });

        const eligibleScholarships = [];

        for (const scholarship of scholarships) {
            const result = checkEligibility(
                profile,
                scholarship
            );

            if (result.eligible) {
                eligibleScholarships.push({
                    scholarship,
                    reasons: result.reasons
                });
            }
        }

        return res.json({
            success: true,
            count: eligibleScholarships.length,
            scholarships: eligibleScholarships
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to get eligible scholarships."
        });
    }
};


const getRecommendations = async (req, res) => {
    try {
        const profile = await StudentProfile.findOne({
            user: req.user.id
        });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Student profile not found."
            });
        }

        const scholarships = await Scholarship.find({
            isActive: true
        });

        // Step 1: Deterministic eligibility filtering
        const eligibleScholarships = [];

        for (const scholarship of scholarships) {
            const result = checkEligibility(
                profile,
                scholarship
            );

            if (result.eligible) {
                eligibleScholarships.push({
                    scholarship,
                    reasons: result.reasons
                });
            }
        }

        if (eligibleScholarships.length === 0) {
            return res.json({
                success: true,
                count: 0,
                recommendations: []
            });
        }

        // Step 2: Create semantic search query
        const query = `
            Student profile:
            State: ${profile.state}
            Category: ${profile.category}
            Education Level: ${profile.educationLevel}
            Course: ${profile.course}
            Branch: ${profile.branch || ""}
            CGPA: ${profile.cgpa || ""}
            Annual Family Income: ${profile.annualFamilyIncome}
            Gender: ${profile.gender || ""}

            Find scholarships relevant to this student.
        `;

        // Step 3: RAG retrieval
        const mlResult = await searchScholarships(
            query,
            5
        );

        const eligibleIds = new Set(
            eligibleScholarships.map(
                item => item.scholarship.scholarshipId
            )
        );

        const recommendations =
    mlResult.results
        .filter(result =>
            eligibleIds.has(
                result.scholarship.scholarshipId
            )
        )
        .map(result => {
            const eligible =
                eligibleScholarships.find(
                    item =>
                        item.scholarship.scholarshipId ===
                        result.scholarship.scholarshipId
                );

            const scholarship = result.scholarship;

            return {
    scholarshipId: scholarship.scholarshipId,
    name: scholarship.name,
    provider: scholarship.provider,
    description: scholarship.description,
    amount: scholarship.amount,
    score: result.score,

    minimumCGPA: scholarship.minimumCGPA,
    minimumPercentage: scholarship.minimumPercentage,
    incomeLimit: scholarship.incomeLimit,

    eligibleStates: scholarship.eligibleStates,
    eligibleCategories: scholarship.eligibleCategories,
    eligibleCourses: scholarship.eligibleCourses,
    genderEligibility: scholarship.genderEligibility,

    eligibilityReasons:
        eligible.reasons,

    documentsRequired:
        scholarship.documentsRequired,

    deadline:
        scholarship.deadline,

    applicationUrl:
        scholarship.applicationUrl,

    sourceUrl:
        scholarship.sourceUrl
};
        });
            

        if (recommendations.length === 0) {
            return res.json({
                success: true,
                count: 0,
                recommendations: []
            });
        }

        // Step 4: Generate personalized explanation
        const explanationResult =
            await generateExplanation(
                profile.toObject(),
                recommendations
            );

        // Step 5: Return final result
        return res.json({
            success: true,
            count: recommendations.length,
            recommendations,
            explanation:
                explanationResult.explanation
        });

    } catch (error) {
        console.error(
            "Recommendation error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to generate recommendations."
        });
    }
};

module.exports = {
    getEligibleScholarships,
    getRecommendations
};