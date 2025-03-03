import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message to chat
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Hello! How can I help you?", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <Container className="mt-4">
      <Card className="p-3 shadow">
        <Card.Body>
          <h4 className="text-center">Chatbot</h4>
          <div
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
