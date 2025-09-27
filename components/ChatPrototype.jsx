import React, { useState } from "react";
import {
  TextArea,
  Button,
  Tile,
  Grid,
  Column,
  Row,
  Theme,
  Avatar
} from "@carbon/react";

export default function ChatPrototype() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I’m here to chat with you." },
    { role: "user", text: "Hi there!" },
    { role: "assistant", text: "How can I help today?" }
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message immediately
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");

    // Simulate assistant response after 1s
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "This is a mocked response." }
      ]);
    }, 1000);
  };

  return (
    <Theme theme="g10">
      <Grid fullWidth>
        <Row>
          <Column lg={12}>
            <div
              style={{
                height: "70vh",
                overflowY: "auto",
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #e0e0e0",
                borderRadius: "0.5rem",
                background: "white"
              }}
            >
              {messages.map((msg, idx) => (
                <Tile
                  key={idx}
                  className={msg.role === "user" ? "user-message" : "assistant-message"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
                  }}
                >
                  {msg.role === "assistant" && (
                    <Avatar size="sm" name="Assistant" image="https://placekitten.com/32/32" />
                  )}
                  <span style={{ margin: "0 0.5rem" }}>
                    <strong>{msg.role}:</strong> {msg.text}
                  </span>
                  {msg.role === "user" && (
                    <Avatar size="sm" name="User" image="https://placekitten.com/33/33" />
                  )}
                </Tile>
              ))}
            </div>
            <TextArea
              value={input}
              labelText=""
              placeholder="Type your message…"
              rows={3}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={handleSend} style={{ marginTop: "0.5rem" }}>
              Send
            </Button>
          </Column>
        </Row>
      </Grid>
    </Theme>
  );
}

