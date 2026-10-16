from rag.search import search_scholarships
from rag.context_builder import build_rag_context

query = """
I am an undergraduate engineering student
from Maharashtra looking for a scholarship.
"""

results = search_scholarships(query, top_k=5)

context = build_rag_context(results)

print(context)