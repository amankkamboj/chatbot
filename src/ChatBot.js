import React, { useState, useEffect, useRef } from "react";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedAI, setSelectedAI] = useState("together"); // Default to Together AI
  const [isTyping, setIsTyping] = useState(false); // Typing state
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true); // Show typing indicator

    try {
      let apiUrl = "";
      let requestData = {};
      let authKey = "";

      if (selectedAI === "fireworks") {
        apiUrl = "https://api.fireworks.ai/inference/v1/completions";
        requestData = {
          model: "accounts/fireworks/models/llama-v2-13b-chat",
          prompt: input,
          max_tokens: 100,
        };
        authKey = process.env.REACT_APP_FIREWORKS_API_KEY;
      } else if (selectedAI === "huggingface") {
        apiUrl =
          "https://api-inference.huggingface.co/models/google/flan-t5-large";
        requestData = { inputs: input };
        authKey = process.env.REACT_APP_HUGGINGFACE_API_KEY;
      } else if (selectedAI === "together") {
        apiUrl = "https://api.together.xyz/v1/chat/completions";
        requestData = {
          model: "deepseek-ai/DeepSeek-R1",
          messages: [{ role: "user", content: input }],
          max_tokens: 200,
          temperature: 0.6,
          top_p: 0.95,
          top_k: 50,
          repetition_penalty: 1,
          stop: ["<｜end▁of▁sentence｜>"],
          stream: false,
        };
        authKey = process.env.REACT_APP_TOGETHER_AI_KEY;
      }

      const response = await axios.post(apiUrl, requestData, {
        headers: {
          Authorization: `Bearer ${authKey}`,
          "Content-Type": "application/json",
        },
      });

      let botResponse = "Sorry, I couldn't understand that."; // Default fallback

      if (selectedAI === "together" || selectedAI === "fireworks") {
        // Ensure we extract the message content correctly
        if (
          response.data &&
          response.data.choices &&
          response.data.choices.length > 0
        ) {
          botResponse = response.data.choices[0].message.content.trim();
        }
      } else if (selectedAI === "huggingface") {
        // Hugging Face responses are structured differently
        if (Array.isArray(response.data) && response.data.length > 0) {
          botResponse = response.data[0]?.generated_text?.trim() || botResponse;
        }
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "AI error: " + error.message, sender: "bot" },
      ]);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-3 shadow">
        <Card.Body>
          <h4 className="text-center">Chatbot</h4>

          {/* Dropdown to select AI model */}
          <Form.Group className="mb-3">
            <Form.Label>Select AI Model:</Form.Label>
            <Form.Select
              value={selectedAI}
              onChange={(e) => setSelectedAI(e.target.value)}
            >
              <option value="together">Together AI (DeepSeek)</option>
              <option value="fireworks">Fireworks AI (LLaMA 2-13B)</option>
              <option value="huggingface">Hugging Face (Flan-T5 Large)</option>
            </Form.Select>
          </Form.Group>

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
            {/* Typing Indicator */}
            {isTyping && (
              <div className="text-start text-muted">
                <Spinner animation="grow" size="sm" /> Bot is typing...
              </div>
            )}
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
