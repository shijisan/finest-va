"use client";
"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRefs = useRef([]);

    const testimonials = [
        {
            id: 1,
            name: 'John Doe',
            quote: 'This service was fantastic! Highly recommend to everyone.',
            image: 'https://via.placeholder.com/100',
            bgColor: 'bg-blue-500',
        },
        {
            id: 2,
            name: 'Jane Smith',
            quote: 'An amazing experience from start to finish.',
            image: 'https://via.placeholder.com/100',
            bgColor: 'bg-yellow-500',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            quote: 'I couldn’t be happier with the results!',
            image: 'https://via.placeholder.com/100',
            bgColor: 'bg-green-500',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 3000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [testimonials.length]);

    const handleCardClick = (index) => {
        setCurrentIndex(index);
    };

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
                        style={{ minWidth: '33.33%', height: '250px' }} // Fixed width and min-height
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
