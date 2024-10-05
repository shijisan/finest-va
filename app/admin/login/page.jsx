import Image from "next/image";
import Nav from "@/app/components/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from "@/app/components/Footer";

export default function Login() {
  return (
    <>
      <Nav/>


    <div className="container mt-28">
        <form method="POST" action="/login" className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 text-2xl font-medium text-center">Admin Login</h2>

            <div className="mb-4">
                <label htmlFor="username" className="block mb-2 text-sm font-semibold">Username</label>
                <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                required
                />
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-semibold">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
                required
                />
            </div>

            <button
                type="submit"
                className="w-full py-2 font-semibold text-center rounded-lg shadow-lg focus:outline-none focus:ring-teal-400 bg-lime-400 focus:ring-2 "
            >
                Login
            </button>
        </form>
    </div>


      <Footer/>

    </>
  );
}
