import React from 'react'
import { Link } from 'react-router-dom'
import './customerprofile.css'; // Adjust the path to your CSS file
import NavbarComponent from '../Components/navbar';

export default function Customerprofile() {
  return (
    <div><div><NavbarComponent/></div><div class="profileWrapper">
    <div class="identityHeader">
      <div class="userIconBox">
        {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
        </svg> */}
      </div>
      <div class="personalDetGroup">
        <h2 class="sectionTitle">Personal Information</h2>
        <p class="subtitleCap">Manage your personal details</p>
      </div>
    </div>
    
    <div class="infoFieldName">Full Name</div>
    <input type="text" class="dataEntryBox" value="John Doe" readonly/>
    
    <div class="infoFieldName">Email</div>
    <input type="email" class="dataEntryBox" value="john.doe@example.com" readonly/>
    
    <div class="infoFieldName">Phone Number</div>
    <input type="tel" class="dataEntryBox" value="+1 234 567 8900" readonly/>
    
    <div class="infoFieldName">Street Address</div>
    <input type="text" class="dataEntryBox" value="123 Main St" readonly/>
    
    <div class="locationFlex">
      <div class="locationCol">
        <div class="infoFieldName">City</div>
        <input type="text" class="dataEntryBox" value="New York" readonly/>
      </div>
      <div class="locationCol">
        <div class="infoFieldName">State</div>
        <input type="text" class="dataEntryBox" value="NY" readonly/>
      </div>
    </div>
    
    <div class="infoFieldName">ZIP Code</div>
    <input type="text" class="dataEntryBox" value="10001" readonly/>
    
    <div class="modifyBtnContainer">
      <button class="editDetailsBtn">
        <span class="editPencilIcon">
          {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
          </svg> */}
        </span>
        Edit Profile
      </button>
    </div>
  </div><div></div></div>
  )
}
