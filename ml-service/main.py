from fastapi import FastAPI, Query, HTTPException
from pydantic import BaseModel

from rag.search import search_scholarships
from rag.context_builder import build_rag_context
from llm.qwen_service import generate_explanation
from rag.build_index import build_index

app = FastAPI(
    title="AI Scholarship Recommendation ML Service",
    version="1.0.0"
)


class ExplanationRequest(BaseModel):
    studentProfile: dict
    scholarships: list


@app.get("/")
def home():
    return {
        "success": True,
        "message": "Scholarship ML Service is running"
    }


@app.get("/search")
def search(
    query: str = Query(..., min_length=1),
    top_k: int = Query(5, ge=1, le=20)
):
    results = search_scholarships(
        query=query,
        top_k=top_k
    )

    return {
        "success": True,
        "query": query,
        "results": results
    }


@app.post("/generate-explanation")
def generate_explanation_endpoint(
    request: ExplanationRequest
):
    try:
        # Convert scholarship list into the format
        # expected by the context builder
        results = []

        for scholarship in request.scholarships:
            results.append({
                "score": scholarship.get("score", 0),
                "scholarship": scholarship.get(
                    "scholarship",
                    scholarship
                )
            })

        context = build_rag_context(results)

        explanation = generate_explanation(
            request.studentProfile,
            context
        )

        return {
            "success": True,
            "explanation": explanation
        }

    except Exception as error:
        print("LLM error:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to generate explanation."
        )


    

@app.post("/rebuild-index")
def rebuild_index_endpoint():
    try:
        build_index()

        return {
            "success": True,
            "message": "FAISS index rebuilt successfully."
        }

    except Exception as error:
        print("FAISS index rebuild error:", error)

        raise HTTPException(
            status_code=500,
            detail="Failed to rebuild FAISS index."
        )
