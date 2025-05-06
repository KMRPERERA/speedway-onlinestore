
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './neworders.css'; // Adjust the path to your CSS file
import SupplierNavbarComponent from '../Components/supplier-navbar';

export default function Neworders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from localStorage when page loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userData = localStorage.getItem('currentUser');
        if (!userData) {
          throw new Error('User data not found in localStorage');
        }

        const user = JSON.parse(userData);
        const supplierEmail = encodeURIComponent(user.email);
        
        const response = await fetch(`https://onlinestorebackend20250502182239.azurewebsites.net/api/MoterpartApi/getneworders?SupplierEmail=${supplierEmail}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Function to handle shipping status update
  const handleMarkAsShipped = async (orderNumber) => {
    try {
      const response = await fetch(
        `https://onlinestorebackend20250502182239.azurewebsites.net/api/MoterpartApi/adddeliverystatus?OrderNumber=${orderNumber}&IsShipped=true&IsDelivered=false`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the local state to reflect the change
      setOrders(orders.map(order => 
        order.orderNumber === orderNumber 
          ? { ...order, isShipped: true }
          : order
      ));

      alert(`Order #${orderNumber} has been marked as shipped!`);
    } catch (err) {
      console.error('Error updating shipping status:', err);
      alert(`Failed to update shipping status: ${err.message}`);
    }
  };

  // Function to handle delivery status update
  const handleMarkAsDelivered = async (orderNumber) => {
    try {
      const response = await fetch(
        `https://onlinestorebackend20250502182239.azurewebsites.net/api/MoterpartApi/adddeliverystatus?OrderNumber=${orderNumber}&IsShipped=true&IsDelivered=true`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the local state to reflect the change
      setOrders(orders.map(order => 
        order.orderNumber === orderNumber 
          ? { ...order, isShipped: true, isDelivered: true }
          : order
      ));

      alert(`Order #${orderNumber} has been marked as delivered!`);
    } catch (err) {
      console.error('Error updating delivery status:', err);
      alert(`Failed to update delivery status: ${err.message}`);
    }
  };

  // Function to format date string
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (loading) {
    return (
      <div>
        <SupplierNavbarComponent />
        <div className="orderManagementContainer">
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <SupplierNavbarComponent />
        <div className="orderManagementContainer">
          <p>Error loading orders: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SupplierNavbarComponent />
      <div className="orderManagementContainer">
        {orders.length === 0 ? (
          <p>No new orders found</p>
        ) : (
          orders.map((order) => (
            <div className="purchaseCard" key={order.orderNumber}>
              <div className="headerContainer">
                <div>
                  <h2 className="purchaseIdentifier">Order #{order.orderNumber}</h2>
                  <p className="clientName">{order.customerName}</p>
                </div>
                <div className="badgeContainer">
                  <span className="statusBadge freshOrder">New</span>
                  <span className="statusBadge highUrgency">
                    {order.isShipped ? (order.isDelivered ? "Delivered" : "Shipped") : "Pending"}
                  </span>
                </div>
              </div>

              <div className="timeStampWrapper">
                <span className="iconClock">⏱</span>
                <span>Delivery Date: {formatDate(order.deliverDate)}</span>
              </div>

              <div className="locationWrapper">
                <span className="iconLocation">📍</span>
                <span>{order.customerAddress}</span>
              </div>

              <div className="contactWrapper">
                <span className="iconContact">📞</span>
                <span>{order.phoneNumber}</span>
              </div>

              <div className="contactWrapper">
                <span className="iconContact">✉️</span>
                <span>{order.customerEmail}</span>
              </div>

              <div className="table-responsive">
                <table className="productTable">
                  <thead>
                    <tr>
                      <th className="productTableHeader">PRODUCT ID</th>
                      <th className="productTableHeader">QUANTITY</th>
                      <th className="productTableHeader">PRICE</th>
                      <th className="productTableHeader">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="productItem">
                      <td className="productDetails">
                        <div className="productImageContainer">
                          <img 
                            src={order.imageURL || `/images/product_${order.productID}.jpg`} 
                            alt={`Product ${order.productID}`} 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/60/60";
                            }}
                          />
                        </div>
                        <span className="productName">Product ID: {order.productID}</span>
                      </td>
                      <td className="productCell">{order.orderQty}</td>
                      <td className="productCell priceCell">
                        ${order.orderQty > 0 ? (Number(order.orderPrice) / order.orderQty).toFixed(2) : '0.00'}
                      </td>
                      <td className="productCell priceCell">${Number(order.orderPrice).toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="totalSection">
                <span className="finalCost">Total Order Amount:</span>
                <span className="amountValue">${Number(order.orderPrice).toFixed(2)}</span>
              </div>

              <div className="actionContainer">
                <button className="processBtn">
                  <span className="actionIcon">📦</span>
                  Process Order
                </button>
                <button 
                  className="shipBtn" 
                  onClick={() => handleMarkAsShipped(order.orderNumber)}
                  disabled={order.isShipped}
                >
                  <span className="actionIcon">✓</span>
                  Mark as Shipped
                </button>
                <button 
                  className="shipBtn" 
                  onClick={() => handleMarkAsDelivered(order.orderNumber)}
                  disabled={order.isDelivered}
                >
                  <span className="actionIcon">✓</span>
                  Mark as Delivered
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}