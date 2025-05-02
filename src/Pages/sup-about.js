import React from 'react'
import './about.css'; // Assuming you have a CSS file for styling
// import NavbarComponent from '../Components/navbar';
import SupplierNavbarComponent from '../Components/supplier-navbar';
import FooterComponent from '../Components/footer'; // Adjust the import path as necessary

export default function SupAbout() {
  return (
<div>
<div>
    <SupplierNavbarComponent/>
    </div>
    <div class="about-section">   
    <div class="container">
        <h1>About Speedway</h1>
        
        <div class="about-content">
            <div class="about-text">
                <p>Welcome to Speed Way, your trusted partner for sourcing emergency vehicle spare parts.</p>
                <p>"Speedway" is the latest from IT sector from the company which is designed to help customers as well as the suppliers to search for spare parts easier than before</p>
            </div>
            
            <div class="about-grid">
                <div class="about-features">
                    <div class="feature-box">
                        <h3>What "Speedway" can do for you?</h3>
                        <p>Registered customers of Speedway.lk can search for items, they are looking like normal other websites. But as a special function in Speedway.lk, customers can send requests for Quotation and suppliers will quote back. So customers have the best opportunity to choose the best prices from the suppliers. And also our reliable delivery service is another special function</p>
                    </div>
                    
                    <div class="feature-box">
                        <h3>What "Speedway.lk" will offer?</h3>
                        <ul>
                            <li>Transparent pricing with no hidden costs.</li>
                            <li>Effortless order placement via a user-friendly interface</li>
                            <li>Fast and dependable delivery services</li>
                        </ul>
                    </div>
                </div>
                
                <div class="about-images">
                    <div class="image-grid">
                        <div class="img-box">
                            {/* <img src="/api/placeholder/320/240" alt="Warehouse worker checking inventory"> */}
                            <img src="/images/ab1.jpg" alt="Warehouse worker checking inventory" />
                        </div>
                        <div class="img-box">
                            {/* <img src="/api/placeholder/320/240" alt="Vehicle parts"> */}
                            <img src="/images/ab2.jpg" alt="Warehouse worker checking inventory" />
                        </div>
                        <div class="img-box">
                            {/* <img src="/api/placeholder/320/240" alt="Parts warehouse"> */}
                            <img src="/images/ab3.jpg" alt="Warehouse worker checking inventory" />
                        </div>
                        <div class="img-box">
                            {/* <img src="/api/placeholder/320/240" alt="Online parts shopping"> */}
                            <img src="/images/ab4.jpg" alt="Warehouse worker checking inventory" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div>
    <FooterComponent/>
</div>
</div>
  )
}
