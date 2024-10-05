import Image from "next/image";
import Nav from "../components/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TestimonialCarousel from "../components/TestimonialCarousel";
import Footer from "../components/Footer";

export default function Testimonials() {
  return (
    <>
      <Nav/>


      <section className="container flex flex-col justify-center overflow-hidden">
        <TestimonialCarousel/>
      </section>

      <Footer/>

    </>
  );
}
