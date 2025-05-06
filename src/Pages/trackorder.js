
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './trackorder.css';
import NavbarComponent from '../Components/navbar';

export default function Trackorder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleOrderNumberChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!orderNumber.trim() || !phoneNumber.trim()) {
      alert('Please enter both order number and phone number');
      return;
    }
    
    // Save to local storage
    localStorage.setItem('orderNumber', orderNumber);
    localStorage.setItem('phoneNumber', phoneNumber);
    
    // Navigate to tracking page
    navigate('/trakingpage');
  };

  return (
    <div>
      <div>
        <NavbarComponent />
      </div>
      <div className="page-wrapper">
        <div className="trackerContainer">
          <h1 className="mainHeading">TRACK YOUR ORDER</h1>
          
          <div className="instructionBlock">
            <p className="primaryInstruction">TO TRACK YOUR ORDER PLEASE ENTER YOUR ORDER NUMBER AND PHONE NUMBER IN THE BOXES BELOW AND PRESS THE "TRACK ORDER" BUTTON.</p>
            <p className="secondaryNote">ORDER NUMBER IS IN THE CONFIRMATION EMAIL THAT YOU HAVE RECEIVED.</p>
          </div>
          
          <div className="formFieldset">
            <label className="formLabel">Order Number</label>
            <input
              type="text"
              className="inputElement"
              placeholder="XXXXXXXXXX"
              value={orderNumber}
              onChange={handleOrderNumberChange}
            />
          </div>
          
          <div className="formFieldset">
            <label className="formLabel">Mobile</label>
            <input
              type="text"
              className="inputElement"
              placeholder="XXXXXXXXXX"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <p className="helperText">
              Enter phone number without country code and hyphens.<br/>
              (eg: If the number is (+94)71-712-3456 <span className="exampleFormat">format should be 0717123456</span>)
            </p>
          </div>
          
          <div className="submitArea">
            <button onClick={handleTrackOrder} className="trackButton">Track order</button>
          </div>
        </div>
      </div>
    </div>
  );
}