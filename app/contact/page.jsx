"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.emailjs.init("YOUR_PUBLIC_KEY");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    window.emailjs.sendForm("service_ku9z9f3", "contact_form", event.target).then(
      () => {
        console.log("SUCCESS!");
        event.target.reset();
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
  };

  return (
    <>
      <Nav />
      <div className="container flex flex-col items-center w-full pt-20 bg-gradient">
        <div className="w-full max-w-md p-6 mx-auto mt-5 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-center">Contact Us</h2>
          <form id="contact-form" onSubmit={handleSubmit}>
            {/* Form Fields */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="user_name">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none"
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
                className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none"
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
                className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <input
                type="submit"
                value="Send"
                className="px-4 py-2 text-white bg-teal-500 rounded cursor-pointer hover:bg-teal-700 focus:outline-none"
              />
            </div>
          </form>
          <hr className="my-3" />
          <div className="flex w-full justify-evenly">
            <a href="/calendly" className="hover:text-teal-400">Click Here to Schedule a Call</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
