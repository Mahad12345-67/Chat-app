import { useState, useEffect } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    alert('Du har loggats ut.');
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <>
          <h1>Välkommen till Mahad's Chat App</h1>
          <Register onRegister={() => setIsLoggedIn(true)} />
          <Login onLogin={() => setIsLoggedIn(true)} />
        </>
      ) : (
        <Chat onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
