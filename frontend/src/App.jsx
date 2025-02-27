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
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div
                  className="message-container mb-4
                style={{
                height:'400px', overflowY: 'auto'}}"
                >
                  {messages.map((msg, index) => (
                    <div
                      className={`d-flex ${
                        msg.role === "user"
                          ? "justify-content-end"
                          : "justify-content-start"
                      } mb-2`}
                    >
                      <div
                        className={`message p-3 rounded-3 ${
                          msg.role === "user"
                            ? "bg-primary text-white"
                            : "bg-light border"
                        }`}
                        style={{ maxWidth: "75%" }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={inputMessage}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSendMessage}
                    disabled={isLoading}
                  >
                    {isLoading ? 
                    <>
                    <span className="spinner-border spinner-border-sm me-2"></span></>
                    :'Send'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
