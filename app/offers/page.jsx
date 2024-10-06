import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import IndividualPlans from "../components/IndividualPlans";


import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Offers(){
    return(
        <>
            <Nav />
            
            <section className="container flex flex-col h-screen offersHeader lg:flex-row">
                <div className="flex flex-col justify-center w-full h-full mt-20 lg:w-1/2 lg:mt-0 lg:justify-end lg:pb-20 text-lime-400 left lg:px-20">
                    <div className="border-lime-500 px-7 rounded-xl">
                        <h1 className="text-4xl font-medium">Offers Overview</h1> 
                        <hr className="my-3 border-lime-400" />
                        <p className="font-sans">Explore the range of services available for your business needs with our Virtual Assistants. Take advantage of our trial offer at $30 for 15 days to assess the compatibility of our VAs with your requirements.</p>
                    </div>
                </div>
                <div className="flex flex-col w-full h-full mt-5 lg:ps-0 ps-7 justify-top lg:items-end lg:w-1/2 lg:justify-end lg:pb-20 text-lime-400 left lg:px-20 right lg:mt-0">
                    <a className="p-3 transition-opacity duration-300 bg-opacity-0 border-2 rounded-full hover:bg-opacity-50 border-lime-400 w-fit bg-lime-400" href="/contact">Initiate Free Trial Now!</a>
                </div>
            </section>

            <IndividualPlans />

            <hr className="w-5/6 border-teal-800" />

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