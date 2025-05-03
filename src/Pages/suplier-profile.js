

import React, { useState, useEffect } from 'react';
import './suplier-profile.css'; // Assuming you have a CSS file for styling
import SupplierNavbarComponent from '../Components/supplier-navbar'; // Adjust the import path as necessary
// Note: You'll need to add back the CSS import and navbar component in your actual implementation

function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [currentUser, setCurrentUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // Get user data from localStorage on component mount
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
        
        // After setting current user, fetch profile data
        fetchProfileData(parsedUser.email);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Error loading user data");
        setLoading(false);
      }
    } else {
      setError("No user data found");
      setLoading(false);
    }
  }, []);

  const fetchProfileData = async (email) => {
    try {
      const response = await fetch(
        `https://onlinestorebackend20250502182239.azurewebsites.net/api/UserAuthentication/supplier?business_email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        setProfileData(data[0]);
        
        // Set the order data if available in the response
        if (data[0].orderNumber !== undefined) {
          setOrderData([{
            orderNumber: data[0].orderNumber,
            phoneNumber: data[0].phoneNumber,
            orderQty: data[0].orderQty,
            deliverDate: data[0].deliverDate,
            isShipped: data[0].isShipped,
            isDelivered: data[0].isDelivered,
            supplierEmail: data[0].supplierEmail,
            customerName: data[0].customerName,
            productID: data[0].productID,
            productName: data[0].productName
          }]);
        }
      } else {
        setError("No profile data found");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      setError("Error fetching profile data");
    } finally {
      setLoading(false);
    }
  };

  // Function to determine status badge class
  const getStatusBadgeClass = (isDelivered, isShipped) => {
    if (isDelivered) return "status-badge delivered";
    if (isShipped) return "status-badge shipped";
    return "status-badge processing";
  };

  // Function to determine status text
  const getStatusText = (isDelivered, isShipped) => {
    if (isDelivered) return "Delivered";
    if (isShipped) return "Shipped";
    return "Processing";
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!profileData) return <div className="error-message">Profile not found</div>;

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
                <img src={profileData.p_business_logo} alt="Company Logo" />
              </div>
              <div className="company-info">
                <div className="company-title">
                  <h1 className="company-name">{profileData.p_business_name}</h1>
                  <span className="verified-badge">Verified Supplier</span>
                </div>
                <p className="company-description">
                  {profileData.p_business_description}
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
                  <div className="contact-value">{profileData.p_business_name}</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">✉️</div>
                <div className="contact-details">
                  <div className="contact-label">Email</div>
                  <div className="contact-value">{profileData.p_business_email}</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">{profileData.p_business_phone}</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <div className="contact-label">Address</div>
                  <div className="contact-value">{`${profileData.p_street_address}, ${profileData.p_city}, ${profileData.p_state} ${profileData.p_postal_code}`}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Business Details */}
          <div className="content-card business-details-card">
            <h2 className="section-title">Business Details</h2>
            <div className="business-details">
              <div className="detail-item">
                <div className="detail-label">Business Type</div>
                <div className="detail-value">{profileData.p_type_of_business}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Years in Business</div>
                <div className="detail-value">{profileData.p_years_in_business} years</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Registration Number</div>
                <div className="detail-value">{profileData.p_business_registration_number}</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">Service Area</div>
                <div className="detail-value">{profileData.p_service_area_coverage}</div>
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
                {orderData.map((order, index) => (
                  <tr key={index}>
                    <td className="order-id">ORD-{order.orderNumber}</td>
                    <td>{order.deliverDate ? new Date(order.deliverDate).toISOString().split('T')[0] : 'N/A'}</td>
                    <td>{order.customerName || 'N/A'}</td>
                    <td>{order.productName || 'N/A'}</td>
                    <td>{order.orderQty}</td>
                    <td>$0.00</td>
                    <td>
                      <span className={getStatusBadgeClass(order.isDelivered, order.isShipped)}>
                        {getStatusText(order.isDelivered, order.isShipped)}
                      </span>
                    </td>
                  </tr>
                ))}
                {orderData.length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>No orders available</td>
                  </tr>
                )}
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
        </div>
      </div>
    </div>
  );
}

export default SupplierDashboard;




