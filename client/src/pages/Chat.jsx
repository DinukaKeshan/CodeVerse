import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMessages, sendMessage } from '../services/api';

const Chat = () => {
  const { receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const data = await getMessages(receiverId);
        setMessages(data);
      } catch (err) {
        console.error('Error loading messages', err);
      }
    };
    fetchChat();
  }, [receiverId]);

  const handleSend = async () => {
    if (!content.trim()) return;
    try {
      await sendMessage(receiverId, content);
      setContent('');
      const updated = await getMessages(receiverId);
      setMessages(updated);
    } catch (err) {
      console.error('Send failed', err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="border p-4 mb-4 h-96 overflow-y-auto bg-white rounded">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-2 p-2 rounded ${msg.sender === receiverId ? 'bg-gray-100 text-left' : 'bg-blue-100 text-right'}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border px-3 py-2 rounded"
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;