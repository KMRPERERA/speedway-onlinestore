
// import React, { useState } from 'react';
// import './registration.css';
// import NavbarComponent from '../Components/navbar.js';
// import { Link } from 'react-router-dom';

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     idNumber: ''
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [id]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle registration logic here
//     console.log('Registration submitted:', formData);
//   };

//   return (
//     <div className="speedway-container">
//   <NavbarComponent/>
//       {/* Main Content */}
//       <main className="speedway-main">
//         <div className="register-container">
//           <div className="car-image-container">
//             {/* This will be the background for your car image */}
//           </div>
          
//           <div className="register-form-container">
//             <h2 className="register-title">Register</h2>
//             <p className="register-subtitle">JOIN TO US</p>
            
//             <form onSubmit={handleSubmit} className="register-form">
//               <div className="form-group">
//                 <label htmlFor="name">Your name</label>
//                 <input 
//                   type="text" 
//                   id="name" 
//                   placeholder="Malki Perera" 
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="email">Email Address</label>
//                 <input 
//                   type="email" 
//                   id="email" 
//                   placeholder="Example@gmail.com" 
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="mobile">Mobile</label>
//                 <input 
//                   type="tel" 
//                   id="mobile" 
//                   placeholder="XXXXXXXXXX" 
//                   value={formData.mobile}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="idNumber">ID Number</label>
//                 <input 
//                   type="text" 
//                   id="idNumber" 
//                   placeholder="XXXXXXXXXX" 
//                   value={formData.idNumber}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
              
//               <button type="submit" className="register-button"><Link to="/contactinfo" className="register-button">REGISTER</Link></button>
              
//               <div className="login-prompt">
//                 ALREADY HAVE AN ACCOUNT ? <a href="#" className="login-link">LOGIN</a>
//               </div>
//             </form>
            
//             <div className="terms-note">
//               By signing up to create an account I accept Company's
//               <div className="terms-links">
//                 <a href="#">Terms of use</a> & <a href="#">Privacy Policy</a>.
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Registration;


import React, { useState } from 'react';
import './registration.css';
import NavbarComponent from '../Components/navbar.js';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', // Added password field
    mobile: '',
    idNumber: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Construct the API URL with query parameters
      const apiUrl = `https://onlinestorebackend20250502182239.azurewebsites.net/api/UserAuthentication/customers?p_customer_name=${encodeURIComponent(formData.name)}&p_customer_password=${encodeURIComponent(formData.password)}&p_customer_email=${encodeURIComponent(formData.email)}&p_customer_phone=${encodeURIComponent(formData.mobile)}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Registration failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      alert('Registration completed successfully!');
      // Navigate to contact info page on success
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="speedway-container">
      <NavbarComponent />
      {/* Main Content */}
      <main className="speedway-main">
        <div className="register-container">
          <div className="car-image-container">
            {/* This will be the background for your car image */}
          </div>
          
          <div className="register-form-container">
            <h2 className="register-title">Register</h2>
            <p className="register-subtitle">JOIN TO US</p>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="name">Your name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Malki Perera"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Added password field */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="tel"
                  id="mobile"
                  placeholder="XXXXXXXXXX"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="idNumber">ID Number</label>
                <input
                  type="text"
                  id="idNumber"
                  placeholder="XXXXXXXXXX"
                  value={formData.idNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="register-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'REGISTERING...' : 'REGISTER'}
              </button>
              
              <div className="login-prompt">
                ALREADY HAVE AN ACCOUNT ? <Link to="/login" className="login-link">LOGIN</Link>
              </div>
            </form>
            
            <div className="terms-note">
              By signing up to create an account I accept Company's
              <div className="terms-links">
                <a href="#">Terms of use</a> & <a href="#">Privacy Policy</a>.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;