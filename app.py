from flask import Flask, request, jsonify
from flask_cors import CORS
from rag import chat_with_rag

app = Flask(__name__)
CORS(app)  # Allow frontend requests (React/JS)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    query = data.get("message", "")

    if not query:
        return jsonify({"error": "No question provided"}), 400

    # Call RAG pipeline
    answer = chat_with_rag(query)

    return jsonify({"response": answer})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
