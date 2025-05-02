import React, { useState } from 'react';
import './suplier-profile.css'; // Assuming you have a CSS file for styling
import SupplierNavbarComponent from '../Components/supplier-navbar'; // Adjust the import path as necessary

function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  
  return (
    <div>
    <div><SupplierNavbarComponent /></div>
    <div className="profile-container-main">

      {/* Main Content */}
      <div className="supplier-dashboard-content">
        {/* Vendor Profile */}
        <div className="content-card profile-card">
          <div className="profile-header">
            <div className="company-logo">
              <img src="/company-logo-placeholder.png" alt="Company Logo" />
            </div>
            <div className="company-info">
              <div className="company-title">
                <h1 className="company-name">AutoParts Excellence Ltd</h1>
                <span className="verified-badge">Verified Supplier</span>
              </div>
              <p className="company-description">
                Leading supplier of high-quality automotive parts with over 15 years of experience. Specializing in genuine OEM
                and aftermarket parts for all major vehicle brands.
              </p>
              <div className="company-stats">
                <div className="stat-item">
                  <span className="stat-icon star-icon">★</span>
                  <span className="stat-value">4.8</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🛒</span>
                  <span className="stat-value">156 Products</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">🕒</span>
                  <span className="stat-value">2 hours Response</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">👍</span>
                  <span className="stat-value">98% Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <button className="edit-profile-btn">
              <span>✏️</span> Edit Profile
            </button>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="content-card contact-card">
          <h2 className="section-title">Contact Information</h2>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📦</div>
              <div className="contact-details">
                <div className="contact-label">Company</div>
                <div className="contact-value">AutoParts Excellence Ltd</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-details">
                <div className="contact-label">Email</div>
                <div className="contact-value">contact@autoparts-excellence.com</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <div className="contact-label">Phone</div>
                <div className="contact-value">+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <div className="contact-label">Address</div>
                <div className="contact-value">123 Auto District, Automotive City, AC 12345</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="content-card orders-card">
          <h2 className="section-title">Recent Orders</h2>
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>DATE</th>
                  <th>CUSTOMER</th>
                  <th>PRODUCT</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="order-id">ORD-9387</td>
                  <td>2025-02-18</td>
                  <td>JDM Auto Shop</td>
                  <td>V6 Engine Gasket Set</td>
                  <td>24</td>
                  <td>$1,872.00</td>
                  <td><span className="status-badge delivered">Delivered</span></td>
                </tr>
                <tr>
                  <td className="order-id">ORD-9375</td>
                  <td>2025-02-15</td>
                  <td>FastLane Mechanics</td>
                  <td>Transmission Rebuild Kit</td>
                  <td>3</td>
                  <td>$4,350.00</td>
                  <td><span className="status-badge delivered">Delivered</span></td>
                </tr>
                <tr>
                  <td className="order-id">ORD-9362</td>
                  <td>2025-02-12</td>
                  <td>Cruz Auto Parts</td>
                  <td>OEM Alternator</td>
                  <td>8</td>
                  <td>$2,160.00</td>
                  <td><span className="status-badge shipped">Shipped</span></td>
                </tr>
                <tr>
                  <td className="order-id">ORD-9344</td>
                  <td>2025-02-08</td>
                  <td>Mountain Gear Motors</td>
                  <td>Timing Belt Kit</td>
                  <td>15</td>
                  <td>$825.00</td>
                  <td><span className="status-badge processing">Processing</span></td>
                </tr>
                <tr>
                  <td className="order-id">ORD-9336</td>
                  <td>2025-02-05</td>
                  <td>Elite Performance</td>
                  <td>Fuel Injection System</td>
                  <td>4</td>
                  <td>$6,800.00</td>
                  <td><span className="status-badge delivered">Delivered</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button className="pagination-prev">&lt;</button>
            <div className="pagination-progress">
              <div className="pagination-indicator"></div>
            </div>
            <button className="pagination-next">&gt;</button>
          </div>
        </div>
        
        {/* Advertisement */}
        {/* <div className="content-card ad-card">
          <button className="ad-button">Advertisement</button>
        </div> */}
      </div>
    </div>
    </div>
  );
}

export default SupplierDashboard;