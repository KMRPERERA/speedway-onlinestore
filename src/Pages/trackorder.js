import React from 'react'
import { Link } from 'react-router-dom'
import './trackorder.css'; // Adjust the path to your CSS file
import NavbarComponent from '../Components/navbar';


export default function Trackorder() {
  return (
    <div><div><NavbarComponent/></div><div>   <div class="trackerContainer">
    <h1 class="mainHeading">TRACK YOUR ORDER</h1>
    
    <div class="instructionBlock">
        <p class="primaryInstruction">TO TRACK YOUR ORDER PLEASE ENTER YOUR ORDER NUMBER AND PHONE NUMBER IN THE BOXES BELOW AND THE "TRACK ORDER" BUTTON.</p>
        <p class="secondaryNote">ORDER NUMBER IS IN THE CONFIRMATION EMAIL THAT YOU HAVE RECEIVED.</p>
    </div>
    
    <div class="formFieldset">
        <label class="formLabel">Order Number</label>
        <input type="text" class="inputElement" placeholder="XXXXXXXXXX"/>
    </div>
    
    <div class="formFieldset">
        <label class="formLabel">Mobile</label>
        <input type="text" class="inputElement" placeholder="XXXXXXXXXX"/>
        
        <p class="helperText">
            Enter phone number without country code and hyphens.<br/>
            (eg:If the number without is (+94)71-712-3456 <span class="exampleFormat">format should be 0717123456</span>
        </p>
    </div>
    
    <div class="submitArea">
        {/* <button class="trackButton">Track order</button> */}
        <Link to="/trakingpage" className="trackButton">Track order</Link>
    </div>
</div> </div></div>
  )
}
