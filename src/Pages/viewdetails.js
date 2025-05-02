import React from 'react'
import { Link } from 'react-router-dom'
import './viewdetails.css'; // Adjust the path to your CSS file
import NavbarComponent from '../Components/navbar';

export default function ViewdetailsSection() {
  return (
    <div><div><NavbarComponent/></div><div><div class="product-display-area">
 
    <div class="pageview-counter-section">
        {/* <svg class="eyeicon-visual" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
        </svg> */}
        <span class="visitor-count-display">143 views</span>
    </div>
    
    <div class="mainphoto-container">
        <img src="/api/placeholder/800/540" alt="Window Mechanisms" class="product-showcase-image"/>
        <button class="enlarge-button-trigger">
            {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z"/>
            </svg> */}
        </button>
        

        <div class="seller-info-sidebar">
            <div class="vendor-header-section">
                <img src="/api/placeholder/80/80" alt="Tissa Auto Parts Logo" class="company-logo-thumbnail"/>
                <div>
                    <h2 class="parts-company-title">TISSA AUTO PARTS</h2>
                    <div class="member-badges-row">
                        <span class="premium-member-badge">MEMBER</span>
                        <span class="verification-status-tag">
                            {/* <svg width="12" height="12" viewBox="0 0 24 24" fill="white" style="margin-right: 4px;">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg> */}
                            VERIFIED SELLER
                        </span>
                        {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="#999">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg> */}
                    </div>
                </div>
            </div>
            
            <p class="membership-duration-text">Member since September 2019</p>
            <a href="#" class="shop-visit-link">Visit member's shop</a>
            
            <div class="contact-info-container">
                <div class="phone-icon-graphic">
                    {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg> */}
                </div>
                <div class="seller-contact-details">
                    <span class="seller-phone-number">0710XXXXXX</span>
                    <span class="click-reveal-instruction">Click to show phone number</span>
                </div>
            </div>
        </div>
    </div>
    
 
    <div class="thumbnail-gallery-strip">
        <button class="gallery-navigation-prev"></button>
        <img src="/api/placeholder/70/70" alt="Window Mechanism Thumbnail" class="thumbnail-image-preview"/>
        <img src="/api/placeholder/70/70" alt="Company Logo Thumbnail" class="thumbnail-image-preview"/>
        <button class="gallery-navigation-next"></button>
    </div>
    

    <div class="price-display-block">Rs 12,000</div>
    

    <div class="product-specs-list">
        <div class="spec-detail-row">
            <span class="spec-attribute-name">Condition:</span>
            <span class="spec-attribute-value">Reconditioned</span>
        </div>
        <div class="spec-detail-row">
            <span class="spec-attribute-name">Part or Accessory Type:</span>
            <span class="spec-attribute-value">Doors</span>
        </div>
        <div class="spec-detail-row">
            <span class="spec-attribute-name">Brand:</span>
            <span class="spec-attribute-value">Nissan</span>
        </div>
        <div class="spec-detail-row">
            <span class="spec-attribute-name">Model:</span>
            <span class="spec-attribute-value">Tiida</span>
        </div>
    </div>
</div></div></div>
  )
}
