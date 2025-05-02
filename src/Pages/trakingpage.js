import React from 'react'
import { Link } from 'react-router-dom'
import './trakingpage.css'; // Adjust the path to your CSS file
import NavbarComponent from '../Components/navbar';

export default function Trakingpage() {
  return (
    <div><div><NavbarComponent/></div><div><div class="trackingShell">
    <h1 class="identifierTitle">ORDER TRACKING #12347</h1>
    
    <div class="progressVisual">
        <div class="trackLine"></div>
        <div class="milestonesRow">

            <div class="milestoneUnit">
                <div class="checkpointBubble activeBubble">
                    <svg class="checkpointIcon checkIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <div class="stageLabel">ORDER PLACED</div>
            </div>

            <div class="milestoneUnit">
                <div class="checkpointBubble activeBubble">
                    <svg class="checkpointIcon boxIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        <circle cx="18" cy="14" r="3"></circle>
                        <polyline points="18 12 18 14 20 14"></polyline>
                    </svg>
                </div>
                <div class="stageLabel">PROCESSING</div>
            </div>
            
 
            <div class="milestoneUnit">
                <div class="checkpointBubble inactiveBubble">
                    <svg class="checkpointIcon truckIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                </div>
                <div class="stageLabel">SHIPPED</div>
            </div>
            
  
            <div class="milestoneUnit">
                <div class="checkpointBubble inactiveBubble">
                    <svg class="checkpointIcon deliveryIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10V4a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6"></path>
                        <path d="M16 2v2H8V2"></path>
                        <path d="M8 8h8"></path>
                        <path d="M8 12h4"></path>
                        <circle cx="18" cy="18" r="4"></circle>
                        <path d="M18 15v3h3"></path>
                    </svg>
                </div>
                <div class="stageLabel">DELIVERED</div>
            </div>
        </div>
    </div>
    
    <div class="detailsBox">
        <h2 class="sectionHeader">ORDER INFORMATION</h2>
        
        <div class="dataLine">
            <span class="dataLabel">ORDER NUMBER :</span>
            <span class="dataContent">#12347</span>
        </div>
        
        <div class="dataLine">
            <span class="dataLabel">PRODUCT :</span>
            <span class="dataContent">HIGH PERFORMANCE AIR FILTER</span>
        </div>
        
        <div class="dataLine">
            <span class="dataLabel">ESTIMATED DELIVERY :</span>
            <span class="dataContent">AUG 20,2025</span>
        </div>
        
        <div class="dataLine">
            <span class="dataLabel">CURRENT STATUS :</span>
            <span class="dataContent">PROCESSING</span>
        </div>
    </div>
</div></div> </div>
  )
}
