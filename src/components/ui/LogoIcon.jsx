import React from 'react';

const LogoIcon = ({ className = "w-6 h-6" }) => {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e3a8a" /> {/* Deep Royal Blue */}
          <stop offset="1" stopColor="#f97316" /> {/* Energetic Orange */}
        </linearGradient>
      </defs>
      
      {/* Outer Hexagon / Shield representing Integrity & Structure */}
      <path 
        d="M16 2L3 9.5V22.5L16 30L29 22.5V9.5L16 2Z" 
        stroke="url(#logo-grad)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Central Node and Network Lines representing AI & Learning */}
      <circle cx="16" cy="16" r="4.5" fill="url(#logo-grad)" />
      
      {/* Top connection */}
      <path d="M16 2.5V11.5" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Top Left connection */}
      <path d="M4 10L11.5 14" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Top Right connection */}
      <path d="M28 10L20.5 14" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Bottom Left connection */}
      <path d="M8 24L13.5 19.5" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Bottom Right connection */}
      <path d="M24 24L18.5 19.5" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

export default LogoIcon;
