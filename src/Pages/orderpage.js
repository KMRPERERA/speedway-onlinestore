


import React, { useState, useEffect } from 'react'
import NavbarComponent from '../Components/navbar'
import './orderpage.css'; // Assuming you have a CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function Orderpage() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
   const navigate = useNavigate();
  
  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
    
    // Initialize quantities for each item (default to 1)
    const initialQuantities = {};
    storedItems.forEach(item => {
      initialQuantities[item.productID] = 1;
    });
    setQuantities(initialQuantities);
  }, []);
  
  // Calculate totals whenever cart items or quantities change
  useEffect(() => {
    calculateTotals();
  }, [cartItems, quantities]);
  
  // Calculate all totals
  const calculateTotals = () => {
    // Calculate subtotal
    const calculatedSubTotal = cartItems.reduce((total, item) => {
      return total + (item.price * (quantities[item.productID] || 1));
    }, 0);
    
    setSubTotal(calculatedSubTotal);
    
    // Calculate tax (assuming 13.7% tax rate)
    const calculatedTax = calculatedSubTotal * 0.137;
    setTax(calculatedTax);
    
    // Calculate total
    setTotal(calculatedSubTotal + calculatedTax);
  };
  
  // Handle quantity change
  const handleQuantityChange = (productID, newValue) => {
    // Ensure quantity is a valid number and at least 1
    const qty = Math.max(1, parseInt(newValue) || 1);
    
    setQuantities(prev => ({
      ...prev,
      [productID]: qty
    }));
  };
  
  // Increase quantity
  const increaseQuantity = (productID) => {
    setQuantities(prev => ({
      ...prev,
      [productID]: (prev[productID] || 1) + 1
    }));
  };
  
  // Decrease quantity
  const decreaseQuantity = (productID) => {
    if (quantities[productID] > 1) {
      setQuantities(prev => ({
        ...prev,
        [productID]: prev[productID] - 1
      }));
    }
  };
  
  // Remove item from cart
  const removeFromCart = (productID) => {
    const updatedCart = cartItems.filter(item => item.productID !== productID);
    setCartItems(updatedCart);
    
    // Also update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Remove quantity entry
    const newQuantities = { ...quantities };
    delete newQuantities[productID];
    setQuantities(newQuantities);
  };
  
  // Handle checkout and save details to localStorage
  const handleCheckout = () => {
    // Create checkout details object with all necessary information
    const checkoutDetails = {
      items: cartItems.map(item => ({
        ...item,
        quantity: quantities[item.productID] || 1,
        itemTotal: item.price * (quantities[item.productID] || 1)
      })),
      subTotal: subTotal,
      tax: tax,
      total: total,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('checkoutDetails', JSON.stringify(checkoutDetails));
    
    // You can add navigation to checkout page here if needed
    // history.push('/checkout'); // Uncomment if using react-router
    navigate('/checkoutpage'); // Assuming you have a Navigate function or useHistory hook
  };
  
  return (
    <div>
      <div><NavbarComponent/></div>
      <div> 
        <div className="cartHeadline">Shopping Cart</div>
        
        <div className="pageLayout">
          <div className="cartItemsContainer">
            {cartItems.length === 0 ? (
              <div className="emptyCart">
                <p>Your cart is empty</p>
              </div>
            ) : (
              cartItems.map(item => (
                <div className="productCard" key={item.productID}>
                  <div className="imageWrapper">
                    <img src={item.imageURL || "/api/placeholder/220/220"} alt={item.partName} />
                  </div>
                  <div className="productDetails">
                    <div className="itemCode">({item.productID})</div>
                    <div className="productName">{item.partName}</div>
                    <div className="priceTag">Rs. {item.price.toLocaleString()}</div>
                    
                    <div className="quantityControl">
                      <button className="qtyBtn" onClick={() => decreaseQuantity(item.productID)}>−</button>
                      <input 
                        type="text" 
                        className="qtyInput" 
                        value={quantities[item.productID] || 1}
                        onChange={(e) => handleQuantityChange(item.productID, e.target.value)}
                      />
                      <button className="qtyBtn" onClick={() => increaseQuantity(item.productID)}>+</button>
                    </div>
                    
                    <div className="shippingLabel">FREE SHIPPING</div>
                    
                    <div className="stockInfo">
                      <span className="stockDot"></span>
                      <span>In stock</span>
                    </div>
                    
                    <button 
                      className="removeBtn" 
                      onClick={() => removeFromCart(item.productID)}
                    >
                      Remove
                    </button>
                  </div>
                  
                  {item.colorOptions && item.colorOptions.length > 0 && (
                    <div className="colorOptions">
                      {item.colorOptions.map((color, index) => (
                        <div key={index} className={`colorOption ${color}Option`}></div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          <div className="summaryPanel">
            <div className="orderSummaryCard">
              <div className="summaryTitle">Order Summary</div>
              
              <div className="summaryRow">
                <div className="summaryLabel">Sub Total:</div>
                <div className="summaryValue">Rs. {subTotal.toLocaleString()}</div>
              </div>
              
              <div className="summaryDivider"></div>
              
              <div className="summaryRow">
                <div className="summaryLabel">Shipping estimate:</div>
                <div className="summaryValue">Free</div>
              </div>
              
              <div className="summaryDivider"></div>
              
              <div className="summaryRow">
                <div className="summaryLabel">Tax estimate:</div>
                <div className="summaryValue">Rs. {tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              
              <div className="summaryDivider"></div>
              
              <div className="totalRow">
                <div className="totalLabel">ORDER TOTAL:</div>
                <div className="totalValue">Rs. {total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
              </div>
              
              <button 
                className="checkoutBtn"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}