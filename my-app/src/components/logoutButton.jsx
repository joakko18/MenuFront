import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './logout.css'; // Make sure to create and link this CSS file

const LogoutButton = () => {
  const [logoutMessage, setLogoutMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    localStorage.removeItem('user_id'); // Optionally remove the user_id if stored
    setLogoutMessage('Logged out successfully'); // Set the logout message

    // Automatically clear the message after 3 seconds and navigate
    setTimeout(() => {
      setLogoutMessage('');
      navigate('/'); // Redirect to the home page or login page
    }, 3000);
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      {/* Display the logout message if it's set */}
      {logoutMessage && (
        <div className="flash-messageOut  flash-error">
          <p>{logoutMessage}</p>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
