"use client";
import { useEffect, useRef, useState } from 'react';

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonials, setTestimonials] = useState([]); // State for testimonials

    // Fetch testimonials from the API
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('/api/testimonials'); // Adjust the path according to your API route
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

    // Determine classes for left, current (center), and right cards
    const getCardPositionClass = (index) => {
        const isCurrent = index === currentIndex;
        const isLeft = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
        const isRight = index === (currentIndex + 1) % testimonials.length;

        return isCurrent
            ? 'scale-110 z-10 transform' // Centered and larger
            : isLeft
            ? 'left-0 scale-90 z-0 transform' // Left card
            : isRight
            ? 'right-0 scale-90 z-0 transform' // Right card
            : 'hidden'; // Hide cards that aren't in the immediate left or right
    };

    return (
        <section className={`container flex items-center justify-center h-full overflow-hidden ${testimonials.length < 3 ? 'relative' : ''}`}>
            <h2 className="relative z-10 mb-8 text-3xl font-semibold">Testimonies</h2>
            {testimonials.map((testimonial, index) => (
                <div
                    key={testimonial.id}
                    className={`absolute h-full transition-transform duration-500 lg:w-auto w-full ${getCardPositionClass(index)}`}
                    onClick={() => handleCardClick(index)}
                    style={{ minWidth: '33.33%', height: '250px', maxWidth: '90%' }}
                >
                    <div className="flex flex-col items-center justify-center h-full p-5 rounded shadow-lg bg-gradient">
                        <img
                            src={testimonial.image} // Using the provided image URL directly
                            alt={`${testimonial.name}'s picture`}
                            className="object-cover w-24 h-24 mb-3 rounded-full"
                        />
                        <p className="font-sans text-center text-white">{testimonial.text}</p>
                        <p className="mt-2 font-semibold text-white">{testimonial.name}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}
