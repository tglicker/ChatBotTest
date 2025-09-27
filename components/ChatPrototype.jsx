// components/ChatPrototype.jsx
import { useState, useRef, useEffect } from "react";
import { Button, TextArea } from "@carbon/react";
import styles from "./ChatPrototype.module.css"; // optional CSS module for custom styling

export default function ChatPrototype() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! How can I help you today?", timestamp: "10:00 AM" },
    { role: "user", text: "I want to test the chat.", timestamp: "10:01 AM" },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages([...messages, { role: "user", text: input, timestamp }]);
    setInput("");

    // Mock assistant response
    setTimeout(() => {
      const responseTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Thanks for your message! Here's a mock reply.", timestamp: responseTimestamp },
      ]);
    }, 500);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.message} ${msg.role === "user" ? styles.userMessage : styles.assistantMessage}`}
          >
            <span className={styles.messageText}>{msg.text}</span>
            <span className={styles.timestamp}>{msg.timestamp}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <TextArea
          value={input}
          placeholder="Type a message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button style={{ width: "80px" }} onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
}
