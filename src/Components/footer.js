import React from 'react'
import './footer.css'; // Assuming you have a CSS file for styling

export default function Footer() {
  return (
    <div>
    <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/images/image-removebg.png" alt="Speed Way Logo" className="logo" />
          </div>
          <div className="newsletter">
            <p>Subscribe to our newsletter</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email" className="newsletter-input" />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
        
        <div className="footer-links">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        
        <div className="footer-bottom">
          <p>© 2023 Speed Way | Privacy | Terms | Sitemap</p>
          <div className="social-icons">
            <a href="#" className="social-icon">𝕏</a>
            <a href="#" className="social-icon">f</a>
            <a href="#" className="social-icon">in</a>
            <a href="#" className="social-icon">▶</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
