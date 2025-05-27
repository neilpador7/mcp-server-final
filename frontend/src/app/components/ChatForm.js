import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../api/chat";

export default function ChatForm() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const reply = await sendChatMessage(input);
      const botMsg = { role: "assistant", content: reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Title */}
      <div className="bg-white border-b px-4 py-3 shadow text-xl font-semibold">
        Chat About My Resume
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto flex flex-col-reverse gap-4 px-0 py-6 sm:px-6 md:px-24 lg:px-48">
        <div ref={chatEndRef} />
        {messages
          .slice()
          .reverse()
          .map((msg, idx) => (
            <div
              key={idx}
              className={`flex w-full ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-xl px-5 py-3 max-w-[75%] shadow ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-900 border rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
      </div>

      {/* Input box */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border-t p-4 flex flex-row gap-2"
        style={{ position: "sticky", bottom: 0, left: 0 }}
      >
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
          placeholder="Ask something about my CV..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          style={{ minWidth: "80px" }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
