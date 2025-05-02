import React from 'react'
import { Link } from 'react-router-dom'
import './neworders.css'; // Adjust the path to your CSS file
import SupplierNavbarComponent from '../Components/supplier-navbar';

export default function Neworders() {
  return (
    <div><SupplierNavbarComponent/><div><div class="orderManagementContainer">
    <div class="purchaseCard">
      <div class="headerContainer">
        <div>
          <h2 class="purchaseIdentifier">Order #ORD-2024-001</h2>
          <p class="clientName">John Smith</p>
        </div>
        <div class="badgeContainer">
          <span class="statusBadge freshOrder">New</span>
          <span class="statusBadge highUrgency">High Priority</span>
        </div>
      </div>
      
      <div class="timeStampWrapper">
        <span class="iconClock">⏱</span>
        <span>Ordered on 2/23/2024</span>
      </div>
      
      <div class="locationWrapper">
        <span class="iconLocation">📍</span>
        <span>123 Main St, City, Country</span>
      </div>
      
      <table class="productTable">
        <thead>
          <tr>
            <th class="productTableHeader">PRODUCT</th>
            <th class="productTableHeader">QUANTITY</th>
            <th class="productTableHeader">PRICE</th>
            <th class="productTableHeader">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr class="productItem">
            <td class="productDetails">
              <div class="productImageContainer">
                <img src="/api/placeholder/60/60" alt="Brake Pad Set" />
              </div>
              <span class="productName">Brake Pad Set</span>
            </td>
            <td class="productCell">2</td>
            <td class="productCell priceCell">$89.99</td>
            <td class="productCell priceCell">$179.98</td>
          </tr>
        </tbody>
      </table>
      
      <div class="totalSection">
        <span class="finalCost">Total Order Amount:</span>
        <span class="amountValue">$179.98</span>
      </div>
      
      <div class="actionContainer">
        <button class="processBtn">
          <span class="actionIcon">📦</span>
          Process Order
        </button>
        <button class="shipBtn">
          <span class="actionIcon">✓</span>
          Mark as Shipped
        </button>
      </div>
    </div>
    
    <div class="purchaseCard">
      <div class="headerContainer">
        <div>
          <h2 class="purchaseIdentifier">Order #ORD-2024-002</h2>
          <p class="clientName">Sarah Johnson</p>
        </div>
        <div class="badgeContainer">
          <span class="statusBadge freshOrder">New</span>
          <span class="statusBadge mediumUrgency">Medium Priority</span>
        </div>
      </div>
      
      <div class="timeStampWrapper">
        <span class="iconClock">⏱</span>
        <span>Ordered on 2/23/2024</span>
      </div>
      
      <div class="locationWrapper">
        <span class="iconLocation">📍</span>
        <span>456 Oak Ave, Town, Country</span>
      </div>
      
      <table class="productTable">
        <thead>
          <tr>
            <th class="productTableHeader">PRODUCT</th>
            <th class="productTableHeader">QUANTITY</th>
            <th class="productTableHeader">PRICE</th>
            <th class="productTableHeader">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr class="productItem">
            <td class="productDetails">
              <div class="productImageContainer">
                <img src="/api/placeholder/60/60" alt="Oil Filter" />
              </div>
              <span class="productName">Oil Filter</span>
            </td>
            <td class="productCell">1</td>
            <td class="productCell priceCell">$15.99</td>
            <td class="productCell priceCell">$15.99</td>
          </tr>
          <tr class="productItem">
            <td class="productDetails">
              <div class="productImageContainer">
                <img src="/api/placeholder/60/60" alt="Engine Oil 5W-30" />
              </div>
              <span class="productName">Engine Oil 5W-30</span>
            </td>
            <td class="productCell">5</td>
            <td class="productCell priceCell">$45.99</td>
            <td class="productCell priceCell">$229.95</td>
          </tr>
        </tbody>
      </table>
      
      <div class="totalSection">
        <span class="finalCost">Total Order Amount:</span>
        <span class="amountValue">$245.94</span>
      </div>
      
      <div class="actionContainer">
        <button class="processBtn">
          <span class="actionIcon">📦</span>
          Process Order
        </button>
        <button class="shipBtn">
          <span class="actionIcon">✓</span>
          Mark as Shipped
        </button>
      </div>
    </div>
  </div></div></div>
  )
}
