
import React, { useState, useEffect } from 'react';
import './businesscredentials.css';
import { Link, useNavigate } from 'react-router-dom';
import NavbarComponent from "../Components/navbar.js";

const BusinessCredentials = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [filePreviews, setFilePreviews] = useState({
    businessLicense: null,
    taxRegistration: null,
    tradeCertificates: null,
    dealershipCertificates: null
  });

  const [businessCredentials, setBusinessCredentials] = useState({
    businessLicense: null,
    taxRegistration: null,
    tradeCertificates: null,
    dealershipCertificates: null,
    businessLicenseUrl: '',
    taxRegistrationUrl: '',
    tradeCertificatesUrl: '',
    dealershipCertificatesUrl: ''
  });

  // Check if there's previously saved data in localStorage
  useEffect(() => {
    console.log("BusinessCredentials component mounted");
    const savedCredentials = localStorage.getItem('businessCredentials');
    if (savedCredentials) {
      try {
        const parsedCredentials = JSON.parse(savedCredentials);
        console.log("Loaded saved credentials:", parsedCredentials);
        
        // Set any previously saved URLs (but not as previews)
        setBusinessCredentials(prev => ({
          ...prev,
          ...parsedCredentials
        }));
        
        // We no longer set previews from localStorage data
        // This is what was causing the previews to persist
      } catch (error) {
        console.error("Error parsing saved credentials:", error);
      }
    }

    // Clear any existing previews when component mounts
    setFilePreviews({
      businessLicense: null,
      taxRegistration: null,
      tradeCertificates: null,
      dealershipCertificates: null
    });
    
    // Clear session storage when component mounts
    sessionStorage.removeItem('tempFilePreviews');
    
  }, []);

  const handleFileUpload = (name, file) => {
    if (file) {
      setBusinessCredentials({
        ...businessCredentials,
        [name]: file
      });
      
      // Create a preview for the file
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreviews(prev => ({
          ...prev,
          [name]: reader.result
        }));
        
        // Also save current file previews to session storage
        // This helps for temporary persistence within a single session
        const updatedPreviews = { ...filePreviews, [name]: reader.result };
        sessionStorage.setItem('tempFilePreviews', JSON.stringify(updatedPreviews));
      };
      
      // If it's a PDF, we'll just show a PDF icon
      if (file.type === 'application/pdf') {
        setFilePreviews(prev => ({
          ...prev,
          [name]: 'pdf'
        }));
        
        // Update session storage for PDFs as well
        const updatedPreviews = { ...filePreviews, [name]: 'pdf' };
        sessionStorage.setItem('tempFilePreviews', JSON.stringify(updatedPreviews));
      } else {
        // For images, create a preview
        reader.readAsDataURL(file);
      }
    }
  };

  const uploadFileToCloudinary = async (file) => {
    if (!file) {
      return null;
    }

    const uploadPreset = "online store"; // Your upload preset
    const cloudName = "drbjj8npd"; // Your cloud name
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      console.log(`Uploading file ${file.name} to Cloudinary...`);
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Upload failed for ${file.name}`);
      }

      const data = await response.json();
      console.log(`File uploaded successfully, URL: ${data.secure_url}`);
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!businessCredentials.businessLicense && !businessCredentials.businessLicenseUrl) {
      alert('Please upload your Business License');
      return;
    }
    
    if (!businessCredentials.taxRegistration && !businessCredentials.taxRegistrationUrl) {
      alert('Please upload your Tax Registration documents');
      return;
    }

    setIsLoading(true);

    try {
      console.log("Starting file uploads...");
      // Upload each file to Cloudinary
      const uploads = [];
      const fileTypes = ['businessLicense', 'taxRegistration', 'tradeCertificates', 'dealershipCertificates'];
      const updatedCredentials = { ...businessCredentials };
      
      for (const type of fileTypes) {
        if (businessCredentials[type]) {
          console.log(`Processing ${type} file...`);
          const uploadPromise = uploadFileToCloudinary(businessCredentials[type])
            .then(url => {
              if (url) {
                // Update our local state with the URL
                updatedCredentials[`${type}Url`] = url;
                console.log(`URL for ${type} updated to: ${url}`);
                return { type, url };
              }
              return null;
            });
          
          uploads.push(uploadPromise);
        }
      }

      // Wait for all uploads to complete
      const results = await Promise.all(uploads);
      console.log("All uploads completed:", results);
      
      // Update state with all the final URLs
      setBusinessCredentials(updatedCredentials);
      
      // Create a clean object for localStorage without the file objects
      const storageObj = {
        businessLicenseUrl: updatedCredentials.businessLicenseUrl || '',
        taxRegistrationUrl: updatedCredentials.taxRegistrationUrl || '',
        tradeCertificatesUrl: updatedCredentials.tradeCertificatesUrl || '',
        dealershipCertificatesUrl: updatedCredentials.dealershipCertificatesUrl || ''
      };
      
      console.log("Saving to localStorage:", storageObj);
      
      // Save to localStorage as a properly stringified JSON object
      localStorage.setItem('businessCredentials', JSON.stringify(storageObj));
      
      // Double-check that localStorage was updated correctly
      const savedItem = localStorage.getItem('businessCredentials');
      console.log("Verification - Saved item:", savedItem);
      
      // Clear any session storage for previews before navigating
      sessionStorage.removeItem('tempFilePreviews');
      
      // Navigate to the next page
      navigate('/locationdetails');
    } catch (error) {
      console.error('Error in upload process:', error);
      alert('There was an error uploading your files. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render file upload area with preview if available
  const renderFileUploadArea = (fileType) => {
    const preview = filePreviews[fileType];
    
    return (
      <div className="file-upload-area">
        {preview ? (
          <div className="file-preview">
            {/* If it's a PDF or PDF URL, show PDF icon */}
            {preview === 'pdf' ? (
              <div className="pdf-preview">
                <span className="pdf-icon">PDF</span>
                <span className="preview-filename">{businessCredentials[fileType]?.name || "Document Uploaded"}</span>
              </div>
            ) : (
              /* For images, show the actual preview */
              <img 
                src={preview} 
                alt="File Preview" 
                className="file-preview-image"
              />
            )}
            <div className="preview-overlay">
              <span>Click to change</span>
            </div>
          </div>
        ) : (
          <>
            <div className="file-upload-icon">
              <img src="/images/placeholder-image.jpg" alt="Upload" />
            </div>
            <div className="file-upload-text">
              <p className="upload-text">Upload a file or drag and drop</p>
              <p className="file-types">PDF, PNG, JPG up to 10MB</p>
            </div>
          </>
        )}
        <input 
          type="file" 
          id={fileType} 
          className="file-input-hidden"
          onChange={(e) => handleFileUpload(fileType, e.target.files[0])}
          accept=".pdf,.png,.jpg,.jpeg"
        />
      </div>
    );
  };

  return (
    <div className="speedway-container">
      <NavbarComponent />

      {/* Main Content */}
      <div className="business-credentials-container">
        {/* Left Side - Car Image */}
        <div className="car-image-container">
          <div className="car-image-wrapper">
            {/* <img src="/car-image-placeholder.png" alt="Mitsubishi" className="car-image" /> */}
          </div>
        </div>

        {/* Right Side - Business Credentials Form */}
        <div className="business-info-form">
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
            <div className="indicator active">
              <div className="indicator-circle">●</div>
              <div className="indicator-label">Business Credentials</div>
            </div>
            <div className="indicator">
              <div className="indicator-circle"></div>
              <div className="indicator-label">Location Details</div>
            </div>
          </div>

          {/* Form Heading */}
          <div className="form-heading">
            <h2>Business Credentials</h2>
            <p>Please upload the required business documents</p>
          </div>

          {/* Current values indicator (helpful for debugging) */}
          <div style={{ display: 'none' }}>
            <p>Current URLs in state:</p>
            <ul>
              <li>Business License: {businessCredentials.businessLicenseUrl}</li>
              <li>Tax Registration: {businessCredentials.taxRegistrationUrl}</li>
              <li>Trade Certificates: {businessCredentials.tradeCertificatesUrl}</li>
              <li>Dealership Certificates: {businessCredentials.dealershipCertificatesUrl}</li>
            </ul>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="form-fields">
            <div className="form-group">
              <label htmlFor="businessLicense">Business License *</label>
              {renderFileUploadArea('businessLicense')}
            </div>

            <div className="form-group">
              <label htmlFor="taxRegistration">Tax Registration Documents *</label>
              {renderFileUploadArea('taxRegistration')}
            </div>

            <div className="form-group">
              <label htmlFor="tradeCertificates">Trade Certificates</label>
              {renderFileUploadArea('tradeCertificates')}
            </div>

            <div className="form-group">
              <label htmlFor="dealershipCertificates">Brand Dealership Certificates</label>
              {renderFileUploadArea('dealershipCertificates')}
            </div>

            {/* Navigation Buttons */}
            <div className="form-nav-buttons">
              <Link to="/businessinfo" className="previous-btn">PREVIOUS</Link>
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

export default BusinessCredentials;