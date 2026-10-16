from embeddings.embedding_model import generate_embeddings


text = [
    "Scholarship for undergraduate engineering students"
]

embeddings = generate_embeddings(text)

print("Embedding generated successfully")
print("Number of embeddings:", len(embeddings))
print("Embedding dimensions:", len(embeddings[0]))
