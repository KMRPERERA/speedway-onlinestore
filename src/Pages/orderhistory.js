

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './orderhistory.css';
import NavbarComponent from '../Components/navbar';
import config from '../environment/config';

export default function Orderhistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('currentUser');
    
    if (!userData) {
      // If no user found in localStorage, redirect to login
      navigate('/login');
      return;
    }

    // Parse user data to get email
    const user = JSON.parse(userData);
    const userEmail = user.email || ""; // Assuming email is stored in the email field
    
    // Fetch order history data from API
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/MoterpartApi/getdeliveredorders?CustomerEmail=${encodeURIComponent(userEmail)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order history:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <div>
        <NavbarComponent/>
      </div>
      <div className="order-history-wrapper">
        <div className="auto-parts-container">
          <h1 className="order-history-headline">YOUR ORDER HISTORY</h1>
          
          {loading ? (
            <div className="loading">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="no-orders">You have no order history.</div>
          ) : (
            orders.map((order) => (
              <div className="purchase-record-wrapper" key={order.orderNumber}>
                <div className="purchase-item-row">
                  <div className="product-image-container">
                    <img src={order.imageURL} alt={`Product ID: ${order.productID}`}/>
                  </div>
                  <div className="product-details-section">
                    <h2 className="product-title">ORDER #{order.orderNumber}</h2>
                    <p className="order-reference">
                      <span className="order-reference-number">PRODUCT ID: {order.productID}</span>
                      <span className="vertical-separator">|</span>
                      <span className="order-placement-date">DELIVER DATE: {formatDate(order.deliverDate)}</span>
                    </p>
                    <p className="order-quantity-info">
                      <span className="quantity-number">QUANTITY: {order.orderQty}</span>
                      <span className="vertical-separator">|</span>
                      <span className="order-total-amount">TOTAL: ${order.orderPrice.toFixed(2)}</span>
                    </p>
                    <p className="customer-info">
                      <span>SHIP TO: {order.customerName}, {order.customerAddress}</span>
                    </p>
                  </div>
                  <div className={`delivery-status-badge ${order.isDelivered ? "status-delivered" : "status-processing"}`}>
                    {order.isDelivered ? "DELIVERED" : "PROCESSING"}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}