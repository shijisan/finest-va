"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect } from 'react';
import CalendlyEmbed from "../components/CalendlyEmbed";

export default function Contact() {
  useEffect(() => {
    // Load EmailJS script
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize EmailJS once the script is loaded
    script.onload = () => {
      window.emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
    };

    return () => {
      document.body.removeChild(script); // Cleanup
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Use emailjs.sendForm to send the form data
    window.emailjs.sendForm('service_ku9z9f3', 'contact_form', event.target)
      .then(() => {
        console.log('SUCCESS!');
        // Optionally, reset the form or show a success message
        event.target.reset();
      }, (error) => {
        console.log('FAILED...', error);
      });
  };

  return (
    <>
      <Nav/>

      <div className="container flex flex-col w-full lg:flex-row wrap">
        
        <div className="flex flex-col items-center justify-center w-full bg-gradient right lg:flex-row">
            <CalendlyEmbed /> {/* Calendly widget included here */}

          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-md"
          >
            <h2 className="mb-4 text-2xl font-bold text-center">Contact Us</h2>
            <input type="hidden" name="contact_number" value="697483" />
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="user_name">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="user_email">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Your Email"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="message">
                Message
              </label>
              <textarea
                name="message"
                required
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="submit"
                value="Send"
                className="px-4 py-2 font-bold text-white bg-teal-500 rounded cursor-pointer hover:bg-teal-700 focus:outline-none focus:shadow-outline"
              />
            </div>
            <hr className="my-3" />
            <h3 className="text-xl font-medium">More Contacts: <span className="font-normal"><a href="#">Facebook 1</a> <a href="#">Facebook 2</a></span></h3>
          </form>
        </div>
      </div>

      <Footer/>
    </>
  );
}
