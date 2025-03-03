import React, { useState, useEffect, useRef } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]); // Runs when messages update

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message to chat
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let botReply = "I didn't understand that. Can you ask something else?";
      if (input.toLowerCase().includes("hello")) {
        botReply = "Hi there! How can I assist you?";
      } else if (input.toLowerCase().includes("how are you")) {
        botReply = "I'm just a chatbot, but I'm doing great! 😊";
      } else if (input.toLowerCase().includes("your name")) {
        botReply = "I'm ChatBot, your virtual assistant!";
      } else if (input.toLowerCase().includes("bye")) {
        botReply = "Goodbye! Have a great day!";
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <Container className="mt-4">
      <Card className="p-3 shadow">
        <Card.Body>
          <h4 className="text-center">Chatbot</h4>
          <div
            ref={chatRef}
            className="chat-window"
            style={{
              height: "300px",
              overflowY: "auto",
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 text-${
                  msg.sender === "user" ? "end" : "start"
                }`}
              >
                <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>{" "}
                {msg.text}
              </div>
            ))}
          </div>

          <Form.Group className="d-flex">
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button
              variant="primary"
              onClick={handleSendMessage}
              className="ms-2"
            >
              Send
            </Button>
          </Form.Group>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Chatbot;
