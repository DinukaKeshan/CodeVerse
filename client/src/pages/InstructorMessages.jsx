import React, { useEffect, useState } from 'react';
import { getStudentConversations, getMessages, sendMessage } from '../services/api';

const InstructorMessages = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudentConversations();
        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedStudentId) {
        try {
          const msgs = await getMessages(selectedStudentId);
          setMessages(msgs);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchMessages();
  }, [selectedStudentId]);

  const handleSend = async () => {
    if (!newMessage.trim() || !selectedStudentId) return;
    try {
      await sendMessage(selectedStudentId, newMessage);
      setNewMessage('');
      const msgs = await getMessages(selectedStudentId);
      setMessages(msgs);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Instructor Messages</h2>
      <div className="flex gap-6">
        <div className="w-1/4 border rounded p-2 h-96 overflow-y-auto">
          <h3 className="font-semibold mb-2">Students</h3>
          {students.length === 0 && <p className="text-gray-500">No student conversations found.</p>}
          {students.map((s) => (
            <div
              key={s._id}
              onClick={() => setSelectedStudentId(s._id)}
              className={`cursor-pointer p-2 rounded mb-1 ${selectedStudentId === s._id ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}
            >
              {s.displayName || s.email}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <div className="h-80 overflow-y-auto border p-3 rounded mb-4">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.sender === selectedStudentId ? 'text-left' : 'text-right'}`}>
                <span className="inline-block bg-gray-200 px-3 py-1 rounded">{msg.content}</span>
              </div>
            ))}
          </div>
          {selectedStudentId && (
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border p-2 rounded-l"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorMessages;
