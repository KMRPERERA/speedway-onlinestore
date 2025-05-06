
import React, { useState, useEffect } from 'react';
import './trakingpage.css';
import NavbarComponent from '../Components/navbar';
import config from '../environment/config';

export default function Trakingpage() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        // Get order number and phone number from local storage
        const orderNumber = localStorage.getItem('orderNumber');
        const phoneNumber = localStorage.getItem('phoneNumber');

        if (!orderNumber || !phoneNumber) {
          throw new Error('Order number or phone number not found');
        }

        // Fetch data from API
        const response = await fetch(
          `${config.apiUrl}/api/MoterpartApi/trackorder?OrderNumber=${orderNumber}&PhoneNumber=${phoneNumber}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch order data');
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
          setOrderData(data[0]);
        } else {
          throw new Error('No order found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).toUpperCase();
  };

  if (loading) {
    return (
      <div>
        <NavbarComponent />
        <div className="tracking-page-wrapper">
          <div className="trackingShell">
            <h1 className="identifierTitle">LOADING ORDER DATA...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavbarComponent />
        <div className="tracking-page-wrapper">
          <div className="trackingShell">
            <h1 className="identifierTitle">ERROR</h1>
            <div className="detailsBox" style={{ textAlign: 'center', color: 'red' }}>
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <NavbarComponent/>
      </div>
      <div className="tracking-page-wrapper">
        <div className="trackingShell">
          <h1 className="identifierTitle">ORDER TRACKING #{orderData.orderNumber}</h1>
          
          <div className="progressVisual">
            <div className="trackLine"></div>
            <div className="milestonesRow">
              {/* Order Placed - Always active */}
              <div className="milestoneUnit">
                <div className="checkpointBubble activeBubble">
                  <svg className="checkpointIcon checkIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="stageLabel">ORDER PLACED</div>
              </div>

              {/* Processing - Always active since we have data */}
              <div className="milestoneUnit">
                <div className="checkpointBubble activeBubble">
                  <svg className="checkpointIcon boxIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    <circle cx="18" cy="14" r="3"></circle>
                    <polyline points="18 12 18 14 20 14"></polyline>
                  </svg>
                </div>
                <div className="stageLabel">PROCESSING</div>
              </div>
              
              {/* Shipped - Active if isShipped is true */}
              <div className="milestoneUnit">
                <div className={`checkpointBubble ${orderData.isShipped ? 'activeBubble' : 'inactiveBubble'}`}>
                  <svg className="checkpointIcon truckIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <div className="stageLabel">SHIPPED</div>
              </div>
              
              {/* Delivered - Active if isDelivered is true */}
              <div className="milestoneUnit">
                <div className={`checkpointBubble ${orderData.isDelivered ? 'activeBubble' : 'inactiveBubble'}`}>
                  <svg className="checkpointIcon deliveryIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10V4a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6"></path>
                    <path d="M16 2v2H8V2"></path>
                    <path d="M8 8h8"></path>
                    <path d="M8 12h4"></path>
                    <circle cx="18" cy="18" r="4"></circle>
                    <path d="M18 15v3h3"></path>
                  </svg>
                </div>
                <div className="stageLabel">DELIVERED</div>
              </div>
            </div>
          </div>
          
          <div className="detailsBox">
            <h2 className="sectionHeader">ORDER INFORMATION</h2>
            
            <div className="dataLine">
              <span className="dataLabel">ORDER NUMBER :</span>
              <span className="dataContent">{orderData.orderNumber}</span>
            </div>
            
            <div className="dataLine">
              <span className="dataLabel">PRODUCT ID :</span>
              <span className="dataContent">{orderData.productID}</span>
            </div>
            
            <div className="dataLine">
              <span className="dataLabel">CUSTOMER NAME :</span>
              <span className="dataContent">{orderData.customerName}</span>
            </div>
            
            <div className="dataLine">
              <span className="dataLabel">CUSTOMER EMAIL :</span>
              <span className="dataContent">{orderData.customerEmail}</span>
            </div>
            
            <div className="dataLine">
              <span className="dataLabel">SHIPPING ADDRESS :</span>
              <span className="dataContent">{orderData.customerAddress}</span>
            </div>

            <div className="dataLine">
              <span className="dataLabel">ORDER QUANTITY :</span>
              <span className="dataContent">{orderData.orderQty}</span>
            </div>
            
            <div className="dataLine">
              <span className="dataLabel">ORDER PRICE :</span>
              <span className="dataContent">Rs.{orderData.orderPrice.toFixed(2)}</span>
            </div>
            
            <div className="dataLine">
              <span className="dataLabel">ESTIMATED DELIVERY :</span>
              <span className="dataContent">{formatDate(orderData.deliverDate)}</span>
            </div>
            
            <div className="dataLine">
              <span className="dataLabel">CURRENT STATUS :</span>
              <span className="dataContent">
                {orderData.isDelivered 
                  ? "DELIVERED" 
                  : orderData.isShipped 
                    ? "SHIPPED" 
                    : "PROCESSING"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}