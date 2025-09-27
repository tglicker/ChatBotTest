import React, { useState, useEffect } from "react";
import { TextArea, Button } from "@carbon/react";

export default function ChatPrototype() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages([
      { role: "assistant", text: "Hello! I’m here to chat with you." },
      { role: "user", text: "Hi there!" },
      { role: "assistant", text: "How can I help today?" }
    ]);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", text: "This is a mocked response." }]);
    }, 500);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          height: "60vh",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.role === "user" ? "right" : "left",
              marginBottom: "0.5rem",
            }}
          >
            <strong>{msg.role}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <TextArea
        value={input}
        labelText=""
        placeholder="Type your message…"
        rows={3}
        onChange={e => setInput(e.target.value)}
      />
      <Button onClick={handleSend} style={{ marginTop: "0.5rem" }}>
        Send
      </Button>
    </div>
  );
}

