

import React, { useState, useEffect } from 'react'
import './checkoutpage.css'
import NavbarComponent from "../Components/navbar.js"; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom'; // Import for redirection

export default function Checkoutpage() {
  const navigate = useNavigate(); // For redirection
  
  // State to store checkout details
  const [checkoutDetails, setCheckoutDetails] = useState({
    items: [],
    subTotal: 0,
    tax: 0,
    total: 0
  });
  
  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'US',
    streetAddress: '',
    apartmentInfo: '',
    city: '',
    state: 'WA',
    zipCode: '',
    phoneNumber: '',
    emailAddress: '',
    orderNotes: ''
  });
  
  // State for order confirmation popup
  const [showPopup, setShowPopup] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  
  // Check for user in localStorage and set email when component mounts
  useEffect(() => {
    // Check if user is logged in, redirect if not
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      // Redirect to login page if no user found
      navigate('/login');
      return;
    }
    
    try {
      // Parse user data and set email
      const user = JSON.parse(userData);
      setFormData(prevData => ({
        ...prevData,
        emailAddress: user.email || '' // Set email from user data
      }));
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
    
    // Load checkout details from localStorage
    const storedCheckoutDetails = JSON.parse(localStorage.getItem('checkoutDetails'));
    if (storedCheckoutDetails) {
      setCheckoutDetails(storedCheckoutDetails);
    }
  }, [navigate]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Don't update emailAddress field since it's bound to user data
    if (name !== 'emailAddress') {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get the first item from cart (assuming we need to send the first product ID)
    const firstItem = checkoutDetails.items && checkoutDetails.items.length > 0 
      ? checkoutDetails.items[0] 
      : null;
      
    if (!firstItem) {
      alert("No items in your cart!");
      return;
    }
    
    // Construct the full name
    const fullName = `${formData.firstName} ${formData.lastName}`;
    
    // Construct the full address
    const fullAddress = `${formData.streetAddress}, ${formData.apartmentInfo ? formData.apartmentInfo + ', ' : ''}${formData.city}, ${formData.state}, ${formData.zipCode}, ${formData.country}`;
    
    try {
      // Make API call using fetch
      const url = `https://onlinestorebackend20250502182239.azurewebsites.net/api/MoterpartApi/addorder?ProductID=${firstItem.productID || 5}&CustomerEmail=${encodeURIComponent(formData.emailAddress)}&CustomerAddress=${encodeURIComponent(fullAddress)}&OrderPrice=${checkoutDetails.total}&CustomerName=${encodeURIComponent(fullName)}&OrderQty=${firstItem.quantity || 1}&PhoneNumber=${encodeURIComponent(formData.phoneNumber)}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Set the order number and show the popup
      setOrderNumber(data[0].orderNumber);
      setShowPopup(true);
      
      // Clear cart after successful order
      localStorage.removeItem('checkoutDetails');
      setCheckoutDetails({
        items: [],
        subTotal: 0,
        tax: 0,
        total: 0
      });
      
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    }
  };
  
  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };
   
  return (  
    <div>
      <div><NavbarComponent/></div>
      <div>
        <div className="checkout-cosmos">
          <h1 className="heading-jupiter">CHECKOUT</h1>
          
          <div className="customer-saturn">
            <div className="notice-mercury">
              Returning customer? <a href="#" className="link-pluto">Click here to log in</a>
            </div>
            <div className="notice-mercury">
              Have a coupon? <a href="#" className="link-pluto">Click here to enter your code</a>
            </div>
          </div>
          
          <div className="billing-venus">
            <h2 className="heading-jupiter">Billing Detail</h2>
            
            <form className="form-neptune" onSubmit={handleSubmit}>
              <div className="field-group-uranus">
                <label className="field-label-comet">
                  First Name <span className="required-star-galaxy">*</span>
                </label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="field-input-meteor" 
                  required
                />
              </div>
              
              <div className="field-group-uranus">
                <label className="field-label-comet">
                  Last Name <span className="required-star-galaxy">*</span>
                </label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="field-input-meteor" 
                  required
                />
              </div>
              
              <div className="field-group-uranus">
                <label className="field-label-comet">
                  Company Name (Optional)
                </label>
                <input 
                  type="text" 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="field-input-meteor"
                />
              </div>
              
              <div className="field-group-uranus">
                <label className="field-label-comet">
                  Country / Region <span className="required-star-galaxy">*</span>
                </label>
                <select 
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="dropdown-mars" 
                  required
                >
                  <option value="US">United States (US)</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              
              <div className="field-group-uranus">
                <label className="field-label-comet">
                  Street Address
                </label>
                <input 
                  type="text" 
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="field-input-meteor" 
                  placeholder="House number and street name ..."
                  required
                />
                <input 
                  type="text" 
                  name="apartmentInfo"
                  value={formData.apartmentInfo}
                  onChange={handleInputChange}
                  className="field-input-meteor" 
                  placeholder="Apartment, suite, unit, etc (Optional)"
                />
              </div>
              
              <div className="field-group-uranus">
                <label className="field-label-comet">
                  Town / City <span className="required-star-galaxy">*</span>
                </label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="field-input-meteor" 
                  required
                />
              </div>
              
              <div className="field-group-uranus">
                <label className="field-label-comet">
                  State / County <span className="required-star-galaxy">*</span>
                </label>
                <select 
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="dropdown-mars" 
                  required
                >
                  <option value="WA">Washington</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                </select>
              </div>
              
              <div className="field-group-uranus">
                <label className="field-label-comet">
                  Zip Code <span className="required-star-galaxy">*</span>
                </label>
                <input 
                  type="text" 
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="field-input-meteor" 
                  required
                />
              </div>
              
              <div className="field-group-uranus">
                <label className="field-label-comet">
                  Phone Number <span className="required-star-galaxy">*</span>
                </label>
                <input 
                  type="tel" 
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="field-input-meteor" 
                  required
                />
              </div>
              
              <div className="field-group-uranus">
                <label className="field-label-comet">
                  Email Address <span className="required-star-galaxy">*</span>
                </label>
                <input 
                  type="email" 
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  className="field-input-meteor" 
                  required
                  readOnly // Make email field read-only
                  style={{backgroundColor: "#f0f0f0"}} // Optional: add visual indication that field is readonly
                />
              </div>
              
              <div className="field-group-uranus">
                <div className="summary-lunar">
                  <div className="summary-header-asteroid">
                    <span>PRODUCT</span>
                    <span>SUB TOTAL</span>
                  </div>
                  
                  {/* Render items dynamically from localStorage */}
                  {checkoutDetails.items && checkoutDetails.items.length > 0 ? (
                    checkoutDetails.items.map((item, index) => (
                      <div className="product-orion" key={index}>
                        <div className="product-title-nova">{item.partName}</div>
                        <div className="product-quantity-nebula">× {item.quantity}</div>
                        <div>Rs. {item.itemTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                      </div>
                    ))
                  ) : (
                    <div className="product-orion">
                      <div className="product-title-nova">No items in cart</div>
                    </div>
                  )}
                  
                  <div className="shipping-europa">
                    <span>Worldwide Standard Shipping Free</span>
                    <span className="free-text-io">Free</span>
                  </div>
                  
                  <div className="total-titan">
                    <span>Order Total</span>
                    <span className="price-callisto">Rs. {checkoutDetails.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
                
                <div className="payment-phobos">
                  <div className="payment-option-deimos">
                    <input type="radio" name="payment" id="bank-transfer" className="payment-radio-ganymede" defaultChecked/>
                    <div className="payment-details-triton">
                      <label htmlFor="bank-transfer" className="payment-title-rhea">Direct Bank Transfer</label>
                      <p className="payment-description-tethys">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                    </div>
                  </div>
                  
                  <div className="payment-option-deimos">
                    <input type="radio" name="payment" id="cash" className="payment-radio-ganymede"/>
                    <div className="payment-details-triton">
                      <label htmlFor="cash" className="payment-title-rhea">Cash on Delivery</label>
                    </div>
                  </div>
                  
                  <div className="payment-option-deimos">
                    <input type="radio" name="payment" id="paypal" className="payment-radio-ganymede"/>
                    <div className="payment-details-triton">
                      <label htmlFor="paypal" className="payment-title-rhea">Paypal <a href="#" className="link-pluto">What's Paypal?</a></label>
                    </div>
                    <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="payment-logo-dione"/>
                  </div>
                  
                  <button type="submit" className="submit-enceladus">PLACE ORDER</button>
                </div>
              </div>
              
              <div className="notes-hyperion">
                <h2 className="heading-jupiter">Additional Information</h2>
                <label className="field-label-comet">Order Notes (Optional)</label>
                <textarea 
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  className="textarea-iapetus" 
                  placeholder="Note about your order, e.g. special note for delivery"
                ></textarea>
              </div>
            </form>
          </div>
        </div>
        
        {/* Order Confirmation Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <div className="popup-header">
                <h2>Order Placed Successfully!</h2>
                <span className="close-button" onClick={closePopup}>&times;</span>
              </div>
              <div className="popup-body">
                <div className="success-icon">✓</div>
                <p>Thank you for your order!</p>
                <p>Your order reference number is:</p>
                <h3 className="order-number">{orderNumber}</h3>
                <p>Please save this number for tracking your order.</p>
              </div>
              <div className="popup-footer">
                <button className="continue-shopping-btn" onClick={closePopup}>Continue Shopping</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}