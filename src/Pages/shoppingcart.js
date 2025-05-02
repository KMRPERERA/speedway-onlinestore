

import React from 'react';
import './shoppingcart.css'; // Adjust the path to your CSS file  
import NavbarComponent from "../Components/navbar.js"; // Adjust the import path as necessary
import { Link } from 'react-router-dom'; // Import Link for navigation

const Shoppingcart = () => {
  return (
    <div className="auto-parts-container-main">
      <NavbarComponent /> 
      {/* Main content */}
      <div className="shopping-cart-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="category-section">
            <h3>Category</h3>
            <ul className="category-list">
              <li className="category-item">
                <span>Spare Parts & Components</span>
                <ul className="subcategory-list">
                  <li>Engine Parts</li>
                  <li>Transmission & Drivetrain</li>
                  <li>Brakes & Suspension</li>
                  <li>Suspension & Steering</li>
                  <li>Electrical & Electronics</li>
                  <li>Exhaust System</li>
                  <li>Cooling System</li>
                </ul>
              </li>
              
              <li className="category-item">
                <span>Emergency & Safety Equipment</span>
                <ul className="subcategory-list">
                  <li>First Aid Kits</li>
                  <li>Fire Extinguishers</li>
                  <li>Warning Triangles</li>
                  <li>Airbags & Products</li>
                  <li>Emergency Road Tools</li>
                </ul>
              </li>
              
              <li className="category-item">
                <span>Tires & Wheels</span>
                <ul className="subcategory-list">
                  <li>Car Tires</li>
                  <li>Alloy & Steel Wheels</li>
                  <li>Wheel Accessories</li>
                  <li>Tire Repair Kits</li>
                </ul>
              </li>
              
              <li className="category-item">
                <span>Car Accessories</span>
                <ul className="subcategory-list">
                  <li>Interior Accessories</li>
                  <li>Exterior Accessories</li>
                  <li>Lighting</li>
                  <li>Audio & Entertainment</li>
                </ul>
              </li>
              
              <li className="category-item">
                <span>Fluids & Maintenance Products</span>
                <ul className="subcategory-list">
                  <li>Engine Oil & Lubricants</li>
                  <li>Coolants & Additives</li>
                  <li>Transmission Fluids</li>
                  <li>Car Wash & Detailing Products</li>
                </ul>
              </li>
              
              <li className="category-item">
                <span>Performance Parts & Tuning</span>
                <ul className="subcategory-list">
                  <li>Turbochargers & Superchargers</li>
                  <li>Cold Air Intakes</li>
                  <li>Performance Exhaust Systems</li>
                  <li>ECU Tuning & Chips</li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div className="brand-section">
            <h3>Brand</h3>
            <ul className="brand-list">
              <li>Toyota</li>
              <li>Honda</li>
              <li>Nissan</li>
              <li>Mazda</li>
              <li>Mitsubishi</li>
              <li>Suzuki</li>
              <li>BMW</li>
              <li>Mercedes-Benz</li>
              <li>Audi</li>
              <li>Any Other</li>
            </ul>
          </div>
          
          <button className="filter-btn">Filter</button>
        </div>
        
        {/* Products grid */}
        <div className="products-grid">
          {/* Row 1 */}
          <div className="product-card">
            <div className="product-image">
              <img src="/images/air filter.jpg" alt="6 speed gearbox" />
            </div>
            <h4>6 speed gearbox</h4>
            <p className="price">Rs. 10,000.00</p>
            {/* <button className="add-to-cart-btn">Add to cart</button> */}
            <div className="cart-btn-container">
            <Link to="/orderpage" className="add-to-cart-btn">Add to cart</Link>
            <Link to="/viewdetails" className="view-details-btn">View Details</Link>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image">
              <img src="/images/air filter.jpg" alt="6 speed gearbox" />
            </div>
            <h4>6 speed gearbox</h4>
            <p className="price">Rs. 10,000.00</p>
            {/* <button className="add-to-cart-btn">Add to cart</button> */}
            <div className="cart-btn-container">
            <Link to="/orderpage" className="add-to-cart-btn">Add to cart</Link>
            <Link to="/viewdetails" className="view-details-btn">View Details</Link>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="product-card">
            <div className="product-image">
              <img src="/images/air filter.jpg" alt="6 speed gearbox" />
            </div>
            <h4>6 speed gearbox</h4>
            <p className="price">Rs. 10,000.00</p>
            <div className="cart-btn-container">
            <Link to="/orderpage" className="add-to-cart-btn">Add to cart</Link>
            <Link to="/viewdetails" className="view-details-btn">View Details</Link>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image">
              <img src="/images/alternator.jpg" alt="6 speed gearbox" />
            </div>
            <h4>6 speed gearbox</h4>
            <p className="price">Rs. 10,000.00</p>
            <div className="cart-btn-container">
            <Link to="/orderpage" className="add-to-cart-btn">Add to cart</Link>
            <Link to="/viewdetails" className="view-details-btn">View Details</Link>
            </div>
          </div>
          
          {/* Row 3 */}
          <div className="product-card">
            <div className="product-image">
              <img src="/images/mz2.jpg" alt="6 speed gearbox" />
            </div>
            <h4>6 speed gearbox</h4>
            <p className="price">Rs. 10,000.00</p>
            <div className="cart-btn-container">
            <Link to="/orderpage" className="add-to-cart-btn">Add to cart</Link>
            <Link to="/viewdetails" className="view-details-btn">View Details</Link>
            </div>
          </div>
          
          <div className="product-card">
            <div className="product-image">
              <img src="/images/mz3.jpg" alt="6 speed gearbox" />
            </div>
            <h4>6 speed gearbox</h4>
            <p className="price">Rs. 10,000.00</p>
            <div className="cart-btn-container">
            <Link to="/orderpage" className="add-to-cart-btn">Add to cart</Link>
            <Link to="/viewdetails" className="view-details-btn">View Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoppingcart;