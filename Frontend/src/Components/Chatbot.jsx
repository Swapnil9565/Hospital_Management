import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 I'm your healthcare assistant. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userMessage) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://hospital-management-pe6s.onrender.com/api/user/chat",
        { message: userMessage },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: response.data.reply || "⚠️ No response from server.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server busy, try again later." },
      ]);
    }

    setLoading(false);
  };
  console.log(messages);
  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input;

    // Add User Message
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    // Send to backend
    sendMessage(userText);
  };

  return (
    <div className='fixed bottom-6 right-6 z-50'>
      <button
        onClick={() => setIsOpen(true)}
        className='cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition'>
        💬 Chat
      </button>

      {isOpen && (
        <div className='w-80 h-96 bg-white border shadow-xl rounded-md mt-3 flex flex-col'>
          <div className='flex justify-between items-center bg-blue-600 text-white p-3 font-semibold rounded-t-md'>
            🏥 AI Health Assistant
            <div>
              <button className=" text-xl cursor-pointer" onClick={()=>setIsOpen(false)}>X</button>
            </div>
          </div>

          <div className='flex-1 overflow-y-auto p-3 space-y-3'>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}>
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className='text-gray-500 animate-pulse'>Typing...</div>
            )}
          </div>

          <div className='flex border-t'>
            <input
              type='text'
              className='flex-1 px-3 py-2 outline-none'
              placeholder='Ask something...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className='bg-blue-600 text-white px-4 hover:bg-blue-700'
              disabled={loading}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
