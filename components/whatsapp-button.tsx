'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export function WhatsAppButton() {
  const whatsappNumber = '50761099881'; // Replace with your WhatsApp number
  const [isVisible, setIsVisible] = useState(true);
  
  const handleClick = () => {
    window.open(
      `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=&type=phone_number&app_absent=0`,
      '_blank'
    );
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Contactar por WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" />
    </button>
  );
}