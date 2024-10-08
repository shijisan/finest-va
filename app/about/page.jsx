import Nav from "../components/Nav"
import Footer from "../components/Footer"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faLaptopCode, faLightbulb, faChartLine, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

export default function About(){
    return(
        <>
            <Nav />

            <section className="container flex items-center justify-center w-full px-5 lg:px-0 gradient-wave lg:p-0">
                <div className="flex flex-col items-center justify-center w-full mt-20 bg-white bg-opacity-50 lg:w-2/3 lg:p-5 aboutCard rounded-3xl">
                    <h3 className="w-full py-3 mb-3 text-2xl font-semibold text-center border-b border-teal-800 lg:text-4xl">About Us</h3>
                    <div className="flex flex-col justify-between w-full py-2 lg:flex-row-reverse lg:py-0">
                        <p className="p-2 text-sm text-center lg:text-base lg:text-left inter lg:ms-3 lg:w-4/5">
                            Introducing our proficient Virtual Assistants! Each member of our team is extensively trained and possesses remarkable expertise in their respective fields. Our goal is to provide comprehensive support to entrepreneurs across various industries globally.<br /><br />
                            Our mission is dedicated to fostering success for every business we engage with. Whether you need administrative assistance, social media management, customer service support, or specialized industry knowledge, our Virtual Assistants are equipped to handle it all with unparalleled professionalism and efficiency.
                        </p>
                        <div className="flex items-center justify-center lg:my-0 lg:w-1/5">
                            <img className="h-16 p-1 transition-transform duration-300 bg-teal-100 border border-teal-600 rounded-full lg:p-3 lg:w-full lg:h-auto hover:scale-110" src="/images/logo.webp" alt="logo" />
                        </div>
                    </div>

                </div>
            </section>

            <section className="container flex flex-col items-center justify-center p-5 solutions lg:p-0">

                <div className="flex items-center w-full h-screen px-2 lg:px-5 lg:h-auto">
                    <h3 className="w-full my-10 text-lg font-medium text-justify fadeElement">We understand that <span className="text-lime-400">each business is unique</span>, which is why we offer personalized solutions tailored to meet your specific needs. By leveraging the latest technology and best practices, we ensure that your operations run smoothly, allowing you to focus on what truly matters - growing your business.</h3>
                </div>

                <div className="flex flex-col flex-wrap items-center justify-center w-full text-white lg:space-y-0 lg:flex-row lg:space-x-10">
                    
                    {/* Card 1 */}
                    <div className="w-full mb-3 transition-transform duration-300 lg:mb-0 fadeElement lg:w-1/5 card hover:scale-110">
                        <div className="py-5 bg-teal-500 rounded-t-lg card-header">
                            <h2 className="flex items-center justify-center text-sm text-center">
                                <FontAwesomeIcon icon={faCogs} className="w-6 mr-2" /> Personalized Solutions
                            </h2>
                        </div>
                        <div className="w-full card-image h-80 PS"></div>
                    </div>

                    {/* Card 2 */}
                    <div className="w-full mb-3 transition-transform duration-300 lg:mb-0 fadeElement lg:w-1/5 card hover:scale-110">
                        <div className="py-5 bg-teal-500 rounded-t-lg card-header">
                            <h2 className="flex items-center justify-center text-center">
                                <FontAwesomeIcon icon={faLaptopCode} className="w-6 mr-2" /> Latest Technology
                            </h2>
                        </div>
                        <div className="w-full card-image h-80 LT"></div>
                    </div>

                    {/* Card 3 */}
                    <div className="w-full mb-3 transition-transform duration-300 lg:mb-0 fadeElement lg:w-1/5 card hover:scale-110">
                        <div className="py-5 bg-teal-500 rounded-t-lg card-header">
                            <h2 className="flex items-center justify-center text-center">
                                <FontAwesomeIcon icon={faLightbulb} className="w-4 mr-2" /> Best Practices
                            </h2>
                        </div>
                        <div className="w-full card-image h-80 BP"></div>
                    </div>

                    {/* Card 4 */}
                    <div className="w-full mb-3 transition-transform duration-300 lg:mb-0 fadeElement lg:w-1/5 card hover:scale-110">
                        <div className="py-5 bg-teal-500 rounded-t-lg card-header">
                            <h2 className="flex items-center justify-center text-center">
                                <FontAwesomeIcon icon={faChartLine} className="w-4 mr-2" /> Business Growth
                            </h2>
                        </div>
                        <div className="w-full card-image h-80 BG"></div>
                    </div>
                </div>
            </section>

            <section className="container fadeElement">
                <div className="flex flex-col items-center content-center justify-center">
                    <div className="flex-col min-h-screen lg:p-20 lg:flex-row-reverse halfSect lg:justify-center justify-evenly">
                        <div className="flex-col justify-center w-full px-5 py-5 pt-20 text-white md:px-20 left lg:w-50 bg-gradient-rev">
                            <h3 className="text-lg font-semibold lg:text-2xl">Here are the unique attributes that distinguish our team:</h3>
                            <br />
                            <ul className="space-y-5 font-sans">
                                <li>
                                    <p className="flex">
                                    <FontAwesomeIcon icon={faCheckCircle} className="w-8 mr-2" />
                                    Our team members have received specialized and thorough training from our partner agency, THE VA BAR, ensuring high proficiency.
                                    </p>
                                </li>
                                <li>
                                    <p className="flex">
                                    <FontAwesomeIcon icon={faCheckCircle} className="w-6 mr-2" />
                                    Certified as Virtual Assistants, they have obtained certificates from our esteemed partner VA Academy.
                                    </p>
                                </li>
                                <li>
                                    <p className="flex">
                                    <FontAwesomeIcon icon={faCheckCircle} className="w-6 mr-2" />
                                    These professionals are not just skilled; they are experts in their field, showcasing exceptional abilities.
                                    </p>
                                </li>
                                <li>
                                    <p className="flex">
                                    <FontAwesomeIcon icon={faCheckCircle} className="w-6 mr-2" />
                                    With a commitment to excellence, they consistently deliver optimal results for your business.
                                    </p>
                                </li>
                                <br />
                                <li className="flex items-center justify-center">
                                    <a href="/contact" className="primary-btn">Learn More</a>
                                </li>
                            </ul>

                        </div>
                        <div className="items-center justify-center w-full right lg:w-50">
                            <div className="w-full h-full sect2-about"></div>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}