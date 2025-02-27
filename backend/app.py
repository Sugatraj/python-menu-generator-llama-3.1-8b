from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
        
        user_message = request.json.get("message")
        print("received request:", request.json)
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

        # if not user_message:
        #     return jsonify({"error": "Message is required"}), 400
       
    
    except ConnectionError:
        return jsonify({
            "error": "Cannot connect to Ollama server",
            "details": "Please ensure Ollama is running"
        }), 503

    except ollama.ResponseError as e:
        return jsonify({
            "error": "Ollama response error",
            "details": str(e)
        }) ,500

    except Exception as e:
        return jsonify({
            "error": "Internal server error",
            "details":str(e)
            }), 500

if __name__ == "__main__":
    app.run(debug=True)