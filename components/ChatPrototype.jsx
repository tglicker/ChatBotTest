import React, { useState } from "react";
import {
  TextArea,
  Button,
  Tile,
  Grid,
  Column,
  Row,
  Theme
} from "carbon-components-react";

export default function ChatPrototype() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I’m here to chat with you." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    // Eventually you’ll add an API call here for OpenAI responses
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
                  style={{
                    marginBottom: "0.5rem",
                    background: msg.role === "user" ? "#e0f7fa" : "#f4f4f4",
                    textAlign: msg.role === "user" ? "right" : "left"
                  }}
                >
                  <strong>{msg.role}:</strong> {msg.text}
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

