import React, { useState } from "react";
import axios from "axios";

const AskBot = () => {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleAsk = async () => {
    if (!input.trim()) return;

    const newChat = [...chat, { type: "user", text: input }];
    setChat(newChat);

    try {
      // Make POST request to backend API
      const response = await axios.post("/api/ask-bot", { question: input });

      // Set the bot's response in the chat
      setChat([...newChat, { type: "bot", text: response.data.reply }]);
    } catch (err) {
      console.error(err);
      setChat([...newChat, { type: "bot", text: "Something went wrong!" }]);
    }

    setInput("");  // Clear input field after sending the message
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ask Our Bot</h2>
      <div className="bg-white p-4 border rounded h-96 overflow-y-auto mb-2">
        {chat.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.type === "user" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded ${msg.type === "user" ? "bg-blue-100" : "bg-gray-200"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Ask a question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
      />
      <button onClick={handleAsk} className="bg-blue-500 text-white px-4 py-2 rounded w-full">Send</button>
    </div>
  );
};

export default AskBot;
