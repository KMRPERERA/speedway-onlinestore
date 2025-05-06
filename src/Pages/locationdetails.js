

import React, { useState, useEffect } from 'react';
import './locationdetails.css';
import NavbarComponent from "../Components/navbar.js";
import { Link, useNavigate } from 'react-router-dom';

const LocationDetails = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previousData, setPreviousData] = useState({});
  
  // Debug state to check credentials
  const [credentialUrls, setCredentialUrls] = useState({});
  
  const [locationDetails, setLocationDetails] = useState({
    streetAddress: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    hasWarehouse: false,
    serviceAreas: '',
    branches: [
      { id: 1, name: '', address: '' }
    ]
  });

  // Load data from localStorage when component mounts
  useEffect(() => {
    // Load all data from localStorage for debugging
    const getAllLocalStorage = () => {
      const items = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
          const value = JSON.parse(localStorage.getItem(key));
          items[key] = value;
        } catch (e) {
          items[key] = localStorage.getItem(key);
        }
      }
      return items;
    };
    
    const allStorageData = getAllLocalStorage();
    console.log('All localStorage data:', allStorageData);

    const contactInfo = JSON.parse(localStorage.getItem('contactInfoData') || '{}');
    const businessInfo = JSON.parse(localStorage.getItem('businessInfo') || '{}');
    const businessCredentials = JSON.parse(localStorage.getItem('businessCredentials') || '{}');
    
    // Special logging for credential URLs
    const urls = {
      businessLicenseUrl: businessCredentials.businessLicenseUrl || 'not found',
      taxRegistrationUrl: businessCredentials.taxRegistrationUrl || 'not found',
      tradeCertificatesUrl: businessCredentials.tradeCertificatesUrl || 'not found',
      dealershipCertificatesUrl: businessCredentials.dealershipCertificatesUrl || 'not found',
    };
    
    console.log('Credential URLs from localStorage:', urls);
    setCredentialUrls(urls);
    
    setPreviousData({
      contactInfo,
      businessInfo,
      businessCredentials
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationDetails({
      ...locationDetails,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    setLocationDetails({
      ...locationDetails,
      hasWarehouse: e.target.checked
    });
  };

  const handleBranchChange = (id, field, value) => {
    const updatedBranches = locationDetails.branches.map(branch => {
      if (branch.id === id) {
        return { ...branch, [field]: value };
      }
      return branch;
    });
    
    setLocationDetails({
      ...locationDetails,
      branches: updatedBranches
    });
  };

  const addBranch = () => {
    const newBranch = {
      id: locationDetails.branches.length + 1,
      name: '',
      address: ''
    };
    
    setLocationDetails({
      ...locationDetails,
      branches: [...locationDetails.branches, newBranch]
    });
  };

  const removeBranch = (id) => {
    const updatedBranches = locationDetails.branches.filter(branch => branch.id !== id);
    
    setLocationDetails({
      ...locationDetails,
      branches: updatedBranches
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!locationDetails.streetAddress || !locationDetails.city || 
        !locationDetails.stateProvince || !locationDetails.postalCode || 
        !locationDetails.serviceAreas) {
      alert('Please fill in all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Get the primary branch if available
      const primaryBranch = locationDetails.branches[0] || { name: '', address: '' };
      
      // Format business hours as a string if it's an object
      let businessHoursString = '';
      if (previousData.contactInfo?.businessHours) {
        if (typeof previousData.contactInfo.businessHours === 'object') {
          businessHoursString = JSON.stringify(previousData.contactInfo.businessHours);
        } else {
          businessHoursString = previousData.contactInfo.businessHours;
        }
      }
      
      // Ensure we have the most up-to-date credential URLs
      // Try multiple ways of accessing the data to handle potential storage inconsistencies
      
      // Method 1: Direct from localStorage (most reliable)
      let businessCredentialData;
      try {
        businessCredentialData = JSON.parse(localStorage.getItem('businessCredentials') || '{}');
        console.log("Method 1 - Direct localStorage access:", businessCredentialData);
      } catch (err) {
        console.error("Error parsing businessCredentials from localStorage:", err);
        businessCredentialData = {};
      }
      
      // Method 2: From React state
      const stateCredentials = previousData.businessCredentials || {};
      console.log("Method 2 - From React state:", stateCredentials);
      
      // Choose the most reliable source (prioritize localStorage)
      const finalCredentials = {
        businessLicenseUrl: businessCredentialData.businessLicenseUrl || stateCredentials.businessLicenseUrl || '',
        taxRegistrationUrl: businessCredentialData.taxRegistrationUrl || stateCredentials.taxRegistrationUrl || '',
        tradeCertificatesUrl: businessCredentialData.tradeCertificatesUrl || stateCredentials.tradeCertificatesUrl || '',
        dealershipCertificatesUrl: businessCredentialData.dealershipCertificatesUrl || stateCredentials.dealershipCertificatesUrl || ''
      };
      
      console.log("Final credential URLs to be used:", finalCredentials);
      
      // Prepare the data for API submission according to your API structure
      const submissionData = {
        // Add the required model field
        model: "supplier",
        
        // Contact Info from localStorage
        p_supplier_name: previousData.contactInfo?.primaryContact || '',
        p_supplier_password: previousData.contactInfo?.businessPassword || '',
        p_primary_contact_person: previousData.contactInfo?.primaryContact || '',
        p_business_email: previousData.contactInfo?.businessEmail || '',
        p_business_phone: previousData.contactInfo?.businessPhone || '',
        p_alternative_phone: previousData.contactInfo?.alternativePhone || '',
        p_business_hours: businessHoursString,
        
        // Business Info from localStorage
        p_business_name: previousData.businessInfo?.businessName || '',
        p_business_registration_number: previousData.businessInfo?.registrationNumber || '',
        p_type_of_business: previousData.businessInfo?.businessType || '',
        p_years_in_business: parseInt(previousData.businessInfo?.yearsInBusiness) || 0,
        p_business_description: previousData.businessInfo?.description || '',
        p_business_logo: previousData.businessInfo?.logoUrl || '',
        
        // Business Credentials - using the merged final values
        p_business_license: finalCredentials.businessLicenseUrl,
        p_tax_registration_documents: finalCredentials.taxRegistrationUrl,
        p_trade_certificates: finalCredentials.tradeCertificatesUrl,
        p_brand_dealership_certificates: finalCredentials.dealershipCertificatesUrl,
        
        // Current form data - Location Details
        p_street_address: locationDetails.streetAddress,
        p_city: locationDetails.city,
        p_state: locationDetails.stateProvince,
        p_postal_code: locationDetails.postalCode,
        p_service_area_coverage: locationDetails.serviceAreas,
        p_branch_name: primaryBranch.name,
        p_branch_address: primaryBranch.address
      };
      
      console.log('Final submission data:', submissionData);
      
      // Save location details to localStorage as well
      localStorage.setItem('locationDetails', JSON.stringify(locationDetails));
      
      // Make the API request
      const response = await fetch(`https://onlinestorebackend20250502182239.azurewebsites.net/api/UserAuthentication/suppliers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(submissionData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        throw new Error(`Failed to submit registration: ${JSON.stringify(errorData)}`);
      }
      
      const result = await response.json();
      console.log('Registration successful:', result);
      
      // Show success message and redirect
      alert('Registration completed successfully!');
      navigate('/login'); // Change to your success page route
      
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="speedway-container">
      <NavbarComponent/>

      {/* Main Content */}
      <div className="location-details-main">
        {/* Left Side - Car Image */}
        <div className="car-image-container">
          <div className="car-image-wrapper">
            {/* <img src="/car-image-placeholder.png" alt="Mitsubishi" className="car-image" /> */}
          </div>
        </div>

        {/* Right Side - Location Details Form */}
        <div className="business-info-form">
          {/* Debug section to verify URLs (remove in production) */}
          {Object.keys(credentialUrls).length > 0 && (
            <div style={{ display: 'none' }}>
              <p>Debug - Credential URLs:</p>
              <ul>
                {Object.entries(credentialUrls).map(([key, url]) => (
                  <li key={key}>{key}: {url.substring(0, 30)}...</li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress Indicators */}
          <div className="progress-indicators">
            <div className="indicator completed">
              <div className="indicator-circle">✓</div>
              <div className="indicator-label">Contact Information</div>
            </div>
            <div className="indicator completed">
              <div className="indicator-circle">✓</div>
              <div className="indicator-label">Business Information</div>
            </div>
            <div className="indicator completed">
              <div className="indicator-circle">✓</div>
              <div className="indicator-label">Business Credentials</div>
            </div>
            <div className="indicator active">
              <div className="indicator-circle">●</div>
              <div className="indicator-label">Location Details</div>
            </div>
          </div>

          {/* Form Heading */}
          <div className="form-heading">
            <h2>Location Details</h2>
            <p>Please provide your business location details</p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="form-fields">
            <div className="form-group">
              <label htmlFor="physicalAddress">Physical Store Address *</label>
              <div className="address-fields">
                <div className="address-field">
                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    placeholder="Street Address"
                    value={locationDetails.streetAddress}
                    onChange={handleInputChange}
                    className="address-input"
                    required
                  />
                </div>
                <div className="address-field">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={locationDetails.city}
                    onChange={handleInputChange}
                    className="address-input"
                    required
                  />
                </div>
                <div className="address-field">
                  <input
                    type="text"
                    id="stateProvince"
                    name="stateProvince"
                    placeholder="State/Province"
                    value={locationDetails.stateProvince}
                    onChange={handleInputChange}
                    className="address-input"
                    required
                  />
                </div>
                <div className="address-field">
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={locationDetails.postalCode}
                    onChange={handleInputChange}
                    className="address-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="hasWarehouse"
                name="hasWarehouse"
                checked={locationDetails.hasWarehouse}
                onChange={handleCheckboxChange}
                className="checkbox-input"
              />
              <label htmlFor="hasWarehouse" className="checkbox-label">I have a separate warehouse location</label>
            </div>

            <div className="form-group">
              <label htmlFor="serviceAreas">Service Area Coverage *</label>
              <textarea
                id="serviceAreas"
                name="serviceAreas"
                placeholder="List the areas where you provide services..."
                value={locationDetails.serviceAreas}
                onChange={handleInputChange}
                className="service-areas-input"
                required
              ></textarea>
            </div>

            <div className="form-group branch-section">
              <div className="branch-header">
                <h3>Branch Locations</h3>
                <button type="button" className="add-branch-btn" onClick={addBranch}>Add Branch</button>
              </div>

              {locationDetails.branches.map(branch => (
                <div key={branch.id} className="branch-item">
                  <div className="branch-title">
                    <h4>Branch Location {branch.id}</h4>
                    {locationDetails.branches.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-branch-btn"
                        onClick={() => removeBranch(branch.id)}
                      >×</button>
                    )}
                  </div>
                  <div className="branch-fields">
                    <div className="branch-field">
                      <input
                        type="text"
                        placeholder="Branch Name"
                        value={branch.name}
                        onChange={(e) => handleBranchChange(branch.id, 'name', e.target.value)}
                        className="branch-input"
                      />
                    </div>
                    <div className="branch-field">
                      <input
                        type="text"
                        placeholder="Address"
                        value={branch.address}
                        onChange={(e) => handleBranchChange(branch.id, 'address', e.target.value)}
                        className="branch-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="form-nav-buttons">
              <Link to="/businesscredentials" className="previous-btn">PREVIOUS</Link>
              <button 
                type="submit" 
                className="register-btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SUBMITTING...' : 'REGISTER'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;