import requests


OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5:7b-instruct-q4_K_M"


def generate_explanation(student_profile, context):
    prompt = f"""
You are an AI scholarship explanation assistant.

The eligibility decision has ALREADY been made by a deterministic
eligibility engine. Your job is ONLY to explain that decision
using the exact information provided below.

STRICT RULES:

1. NEVER calculate, modify, infer, or reinterpret scholarship
   eligibility requirements.

2. NEVER replace a scholarship requirement with the student's
   value.

3. Always distinguish between:
   - Student's actual value
   - Scholarship's required value

4. If the scholarship says:
   Minimum CGPA: 6
   and the student has:
   CGPA: 8.5

   You MUST say:
   "The student's CGPA is 8.5, which is above the minimum
   required CGPA of 6."

5. If the scholarship says:
   Income Limit: 300000
   and the student has:
   Annual Family Income: 250000

   You MUST say:
   "The student's annual family income is 250000, which is
   within the scholarship income limit of 300000."

6. If Gender Eligibility contains "All", say:
   "The scholarship is open to all genders."

7. NEVER say "not specified", "likely", "probably", or
   "generally" when the required information is present
   in the scholarship context.

8. NEVER invent missing information.

9. Use ONLY the provided student profile and scholarship context.

10. Do not make a new eligibility decision.

Student Profile:
State: {student_profile.get("state", "")}
Category: {student_profile.get("category", "")}
Education Level: {student_profile.get("educationLevel", "")}
Course: {student_profile.get("course", "")}
Branch: {student_profile.get("branch", "")}
CGPA: {student_profile.get("cgpa", "")}
Annual Family Income: {student_profile.get("annualFamilyIncome", "")}
Gender: {student_profile.get("gender", "")}

Scholarship Context:
{context}

Generate a concise explanation with exactly these sections:

### Why this scholarship is relevant
Explain why the scholarship matches the student.

### Matching Criteria
For each important criterion, explicitly provide:
- Student's value
- Scholarship requirement

### Required Documents
List the documents exactly as provided.

### Scholarship Amount
State the amount exactly as provided.

Do not add information that is not present in the context.
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "stream": False
        },
        timeout=120
    )

    response.raise_for_status()

    return response.json()["response"]