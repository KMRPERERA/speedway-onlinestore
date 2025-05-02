import React from 'react'
import { Link } from 'react-router-dom'
import './submitad.css'; // Adjust the path to your CSS file
import SupplierNavbarComponent from '../Components/supplier-navbar';

export default function Submitad() {
  return (
    <div><div><SupplierNavbarComponent/></div><div><div class="advert-creation-wrapper">
    <h1 class="primary-headline">Submit Your Advertisement</h1>
    <p class="instruction-subtext">Fill in the details below to list your vehicle spare parts</p>
    
    <h2 class="data-section-headline">Product Information</h2>
    
    <div class="field-cluster">
        <label class="input-element-label">
            Product Category
            <span class="mandatory-field-marker">*</span>
        </label>
        <select class="dropdown-select-box">
            <option selected disabled>Select Category</option>
            <option>Engine Parts</option>
            <option>Transmission</option>
            <option>Suspension</option>
            <option>Brake System</option>
            <option>Body Parts</option>
        </select>
    </div>
    
    <div class="field-cluster">
        <label class="input-element-label">
            Product SubCategory
            <span class="mandatory-field-marker">*</span>
        </label>
        <select class="dropdown-select-box">
            <option selected disabled>Select SubCategory</option>
            <option>Pistons</option>
            <option>Filters</option>
            <option>Belts</option>
            <option>Fuel System</option>
            <option>Exhaust</option>
        </select>
    </div>
    
    <div class="field-cluster">
        <label class="input-element-label">
            Brand
        </label>
        <select class="dropdown-select-box">
            <option selected disabled>Select Brand</option>
            <option>Toyota</option>
            <option>Honda</option>
            <option>Nissan</option>
            <option>Ford</option>
            <option>BMW</option>
        </select>
    </div>
    
    <div class="field-cluster">
        <label class="input-element-label">
            Part Name
            <span class="mandatory-field-marker">*</span>
        </label>
        <input type="text" class="text-entry-field" placeholder=""/>
    </div>
    
    <div class="field-cluster">
        <label class="input-element-label">
            Part Description
        </label>
        <textarea class="multiline-text-area" placeholder=""></textarea>
    </div>
    
    <div class="field-cluster">
        <label class="input-element-label">
            Price
            <span class="mandatory-field-marker">*</span>
        </label>
        <input type="text" class="text-entry-field" placeholder=""/>
    </div>
    
    <div class="field-cluster">
        <label class="input-element-label">
            Product Images
        </label>
        <div class="image-upload-boundary">
            <svg class="upload-icon-graphic" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
            </svg>
            <p class="upload-prompt-text">Upload an image</p>
            <p class="file-format-instruction">PNG, JPG up to 5MB</p>
        </div>
    </div>
    
    <button class="advert-publish-button">Submit Advertisment</button>
</div></div></div>
  )
}
