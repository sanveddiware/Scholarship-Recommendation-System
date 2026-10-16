import os

from pymongo import MongoClient
from dotenv import load_dotenv

from rag.document_builder import scholarship_to_text
from rag.vector_store import create_vector_store


load_dotenv()

MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb://localhost:27017/scholarship_db"
)

client = MongoClient(MONGO_URI)

db = client["scholarship_db"]

collection = db["scholarships"]


def build_index():

    scholarships = list(
        collection.find({
            "isActive": True
        })
    )

    if not scholarships:
        result = create_vector_store([], [])

        print("No active scholarships found.")
        print(f"Empty FAISS index created: {result['documents']} documents.")
        return
    documents = []
    metadata = []

    for scholarship in scholarships:

        document = scholarship_to_text(
            scholarship
        )

        documents.append(document)

        # MongoDB ObjectId isn't JSON serializable
        scholarship["_id"] = str(
            scholarship["_id"]
        )

        metadata.append(scholarship)

    result = create_vector_store(
        documents,
        metadata
    )

    print(
        f"FAISS index created successfully."
    )

    print(
        f"Scholarships indexed: {result['documents']}"
    )

    print(
        f"Embedding dimensions: {result['dimension']}"
    )


if __name__ == "__main__":
    build_index()