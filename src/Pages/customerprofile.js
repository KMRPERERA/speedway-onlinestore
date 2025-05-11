
import React, { useEffect, useState } from 'react';
import './customerprofile.css'; // Adjust the path to your CSS file
import NavbarComponent from '../Components/navbar';

export default function Customerprofile() {
  const [customerData, setCustomerData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch customer data when component mounts
    const fetchCustomerData = async () => {
      try {
        // Get email from localStorage
        const userData = localStorage.getItem('currentUser');
        let customerEmail = '';
        
        if (userData) {
          // Parse userData if it's a JSON object
          try {
            const parsedData = JSON.parse(userData);
            customerEmail = parsedData.email || parsedData.customer_email || '';
          } catch {
            // If not JSON, assume it's just the email
            customerEmail = userData;
          }
        }
        
        if (!customerEmail) {
          throw new Error('Customer email not found in local storage');
        }
        
        // Fetch data from API
        const response = await fetch(`https://onlinestorebackend20250502182239.azurewebsites.net/api/UserAuthentication/getcustomerinfo?CustomerEmail=${encodeURIComponent(customerEmail)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        
        const data = await response.json();
        
        // Check if we have customer data
        if (data && data.length > 0) {
          setCustomerData(data[0]);
        } else {
          throw new Error('No customer data found');
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  if (loading) {
    return (
      <div>
        <NavbarComponent />
        <div className="profileWrapper">
          <p>Loading customer data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavbarComponent />
        <div className="profileWrapper">
          <p>Error loading customer data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <NavbarComponent />
      </div>
      <div className="profileWrapper">
        <div className="identityHeader">
          <div className="userIconBox">
            {/* User icon can be added here if needed */}
          </div>
          <div className="personalDetGroup">
            <h2 className="sectionTitle">Personal Information</h2>
            <p className="subtitleCap">View your personal details</p>
          </div>
        </div>
        
        <div className="infoFieldName">Full Name</div>
        <input 
          type="text" 
          className="dataEntryBox" 
          value={customerData.customer_name || ''} 
          readOnly
        />
        
        <div className="infoFieldName">Email</div>
        <input 
          type="email" 
          className="dataEntryBox" 
          value={customerData.customer_email || ''} 
          readOnly
        />
        
        <div className="infoFieldName">Phone Number</div>
        <input 
          type="tel" 
          className="dataEntryBox" 
          value={customerData.customer_phone || ''} 
          readOnly
        />
      </div>
    </div>
  );
}