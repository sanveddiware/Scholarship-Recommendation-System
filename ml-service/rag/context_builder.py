def build_rag_context(results):
    context_parts = []

    for result in results:
        scholarship = result["scholarship"]

        context = f"""
Scholarship Name: {scholarship.get("name", "")}
Provider: {scholarship.get("provider", "")}
Description: {scholarship.get("description", "")}
Amount: {scholarship.get("amount", "")}

Education Levels:
{", ".join(scholarship.get("educationLevels", []))}

Eligible Courses:
{", ".join(scholarship.get("eligibleCourses", []))}

Eligible States:
{", ".join(scholarship.get("eligibleStates", []))}

Eligible Categories:
{", ".join(scholarship.get("eligibleCategories", []))}

Gender Eligibility:
{", ".join(scholarship.get("genderEligibility", []))}

Income Limit:
{scholarship.get("incomeLimit", "")}

Minimum CGPA:
{scholarship.get("minimumCGPA", "")}

Minimum Percentage:
{scholarship.get("minimumPercentage", "")}

Deadline:
{scholarship.get("deadline", "")}

Documents Required:
{", ".join(scholarship.get("documentsRequired", []))}

Application URL:
{scholarship.get("applicationUrl", "")}

Semantic Similarity:
{result.get("score", "")}
""".strip()

        context_parts.append(context)

    return "\n\n---\n\n".join(context_parts)