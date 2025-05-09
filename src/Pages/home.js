

import React from 'react';
// import './SpeedWay.css';
import './home.css'; // Assuming you have a CSS file for styling
import NavbarComponent from "../Components/navbar.js"; // Adjust the import path as necessary
import Footer from "../Components/footer.js"; // Adjust the import path as necessary
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Main = () => {
  return (
<div>
<div>
    <NavbarComponent/>
    </div>
        <div className="speedway-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Easily Find Compatible Products Parts and Suppliers</h1>
          <div className="search-container">
            <div className="search-group">
              <select className="search-select">
                <option>Make</option>
              </select>
            </div>
            <div className="search-group">
              <select className="search-select">
                <option>Category</option>
              </select>
            </div>
            <div className="search-group">
              <input type="text" className="search-input" placeholder="Keywords..." />
            </div>
            <button className="search-button">Search</button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="categories-grid">
          <div className="category-card">
            <img src="/images/bg1.jpg" alt="Spare Parts" className="category-image" />
            <div className="category-overlay">
              <h3>Spare Parts & Components</h3>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
          
          <div className="category-card">
            <img src="/images/emergency.jpg" alt="Emergency Safety" className="category-image" />
            <div className="category-overlay">
              <h3>Emergency & Safety Equipment</h3>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
          
          <div className="category-card">
            <img src="/images/tyres.jpg" alt="Tires" className="category-image" />
            <div className="category-overlay">
              <h3>Tires & Wheels</h3>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
          
          <div className="category-card">
            <img src="/images/car.jpg" alt="Car Accessories" className="category-image" />
            <div className="category-overlay">
              <h3>Car Accessories</h3>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
          
          <div className="category-card">
            <img src="/images/bg2.jpg" alt="Fluids" className="category-image" />
            <div className="category-overlay">
              <h3>Fluids & Maintenance</h3>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
          
          <div className="category-card">
            <img src="/images/tuning.jpg" alt="Performance Parts" className="category-image" />
            <div className="category-overlay">
              <h3>Performance Parts & Tuning</h3>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="promotions-section">
        <h2>Promotions</h2>
        <div className="promotion-banner">
          <img src="/images/bg2.jpg" alt="Promotion" className="promo-image" />
          <button className="apply-offers-btn">Apply For Offers</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature">
            <div className="feature-icon">👥</div>
            <div className="feature-text">
              <h4>Support 24/7</h4>
              <p>Call us anytime</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <div className="feature-text">
              <h4>100 % Safety</h4>
              <p>Only secure payments</p>
            </div>
          </div>
          
          <div className="feature">
            <div className="feature-icon">🏷️</div>
            <div className="feature-text">
              <h4>Hot Offers</h4>
              <p>Discount up to 50%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <h2>Why Speed Way</h2>
        <div className="stats-container">
          <div className="stat-box">
            <div className="stat-icon">🏭</div>
            <div className="stat-number">0</div>
            <div className="stat-label">Customers</div>
          </div>
          
          <div className="stat-box">
            <div className="stat-icon">👨‍💼</div>
            <div className="stat-number">0</div>
            <div className="stat-label">Suppliers</div>
          </div>
        </div>
      </section>

      {/* Supplier Section */}
      <section className="supplier-section">
        <div className="supplier-content">
          <h2>Do You Have Vehicle Parts to Sell?</h2>
          <div className="supplier-steps">
            <p><strong>Step 1 -</strong> Click on "Register"</p>
            <p><strong>Step 2 -</strong> Choose "Supplier"</p>
            <p><strong>Step 3 -</strong> Enter business and personal details</p>
            <p><strong>Step 4 -</strong> Set up a username and password</p>
          </div>
          {/* <button className="register-supplier-btn">Register As a Supplier</button> */}
          <Link to="/contactinfo" className="register-supplier-btn">Register As a Supplier</Link>
        </div>
      </section>

      {/* Footer */}
<Footer />
    </div>
    </div>
  );
};

export default Main;