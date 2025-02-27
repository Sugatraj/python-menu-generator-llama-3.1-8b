import React, { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    console.log(inputMessage);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat",{
        method: "POST",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
        })
      });

      const data = await response.json();

      setMessages([...messages,
        { content: inputMessage, role: "user"},
        { content: data.message, role: "assistant"}
      ])
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setInputMessage('')
    }
  }

  return (
    <>
      <div className="container">
        <input 
        type="text"
        value={inputMessage} 
        onChange={handleInputChange}
        placeholder="Type your message here..." 
        />
        <button
        onClick={handleSendMessage}
        disabled={isLoading}>
        {isLoading ?  "Sending..." : "Send"}
        </button>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div className="message"
          key={index}>
            {msg.content}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
