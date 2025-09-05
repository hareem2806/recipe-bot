import pandas as pd
from langchain_ollama import OllamaLLM
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.memory import ConversationBufferWindowMemory
import pickle

def load_and_index(csv_path="dataset.csv"):
    # Load CSV
    df = pd.read_csv(csv_path)

    # Convert dataset into text chunks
    texts = []
    for _, row in df.iterrows():
        text = f"""
        Recipe Name: {row['recipe_name']}
        Category: {row['category']}
        Subcategory: {row['subcategory']}
        Prep Time: {row['total_time']}
        Servings: {row['servings']}
        Ingredients: {row['ingredients']}
        Directions: {row['directions']}
        Nutrition: {row['nutrition']}
        Yield: {row['yield']}
        """
        texts.append(text)

    # Split into chunks
    splitter = CharacterTextSplitter(chunk_size=2000, chunk_overlap=300)
    docs = splitter.create_documents(texts)

    # Embeddings
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Vectorstore
    vectorstore = FAISS.from_documents(docs, embeddings)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    # Ollama LLaMA
    llm = OllamaLLM(model="llama3.2:latest")

    # Memory (last 5 messages)
    memory = ConversationBufferWindowMemory(
        memory_key="chat_history",
        input_key="question",
        return_messages=True,
        k=5
    )

    # Custom Markdown prompt
    prompt = PromptTemplate(
        template="""
You are a helpful recipe chatbot that helps users discover healthy recipes.

🔹 Behavior:
- Greet the user politely at the start.
- If the user asks for categories, list the top 6–7 recipe categories from the context in bullet points.
- If they ask for subcategories, list them as bullet points too.
- If they ask for recipes, show only **recipe names as a numbered list**.
- If they pick a recipe, provide full structured details.

🔹 Strict Formatting (Markdown):
Always format the response using Markdown with clear headings, bullet points, and spacing like this:

### 🍽️ Recipe: <Recipe Name>

**Category:** <Category>  
**Subcategory:** <Subcategory>  
**Prep Time:** <Prep Time>  
**Servings:** <Servings>  

---

### 🥗 Ingredients
- item 1  
- item 2  
- item 3  

---

### 👩‍🍳 Directions
1. Step one  
2. Step two  
3. Step three  

---

### 🔬 Nutrition
- Calories: X  
- Protein: X g  
- Carbs: X g  
- Fat: X g  

---

### 📦 Yield
<Yield>

🔹 Rules:
- Always respect this structure.
- If something is missing in the dataset, skip that field (don’t invent).
- Keep it clean, friendly, and easy to read.

Context:
{context}

Chat History:
{chat_history}

User Question: {question}

Answer:""",
        input_variables=["context", "chat_history", "question"]
    )

    # Create LLMChain with memory
    qa_chain = LLMChain(
        llm=llm,
        prompt=prompt,
        memory=memory
    )

    return qa_chain, retriever


# Global objects
qa_chain, retriever = load_and_index()

def chat_with_rag(query: str):
    # Retrieve context docs
    docs = retriever.get_relevant_documents(query)
    context = "\n\n".join([d.page_content for d in docs])

    # Run chain with context + memory
    return qa_chain.run(context=context, question=query)
