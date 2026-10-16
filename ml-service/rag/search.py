
import json
import os
import faiss
import numpy as np

from embeddings.embedding_model import generate_embeddings

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INDEX_PATH = os.path.join(
    BASE_DIR, "data", "scholarships.index"
)

METADATA_PATH = os.path.join(
    BASE_DIR, "data", "scholarships_metadata.json"
)


def search_scholarships(query, top_k=5):
    if not os.path.exists(INDEX_PATH):
        raise FileNotFoundError(
            f"FAISS index not found: {INDEX_PATH}. "
            "Run the rebuild-index endpoint first."
        )

    if not os.path.exists(METADATA_PATH):
        raise FileNotFoundError(
            f"Scholarship metadata not found: {METADATA_PATH}"
        )

    index = faiss.read_index(INDEX_PATH)

    with open(METADATA_PATH, "r", encoding="utf-8") as file:
        metadata = json.load(file)

    if index.ntotal == 0 or not metadata:
        return []

    query_embedding = generate_embeddings([query])
    query_embedding = np.asarray(
        query_embedding, dtype="float32"
    )

    scores, indices = index.search(
        query_embedding,
        min(top_k, index.ntotal)
    )

    results = []

    for score, index_id in zip(scores[0], indices[0]):
        if index_id == -1 or index_id >= len(metadata):
            continue

        results.append({
            "score": float(score),
            "scholarship": metadata[index_id]
        })

    return results
