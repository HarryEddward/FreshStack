from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

# Cargar la documentación desde el directorio relativo
documents = SimpleDirectoryReader("../../docs").load_data()

# Modelo local con Ollama
llm = Ollama(model="codellama")

# Configurar modelo de embeddings local
embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")

# Crear índice y motor de búsqueda
index = VectorStoreIndex.from_documents(documents, embed_model=embed_model)
query_engine = index.as_query_engine(llm=llm)

# Bucle interactivo
while True:
    question = input("❓ Pregunta a tu documentación (o escribe 'salir'): ")
    if question.lower() in ["salir", "exit", "q"]:
        break
    response = query_engine.query(question)
    print("\n🧠 Respuesta:\n", response)