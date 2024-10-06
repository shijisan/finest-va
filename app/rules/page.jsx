import Image from "next/image";
import Nav from "../components/Nav";
import { faClock, faCalendarCheck, faMoneyBillWave, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from "../components/Footer";

export default function Rules() {
  return (
    <>
      <Nav/>


      <section className="container flex flex-col items-center justify-center h-screen text-white rules">
        <div className="mt-10 bg-teal-400 lg:w-4/5 rounded-3xl min-h-96 bg-opacity-60 lg:mt-0">
            <div className="px-5 py-5 lg:px-16">
                <h3 className="text-3xl font-medium text-lime-300">General Rules:</h3>
                <br />
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faMoneyBillWave} className="w-4 me-2" />
                        <p className="font-sans text-lg">50 percent upfront fee before onboarding.</p>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faCalendarCheck} className="w-4 me-2" />
                        <p className="font-sans text-lg">50 percent 15 days before the project ends.</p>
                    </li>
                </ul>

                <hr className="my-3 border-teal-800" />

                <h3 className="text-3xl font-medium text-lime-300">Rules for per hour:</h3>
                <br />
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faClock} className="w-4 me-2" />
                        <p className="font-sans text-lg">They need to pay 50 percent before the VA will start and another 50 percent after 15 days.</p>
                    </li>
                </ul>

                <hr className="my-3 border-teal-800" />

                <h3 className="text-3xl font-medium text-lime-300">Privacy Policy:</h3>
                <br />
                <ul>
                    <li>
                        <FontAwesomeIcon icon={faUserSecret} className="w-4 me-2" />
                        <p className="font-sans text-lg">An NDA will be issued before onboarding any individual.</p>
                    </li>
                </ul>
            </div>
        </div>
      </section>

      <Footer/>

    </>
  );
}
