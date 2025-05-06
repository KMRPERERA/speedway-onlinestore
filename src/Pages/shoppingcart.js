

import React, { useState, useEffect } from 'react';
import './shoppingcart.css'; // Adjust the path to your CSS file  
import NavbarComponent from "../Components/navbar.js"; // Adjust the import path as necessary
import { Link } from 'react-router-dom'; // Import Link for navigation


const Shoppingcart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Category state for expanding/collapsing
  const [expandedCategories, setExpandedCategories] = useState({
    'Spare Parts & Components': true,
    'Emergency & Safety Equipment': false,
    'Tires & Wheels': false,
    'Car Accessories': false,
    'Fluids & Maintenance Products': false,
    'Performance Parts & Tuning': false
  });

  // Category and subcategory mapping
  const categories = {
    'Spare Parts & Components': [
      'Engine Parts', 'Transmission & Drivetrain', 'Brakes & Suspension', 
      'Suspension & Steering', 'Electrical & Electronics', 'Exhaust System', 'Cooling System'
    ],
    'Emergency & Safety Equipment': [
      'First Aid Kits', 'Fire Extinguishers', 'Warning Triangles', 
      'Airbags & Products', 'Emergency Road Tools'
    ],
    'Tires & Wheels': [
      'Car Tires', 'Alloy & Steel Wheels', 'Wheel Accessories', 'Tire Repair Kits'
    ],
    'Car Accessories': [
      'Interior Accessories', 'Exterior Accessories', 'Lighting', 'Audio & Entertainment'
    ],
    'Fluids & Maintenance Products': [
      'Engine Oil & Lubricants', 'Coolants & Additives', 'Transmission Fluids', 
      'Car Wash & Detailing Products'
    ],
    'Performance Parts & Tuning': [
      'Turbochargers & Superchargers', 'Cold Air Intakes', 
      'Performance Exhaust Systems', 'ECU Tuning & Chips'
    ]
  };

  // Brand list
  const brands = [
    'Toyota', 'Honda', 'Nissan', 'Mazda', 'Mitsubishi', 'Suzuki', 'BMW', 'Mercedes-Benz', 'Audi', 'Any Other'
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://onlinestorebackend20250502182239.azurewebsites.net/api/MoterpartApi/getitems`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially show all products
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters whenever selected filters change
  useEffect(() => {
    let filtered = [...products];
    
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedSubCategories.includes(product.productSubCategory)
      );
    }
    
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedSubCategories, selectedBrands, products]);

  // Handle category toggle
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Handle subcategory selection
  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategories(prev => {
      if (prev.includes(subCategory)) {
        return prev.filter(item => item !== subCategory);
      } else {
        return [...prev, subCategory];
      }
    });
  };

  // Handle brand selection
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(item => item !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSubCategories([]);
    setSelectedBrands([]);
  };

  // Handle adding item to cart
  const handleAddToCart = (product) => {
    // Get current cart items from localStorage or initialize an empty array
    const currentCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Add the new product to the cart
    currentCart.push(product);
    
    // Save updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(currentCart));
    
    // Optional: You can show a confirmation message here
    alert(`${product.partName} added to cart!`);
  };

  if (loading) return <div className="loading"> <div><NavbarComponent /></div>Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="auto-parts-container-main">
      <NavbarComponent /> 
      {/* Main content */}
      <div className="shopping-cart-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="category-section">
            <h3>Category</h3>
            <ul className="category-list">
              {Object.keys(categories).map((category) => (
                <li className="category-item" key={category}>
                  <div 
                    className="category-header" 
                    onClick={() => toggleCategory(category)}
                  >
                    <span>{category}</span>
                    <span className="expand-icon">{expandedCategories[category] ? '−' : '+'}</span>
                  </div>
                  {expandedCategories[category] && (
                    <ul className="subcategory-list">
                      {categories[category].map((subCategory) => (
                        <li key={subCategory}>
                          <label className="checkbox-label">
                            <input 
                              type="checkbox" 
                              checked={selectedSubCategories.includes(subCategory)}
                              onChange={() => handleSubCategoryChange(subCategory)}
                            />
                            {subCategory}
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="brand-section">
            <h3>Brand</h3>
            <ul className="brand-list">
              {brands.map(brand => (
                <li key={brand}>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="filter-actions">
            <button className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
          </div>
        </div>
        
        {/* Products grid */}
        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-products">No products found matching your filters.</div>
          ) : (
            filteredProducts.map(product => (
              <div className="product-card" key={product.productID}>
                <div className="product-image">
                  <img src={product.imageURL} alt={product.partName} />
                </div>
                <h4>{product.partName}</h4>
                <p className="price">Rs. {product.price.toLocaleString()}</p>
                <div className="product-brand">{product.brand}</div>
                <div className="cart-btn-container">
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                  <Link to={`/viewdetails/${product.productID}`} className="view-details-btn">View Details</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shoppingcart;