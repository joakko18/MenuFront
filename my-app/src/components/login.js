import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token to localStorage or state
        localStorage.setItem('token', data.token);
        console.log('Login successful', data);
        setSuccess('Login successful!'); // Set success message

        const otherAppWindow = window.open("http://localhost:5173");
      otherAppWindow.postMessage({ token: data.token }, "http://localhost:5173");

        // Automatically refresh the page after 3 seconds
        setTimeout(() => {
          window.location.reload(); // Reload the page to reflect the login status
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>

      {/* Flash message as a popup */}
      {success && (
        <div className="flash-message">
          <p>{success}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
