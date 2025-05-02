import React from 'react'
import NavbarComponent from '../Components/navbar'
import  './offers.css'; // Assuming you have a CSS file for styling

export default function Offers() {
  return (
    <div><div><NavbarComponent/></div><div class="promo_wrapper">
    <h1 class="headline_banner">CURRENT SPECIAL OFFERS</h1>
    
    <div class="offer_container">
        <div class="deal_card">
            <div class="action_button">SHOP NOW</div>
            <div class="visual_content brake_banner">
                <img src="/images/brake.jpg" alt="Brake pads, rotors and calipers sale until June 9, 2025" />
            </div>
            <div class="product_title">BRAKE PADS, ROTORS, AND CALIPERS</div>
        </div>

        <div class="deal_card">
            <div class="action_button">SHOP NOW</div>
            <div class="visual_content filter_banner">
                <img src="/images/Engine.jpg" alt="Brake pads, rotors and calipers sale until June 9, 2025" />
            </div>
            <div class="product_title">AIR, OIL, AND FUEL FILTERS PACKAGE</div>
        </div>
        
        <div class="deal_card">
            <div class="action_button">SHOP NOW</div>
            <div class="visual_content suspension_banner">
               <img src="/images/suspension.jpg" alt="Brake pads, rotors and calipers sale until June 9, 2025" />
            </div>
            <div class="product_title">SHOCK ABSORBERS AND STRUTS</div>
        </div>
    </div>
</div></div>
  )
}
