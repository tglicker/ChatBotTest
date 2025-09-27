import { useState, useRef, useEffect } from "react";
import { Button, TextArea } from "@carbon/react";

export default function ChatPrototype() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const endOfMessagesRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return; // avoid sending empty messages
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Scroll to newest message whenever messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-window" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.role === "user" ? "user-message" : "assistant-message"}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endOfMessagesRef} /> {/* dummy div to scroll into view */}
      </div>

      <div className="chat-input" style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          labelText=""
          placeholder="Type a message..."
          rows={2}
          style={{ flex: 1 }}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
