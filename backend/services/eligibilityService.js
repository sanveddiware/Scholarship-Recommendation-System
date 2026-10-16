const checkEligibility = (student, scholarship) => {
    const reasons = [];
    const failedCriteria = [];

    // State
    if (
        scholarship.eligibleStates.length > 0 &&
        !scholarship.eligibleStates.includes(student.state)
    ) {
        failedCriteria.push("State does not match");
    } else {
        reasons.push("State matches");
    }

    // Category
    if (
        scholarship.eligibleCategories.length > 0 &&
        !scholarship.eligibleCategories.includes(student.category)
    ) {
        failedCriteria.push("Category does not match");
    } else {
        reasons.push("Category matches");
    }

    // Education level
    if (
        scholarship.educationLevels.length > 0 &&
        !scholarship.educationLevels.includes(student.educationLevel)
    ) {
        failedCriteria.push("Education level does not match");
    } else {
        reasons.push("Education level matches");
    }

    // Course
    if (
        scholarship.eligibleCourses.length > 0 &&
        !scholarship.eligibleCourses.includes(student.course) &&
        !scholarship.eligibleCourses.includes(student.branch)
    ) {
        failedCriteria.push("Course/branch does not match");
    } else {
        reasons.push("Course/branch matches");
    }

    // Income
    if (
        scholarship.incomeLimit !== null &&
        student.annualFamilyIncome > scholarship.incomeLimit
    ) {
        failedCriteria.push("Family income exceeds the limit");
    } else {
        reasons.push("Family income is within the limit");
    }

    // CGPA
    if (
        scholarship.minimumCGPA !== null &&
        student.cgpa < scholarship.minimumCGPA
    ) {
        failedCriteria.push("CGPA is below the minimum requirement");
    } else {
        reasons.push("CGPA requirement satisfied");
    }

    // Percentage
    if (
        scholarship.minimumPercentage !== null &&
        student.percentage !== undefined &&
        student.percentage < scholarship.minimumPercentage
    ) {
        failedCriteria.push("Percentage is below the minimum requirement");
    } else if (scholarship.minimumPercentage !== null) {
        reasons.push("Percentage requirement satisfied");
    }

    // Gender
    if (
        scholarship.genderEligibility.length > 0 &&
        !scholarship.genderEligibility.includes("All") &&
        !scholarship.genderEligibility.includes(student.gender)
    ) {
        failedCriteria.push("Gender eligibility does not match");
    } else {
        reasons.push("Gender eligibility matches");
    }

    // Disability
    // This is intentionally not treated as a requirement yet because
    // our scholarship schema currently does not have a disability field.

    return {
        eligible: failedCriteria.length === 0,
        reasons,
        failedCriteria
    };
};

module.exports = checkEligibility;