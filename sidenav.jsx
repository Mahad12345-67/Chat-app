import React from 'react';
import { useNavigate } from 'react-router-dom';

function SideNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="sidenav">
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default SideNav;
