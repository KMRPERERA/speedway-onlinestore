
import React, { useState } from 'react';
import './businessinfo.css';
import { Link, useNavigate } from 'react-router-dom';
import NavbarComponent from "../Components/navbar.js";

const BusinessInfoPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('/images/placeholder-image.jpg');
  
  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    registrationNumber: '',
    businessType: '',
    yearsInBusiness: '',
    logo: null,
    logoUrl: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessInfo({
      ...businessInfo,
      [name]: value
    });
  };

  const handleLogoUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setBusinessInfo({
        ...businessInfo,
        logo: file
      });
      
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!businessInfo.logo) {
      return null;
    }

    const uploadPreset = "online store"; // Your upload preset
    const cloudName = "drbjj8npd"; // Your cloud name
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', businessInfo.logo);
    formData.append('upload_preset', uploadPreset);

    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Image upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!businessInfo.businessName || !businessInfo.registrationNumber || 
        !businessInfo.businessType || !businessInfo.yearsInBusiness || 
        !businessInfo.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadImageToCloudinary();
    
    if (imageUrl) {
      // Create the final business data with the image URL
      const finalBusinessData = {
        ...businessInfo,
        logoUrl: imageUrl,
        logo: null // We don't want to store the file object
      };

      // Save to localStorage
      localStorage.setItem('businessInfo', JSON.stringify(finalBusinessData));
      
      // You can also prepare this data for a POST request to your backend
      console.log('Data ready for POST request:', finalBusinessData);
      
      // Navigate to the next page
      navigate('/businesscredentials');
    }
  };

  return (
    <div className="speedway-container">
      <NavbarComponent />

      {/* Main Content */}
      <div className="business-info-main-content">
        {/* Left Side - Car Image */}
        <div className="car-image-container">
          <div className="car-image-wrapper">
            {/* <img src="/car-image-placeholder.png" alt="Mitsubishi" className="car-image" /> */}
          </div>
        </div>

        {/* Right Side - Business Information Form */}
        <div className="business-info-form">
          {/* Progress Indicators */}
          <div className="progress-indicators">
            <div className="indicator completed">
              <div className="indicator-circle">✓</div>
              <div className="indicator-label">Contact Information</div>
            </div>
            <div className="indicator active">
              <div className="indicator-circle">●</div>
              <div className="indicator-label">Business Information</div>
            </div>
            <div className="indicator">
              <div className="indicator-circle"></div>
              <div className="indicator-label">Business Credentials</div>
            </div>
            <div className="indicator">
              <div className="indicator-circle"></div>
              <div className="indicator-label">Location Details</div>
            </div>
          </div>

          {/* Form Heading */}
          <div className="form-heading">
            <h2>Business Information</h2>
            <p>Please provide your business details</p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="form-fields">
            <div className="form-group">
              <label htmlFor="businessName">Business Name *</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={businessInfo.businessName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="registrationNumber">Business Registration Number *</label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={businessInfo.registrationNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="businessType">Type of Business *</label>
              <select
                id="businessType"
                name="businessType"
                value={businessInfo.businessType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select business type</option>
                <option value="retail">Retail</option>
                <option value="service">Service</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="yearsInBusiness">Years in Business *</label>
              <input
                type="text"
                id="yearsInBusiness"
                name="yearsInBusiness"
                value={businessInfo.yearsInBusiness}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo">Business Logo *</label>
              <div className="logo-upload">
                <div className="logo-preview">
                  <img src={imagePreview} alt="Logo Preview" style={{ maxWidth: '100%', maxHeight: '100px' }} />
                </div>
                <div className="upload-button">
                  <label htmlFor="logoFile" className="upload-label">Upload Logo</label>
                  <input
                    type="file"
                    id="logoFile"
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="file-input"
                  />
                  <p className="file-info">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Business Description *</label>
              <textarea
                id="description"
                name="description"
                value={businessInfo.description}
                onChange={handleInputChange}
                placeholder="Describe your business..."
                required
              ></textarea>
            </div>

            {/* Navigation Buttons */}
            <div className="form-nav-buttons">
              <Link to="/contactinfo" className="previous-btn">PREVIOUS</Link>
              <button 
                type="submit" 
                className="next-btn" 
                disabled={isLoading}
              >
                {isLoading ? 'UPLOADING...' : 'NEXT'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfoPage;