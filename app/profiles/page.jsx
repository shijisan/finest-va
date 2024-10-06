"use client";

import Image from "next/image";
import Nav from "../components/Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]); // State to hold profiles
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch profiles from the API
  const fetchProfiles = async () => {
    try {
      const response = await fetch('/api/profiles'); // Adjust this to your API endpoint
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(); // Fetch profiles on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      <Nav />

      <section className="container flex flex-col px-5 mt-28">
        {profiles.map((profile) => (
          <div key={profile.id} className="flex flex-col items-center w-full px-5 py-10 mb-4 text-white bg-teal-500 lg:items-start lg:flex-row card rounded-3xl">
            <div className="flex flex-col items-center justify-center lg:border-teal-800 min-w-48 min-h-48 card-image lg:me-5 lg:pe-5 lg:border-e">
              <img
                src={profile.image ? `/uploads/${profile.image}` : "https://placehold.co/200x200/webp"}
                alt={profile.name}
                className="object-cover w-full h-full rounded-xl aspect-square"
              />
              <hr className="hidden w-full my-3 border-teal-800 lg:block" />
              <a href="/contact" className="mt-3 secondary-btn w-fit">Inquire</a>
            </div>
            <div className="flex flex-col w-full card-texts">
              <div className="px-5 card-title">
                <hr className="block my-3 border-teal-800 lg:hidden" />
                <h4 className="text-3xl">{profile.name}</h4>
              </div>
              <hr className="my-3 border-teal-800" />
              <div className="px-5 card-desc">
                <p>{profile.description}</p>
              </div>
              <hr className="px-5 my-3 border-teal-800" />

              <div className="px-5 card-flair">
                <h5>Niches:</h5>
                <div className="p-2 mx-2 text-black bg-white bg-opacity-50 rounded-md card w-fit">
                  {/* Displaying each niche */}
                  {profile.niches.split(', ').map((niche, index) => (
                    <div key={index} className="text-sm">
                      <FontAwesomeIcon icon={['fas', 'check-circle']} /> {niche} {/* Add relevant FontAwesome icon */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </>
  );
}
