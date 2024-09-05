import React, { useState } from 'react';
import { getCsrfToken, registerUser } from '../routes';
import axios from 'axios';

interface RegisterProps {
  onRegister: () => void;
}

function Register({ onRegister }: RegisterProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const csrfResponse = await getCsrfToken();
      const csrfToken = csrfResponse.data.csrfToken;

      await registerUser(
        {
          username,
          email,
          password,
        },
        csrfToken
      );

      const loginResponse = await axios.post('https://chatify-api.up.railway.app/auth/token', {
        username,
        password,
      });

      const { token, user, avatar } = loginResponse.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username: user, avatar }));

      setLoading(false);
      onRegister();
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        if (err.response.status === 409) {
          setError('Användarnamnet eller e-postadressen finns redan.');
        } else {
          setError(`Ett fel inträffade vid registrering: ${err.response.data.error || err.response.status}`);
        }
      } else {
        setError('Ett nätverksfel inträffade.');
      }
      console.error('Registreringsfel:', err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Användarnamn"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-post"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Lösenord"
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? <p>Laddar...</p> : <button type="submit">Registrera</button>}
    </form>
  );
}

export default Register;
