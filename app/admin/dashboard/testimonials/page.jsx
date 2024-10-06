"use client"; // Mark as client component

import { useEffect, useState } from "react";
import { useAuthCheck } from "@/app/utils/auth"; // Import the auth check function
import AdminNav from "@/app/components/AdminNav";

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({ name: "", image: null, text: "" });
    const [editId, setEditId] = useState(null);
    const { loading, isAuthenticated } = useAuthCheck(); // Get loading and auth status
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages

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

    // While loading, return a loading message
    if (loading) {
        return <p>Loading...</p>;
    }

    // If not authenticated, you should already have redirected
    if (!isAuthenticated) {
        return null; // Or return a message, but the router should redirect
    }

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
        setErrorMessage(''); // Reset error message on submit

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
            setErrorMessage(error.message); // Set error message
        }
    };

    const resetForm = () => {
        setFormData({ name: "", image: null, text: "" });
        setEditId(null);
        setErrorMessage(''); // Reset error message
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
            resetForm(); // Reset form after delete
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            setErrorMessage(error.message); // Set error message
        }
    };
    

    return (
        <>
            <AdminNav />
            <div className="container p-5 mx-auto mt-28">
                <h1 className="mb-5 text-3xl font-bold">Testimonials</h1>

                {/* Display error message if any */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <form onSubmit={handleSubmit} className="flex w-full mb-5">
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        required={!editId || (editId && !formData.image)} // Conditional required
                        className="w-full p-2 mr-2 border lg:w-1/4"
                    />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        className="w-full p-2 mr-2 border lg:w-1/4"
                    />
                    <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Testimonial Text"
                        required
                        className="w-full p-2 mr-2 border lg:w-1/4"
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
                            <div className="flex">
                                {testimonial.image && (
                                    <img 
                                        src={testimonial.image}  // Ensure this path is correct
                                        alt={testimonial.name} 
                                        className="w-20 h-20 mr-4 rounded-full" 
                                    />
                                )}
                                <div className="flex flex-col w-full testimonialTexts justify-evenly">
                                    <strong>{testimonial.name}</strong>
                                    <p>{testimonial.text}</p>
                                </div>
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
        </>
    );
}
