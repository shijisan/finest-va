"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Script from "next/script";

const CalendlyPage = () => {
  useEffect(() => {
    if (window.Calendly) {
      Calendly.initInlineWidget({
        url: "https://calendly.com/infofinest2024/discovery-call-with-finest-agency?month=2024-10",
        parentElement: document.getElementById("calendly-embed"),
        prefill: {},
        utm: {},
      });
    }
  }, []);

  return (
    <>
      {/* Use Script from Next.js to handle external Calendly widget.js */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload" // Load script lazily for better performance
        onLoad={() => {
          Calendly.initInlineWidget({
            url: "https://calendly.com/infofinest2024/discovery-call-with-finest-agency?month=2024-10",
            parentElement: document.getElementById("calendly-embed"),
          });
        }}
      />

      <Nav />

      <div className="flex items-center justify-center min-h-screen">
        <div
          id="calendly-embed"
          className="w-screen overflow-hidden h-[700px] lg:h-screen"
        ></div>
      </div>

      <Footer />
    </>
  );
};

export default CalendlyPage;
