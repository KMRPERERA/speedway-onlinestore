

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// // import "./home.css";
// import "./navbar.css"; // Assuming you have a CSS file for styling
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// const NavbarComponent = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     // Get user data from localStorage on component mount
//     const userData = localStorage.getItem('currentUser');
//     if (userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setCurrentUser(parsedUser);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     }
//   }, []);

//   // Logout function to clear user data
//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     setCurrentUser(null);
//     // Redirect to login page (you may want to use navigate from react-router here)
//     // window.location.href = '/login';
//     navigate('/login');
//   };

  
//   const cart = () => {
//     navigate('/orderpage');
//   };
  
//   const handleprofile = () => {
//     // window.location.href = '/customerprofile';
//     navigate('/customerprofile');
//   };

//   return (
//     <div>
//       {/* Header */}
//       <header className="speedway-header-nav">
//         <div className="header-left-nav">
//           <img src="/images/logo-speedway-removebg.png" alt="Speed Way Logo" className="logo" />
//         </div>
        
//         <nav className="header-center">
//           <ul className="nav-menu">
//             <li className="nav-item">
//               <Link to="/" className="nav-link">HOME</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/shoppingcart" className="nav-link">SHOP</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/about" className="nav-link">ABOUT US</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/contact" className="nav-link">CONTACT</Link>
//             </li>
//           </ul>
//         </nav>
        
//         <div className="header-right">
//           <div className="welcome-text">
//             <div className="auth-links">
//               {currentUser ? (
//                 <>
//                   <span onClick={handleprofile}>{currentUser.name}</span>
//                   <button onClick={handleLogout} className="logout-btn">Logout</button>
//                 </>
//               ) : (
//                 <Link to="/login" className="logout-btn">Login</Link>
//               )}
//             </div>
//           </div>
//           <div className="cart-nav" onClick={cart}>
//             <div className="cart-amount">
//               <span className="cart-icon"><img src="/images/cart.png" alt="Cart Icon" /></span>
//               <div className="cart-label">CART</div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Secondary Navigation */}
//       <div className="secondary-nav">
//         <div className="container">
//               <Link to="/offers" className="nav-item">PRICING PLANS</Link>
//           <Link to="/trackorder" className="nav-item">TRACK YOUR ITEM</Link>
//           <Link to="/orderhistory" className="nav-item">ORDER HISTORY</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavbarComponent;




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./home.css";
import "./navbar.css"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const NavbarComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
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

  // Logout function to clear user data
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    // Redirect to login page (you may want to use navigate from react-router here)
    // window.location.href = '/login';
    navigate('/login');
  };
  
  const cart = () => {
    navigate('/orderpage');
  };
  
  const handleprofile = () => {
    // window.location.href = '/customerprofile';
    navigate('/customerprofile');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      {/* Header */}
      <header className="speedway-header-nav">
        <div className="header-left-nav">
          <img src="/images/logo-speedway-removebg.png" alt="Speed Way Logo" className="logo" />
        </div>
        
        {/* Mobile menu button */}
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </div>
        
        <nav className={`header-center ${mobileMenuOpen ? 'mobile-menu-active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>HOME</Link>
            </li>
            <li className="nav-item">
              <Link to="/shoppingcart" className="nav-link" onClick={() => setMobileMenuOpen(false)}>SHOP</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>ABOUT US</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>CONTACT</Link>
            </li>
          </ul>
        </nav>
        
        <div className={`header-right ${mobileMenuOpen ? 'mobile-right-active' : ''}`}>
          <div className="welcome-text">
            <div className="auth-links">
              {currentUser ? (
                <>
                  <span onClick={handleprofile}>{currentUser.name}</span>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </>
              ) : (
                <Link to="/login" className="logout-btn">Login</Link>
              )}
            </div>
          </div>
          <div className="cart-nav" onClick={cart}>
            <div className="cart-amount">
              <span className="cart-icon"><img src="/images/cart.png" alt="Cart Icon" /></span>
              <div className="cart-label">CART</div>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Navigation */}
      <div className={`secondary-nav ${mobileMenuOpen ? 'mobile-secondary-active' : ''}`}>
        <div className="container">
          <Link to="/offers" className="nav-item" onClick={() => setMobileMenuOpen(false)}>PRICING PLANS</Link>
          <Link to="/trackorder" className="nav-item" onClick={() => setMobileMenuOpen(false)}>TRACK YOUR ITEM</Link>
          <Link to="/orderhistory" className="nav-item" onClick={() => setMobileMenuOpen(false)}>ORDER HISTORY</Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
