import ollama

def chat_with_ollama():
    # Initialize conversation
    print("Chatbot initialized. Type 'quit' to exit.")
    print("Ask me anything!")
    
    # Main chat loop
    while True:
        # Get user input
        user_input = input("\nYou: ").strip()
        
        # Check if user wants to quit
        if user_input.lower() == 'quit':
            print("Goodbye!")
            break
        
        try:
            # Generate response using Ollama with llama3.1 model
            response = ollama.chat(model='llama3.1', messages=[
                {
                    'role': 'user',
                    'content': user_input
                }
            ])
            
            # Print the response
            print("\nBot:", response['message']['content'])
            
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            print("\nTroubleshooting tips:")
            print("1. Make sure Ollama is running (run 'ollama serve' in a terminal)")
            print("2. Verify model is installed (run 'ollama pull llama3.1')")
            print("3. Check if Ollama server is accessible at localhost:11434")

if __name__ == "__main__":
    try:
        # Verify Ollama connection before starting chat
        try:
            # Test connection with a simple query
            ollama.chat(model='llama3.1', messages=[
                {
                    'role': 'user',
                    'content': 'test'
                }
            ])
            chat_with_ollama()
        except Exception as e:
            print("Failed to connect to Ollama server or model!")
            print(f"Error: {str(e)}")
            print("\nPlease ensure:")
            print("1. Ollama is running (run 'ollama serve' in a terminal)")
            print("2. The llama3.1 model is installed (run 'ollama pull llama3.1')")
    except KeyboardInterrupt:
        print("\nGoodbye!")