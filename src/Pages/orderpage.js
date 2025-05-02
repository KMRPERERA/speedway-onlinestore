import React from 'react'
import NavbarComponent from '../Components/navbar'
import './orderpage.css'; // Assuming you have a CSS file for styling

export default function Orderpage() {
  return (
    <div><div><NavbarComponent/></div><div> <div class="cartHeadline"></div>

    <div class="pageLayout">
        <div class="cartItemsContainer">

            <div class="productCard">
                <div class="imageWrapper">
                    {/* <img src="/api/placeholder/220/220" alt="Oil Filter"> */}
                    <img src="/images/oil filter.jpg" alt="Warehouse worker checking inventory" />
                </div>
                <div class="productDetails">
                    <div class="itemCode">(152)</div>
                    <div class="productName">Oil Filter</div>
                    <div class="priceTag">$579.00</div>
                    
                    <div class="quantityControl">
                        <button class="qtyBtn">−</button>
                        <input type="text" class="qtyInput" value="1"/>
                        <button class="qtyBtn">+</button>
                    </div>
                    
                    <div class="shippingLabel">FREE SHIPPING</div>
                    
                    <div class="stockInfo">
                        <span class="stockDot"></span>
                        <span>In stock</span>
                    </div>
                </div>
                
                <div class="colorOptions">
                    <div class="colorOption blueOption"></div>
                    <div class="colorOption redOption"></div>
                </div>
            </div>
  
            <div class="productCard">
                <div class="imageWrapper">
                    {/* <img src="/api/placeholder/220/220" alt="Alternator"> */}
                    <img src="/images/alternator.jpg" alt="Warehouse worker checking inventory" />
                </div>
                <div class="productDetails">
                    <div class="itemCode">(152)</div>
                    <div class="productName">Alternator</div>
                    <div class="priceTag">$579.00</div>
                    
                    <div class="quantityControl">
                        <button class="qtyBtn">−</button>
                        <input type="text" class="qtyInput" value="1"/>
                        <button class="qtyBtn">+</button>
                    </div>
                    
                    <div class="shippingLabel">FREE SHIPPING</div>
                    
                    <div class="stockInfo">
                        <span class="stockDot"></span>
                        <span>In stock</span>
                    </div>
                </div>
                
                <div class="colorOptions">
                    <div class="colorOption blueOption"></div>
                    <div class="colorOption redOption"></div>
                </div>
            </div>
        </div>
        
        <div class="summaryPanel">
            <div class="orderSummaryCard">
                <div class="summaryTitle">Order Summary</div>
                
                <div class="summaryRow">
                    <div class="summaryLabel">Sub Total:</div>
                    <div class="summaryValue">$1,000.00</div>
                </div>
                
                <div class="summaryDivider"></div>
                
                <div class="summaryRow">
                    <div class="summaryLabel">Shipping estimate:</div>
                    <div class="summaryValue">Free</div>
                </div>
                
                <div class="summaryDivider"></div>
                
                <div class="summaryRow">
                    <div class="summaryLabel">Tax estimate:</div>
                    <div class="summaryValue">$137.00</div>
                </div>
                
                <div class="summaryDivider"></div>
                
                <div class="totalRow">
                    <div class="totalLabel">ORDER TOTAL:</div>
                    <div class="totalValue">$1,737.00</div>
                </div>
                
                <button class="checkoutBtn">Checkout</button>
            </div>
        </div>
    </div></div></div>
  )
}
