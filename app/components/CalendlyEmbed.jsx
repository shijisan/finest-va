import { useEffect } from "react";

const CalendlyEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      Calendly.initInlineWidget({
        url: "https://calendly.com/infofinest2024/discovery-call-with-finest-agency?month=2024-10", // Replace with your actual Calendly link
        parentElement: document.getElementById("calendly-embed"),
        prefill: {},
        utm: {},
      });
    };

    return () => {
      document.body.removeChild(script); // Cleanup
    };
  }, []);

  return (
    <div className="flex-grow w-full h-auto lg:min-h-screen" id="calendly-embed" data-resize="true" />
  );
};

export default CalendlyEmbed;
