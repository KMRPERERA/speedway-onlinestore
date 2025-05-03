

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./home.css";
import "./navbar.css"; // Using the same CSS file

const SupplierNavbarComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    // Redirect to login page
    window.location.href = '/login';
  };

  const handleprofile = () => {
    window.location.href = '/supplierprofile';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      {/* Header */}
      <header className="speedway-header-nav">
        <div className="header-left-nav">
          <img src="/images/logo-speedway-removebg.png" alt="Speed Way Logo" className="logo" />
        </div>
        
        {/* Mobile menu toggle button */}
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </div>
        
        <nav className={`header-center ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/supplierprofile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>PROFILE</Link>
            </li>
            <li className="nav-item">
              <Link to="/submitad" className="nav-link" onClick={() => setMobileMenuOpen(false)}>SUBMIT ADVERTISMENT</Link>
            </li>
            <li className="nav-item">
              <Link to="/neworders" className="nav-link" onClick={() => setMobileMenuOpen(false)}>NEW ORDERS</Link>
            </li>
            <li className="nav-item">
              <Link to="/supabout" className="nav-link" onClick={() => setMobileMenuOpen(false)}>ABOUT US</Link>
            </li>
            <li className="nav-item">
              <Link to="/supcontact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>CONTACT</Link>
            </li>
            <li className="nav-item">
              <Link to="/procesingdetails" className="nav-link" onClick={() => setMobileMenuOpen(false)}>PROCESSING DETAILS</Link>
            </li>
          </ul>
        </nav>
        
        <div className={`header-right ${mobileMenuOpen ? 'mobile-right-active' : ''}`}>
          <div className="welcome-text">
            <div className="auth-links">
              {currentUser ? (
                <>
                  <span onClick={handleprofile}>{currentUser.name}</span>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </>
              ) : (
                <Link to="/login" className="logout-btn">Login</Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default SupplierNavbarComponent;