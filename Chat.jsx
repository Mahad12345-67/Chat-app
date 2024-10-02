import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  t
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://chatify-api.up.railway.app/messages', {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      setMessages(response.data);
    } catch (error) {
      setError('Failed to load messages');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://chatify-api.up.railway.app/messages',
        { content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewMessage('');
      fetchMessages();
    } catch (error) {
      setError('Failed to send message');
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="message-list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.user === user.username ? 'my-message' : 'other-message'}`}
          >
            <p><strong>{msg.user}</strong>: {msg.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
