import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface WhatsAppButtonProps {
  /** WhatsApp phone number (without + or country code formatting) */
  phoneNumber?: string;
  /** Pre-filled message for the chat */
  message?: string;
  /** Custom position from bottom (default: 24px) */
  bottom?: string;
  /** Custom position from right (default: 24px) */
  right?: string;
  /** Show/hide the button */
  show?: boolean;
}

export default function WhatsAppButton({ 
  phoneNumber = "1234567890", // Replace with actual WhatsApp number
  message = "Hello! I'm interested in POWERBAND products. Can you help me?",
  bottom = "24px",
  right = "24px",
  show = true
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!show) return null;

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed z-50"
      style={{ bottom, right }}
    >
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="whatsapp-button group relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-bounce-subtle focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Chat on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        {/* WhatsApp Icon */}
        <MessageCircle className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
        
        {/* Pulse Animation Ring */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 blur-md scale-110 group-hover:scale-125 transition-transform duration-300"></div>
        
        {/* Tooltip */}
        <div className={`absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300 shadow-lg ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}>
          Chat with us on WhatsApp
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </button>
    </div>
  );
}