
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// // import '../Components/home.css'; 
// import NavbarComponent from '../Components/navbar.js';

// export default function Main() {
//     const [data, setData] = useState([]);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const makeAPICall = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             // Changed from https to http
//             const url = 'https://localhost:7037/api/onlinestore';
//             const response = await fetch(url);
            
//             // Check if the response is successful
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const items = await response.json();
//             setData(items);
//             console.log(items); // Logging items instead of data for immediate results
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setError("Failed to load products. Please try again later.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div>
//             {/* <header className="header">
//                 <div className="logo">SpeedWay</div>
//                 <nav className="nav-menu">
//                     <Link to="/">Home</Link>
//                     <Link to="/shoppingcart">Shop</Link>
//                     <Link to="/about">About</Link>
//                     <Link to="/contact">Contact</Link>
//                 </nav>
//                 <div className="cart-info">Rs.1,688.00</div>
//             </header> */}
//             <NavbarComponent />
//             <nav className="secondary-nav">
//                 <div>Pricing Plans</div>
//                 <button className="btn btn-primary" onClick={makeAPICall}>
//                     {isLoading ? 'Loading...' : 'Get Products'}
//                 </button>
//                 <div>Order History</div>
//             </nav>

//             {error && <div className="error-message">{error}</div>}

//             <main className="product-grid">
//                 {data.map((item) => (
//                     <div className="product-card" key={item.moterpartid}>
//                         <img 
//                             src="/api/placeholder/250/200" 
//                             alt={item.moterpartname} 
//                             className="product-image"
//                         />
//                         <div className="product-title">{item.moterpartname}</div>
//                         <div className="product-price">Rs. {item.price.toLocaleString()}</div>
//                         <div className="product-actions">
//                             <button className="btn btn-cart">Add to cart</button>
//                             <button className="btn btn-details">View Details</button>
//                         </div>
//                     </div>
//                 ))}
//             </main>

//             <footer className="footer">
//                 <div>
//                     <div>© 2024 Brand, Inc.</div>
//                     <div>Privacy • Terms • Sitemap</div>
//                 </div>
//                 <div className="newsletter">
//                     <input type="email" placeholder="Input your email"/>
//                     <button>Subscribe</button>
//                 </div>
//                 <div className="social-links">
//                     <a href="#">Twitter</a>
//                     <a href="#">Facebook</a>
//                     <a href="#">LinkedIn</a>
//                     <a href="#">YouTube</a>
//                 </div>
//             </footer>
//         </div>
//     );
// }


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