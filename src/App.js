import logo from './logo.svg';
import './App.css';
import Main from './Pages/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Shoppingcart from './Pages/shoppingcart';
import About from './Pages/about';
import Contact from './Pages/contact';
import LoginPage from './Pages/login';
import Registration from './Pages/registration';
import ContactInfo from './Pages/contactinfo';
import BusinessInfoPage from './Pages/businessinfo';
import Businesscredentials from './Pages/businesscredentials';
import Locationdetails from './Pages/locationdetails';
import SupplierDashboard from './Pages/suplier-profile';
import SupAbout from './Pages/sup-about';
import SupContact from './Pages/sup-contact';
import Offers from './Pages/offers';
import Orderpage from './Pages/orderpage';
import Trackorder from './Pages/trackorder';
import Trakingpage from './Pages/trakingpage';
import Orderhistory from './Pages/orderhistory';
import Fogotpassword from './Pages/fogotpassword';
import ViewdetailsSection from './Pages/viewdetails';
import Submitad from './Pages/submitad';
import Neworders from './Pages/neworders';
import Customerprofile from './Pages/customerprofile';
import Procesingdetails from './Pages/procesingdetails';

function App() {
  return (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shoppingcart" element={<Shoppingcart/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/supplierprofile" element={<SupplierDashboard/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/supabout" element={<SupAbout/>} />
        <Route path="/supcontact" element={<SupContact/>} />
        <Route path="/register" element={<Registration/>} />
        <Route path="/offers" element={<Offers/>} />
        <Route path="/orderpage" element={<Orderpage/>} />
        <Route path="/submitad" element={<Submitad/>} />
        <Route path="/viewdetails" element={<ViewdetailsSection/>} />
        <Route path="/fogotpassword" element={<Fogotpassword/>} />
        <Route path="/neworders" element={<Neworders/>} />
        <Route path="/trakingpage" element={<Trakingpage/>} />
        <Route path="/orderhistory" element={<Orderhistory/>} />
        <Route path="/contactinfo" element={<ContactInfo/>} />
        <Route path="/trackorder" element={<Trackorder/>} />
        <Route path="/businessinfo" element={<BusinessInfoPage/>} />
        <Route path="/businesscredentials" element={<Businesscredentials/>} />
        <Route path="/locationdetails" element={<Locationdetails/>} />
        <Route path="/customerprofile" element={<Customerprofile/>} />
        <Route path="/procesingdetails" element={<Procesingdetails/>} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
