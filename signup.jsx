import React, { useState } from 'react';
import './signup.css'; // We'll reuse the same styling approach

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log({ name, email, password, confirmPassword, agreeTerms });
  };

  return (
    <div className="login-container"> {/* Reusing the same container class */}
      <h1>Sign Up</h1>
      <p className="welcome-text">Create your account 😊</p>
      
      <div className="divider"></div>
      
      <button className="google-login-btn">
        Sign Up with Google
      </button>
      
      <p className="or-text">or Sign Up with Email</p>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="E.g. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="E.g. johndoe@email.com"
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

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="remember-forgot">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
            I agree to the Terms and Conditions
          </label>
        </div>
        
        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>
      
      <div className="divider"></div>
      
      <p className="register-text">
        Already have an account? <a href="/login">Login</a> 💤
      </p>
    </div>
  );
};

export default SignUpPage;