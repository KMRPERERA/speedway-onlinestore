

import React, { useState, useEffect } from 'react';
import './contactinfo.css';
import NavbarComponent from '../Components/navbar.js';
import { Link, useNavigate } from 'react-router-dom';

const ContactInfo = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    primaryContact: '',
    businessPassword: '',
    businessEmail: '',
    businessPhone: '',
    alternativePhone: '',
    businessHours: {
      monday: { checked: true, open: '09:00', close: '05:00' },
      tuesday: { checked: true, open: '09:00', close: '05:00' },
      wednesday: { checked: true, open: '09:00', close: '05:00' },
      thursday: { checked: true, open: '09:00', close: '05:00' },
      friday: { checked: true, open: '09:00', close: '05:00' },
      saturday: { checked: false, open: '09:00', close: '05:00' },
      sunday: { checked: false, open: '09:00', close: '05:00' },
    }
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('contactInfoData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (day) => {
    setFormData({
      ...formData,
      businessHours: {
        ...formData.businessHours,
        [day]: {
          ...formData.businessHours[day],
          checked: !formData.businessHours[day].checked
        }
      }
    });
  };

  const handleTimeChange = (day, type, value) => {
    setFormData({
      ...formData,
      businessHours: {
        ...formData.businessHours,
        [day]: {
          ...formData.businessHours[day],
          [type]: value
        }
      }
    });
  };

  const handleNext = () => {
    // Save form data to localStorage
    localStorage.setItem('contactInfoData', JSON.stringify(formData));
    
    // Log the saved data
    console.log('Form data saved to localStorage:', formData);
    
    // Navigate to next page
    navigate('/businessinfo');
  };

  return (
    <div className="speedway-container">
      <NavbarComponent/>
      {/* Main Content */}
      <main className="speedway-main">
        <div className="registration-container">
          <div className="car-image-container">
            {/* This will be the background for your car image */}
          </div>
          
          <div className="registration-form-container">
            <h2 className="register-title">Register</h2>
            <p className="register-subtitle">JOIN TO US</p>
            
            {/* Progress Indicator */}
            <div className="progress-indicator">
              <div className="progress-step active">
                <div className="step-circle">
                  <div className="inner-circle"></div>
                </div>
                <div className="step-label">Contact Information</div>
              </div>
              <div className="progress-step">
                <div className="step-circle"></div>
                <div className="step-label">Business Information</div>
              </div>
              <div className="progress-step">
                <div className="step-circle"></div>
                <div className="step-label">Business Credentials</div>
              </div>
              <div className="progress-step">
                <div className="step-circle"></div>
                <div className="step-label">Location Details</div>
              </div>
              <div className="progress-line"></div>
            </div>
            
            {/* Contact Information Form */}
            <div className="form-section">
              <h3 className="section-title">Contact Information</h3>
              
              <div className="form-group">
                <label htmlFor="primaryContact">Primary Contact Person *</label>
                <input 
                  type="text" 
                  id="primaryContact"
                  name="primaryContact"
                  value={formData.primaryContact}
                  onChange={handleInputChange}
                  required
                />
              </div>


              <div className="form-group">
                <label htmlFor="businessEmail">Business Email *</label>
                <input 
                  type="email" 
                  id="businessEmail"
                  name="businessEmail"
                  value={formData.businessEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessPassword">Password *</label>
                <input 
                  type="password" 
                  id="businessPassword"
                  name="businessPassword"
                  value={formData.businessPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="businessPhone">Business Phone *</label>
                <input 
                  type="tel" 
                  id="businessPhone"
                  name="businessPhone"
                  value={formData.businessPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="alternativePhone">Alternative Phone</label>
                <input 
                  type="tel" 
                  id="alternativePhone"
                  name="alternativePhone"
                  value={formData.alternativePhone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group business-hours">
                <label className="hours-label">Business Hours</label>
                
                <div className="hours-grid">
                  {/* Monday */}
                  <div className="day-row">
                    <div className="day-checkbox">
                      <input 
                        type="checkbox" 
                        id="monday"
                        checked={formData.businessHours.monday.checked}
                        onChange={() => handleCheckboxChange('monday')}
                      />
                      <label htmlFor="monday">Monday</label>
                    </div>
                    
                    <div className="time-inputs">
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.monday.open}
                          onChange={(e) => handleTimeChange('monday', 'open', e.target.value)}
                          disabled={!formData.businessHours.monday.checked}
                        />
                        <span className="time-label">AM</span>
                        <button className="time-selector" disabled={!formData.businessHours.monday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                      
                      <span className="time-separator">to</span>
                      
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.monday.close}
                          onChange={(e) => handleTimeChange('monday', 'close', e.target.value)}
                          disabled={!formData.businessHours.monday.checked}
                        />
                        <span className="time-label">PM</span>
                        <button className="time-selector" disabled={!formData.businessHours.monday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tuesday */}
                  <div className="day-row">
                    <div className="day-checkbox">
                      <input 
                        type="checkbox" 
                        id="tuesday"
                        checked={formData.businessHours.tuesday.checked}
                        onChange={() => handleCheckboxChange('tuesday')}
                      />
                      <label htmlFor="tuesday">Tuesday</label>
                    </div>
                    
                    <div className="time-inputs">
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.tuesday.open}
                          onChange={(e) => handleTimeChange('tuesday', 'open', e.target.value)}
                          disabled={!formData.businessHours.tuesday.checked}
                        />
                        <span className="time-label">AM</span>
                        <button className="time-selector" disabled={!formData.businessHours.tuesday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                      
                      <span className="time-separator">to</span>
                      
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.tuesday.close}
                          onChange={(e) => handleTimeChange('tuesday', 'close', e.target.value)}
                          disabled={!formData.businessHours.tuesday.checked}
                        />
                        <span className="time-label">PM</span>
                        <button className="time-selector" disabled={!formData.businessHours.tuesday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Wednesday */}
                  <div className="day-row">
                    <div className="day-checkbox">
                      <input 
                        type="checkbox" 
                        id="wednesday"
                        checked={formData.businessHours.wednesday.checked}
                        onChange={() => handleCheckboxChange('wednesday')}
                      />
                      <label htmlFor="wednesday">Wednesday</label>
                    </div>
                    
                    <div className="time-inputs">
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.wednesday.open}
                          onChange={(e) => handleTimeChange('wednesday', 'open', e.target.value)}
                          disabled={!formData.businessHours.wednesday.checked}
                        />
                        <span className="time-label">AM</span>
                        <button className="time-selector" disabled={!formData.businessHours.wednesday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                      
                      <span className="time-separator">to</span>
                      
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.wednesday.close}
                          onChange={(e) => handleTimeChange('wednesday', 'close', e.target.value)}
                          disabled={!formData.businessHours.wednesday.checked}
                        />
                        <span className="time-label">PM</span>
                        <button className="time-selector" disabled={!formData.businessHours.wednesday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Thursday */}
                  <div className="day-row">
                    <div className="day-checkbox">
                      <input 
                        type="checkbox" 
                        id="thursday"
                        checked={formData.businessHours.thursday.checked}
                        onChange={() => handleCheckboxChange('thursday')}
                      />
                      <label htmlFor="thursday">Thursday</label>
                    </div>
                    
                    <div className="time-inputs">
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.thursday.open}
                          onChange={(e) => handleTimeChange('thursday', 'open', e.target.value)}
                          disabled={!formData.businessHours.thursday.checked}
                        />
                        <span className="time-label">AM</span>
                        <button className="time-selector" disabled={!formData.businessHours.thursday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                      
                      <span className="time-separator">to</span>
                      
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.thursday.close}
                          onChange={(e) => handleTimeChange('thursday', 'close', e.target.value)}
                          disabled={!formData.businessHours.thursday.checked}
                        />
                        <span className="time-label">PM</span>
                        <button className="time-selector" disabled={!formData.businessHours.thursday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Friday */}
                  <div className="day-row">
                    <div className="day-checkbox">
                      <input 
                        type="checkbox" 
                        id="friday"
                        checked={formData.businessHours.friday.checked}
                        onChange={() => handleCheckboxChange('friday')}
                      />
                      <label htmlFor="friday">Friday</label>
                    </div>
                    
                    <div className="time-inputs">
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.friday.open}
                          onChange={(e) => handleTimeChange('friday', 'open', e.target.value)}
                          disabled={!formData.businessHours.friday.checked}
                        />
                        <span className="time-label">AM</span>
                        <button className="time-selector" disabled={!formData.businessHours.friday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                      
                      <span className="time-separator">to</span>
                      
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.friday.close}
                          onChange={(e) => handleTimeChange('friday', 'close', e.target.value)}
                          disabled={!formData.businessHours.friday.checked}
                        />
                        <span className="time-label">PM</span>
                        <button className="time-selector" disabled={!formData.businessHours.friday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Saturday */}
                  <div className="day-row">
                    <div className="day-checkbox">
                      <input 
                        type="checkbox" 
                        id="saturday"
                        checked={formData.businessHours.saturday.checked}
                        onChange={() => handleCheckboxChange('saturday')}
                      />
                      <label htmlFor="saturday">Saturday</label>
                    </div>
                    
                    <div className="time-inputs">
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.saturday.open}
                          onChange={(e) => handleTimeChange('saturday', 'open', e.target.value)}
                          disabled={!formData.businessHours.saturday.checked}
                        />
                        <span className="time-label">AM</span>
                        <button className="time-selector" disabled={!formData.businessHours.saturday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                      
                      <span className="time-separator">to</span>
                      
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.saturday.close}
                          onChange={(e) => handleTimeChange('saturday', 'close', e.target.value)}
                          disabled={!formData.businessHours.saturday.checked}
                        />
                        <span className="time-label">PM</span>
                        <button className="time-selector" disabled={!formData.businessHours.saturday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sunday */}
                  <div className="day-row">
                    <div className="day-checkbox">
                      <input 
                        type="checkbox" 
                        id="sunday"
                        checked={formData.businessHours.sunday.checked}
                        onChange={() => handleCheckboxChange('sunday')}
                      />
                      <label htmlFor="sunday">Sunday</label>
                    </div>
                    
                    <div className="time-inputs">
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.sunday.open}
                          onChange={(e) => handleTimeChange('sunday', 'open', e.target.value)}
                          disabled={!formData.businessHours.sunday.checked}
                        />
                        <span className="time-label">AM</span>
                        <button className="time-selector" disabled={!formData.businessHours.sunday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                      
                      <span className="time-separator">to</span>
                      
                      <div className="time-field">
                        <input 
                          type="text" 
                          value={formData.businessHours.sunday.close}
                          onChange={(e) => handleTimeChange('sunday', 'close', e.target.value)}
                          disabled={!formData.businessHours.sunday.checked}
                        />
                        <span className="time-label">PM</span>
                        <button className="time-selector" disabled={!formData.businessHours.sunday.checked}>
                          <span className="clock-icon">⏰</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="form-navigation">
              <button type="button" className="next-button" onClick={handleNext}>
                NEXT
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactInfo;