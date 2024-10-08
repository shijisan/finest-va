import Image from "next/image";
import Nav from "./components/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPencilAlt, 
  faCalendarAlt, 
  faComments, 
  faEnvelopeOpen, 
  faSync, 
  faChartBar, 
  faBullseye, 
  faFileSignature, 
  faChartLine, 
  faFileAlt, 
  faCalendarCheck, 
  faTasks 
} from '@fortawesome/free-solid-svg-icons';
import TestimonialCarousel from "./components/TestimonialCarousel";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav/>

      <header className="container flex flex-col items-center justify-center">
        <h2 className="mt-40 text-2xl text-center text-white lg:text-4xl poppins">
          Welcome to Finest VA<br/>Marketing Agency
        </h2>
      </header>

      <section className="container flex items-center justify-center h-screen px-0 gradient-wave ">
        <div className="flex flex-col w-full h-auto aboutBg rounded-t-3xl">
          <div className="flex flex-col items-center justify-center h-full px-5 py-5 text-center lg:px-20 aboutText ">
            <h3 className="text-2xl font-semibold grayscale lg:text-4xl">About Us</h3>
            <br />
            <p className="text-sm md:w-3/5 lg:text-lg inter">
              Finest VA Marketing Agency is a sister company of The VA Bar, an esteemed academy for virtual assistants.<br /><br />
              We provide tailored marketing solutions for small businesses and entrepreneurs, specializing in creating effective strategies, managing social media, and enhancing customer engagement.<br />
              Our focus spans various sectors, including e-commerce, consulting, real estate, and health and wellness.<br /><br />
              Partner with us to elevate your brand and achieve your business goals with the expertise cultivated from The VA Bar.
            </p>

            <br />
            <div className="flex items-center justify-evenly">
            <img src="./images/va_bar.png" className="h-12 aspect-square" alt="The VA Bar Logo" />
            <a className="mx-5 secondary-btn h-fit" href="#">Learn More</a>
            <img src="./images/logo.webp" className="h-12 p-1 bg-teal-100 border-2 border-teal-700 rounded-full aspect-square" alt="Finest VA logo" />
            </div>
          </div>
        </div>
      </section>

      <section className="container flex flex-col items-center content-center justify-center">
        <div className="flex-col min-h-screen lg:flex-row halfSect lg:justify-center justify-evenly">
          <div className="flex-col justify-center w-full px-5 my-8 md:px-20 left lg:w-50 fadeElement lg:my-0">
            <h3 className="text-2xl font-semibold lg:text-3xl">Social Media Manager</h3>
            <br />
            <p className="font-sans text-lg">
            Social media management involves overseeing our online presence across various platforms, including content strategy development, post scheduling, audience engagement, and performance analysis. Our goal is to build a strong brand identity and drive traffic to our website while adapting to the ever-changing social media landscape.
            </p>
            <br />
            <ul className="space-y-3">
              <li>
                <FontAwesomeIcon icon={faPencilAlt} style={{width: '1.5em', color: '#bef264', marginRight: '1em'}} />
                Content Strategy Development
              </li>
              <li>
                <FontAwesomeIcon icon={faCalendarAlt} style={{width: '1.5em', color: '#bef264', marginRight: '1em'}} />
                Post Scheduling
              </li>
              <li>
                <FontAwesomeIcon icon={faComments} style={{width: '1.5em', color: '#bef264', marginRight: '1em'}} />
                Audience Engagement
              </li>
            </ul>
          </div>
          <div className="items-center justify-center w-full h-screen right lg:w-50 lg:h-auto fadeElement">
            <div className="items-center justify-center my-8 lg:w-1/2 h-96 lg:my-0 bg-gradient bg-opacity-60 rounded-3xl">
              <Image 
                className="w-full transition-transform duration-300 lg:h-auto lg:w-full hover:scale-110" 
                src="/images/SMM-sect1.webp" 
                alt="SMM" 
                loading="lazy" 
                width={500} // Specify width
                height={500} // Specify height
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container flex flex-col items-center content-center justify-center">
        <div className="flex-col min-h-screen lg:flex-row-reverse halfSect lg:justify-center justify-evenly">
          <div className="flex-col justify-center w-full px-5 md:px-20 lg:w-50 left fadeElement">
            <h3 className="text-3xl font-semibold lg:text-4xl">Email Marketing</h3>
            <br />
            <p className="font-sans text-lg">
              Email marketing involves creating and managing campaigns to engage subscribers, promote products, and build lasting customer relationships. We help by crafting compelling email content, automating campaigns, and analyzing performance to optimize results.
            </p>
            <br />
            <ul className="space-y-3">
              <li>
                <FontAwesomeIcon icon={faEnvelopeOpen} style={{width: '1.5em', color: '#0d9488', marginRight: '1em'}} />
                Email Campaign Creation
              </li>
              <li>
                <FontAwesomeIcon icon={faSync} style={{width: '1.5em', color: '#0d9488', marginRight: '1em'}} />
                Automated Campaigns
              </li>
              <li>
                <FontAwesomeIcon icon={faChartBar} style={{width: '1.5em', color: '#0d9488', marginRight: '1em'}} />
                Performance Analytics
              </li>
            </ul>
          </div>
          <div className="items-center justify-center w-full lg:w-50 right fadeElement">
            <div className="items-center justify-center w-1/2 my-16 lg:my-0 h-3/5 bg-gradient-rev bg-opacity-60 rounded-3xl">
              <Image 
                className="w-full transition-transform duration-300 md:w-1/3 lg:w-full hover:scale-110" 
                src="/images/EM-sect2.webp" 
                alt="EM" 
                loading="lazy" 
                width={500} // Specify width
                height={500} // Specify height
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container flex flex-col items-center content-center justify-center fadeElement">
        <div className="flex-col min-h-screen lg:flex-row halfSect lg:justify-center justify-evenly">
          <div className="flex-col justify-center w-full px-5 md:px-20 left lg:w-50">
            <h3 className="text-3xl font-semibold lg:text-4xl">Lead Generation</h3>
            <br />
            <p className="font-sans text-lg">
              Lead generation focuses on identifying potential customers and converting them into leads. We assist by designing effective landing pages, capturing leads through forms, and tracking lead behavior to optimize conversions.
            </p>
            <br />
            <ul className="space-y-3">
              <li>
                <FontAwesomeIcon icon={faBullseye} style={{width: '1.5em', color: '#16a34a', marginRight: '1em'}} />
                Targeted Campaigns
              </li>
              <li>
                <FontAwesomeIcon icon={faFileSignature} style={{width: '1.5em', color: '#16a34a', marginRight: '1em'}} />
                Lead Forms & Capture
              </li>
              <li>
                <FontAwesomeIcon icon={faChartLine} style={{width: '1.5em', color: '#16a34a', marginRight: '1em'}} />
                Conversion Tracking
              </li>
            </ul>
          </div>
          <div className="items-center justify-center w-full right lg:w-50">
            <div className="items-center justify-center w-1/2 my-16 lg:my-0 h-3/5 bg-gradient bg-opacity-60 rounded-3xl">
              <Image 
                className="w-full transition-transform duration-300 md:w-1/3 lg:w-full hover:scale-110" 
                src="/images/LG-sect3.webp" 
                alt="LG" 
                loading="lazy" 
                width={500} // Specify width
                height={500} // Specify height
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container flex flex-col items-center content-center justify-center fadeElement">
        <div className="flex-col min-h-screen lg:flex-row-reverse halfSect lg:justify-center justify-evenly">
          <div className="flex-col justify-center w-full px-5 md:px-20 lg:w-50 left">
            <h3 className="text-3xl font-semibold lg:text-4xl">Admin Task</h3>
            <br />
            <p className="font-sans text-lg">
              Our virtual assistant services include managing schedules, organizing documents, and performing various administrative tasks to ensure smooth operations and enhance productivity.
            </p>
            <br />
            <ul className="space-y-3">
              <li>
                <FontAwesomeIcon icon={faFileAlt} style={{width: '1.5em', color: '#0d9488', marginRight: '1em'}} />
                Document Management
              </li>
              <li>
                <FontAwesomeIcon icon={faCalendarCheck} style={{width: '1.5em', color: '#0d9488', marginRight: '1em'}} />
                Schedule Coordination
              </li>
              <li>
                <FontAwesomeIcon icon={faTasks} style={{width: '1.5em', color: '#0d9488', marginRight: '1em'}} />
                Task Management
              </li>
            </ul>
          </div>
          <div className="items-center justify-center w-full lg:w-50 right">
            <div className="items-center justify-center w-1/2 my-16 lg:my-0 h-3/5 bg-gradient-rev bg-opacity-60 rounded-3xl">
              <Image 
                className="w-full transition-transform duration-300 md:w-1/3 lg:w-full hover:scale-110" 
                src="/images/AT-sect4.webp" 
                alt="Admin Task" 
                loading="lazy" 
                width={500} // Specify width
                height={500} // Specify height
              />
            </div>
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <Footer />
    </>
  );
}
