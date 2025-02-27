from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        print("received request:", request.json)
        user_message = request.json.get("message")
        print("user message:", user_message)
        if not user_message:
            return jsonify({"error":"No message provided"}), 400
        
        response = ollama.chat(model="llama3.1", messages=[
            {
                "role": "user",
                "content": user_message
            }
        ])
        return jsonify({
            "message": response['message']['content']
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)