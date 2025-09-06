# 🍲 Recipe Chatbot with RAG

This project is an **AI-powered Recipe Chatbot** that uses **Retrieval-Augmented Generation (RAG)** to provide structured, easy-to-read healthy recipes.  
It supports context-aware conversations (remembers the last 5 messages) and formats answers in **Markdown** for a clean user experience.

---

## 🚀 Features
- Retrieval-Augmented Generation (RAG) using FAISS + HuggingFace embeddings
- LLaMA3.2 model served through **Ollama**
- Frontend built in **React** with Markdown rendering
- Backend in **Flask (Python)**
- CSV dataset of recipes, cleaned and preprocessed via Jupyter Notebook
- Conversational memory (remembers last 5 turns)
- Structured responses with **headings, bullet points, and sections**



📊 Dataset

This project uses the Healthy Recipes Dataset from Kaggle:
👉 Healthy Recipes Dataset on Kaggle[https://www.kaggle.com/datasets/thedevastator/better-recipes-for-a-better-life]

## Data Preparation

Cleaned and preprocessed the dataset in a Jupyter Notebook

Selected relevant columns such as recipe_name, category, subcategory, total_time, servings, ingredients, directions, nutrition, and yield.

Saved the cleaned data as a CSV for use in the chatbot.
