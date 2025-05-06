
import React, { useState, useEffect } from 'react';
import './submitad.css'; 
import SupplierNavbarComponent from '../Components/supplier-navbar';
import config from '../environment/config'; 


export default function SubmitAd() {

  const categoryOptions = {
    "Spare Parts & Components": ["Engine Parts", "Transmission & Drivetrain", "Braking System", "Suspension & Steering", "Electrical & Electronics", "Exhaust System","Cooling System"],
    "Emergency & Safety Equipment": ["First Aid Kits", "Fire Extinguishers", "Warning Triangles", "Airbags & Seatbelts", "Tow Ropes & Recovery Tools"],
    "Car Accessories": ["Interior Accessories", "Exterior Accessories", "Lighting", "Audio & Infotainment"],
    "Tires & Wheels": ["Car Tires", "Alloy & Steel Wheels", "Wheel Accessories", "Tire Repair Kits"],
    "Fluids & Maintenance Products": ["Engine Oil & Lubricants", "Coolants & Antifreeze", "Transmission Fluids", "Car Wash & Detailing Products"],
    "Performance Parts & Tuning": ["Turbochargers & Superchargers", "Cold Air Intakes", "Performance Exhaust Systems", "ECU Tuning & Chips"]
  };
  
  // Brands list from the image
  const brands = [
    "Toyota", "Honda", "Nissan", "Mazda", "Mitsubishi", 
    "Suzuki", "BMW", "Mercedes Benz", "Audi", "Any Other"
  ];

  // State for form fields
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [partName, setPartName] = useState("");
  const [partDescription, setPartDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    // Get user data from localStorage on component mount
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Cloudinary configuration
  const uploadPreset = "online store"; // Your upload preset
  const cloudName = "drbjj8npd"; // Your cloud name
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  // API endpoint
  const apiEndpoint = `${config.apiUrl}/api/MoterpartApi/additems`;

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory(""); // Reset subcategory when category changes
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    if (!image) return null;
    
    setIsLoading(true);
    setError("");
    
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", uploadPreset);
      
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }
      
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Submit data to API
  const submitToApi = async (imageUrl) => {
    try {
      // Construct the query parameters
      const params = new URLSearchParams({
        ProductCategory: selectedCategory,
        ProductSubCategory: selectedSubcategory,
        Brand: selectedBrand,
        PartName: partName,
        PartDescription: partDescription,
        Price: price,
        ImageURL: imageUrl,
        StockQty: stockQty || "0", // Default to 0 if not provided
        SupplierEmail: currentUser?.email || "" // Use current user's email from localStorage
      });
      
      const url = `${apiEndpoint}?${params.toString()}`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit advertisement");
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("Failed to submit advertisement. Please try again.");
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Form validation logic
    if (!selectedCategory || !selectedSubcategory || !partName || !price) {
      alert("Please fill in all required fields!");
      return;
    }
    
    // Check if user is logged in
    if (!currentUser || !currentUser.email) {
      alert("You must be logged in to submit an advertisement.");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Step 1: Upload image to Cloudinary
      const uploadedImageUrl = await uploadImageToCloudinary();
      
      if (!uploadedImageUrl) {
        alert("Failed to upload image. Please try again.");
        return;
      }
      
      setImageUrl(uploadedImageUrl);
      
      // Step 2: Submit data to API
      const result = await submitToApi(uploadedImageUrl);
      
      alert("Advertisement submitted successfully!");
      
      // Clear form or redirect as needed
      // resetForm();
      
    } catch (error) {
      alert("Error submitting advertisement. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SupplierNavbarComponent />
      <div className="advert-creation-wrapper">
        <h1 className="primary-headline">Submit Your Advertisement</h1>
        <p className="instruction-subtext">Fill in the details below to list your vehicle spare parts</p>
        
        <h2 className="data-section-headline">Product Information</h2>
        
        <div className="field-cluster">
          <label className="input-element-label">
            Product Category
            <span className="mandatory-field-marker">*</span>
          </label>
          <select 
            className="dropdown-select-box"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>Select Category</option>
            {Object.keys(categoryOptions).map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="field-cluster">
          <label className="input-element-label">
            Product SubCategory
            <span className="mandatory-field-marker">*</span>
          </label>
          <select 
            className="dropdown-select-box"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            disabled={!selectedCategory}
          >
            <option value="" disabled>Select SubCategory</option>
            {selectedCategory && 
              categoryOptions[selectedCategory].map((subcategory) => (
                <option key={subcategory} value={subcategory}>{subcategory}</option>
              ))
            }
          </select>
        </div>
        
        <div className="field-cluster">
          <label className="input-element-label">
            Brand
          </label>
          <select 
            className="dropdown-select-box"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="" disabled>Select Brand</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        <div className="field-cluster">
          <label className="input-element-label">
            Part Name
            <span className="mandatory-field-marker">*</span>
          </label>
          <input 
            type="text" 
            className="text-entry-field" 
            value={partName}
            onChange={(e) => setPartName(e.target.value)}
          />
        </div>
        
        <div className="field-cluster">
          <label className="input-element-label">
            Part Description
          </label>
          <textarea 
            className="multiline-text-area"
            value={partDescription}
            onChange={(e) => setPartDescription(e.target.value)}
          ></textarea>
        </div>
        
        <div className="field-cluster">
          <label className="input-element-label">
            Price
            <span className="mandatory-field-marker">*</span>
          </label>
          <input 
            type="number" 
            className="text-entry-field" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
          />
        </div>
        
        <div className="field-cluster">
          <label className="input-element-label">
            Stock Quantity
          </label>
          <input 
            type="number" 
            className="text-entry-field" 
            value={stockQty}
            onChange={(e) => setStockQty(e.target.value)}
            min="0"
          />
        </div>
        
        <div className="field-cluster">
          <label className="input-element-label">
            Supplier Email
          </label>
          <input 
            type="email" 
            className="text-entry-field" 
            value={currentUser?.email || ""}
            disabled
            title="Email is automatically set from your account"
          />
        </div>
        
        <div className="field-cluster">
          <label className="input-element-label">
            Product Images
          </label>
          <div 
            className="image-upload-boundary"
            onClick={() => document.getElementById('file-upload').click()}
          >
            {image ? (
              <div className="image-preview">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Preview" 
                  style={{ maxHeight: '100px', maxWidth: '100%' }}
                />
                <p className="upload-prompt-text">{image.name}</p>
              </div>
            ) : (
              <>
                <svg className="upload-icon-graphic" viewBox="0 0 24 24">
                  <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                </svg>
                <p className="upload-prompt-text">Upload an image</p>
              </>
            )}
            <p className="file-format-instruction">PNG, JPG up to 5MB</p>
            <input 
              id="file-upload"
              type="file"
              style={{ display: 'none' }}
              accept="image/png, image/jpeg"
              onChange={handleFileUpload}
            />
          </div>
        </div>
        
        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
        
        <button 
          className="advert-publish-button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Submit Advertisement"}
        </button>
      </div>
    </div>
  );
}