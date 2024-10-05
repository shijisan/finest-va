"use client"; // Mark as client component

import { useEffect, useState } from "react";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({ name: "", image: null, text: "" });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await fetch("/api/testimonials");
                if (!response.ok) {
                    throw new Error("Failed to fetch testimonials");
                }
                const data = await response.json();
                setTestimonials(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
                setTestimonials([]); // Reset testimonials on error
            }
        };

        fetchTestimonials();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "image") {
            setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const method = editId ? "PUT" : "POST"; 
        const url = editId ? `/api/testimonials/${editId}` : `/api/testimonials`;

        // Check if there are already 3 testimonials
        if (!editId && testimonials.length >= 3) {
            alert("You can only have a maximum of 3 testimonials.");
            return;
        }

        const data = new FormData();
        data.append("name", formData.name);
        data.append("text", formData.text);
        if (formData.image) {
            data.append("image", formData.image);
        }

        try {
            const response = await fetch(url, {
                method,
                body: data,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error details:", errorText);
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
        }
    };

    const resetForm = () => {
        setFormData({ name: "", image: null, text: "" });
        setEditId(null);
    };

    const handleEdit = (testimonial) => {
        setFormData({ name: testimonial.name, image: null, text: testimonial.text });
        setEditId(testimonial.id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("Failed to delete testimonial");
            }
            setTestimonials((prev) => prev.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting testimonial:", error);
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
                    type="file"
                    name="image"
                    onChange={handleChange}
                    required={!editId}
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
                {testimonials.slice(0, 3).map((testimonial) => (
                    <li key={testimonial.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                            <strong>{testimonial.name}</strong>
                            {testimonial.image && (
                                <img 
                                    src={`/uploads/${testimonial.image}`}  // Add /uploads/ prefix here
                                    alt={testimonial.name} 
                                    className="w-16 h-16 rounded-full" 
                                />
                            )}
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
