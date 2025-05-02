

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./home.css";
import "./navbar.css"; // Assuming you have a CSS file for styling

const SupplierNavbarComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    // Get user data from localStorage on component mount
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Logout function to clear user data
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    // Redirect to login page (you may want to use navigate from react-router here)
    window.location.href = '/login';
    // navigate('/login');
  };
  
  const handleprofile = () => {
    window.location.href = '/supplierprofile';
  };

  return (
    <div>
      {/* Header */}
      <header className="speedway-header">
        <div className="header-left">
          <img src="/images/logo-speedway-removebg.png" alt="Speed Way Logo" className="logo" />
        </div>
        
        <nav className="header-center">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/supplierprofile" className="nav-link">PROFILE</Link>
            </li>
            <li className="nav-item">
              <Link to="/submitad" className="nav-link">SUBMIT ADVERTISMENT</Link>
            </li>
            <li className="nav-item">
              <Link to="/neworders" className="nav-link">NEW ORDERS</Link>
            </li>
            <li className="nav-item">
              <Link to="/supabout" className="nav-link">ABOUT US</Link>
            </li>
            <li className="nav-item">
              <Link to="/supcontact" className="nav-link">CONTACT</Link>
            </li>
            <li className="nav-item">
              <Link to="/procesingdetails" className="nav-link">PROCESSING DETAILS</Link>
            </li>
          </ul>
        </nav>
        
        <div className="header-right">
          <div className="welcome-text">
            <div className="auth-links">
              {currentUser ? (
                <>
                  <span onClick={handleprofile}>{currentUser.name}</span>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
          </div>
          {/* <div className="cart">
            <div className="cart-label">CART</div>
            <div className="cart-amount">
              <span className="cart-icon">🔴</span>
              <span className="cart-value">$1,689.00</span>
            </div>
          </div> */}
        </div>
      </header>

      {/* Secondary Navigation */}
      {/* <div className="secondary-nav">
        <div className="container">
          <div className="nav-item">PROFILE</div>
          <div className="nav-item">SUBMIT ADVERTISMENT</div>
          <div className="nav-item">NEW ORDERS</div>
        </div>
      </div> */}
    </div>
  );
};

export default SupplierNavbarComponent;
