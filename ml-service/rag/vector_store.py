
import os
import json
import faiss
import numpy as np

from embeddings.embedding_model import generate_embeddings


INDEX_PATH = "data/scholarships.index"
METADATA_PATH = "data/scholarships_metadata.json"


def create_vector_store(documents, metadata):
    os.makedirs("data", exist_ok=True)

    # Handle the case where no active scholarships remain.
    if not documents:
        index = faiss.IndexFlatIP(384)

        faiss.write_index(index, INDEX_PATH)

        with open(METADATA_PATH, "w", encoding="utf-8") as file:
            json.dump([], file, indent=4)

        return {
            "documents": 0,
            "dimension": 384
        }

    embeddings = generate_embeddings(documents)

    embeddings = np.asarray(
        embeddings,
        dtype="float32"
    )

    dimension = embeddings.shape[1]

    # Inner product + normalized vectors ≈ cosine similarity
    index = faiss.IndexFlatIP(dimension)
    index.add(embeddings)

    faiss.write_index(index, INDEX_PATH)

    with open(METADATA_PATH, "w", encoding="utf-8") as file:
        json.dump(
            metadata,
            file,
            indent=4,
            default=str
        )

    return {
        "documents": len(documents),
        "dimension": dimension
    }
