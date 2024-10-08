import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import IndividualPlans from "../components/IndividualPlans";


import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Offers(){
    return(
        <>
            <Nav />
            
            <section className="container flex flex-col items-center justify-center h-screen offersHeader lg:flex-row lg:items-start lg:justify-normal">
                <div className="flex flex-col justify-center w-full px-5 mt-20 text-white lg:h-full h-4/5 lg:bg-opacity-50 lg:bg-lime-400 lg:w-1/2 lg:mt-0 lg:justify-end lg:pb-20 left lg:px-20">
                    <div className="px-2 py-5 text-center bg-opacity-50 shadow-sm lg:shadow-none shadow-black lg:py-0 rounded-xl lg:bg-transparent bg-lime-400 lg:text-start">
                        <h1 className="text-4xl font-medium">Offers Overview</h1> 
                        <hr className="my-3 border-lime-800" />
                        <p className="font-sans">Explore the range of services available for your business needs with our Virtual Assistants. Take advantage of our trial offer at $30 for 15 days to assess the compatibility of our VAs with your requirements.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center w-full mt-5 text-white lg:h-full h-1/5 lg:items-end lg:justify-end lg:w-1/2 lg:pb-20 left lg:px-20 right lg:mt-0">
                    <a className="p-3 transition-opacity duration-300 bg-opacity-50 rounded-full shadow-sm shadow-black hover:bg-opacity-100 bg-lime-400 w-fit" href="/contact">Initiate Free Trial Now!</a>
                </div>
            </section>

            <IndividualPlans />

            <hr className="w-full border-teal-800 lg:w-5/6" />

            <section className="container flex flex-col items-center justify-center mt-10 PKPlan lg:mt-0">

                <h2 className="mb-5 text-4xl">Packaged Plans</h2>


                <div className="flex flex-col flex-wrap items-center w-full gap-3 justify-evenly lg:flex-row lg:gap-5">

                    <div className="w-full p-5 lg:w-1/4 trial card bg-lime-400 h-60 rounded-xl">
                        <div className="card-header">
                            <h3 className="text-2xl">Trial Package</h3>
                            <h4>$30 for 15 days</h4>
                        </div>
                        <hr className="my-3 border-teal-800" />
                        <ul className="font-sans list-disc list-inside card-body">
                            <li className="list-item">SMM tasks</li>
                            <li className="list-item">Lead generation tasks</li>
                            <li className="list-item">Graphic Design</li>
                            <li className="list-item">Appointment Setting</li>
                        </ul>
                    </div>

                    <div className="w-full p-5 lg:w-1/4 trial card bg-lime-400 h-60 rounded-xl">
                        <div className="card-header">
                            <h3 className="text-2xl">Package 1</h3>
                            <h4>$1500</h4>
                        </div>
                        <hr className="my-3 border-teal-800" />
                        <ul className="font-sans list-disc list-inside card-body">
                            <li className="list-item">SMM tasks</li>
                            <li className="list-item">Lead generation tasks</li>
                            <li className="list-item">Graphic Design</li>
                        </ul>
                    </div>

                    <div className="w-full p-5 lg:w-1/4 trial card bg-lime-400 h-60 rounded-xl">
                        <div className="card-header">
                            <h3 className="text-2xl">Trial Package</h3>
                            <h4>$2000</h4>
                        </div>
                        <hr className="my-3 border-teal-800" />
                        <ul className="font-sans list-disc list-inside card-body">
                            <li className="list-item">SMM tasks</li>
                            <li className="list-item">Lead generation tasks</li>
                            <li className="list-item">Graphic Design</li>
                            <li className="list-item">Appointment Setting</li>
                        </ul>
                    </div>

                </div>

                <a className="my-5 primary-btn" href="/contact">Avail Now!</a>
                
            </section>


            <Footer />
        </>
    );
}