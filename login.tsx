import { useState } from 'react';
import axios from 'axios';

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('https://chatify-api.up.railway.app/auth/token', {
        username,
        password,
      });

      const { token, user, avatar } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username: user, avatar }));

      setLoading(false);
      alert('Inloggning lyckades!');
      onLogin();
    } catch (err: any) {
      setLoading(false);
      if (err.response) {
        if (err.response.status === 401) {
          setError('Ogiltiga inloggningsuppgifter.');
        } else {
          setError(`Ett fel inträffade vid inloggning: ${err.response.data.error || err.response.status}`);
        }
      } else {
        setError('Ett nätverksfel inträffade.');
      }
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Användarnamn" 
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
      {loading ? <p>Laddar...</p> : <button type="submit">Logga in</button>}
    </form>
  );
}

export default Login;
