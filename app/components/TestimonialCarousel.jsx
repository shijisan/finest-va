"use client";
import { useEffect, useRef, useState } from 'react';

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonials, setTestimonials] = useState([]); // State for testimonials
    const cardRefs = useRef([]);

    // Fetch testimonials from the API
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/api/admin/dashboard/testimonial'); // Adjust the path according to your API route
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTestimonials(data); // Assuming the API returns an array of testimonials
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            }
        };

        fetchTestimonials();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [testimonials.length]);

    const handleCardClick = (index) => {
        setCurrentIndex(index);
    };

    // Hide the carousel if there are no testimonials
    if (testimonials.length === 0) {
        return null; // Or return a placeholder if desired
    }

    return (
        <div className="relative flex items-center justify-center h-full">
            {testimonials.map((testimonial, index) => {
                const isCurrent = index === currentIndex;
                const isLeft = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
                const isRight = index === (currentIndex + 1) % testimonials.length;

                return (
                    <div
                        key={testimonial.id}
                        className={`absolute transition-transform duration-500 transform 
                            ${isCurrent ? 'scale-110 z-10' : isLeft || isRight ? 'scale-90 z-0' : 'scale-75'}
                            ${isLeft ? 'left-0' : isRight ? 'right-0' : 'translate-x-0'}`}
                        ref={(el) => (cardRefs.current[index] = el)}
                        onClick={() => handleCardClick(index)}
                        style={{ minWidth: '33.33%', height: '250px', maxWidth: '90%' }} // Fixed width and min-height
                    >
                        <div className={`${testimonial.bgColor} p-5 rounded shadow-lg flex flex-col justify-center items-center h-full`}>
                            <img src={testimonial.image} alt={`${testimonial.name}'s picture`} className="mb-3 rounded-full" />
                            <p className="text-center text-white">{testimonial.quote}</p>
                            <p className="mt-2 font-semibold text-white">{testimonial.name}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
