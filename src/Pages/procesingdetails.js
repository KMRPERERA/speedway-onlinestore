

import React from 'react'
import { Link } from 'react-router-dom'
import './processingdetails.css'; // Adjust the path to your CSS file
import SupplierNavbarComponent from '../Components/supplier-navbar';

export default function Procesingdetails() {
  return (
    <div>
      <SupplierNavbarComponent/>
      <div className="orderContainer">
        <h1 className="headingPrimary">PROCESSING DETAILS</h1>
        
        <div className="trackingSequence">
          <div className="trackingRow">
            <div className="statusIcon statusIconComplete">
              <span className="checkmarkSymbol">✓</span>
            </div>
            <div className="statusLabel">ORDER PLACED</div>
            <div className="indicatorBox indicatorActive"></div>
          </div>

          <div className="trackingRow">
            <div className="statusIcon statusIconPending">
              <svg className="processingSymbol" viewBox="0 0 24 24">
                <path fill="#333" d="M19,3H5C3.89,3,3,3.89,3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M9,17H7V10H9V17M13,17H11V7H13V17M17,17H15V13H17V17Z"/>
                <circle cx="17" cy="5" r="3" fill="#333"/>
              </svg>
            </div>
            <div className="statusLabel">PROCESSING</div>
            <div className="indicatorBox indicatorInactive"></div>
          </div>
          
          <div className="trackingRow">
            <div className="statusIcon statusIconPending">
              <svg className="shippingSymbol" viewBox="0 0 24 24">
                <path fill="#333" d="M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M19.5,9.5L21.46,12H17V9.5M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8Z"/>
              </svg>
            </div>
            <div className="statusLabel">SHIPPED</div>
            <div className="indicatorBox indicatorInactive"></div>
          </div>
     
          <div className="trackingRow">
            <div className="statusIcon statusIconPending">
              <svg className="deliverySymbol" viewBox="0 0 24 24">
                <path fill="#333" d="M20,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V8L12,13L20,8V18M20,6L12,11L4,6V6H20V6Z"/>
                <path fill="#333" d="M16,15H8V13L12,15L16,13V15Z"/>
              </svg>
            </div>
            <div className="statusLabel">DELIVERED</div>
            <div className="indicatorBox indicatorInactive"></div>
          </div>
        </div>
      </div>
    </div>
  )
}