// /app/admin/dashboard/testimonials/page.jsx

"use client"; // Mark as client component

import { useEffect, useState } from "react";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]); // Ensure it's initialized as an array
    const [formData, setFormData] = useState({ name: "", image: "", text: "" });
    const [editId, setEditId] = useState(null);

    // Fetch testimonials on component mount
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("/api/testimonials");
                if (!response.ok) {
                    throw new Error("Failed to fetch testimonials");
                }
                const data = await response.json();
                // Ensure data is an array
                setTestimonials(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
                // Optionally, set testimonials to an empty array or show a message
                setTestimonials([]);
            }
        };

        fetchTestimonials();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission for creating/updating testimonials
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const method = editId ? "PUT" : "POST";
        const url = editId ? `/api/testimonials/${editId}` : `/api/testimonials`;

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit testimonial");
            }

            const updatedTestimonial = await response.json();
            setTestimonials((prev) => {
                if (editId) {
                    return prev.map((t) => (t.id === editId ? updatedTestimonial : t));
                }
                return [...prev, updatedTestimonial];
            });
            resetForm();
        } catch (error) {
            console.error("Error submitting testimonial:", error);
            // Optionally, show an error message to the user
        }
    };

    // Reset form fields
    const resetForm = () => {
        setFormData({ name: "", image: "", text: "" });
        setEditId(null);
    };

    // Handle edit button click
    const handleEdit = (testimonial) => {
        setFormData({ name: testimonial.name, image: testimonial.image, text: testimonial.text });
        setEditId(testimonial.id);
    };

    // Handle delete button click
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("Failed to delete testimonial");
            }
            setTestimonials((prev) => prev.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            // Optionally, show an error message to the user
        }
    };

    return (
        <div className="container p-5 mx-auto">
            <h1 className="mb-5 text-3xl font-bold">Testimonials</h1>

            <form onSubmit={handleSubmit} className="mb-5">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="p-2 mr-2 border"
                />
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL"
                    required
                    className="p-2 mr-2 border"
                />
                <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    placeholder="Testimonial Text"
                    required
                    className="p-2 mr-2 border"
                ></textarea>
                <button type="submit" className="px-4 py-2 text-white bg-blue-500">
                    {editId ? "Update Testimonial" : "Add Testimonial"}
                </button>
                {editId && (
                    <button type="button" onClick={resetForm} className="px-4 py-2 ml-2 text-white bg-gray-500">
                        Cancel
                    </button>
                )}
            </form>

            <ul className="space-y-2">
                {testimonials.map((testimonial) => (
                    <li key={testimonial.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                            <strong>{testimonial.name}</strong>
                            <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full" />
                            <p>{testimonial.text}</p>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(testimonial)} className="px-2 py-1 mr-2 text-white bg-yellow-500">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(testimonial.id)} className="px-2 py-1 text-white bg-red-500">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
