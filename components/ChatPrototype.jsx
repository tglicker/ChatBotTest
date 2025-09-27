import React, { useState, useEffect, useRef } from "react";
import { TextArea, Button } from "@carbon/react";
import "./ChatPrototype.css";

export default function ChatPrototype() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initial mock messages
    setMessages([
      { role: "assistant", text: "Hello! Welcome to our chat.", timestamp: new Date() },
      { role: "user", text: "Hi there!", timestamp: new Date() },
      { role: "assistant", text: "How can I assist you today?", timestamp: new Date() }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setInput("");

    // Mock assistant response
    setTimeout(() => {
      const reply = {
        role: "assistant",
        text: "This is a mocked response from the assistant.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, reply]);
    }, 500);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.role === "user" ? "user" : "assistant"}`}
          >
            <div className="message-bubble">
              <span>{msg.text}</span>
              <span className="timestamp">{formatTime(msg.timestamp)}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <TextArea
          value={input}
          labelText=""
          placeholder="Type a message..."
          rows={2}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button onClick={handleSend} className="send-button">
          Send
        </Button>
      </div>
    </div>
  );
}
