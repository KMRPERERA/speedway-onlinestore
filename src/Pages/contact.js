import React from 'react'
import NavbarComponent from '../Components/navbar'
import FooterComponent from '../Components/footer' // Adjust the import path as necessary
import './contact.css'; // Assuming you have a CSS file for styling


export default function Contact() {
  return (
    <div><div><NavbarComponent /></div><section className="contact-section">
    <div className="container">
      <h1>Contact Us</h1>
      <p className="contact-subtitle">Any question or remarks? Just write us a message!</p>
      
      <div className="contact-container">
        <div className="contactdetails">
          <h2>Contact Information</h2>
          <p>Say something to start a live chat!</p>
          
          <div className="info-item">
            <div className="icon"><i className="fas fa-phone-alt"></i></div>
            <span>+1012 3456 789</span>
          </div>
          
          <div className="info-item">
            <div className="icon"><i className="fas fa-envelope"></i></div>
            <span>malki@gmail.com</span>
          </div>
          
          <div className="info-item">
            <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
            <span>No 36/A Kaludawala,Colombo</span>
          </div>
          
          <div className="social-dots">
            <a href="#" className="dot"></a>
            <a href="#" className="dot active"></a>
            <a href="#" className="dot"></a>
          </div>
          
          <div className="social-instagram">
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
          
          <div className="circle-decoration"></div>
        </div>
        
        <div className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" placeholder="" />
            </div>
            
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" placeholder="Doe" />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="" />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="+1 012 3456 789" />
            </div>
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Write your message.."></textarea>
          </div>
          
          <div className="form-submit">
            <button type="submit" className="btn-submit">Send Message</button>
          </div>
        </div>
      </div>
    </div>
  </section><div></div><div><FooterComponent /></div></div>
  )
}
