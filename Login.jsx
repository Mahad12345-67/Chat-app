import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    
      const csrfResponse = await axios.patch('https://chatify-api.up.railway.app/csrf');
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfResponse.data.csrfToken;

    
      const response = await axios.post('https://chatify-api.up.railway.app/auth/token', {
        username,
        password,
      });

      const { token, user, avatar } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username, avatar }));

    
      navigate('/chat');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
