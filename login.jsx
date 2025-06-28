import React, { useState } from 'react';
import './login.css'; // We'll create this CSS file next

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p className="welcome-text">Hi, Welcome back 😊</p>
      
      <div className="divider"></div>
      
      <button className="google-login-btn">
        Login with Google
      </button>
      
      <p className="or-text">or Login with Email</p>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="E.g. jsimdoto@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="remember-forgot">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      
      <div className="divider"></div>
      
      <p className="register-text">
        Not registered yet? <a href="/register">Create an account</a> 💤
      </p>
    </div>
  );
};

export default LoginPage;