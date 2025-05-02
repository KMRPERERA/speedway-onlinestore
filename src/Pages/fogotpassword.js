import React from 'react'
import { Link } from 'react-router-dom'
import './fogotpassword.css'; // Adjust the path to your CSS file
import NavbarComponent from '../Components/navbar';

export default function Fogotpassword() {
  return (
    <div><div><NavbarComponent/></div> <div class="recovery-page-wrapper">
    <h1 class="recovery-main-heading">Forgot your password?</h1>
    
    <p class="recovery-instruction-text">
        Enter your email address and if you have an account with us,
        a password reset instruction would be sent to your email
    </p>
    
    <div class="email-input-container">
        <input type="email" class="recovery-email-field" placeholder="Enter email address"/>
    </div>
    
    <div class="submit-button-container">
        <button class="password-reset-trigger">Reset Password</button>
    </div>
</div><div></div></div>
  )
}
