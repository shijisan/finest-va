import Image from "next/image";
import Nav from "./components/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCalendarAlt, faComments, faEnvelopeOpen, faSync, faChartBar, faBullseye, faFileSignature, faChartLine, faFileAlt, faCalendarCheck, faTasks } from '@fortawesome/free-solid-svg-icons';
import TestimonialCarousel from "./components/TestimonialCarousel";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav/>

      <header className="container flex flex-col items-center justify-center">
        <h2 className="mt-40 text-2xl text-center text-white lg:text-4xl poppins">Welcome to Finest VA<br/>Marketing Agency</h2>
      </header>

      <section className="container flex items-center justify-center h-screen px-0 pt-3 lg:px-32 lg:pt-32">
        <div className="w-full h-full aboutBg rounded-t-3xl">
          <div className="flex flex-col items-center justify-center h-full px-5 py-5 text-center lg:px-20 lg:h-1/2 aboutText rounded-t-3xl">
            <h3 className="text-2xl font-semibold lg:text-3xl">About Us</h3>
            <br />
            <p className="font-sans text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <br />
            <a className="secondary-btn" href="#">Learn More</a>
          </div>
        </div>
      </section>

      <section className="container flex flex-col items-center content-center justify-center fadeElement">
        <div className="flex-col-reverse min-h-screen lg:flex-row halfSect lg:justify-center justify-evenly">
          <div className="flex-col justify-center w-full px-5 md:px-20 left lg:w-50">
            <h3 className="text-3xl font-semibold lg:text-4xl">Social Media Manager</h3>
            <br />
            <p className="font-sans text-lg">
              Social media management involves overseeing our online presence across various platforms. We will provide assistance in developing content strategies, scheduling posts, engaging with our audience, and analyzing performance metrics. Our goal is to build a strong brand identity, foster community engagement, and drive traffic to our website, all while adapting to the ever-changing landscape of social media trends.
            </p>
            <br />
            <ul className="space-y-3">
              <li>
                  <FontAwesomeIcon icon={faPencilAlt} style={{width: '1.5em', color: '#bef264', marginRight: '1em'}} />Content Strategy Development
              </li>
              <li>
                  <FontAwesomeIcon icon={faCalendarAlt} style={{width: '1.5em', color: '#bef264', marginRight: '1em'}} />Post Scheduling
              </li>
              <li>
                  <FontAwesomeIcon icon={faComments} style={{width: '1.5em', color: '#bef264', marginRight: '1em'}} />Audience Engagement
              </li>
            </ul>

          </div>
          <div className="items-center justify-center w-full right lg:w-50">
            <div className="items-center justify-center w-1/2 my-16 lg:my-0 h-3/5 bg-gradient bg-opacity-60 rounded-3xl">
              <img className="w-full transition-transform duration-300 md:w-1/3 lg:w-full hover:scale-110" src="/images/SMM-sect1.webp" alt="SMM" loading="lazy" />
            </div>
          </div>
        </div>

      </section>

      <section className="container flex flex-col items-center content-center justify-center fadeElement">
        <div className="flex-col-reverse min-h-screen lg:flex-row-reverse halfSect lg:justify-center justify-evenly">
          <div className="flex-col justify-center w-full px-5 md:px-20 lg:w-50 left">
          <h3 className="text-3xl font-semibold lg:text-4xl">Email Marketing</h3>
          <br />
          <p className="font-sans text-lg">
            Email marketing involves creating and managing campaigns to engage subscribers, promote products, and build lasting customer relationships. We help by crafting compelling email content, automating campaigns, and analyzing performance to optimize results.
          </p>
          <br />
          <ul className="space-y-3">
            <li>
              <FontAwesomeIcon icon={faEnvelopeOpen} style={{width: '1.5em', color: '#0d9488', marginRight: '1em'}} />Email Campaign Creation
            </li>
            <li>
              <FontAwesomeIcon icon={faSync} style={{width: '1.5em', color: '#0d9488', marginRight: '1em'}} />Automated Campaigns
            </li>
            <li>
              <FontAwesomeIcon icon={faChartBar} style={{width: '1.5em', color: '#0d9488', marginRight: '1em'}} />Performance Analytics
            </li>
          </ul>


          </div>
          <div className="items-center justify-center w-full lg:w-50 right">
            <div className="items-center justify-center w-1/2 my-16 lg:my-0 h-3/5 bg-gradient-rev bg-opacity-60 rounded-3xl">
              <img className="w-full transition-transform duration-300 md:w-1/3 lg:w-full hover:scale-110" src="/images/EM-sect2.webp" alt="EM" loading="lazy" />
            </div>
          </div>
        </div>

      </section>

      <section className="container flex flex-col items-center content-center justify-center fadeElement">
        <div className="flex-col-reverse min-h-screen lg:flex-row halfSect lg:justify-center justify-evenly">
          <div className="flex-col justify-center w-full px-5 md:px-20 left lg:w-50">
            <h3 className="text-3xl font-semibold lg:text-4xl">Lead Generation</h3>
            <br />
            <p className="font-sans text-lg">
              Lead generation focuses on identifying potential customers and converting them into leads. We assist by designing effective landing pages, capturing leads through forms, and tracking lead behavior to optimize conversions.
            </p>
            <br />
            <ul className="space-y-3">
              <li>
                <FontAwesomeIcon icon={faBullseye} style={{width: '1.5em', color: '#16a34a', marginRight: '1em'}} />Targeted Campaigns
              </li>
              <li>
                <FontAwesomeIcon icon={faFileSignature} style={{width: '1.5em', color: '#16a34a', marginRight: '1em'}} />Lead Forms & Capture
              </li>
              <li>
                <FontAwesomeIcon icon={faChartLine} style={{width: '1.5em', color: '#16a34a', marginRight: '1em'}} />Conversion Tracking
              </li>
            </ul>

          </div>
          <div className="items-center justify-center w-full right lg:w-50">
            <div className="items-center justify-center w-1/2 my-16 lg:my-0 h-3/5 bg-gradient bg-opacity-60 rounded-3xl">
              <img className="w-full transition-transform duration-300 md:w-1/3 lg:w-full hover:scale-110" src="/images/LG-sect3.webp" alt="LG" loading="lazy" />
            </div>
          </div>
        </div>

      </section>

      <section className="container flex flex-col items-center content-center justify-center fadeElement">
        <div className="flex-col-reverse min-h-screen lg:flex-row-reverse halfSect lg:justify-center justify-evenly">
          <div className="flex-col justify-center w-full px-5 md:px-20 lg:w-50 left">
          <h3 className="text-3xl font-semibold lg:text-4xl">Admin Task</h3>
          <br />
          <p className="font-sans text-lg">
            Admin support involves handling a variety of tasks to keep operations running smoothly. We assist with document management, scheduling meetings, and organizing internal processes to ensure seamless business operations.
          </p>
          <br />
          <ul className="space-y-3">
            <li>
              <FontAwesomeIcon icon={faFileAlt} style={{width: '1.25em', color: '#4ade80', marginRight: '1em'}} />Document Management
            </li>
            <li>
              <FontAwesomeIcon icon={faCalendarCheck} style={{width: '1.25em', color: '#4ade80', marginRight: '1em'}} />Meeting Scheduling
            </li>
            <li>
              <FontAwesomeIcon icon={faTasks} style={{width: '1.25em', color: '#4ade80', marginRight: '1em'}} />Process Organization
            </li>
          </ul>


          </div>
          <div className="items-center justify-center w-full lg:w-50 right">
            <div className="items-center justify-center w-1/2 my-16 lg:my-0 h-3/5 bg-gradient-rev bg-opacity-60 rounded-3xl">
              <img className="w-full transition-transform duration-300 md:w-1/3 lg:w-full hover:scale-110" src="/images/AT-sect4.webp" alt="AT" loading="lazy" />
            </div>
          </div>
        </div>

      </section>

      <section className="container flex flex-col justify-center overflow-hidden">
        <TestimonialCarousel/>
      </section>

      <Footer/>

    </>
  );
}
