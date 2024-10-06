"use client";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]); // State to hold profiles
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State to track errors

  // Fetch profiles from the API
  const fetchProfiles = async () => {
    try {
      const response = await fetch("/api/profiles"); // Fetch data from the API
      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }
      const data = await response.json();
      setProfiles(data); // Update state with fetched profiles
    } catch (err) {
      setError(err.message); // Capture error
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Fetch profiles on component mount
  useEffect(() => {
    fetchProfiles();
  }, []);

  // Handle loading state
  if (loading) {
    return <div className="text-lg text-center">Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div className="text-lg text-center text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Nav />

      <section className="container flex flex-col items-center px-5 mt-28">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex flex-col items-center w-full p-5 mb-4 bg-teal-500 bg-opacity-50 lg:w-4/6 lg:flex-row lg:items-start rounded-2xl"
            >
              {/* Profile Image Section */}
              <div className="flex-shrink-0 mb-4 lg:mb-0 lg:mr-5">
                <img
                  src={profile.image || "https://placehold.co/200x200/webp"} // Use Cloudinary image URL or fallback
                  alt={profile.name}
                  className="object-cover w-40 h-40 border border-teal-800 rounded-xl lg:w-52 lg:h-52"
                />
              </div>

              {/* Profile Text Section */}
              <div className="flex flex-col justify-between w-full h-full">
                <div className="px-5">
                  <h4 className="text-2xl font-bold">{profile.name}</h4>
                  <p className="mt-2 font-sans text-sm lg:text-normal">{profile.description}</p>
                </div>

                {/* Niches Section */}
                <div className="px-5 mt-2">
                  <div className="flex flex-wrap p-2 text-black bg-white bg-opacity-50 rounded-md w-fit ">
                    {profile.niches.split(", ").map((niche, index) => (
                      <div key={index} className="flex items-center mr-2 text-sm text-lime-500">
                        {niche}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex px-5">
                  <a href="/contact" className="mt-5 text-sm secondary-btn w-fit">Inquire</a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-lg text-center">No profiles available.</div> // Handle case where no profiles are returned
        )}
      </section>

      <Footer />
    </>
  );
}
