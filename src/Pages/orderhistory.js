import React from 'react'
import { Link } from 'react-router-dom'
import './orderhistory.css'; // Adjust the path to your CSS file
import NavbarComponent from '../Components/navbar';

export default function Orderhistory() {
  return (
    <div><div><NavbarComponent/></div> <div class="auto-parts-container">
    <h1 class="order-history-headline">YOUR ORDER HISTORY</h1>
    

    <div class="purchase-record-wrapper">
        <div class="purchase-item-row">
            <div class="product-image-container">
                <img src="/images/mz1.jpg" alt="Brake Pad Set"/>
            </div>
            <div class="product-details-section">
                <h2 class="product-title">BRAKE PAD SET</h2>
                <p class="order-reference">
                    <span class="order-reference-number">ORDER #12345</span>
                    <span class="vertical-separator">|</span>
                    <span class="order-placement-date">PLACED ON JAN 15, 2024</span>
                </p>
                <p class="order-quantity-info">
                    <span class="quantity-number">QUANTITY: 2</span>
                    <span class="vertical-separator">|</span>
                    <span class="order-total-amount">TOTAL: $89.99</span>
                </p>
            </div>
            <div class="delivery-status-badge status-delivered">DELIVERED</div>
        </div>
    </div>
    

    <div class="purchase-record-wrapper">
        <div class="purchase-item-row">
            <div class="product-image-container">
                <img src="/images/mz2.jpg" alt="Premium Oil Filter"/>
            </div>
            <div class="product-details-section">
                <h2 class="product-title">PREMIUM OIL FILTER</h2>
                <p class="order-reference">
                    <span class="order-reference-number">ORDER #12346</span>
                    <span class="vertical-separator">|</span>
                    <span class="order-placement-date">PLACED ON JAN 22, 2024</span>
                </p>
                <p class="order-quantity-info">
                    <span class="quantity-number">QUANTITY: 3</span>
                    <span class="vertical-separator">|</span>
                    <span class="order-total-amount">TOTAL: $45.00</span>
                </p>
            </div>
            <div class="delivery-status-badge status-delivered">DELIVERED</div>
        </div>
    </div>
    

    <div class="purchase-record-wrapper">
        <div class="purchase-item-row">
            <div class="product-image-container">
                <img src="/images/mz3.jpg" alt="High Performance Air Filter"/>
            </div>
            <div class="product-details-section">
                <h2 class="product-title">HIGH PERFORMANCE AIR FILTER</h2>
                <p class="order-reference">
                    <span class="order-reference-number">ORDER #12347</span>
                    <span class="vertical-separator">|</span>
                    <span class="order-placement-date">PLACED ON FEB 5, 2024</span>
                </p>
                <p class="order-quantity-info">
                    <span class="quantity-number">QUANTITY: 1</span>
                    <span class="vertical-separator">|</span>
                    <span class="order-total-amount">TOTAL: $29.99</span>
                </p>
            </div>
            <div class="delivery-status-badge status-processing">PROCESSING</div>
        </div>
    </div>
</div><div></div></div>
  )
}
