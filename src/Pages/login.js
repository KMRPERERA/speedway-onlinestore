
import React from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import NavbarComponent from "../Components/navbar.js"; // Adjust the import path as necessary
import "./login.css"; // Import your CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Convert accountType to lowercase to match your API's expected format
      const accountTypeFormatted = accountType.toLowerCase();
      
      // Make API call to your authentication endpoint
      const response = await fetch(
        `https://onlinestorebackend20250502182239.azurewebsites.net/api/UserAuthentication/login?p_email=${encodeURIComponent(email)}&p_password=${encodeURIComponent(password)}&p_account_type=${accountTypeFormatted}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      if (response.ok) {
        const userData = await response.json();
        console.log('Login successful:', userData);
        
        // Check if we got any users back
        if (userData && userData.length > 0) {
          // Store user data in localStorage for persistence across sessions
          localStorage.setItem('currentUser', JSON.stringify(userData[0]));
          
          // Redirect based on account type
          switch (accountTypeFormatted) {
            case 'admin':
              navigate('/shoppingcart');
              break;
            case 'supplier':
              navigate('/supplierprofile');
              break;
            case 'user':
              navigate('/shoppingcart');
              break;
            default:
              navigate('/');
          }
        } else {
          setErrorMessage('Invalid email or password. Please try again.');
        }
      } else {
        // Handle error responses
        console.error('Login failed:', response.status);
        setErrorMessage('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred during login. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="speedway-container">
      <NavbarComponent />
      {/* Main Content */}
      <main className="speedway-main">
        <div className="login-container">
          <div className="car-image-container">
            {/* This will be the background for your car image */}
            {/* <img src="/images/mitsubishi.jpg" alt="Speed Way Logo" className="logo" /> */}
          </div>
          
          <div className="login-form-container">
            <h2 className="welcome-back">Welcome Back</h2>
            <p className="login-subtitle">LOGIN TO CONTINUE</p>
            
        
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Example@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-container">
                  <input 
                    type={showPassword ? "text" : "password"}
                    id="password" 
                    placeholder="XXXXXXXXXX" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    👁️
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="accountType">Account Type</label>
                <div className="select-container">
                  <select 
                    id="accountType" 
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  >
                    <option value="Supplier">Supplier</option>
                    <option value="user">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
              <div className="forgot-password">
                {/* <a href="#">Forgot Password?</a> */}
                <Link to="/fogotpassword" >Forgot Password?</Link>
              </div>
              
              <button 
                type="submit" 
                className="login-button" 
                disabled={isLoading}
              >
                {isLoading ? 'LOGGING IN...' : 'LOGIN'}
              </button>
              
              <div className="register-prompt">
                DON'T HAVE AN ACCOUNT?<Link to="/register" className="register-link">Customer Register</Link><br></br> ARE YOU A SUPPLIER?<Link to="/contactinfo" className="register-link">Supplier Register</Link>
              </div>
            </form>
            
            <div className="terms-note">
              By signing up to create an account I accept Company's
              <div className="terms-links">
                <a href="#">Terms of use</a> & <a href="#">Privacy Policy</a>.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;