"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const IndividualPlans = () => {
    const [expandedCard, setExpandedCard] = useState(null);

    const handleCardClick = (index) => {
        setExpandedCard(expandedCard === index ? null : index);
    };

    return (
        <section className="container flex flex-col items-center justify-center mt-10 plans lg:mt-0">
            <h2 className="mb-5 text-4xl">Individual Plans</h2>
            <div className="flex flex-wrap justify-center gap-2 text-white individualPlans lg:gap-5">
                {/* Social Media Management Card */}
                <div 
                    onClick={() => handleCardClick(0)} 
                    className={`flex flex-col lg:flex-grow-0 flex-grow lg:w-1/4 p-5 bg-teal-500 card rounded-xl cursor-pointer transition-all duration-300 ${expandedCard === 0 ? 'w-full h-60' : 'h-fit'}`}
                >
                    <div className="flex justify-between line1">
                        <h3>Social Media Management (SMM)</h3>
                        <FontAwesomeIcon icon={expandedCard === 0 ? faChevronUp : faChevronDown} className="w-4 ml-2" />
                    </div>
                    <div className="line2">
                        <p>$20 per hour</p>
                    </div>
                    {expandedCard === 0 && (
                        <div className="mt-2 font-sans line3">
                            <hr className="border-teal-800" />
                            <p>Manage your social media accounts to increase engagement and brand awareness.</p>
                        </div>
                    )}
                </div>

                {/* Administrative Assistance Card */}
                <div 
                    onClick={() => handleCardClick(1)} 
                    className={`flex flex-col lg:flex-grow-0 flex-grow lg:w-1/4 p-5 bg-teal-500 card rounded-xl cursor-pointer transition-all duration-300 ${expandedCard === 1 ? 'w-full h-60' : 'h-fit'}`}
                >
                    <div className="flex justify-between line1">
                        <h3>Administrative Assistance</h3>
                        <FontAwesomeIcon icon={expandedCard === 1 ? faChevronUp : faChevronDown} className="w-4 ml-2" />
                    </div>
                    <div className="line2">
                        <p>$15 per hour</p>
                    </div>
                    {expandedCard === 1 && (
                        <div className="mt-2 font-sans line3">
                            <hr className="border-teal-800" />
                            <p>Provide support with scheduling, correspondence, and organizational tasks.</p>
                        </div>
                    )}
                </div>

                {/* Lead Generation Specialist Card */}
                <div 
                    onClick={() => handleCardClick(2)} 
                    className={`flex flex-col lg:flex-grow-0 flex-grow lg:w-1/4 p-5 bg-teal-500 card rounded-xl cursor-pointer transition-all duration-300 ${expandedCard === 2 ? 'w-full h-60' : 'h-fit'}`}
                >
                    <div className="flex justify-between line1">
                        <h3>Lead Generation Specialist</h3>
                        <FontAwesomeIcon icon={expandedCard === 2 ? faChevronUp : faChevronDown} className="w-4 ml-2" />
                    </div>
                    <div className="line2">
                        <p>$15 per hour</p>
                    </div>
                    {expandedCard === 2 && (
                        <div className="mt-2 font-sans line3">
                            <hr className="border-teal-800" />
                            <p>Identify and qualify potential clients to increase sales opportunities.</p>
                        </div>
                    )}
                </div>

                {/* Real Estate Virtual Assistant (VA) Card */}
                <div 
                    onClick={() => handleCardClick(3)} 
                    className={`flex flex-col lg:flex-grow-0 flex-grow lg:w-1/4 p-5 bg-teal-500 card rounded-xl cursor-pointer transition-all duration-300 ${expandedCard === 3 ? 'w-full h-60' : 'h-fit'}`}
                >
                    <div className="flex justify-between line1">
                        <h3>Real Estate Virtual Assistant (VA)</h3>
                        <FontAwesomeIcon icon={expandedCard === 3 ? faChevronUp : faChevronDown} className="w-4 ml-2" />
                    </div>
                    <div className="line2">
                        <p>$15 per hour</p>
                    </div>
                    {expandedCard === 3 && (
                        <div className="mt-2 font-sans line3">
                            <hr className="border-teal-800" />
                            <p>Assist with property listings, client communications, and scheduling showings.</p>
                        </div>
                    )}
                </div>

                {/* Appointment Setter Card */}
                <div 
                    onClick={() => handleCardClick(4)} 
                    className={`flex flex-col lg:flex-grow-0 flex-grow lg:w-1/4 p-5 bg-teal-500 card rounded-xl cursor-pointer transition-all duration-300 ${expandedCard === 4 ? 'w-full h-60' : 'h-fit'}`}
                >
                    <div className="flex justify-between line1">
                        <h3>Appointment Setter (Caller)</h3>
                        <FontAwesomeIcon icon={expandedCard === 4 ? faChevronUp : faChevronDown} className="w-4 ml-2" />
                    </div>
                    <div className="line2">
                        <p>$15 per hour</p>
                    </div>
                    {expandedCard === 4 && (
                        <div className="mt-2 font-sans line3">
                            <hr className="border-teal-800" />
                            <p>Schedule appointments and follow up with clients to ensure attendance.</p>
                        </div>
                    )}
                </div>

                {/* Graphic Designer Card */}
                <div 
                    onClick={() => handleCardClick(5)} 
                    className={`flex flex-col lg:flex-grow-0 flex-grow lg:w-1/4 p-5 bg-teal-500 card rounded-xl cursor-pointer transition-all duration-300 ${expandedCard === 5 ? 'w-full h-60' : 'h-fit'}`}
                >
                    <div className="flex justify-between line1">
                        <h3>Graphic Designer</h3>
                        <FontAwesomeIcon icon={expandedCard === 5 ? faChevronUp : faChevronDown} className="w-4 ml-2" />
                    </div>
                    <div className="line2">
                        <p>$20 per hour</p>
                    </div>
                    {expandedCard === 5 && (
                        <div className="mt-2 font-sans line3">
                            <hr className="border-teal-800" />
                            <p>Create visual content to communicate messages effectively.</p>
                        </div>
                    )}
                </div>

                {/* Website Developer Card */}
                <div 
                    onClick={() => handleCardClick(6)} 
                    className={`flex flex-col lg:flex-grow-0 flex-grow lg:w-1/4 p-5 bg-teal-500 card rounded-xl cursor-pointer transition-all duration-300 ${expandedCard === 6 ? 'w-full h-60' : 'h-fit'}`}
                >
                    <div className="flex justify-between line1">
                        <h3>Website Developer</h3>
                        <FontAwesomeIcon icon={expandedCard === 6 ? faChevronUp : faChevronDown} className="w-4 ml-2" />
                    </div>
                    <div className="line2">
                        <p>$25 per hour</p>
                    </div>
                    {expandedCard === 6 && (
                        <div className="mt-2 font-sans line3">
                            <hr className="border-teal-800" />
                            <p>Build and maintain websites to enhance online presence.</p>
                        </div>
                    )}
                </div>
            </div>
            <a className="my-5 secondary-btn" href="#">Avail Now!</a>
        </section>
    );
};

export default IndividualPlans;
