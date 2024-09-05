import { useState, useEffect } from 'react';
import axios from 'axios';

interface ChatProps {
  onLogout: () => void;
}

interface Message {
  user: string;
  content: string;
  id: string;
}

function Chat({ onLogout }: ChatProps) {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      const response = await axios.get('https://chatify-api.up.railway.app/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.post(
        'https://chatify-api.up.railway.app/messages',
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <button onClick={onLogout}>Logga ut</button>
      <div>
        {messages.map((msg) => (
          <p key={msg.id}>
            <strong>{msg.user === user.username ? 'Du' : msg.user}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Skriv ett meddelande..."
      />
      <button onClick={handleSendMessage}>Skicka</button>
    </div>
  );
}

export default Chat;
