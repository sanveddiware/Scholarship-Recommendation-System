from rag.search import search_scholarships
from rag.context_builder import build_rag_context
from llm.qwen_service import generate_explanation


student_profile = {
    "state": "Maharashtra",
    "category": "OBC",
    "educationLevel": "UG",
    "course": "B.Tech",
    "branch": "Electronics Engineering",
    "cgpa": 8.5,
    "annualFamilyIncome": 250000,
    "gender": "Male"
}


query = """
I am an undergraduate B.Tech Electronics Engineering student
from Maharashtra looking for scholarships.
"""


results = search_scholarships(
    query,
    top_k=5
)

context = build_rag_context(results)

explanation = generate_explanation(
    student_profile,
    context
)

print("\n===== QWEN EXPLANATION =====\n")
print(explanation)