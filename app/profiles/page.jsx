import Image from "next/image";
import Nav from "../components/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TestimonialCarousel from "../components/TestimonialCarousel";
import Footer from "../components/Footer";

export default function Profiles() {
  return (
    <>
      <Nav/>


      <section className="container flex flex-col px-5 mt-28">
        <div className="flex w-full p-5 bg-teal-400 card rounded-3xl">
            <div className="flex flex-col items-center justify-center card-image me-5">
                <img src="https://placehold.co/200x200/webp" alt="profileImage" className="rounded-full" />
                <a href="#" className="mt-3 secondary-btn w-fit">Inquire</a>
            </div>
            <div className="flex flex-col w-full card-texts">
                <div className="card-title">
                    <h4 className="text-3xl">Your Name</h4>
                </div>
                <hr className="my-3 border-teal-800" />
                <div className="card-desc">
                    <p>Your Description</p>
                </div>
                <hr className="my-3 border-teal-800" />

                <div className="card-flair">
                    <h5>Niches:</h5>
                    <div className="p-2 mx-2 bg-white bg-opacity-50 rounded-md card w-fit">
                        {/* fontawesome icon for niche type */}
                        <div className="text-sm">Your Niche</div>
                    </div>
                </div>

            </div>
        </div>
      </section>

      <Footer/>

    </>
  );
}
