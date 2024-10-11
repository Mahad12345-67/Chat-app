import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SideNav from './components/Sidenav';
import './App.css';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div>
      {isLoggedIn && <SideNav />}
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/chat" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
