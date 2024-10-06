// components/CalendlyEmbed.jsx
import { useEffect } from 'react';

const CalendlyEmbed = () => {
  useEffect(() => {
    // Check if the Calendly script is already loaded
    if (!document.getElementById('calendly-script')) {
      // Load the Calendly widget script
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.id = 'calendly-script'; // Assign an ID for future reference
      script.async = true;
      document.body.appendChild(script);

      // Initialize the Calendly inline widget once the script is loaded
      script.onload = () => {
        if (window.Calendly) {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/infofinest2024/discovery-call-with-finest-agency?month=2024-10', // Replace with your actual Calendly link
            parentElement: document.getElementById('calendly-embed'),
            prefill: {}, // Add any prefill data if necessary
            utm: {} // Add any UTM parameters if necessary
          });
        }
      };
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      const script = document.getElementById('calendly-script');
      if (script) {
        document.body.removeChild(script); // Remove the script
      }
    };
  }, []);

  return (
    <div
      className="mt-20 mb-20 overflow-hidden lg:mb-0 lg:h-full"
      id="calendly-embed"
      style={{ minWidth: '50%', height: '700px' }}
    ></div>
  );
};

export default CalendlyEmbed;
