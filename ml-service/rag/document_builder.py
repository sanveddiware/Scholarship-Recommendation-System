def scholarship_to_text(scholarship):
    return f"""
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

Minimum Percentage:
{scholarship.get("minimumPercentage", "")}

Minimum CGPA:
{scholarship.get("minimumCGPA", "")}

Age Limit:
{scholarship.get("ageLimit", "")}

Deadline:
{scholarship.get("deadline", "")}

Documents Required:
{", ".join(scholarship.get("documentsRequired", []))}

Application URL:
{scholarship.get("applicationUrl", "")}
""".strip()