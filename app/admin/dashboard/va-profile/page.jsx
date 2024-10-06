"use client";
import { useEffect, useState } from 'react';
import Footer from "@/app/components/Footer";
import AdminNav from '@/app/components/AdminNav';
import { useAuthCheck } from "@/app/utils/auth"; // Import the auth check function

const VAProfileDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    description: '',
    niches: '', // Change from array to a string for simple text input
  });
  const [editingProfileId, setEditingProfileId] = useState(null); // Track which profile is being edited
  const { loading, isAuthenticated } = useAuthCheck(); // Get loading and auth status

  // Fetch existing profiles from the API
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/profiles'); // Adjust the path according to your API route
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Failed to fetch profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  // While loading, return a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If not authenticated, you should already have redirected
  if (!isAuthenticated) {
    return null; // Or return a message, but the router should redirect
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  // Handle form submission for adding/updating profiles
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('image', formData.image);
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('niches', formData.niches); // Append niches as a simple string

    try {
      const response = await fetch(`/api/profiles${editingProfileId ? `/${editingProfileId}` : ''}`, {
        method: editingProfileId ? 'PUT' : 'POST',
        body: form,
      });

      if (!response.ok) {
        throw new Error(editingProfileId ? 'Failed to update profile' : 'Failed to add profile');
      }

      const newProfile = await response.json();
      setProfiles((prevProfiles) =>
        editingProfileId
          ? prevProfiles.map((profile) => (profile.id === editingProfileId ? newProfile : profile))
          : [...prevProfiles, newProfile]
      );

      // Reset form and editing profile state
      setFormData({ image: null, name: '', description: '', niches: '' });
      setEditingProfileId(null);
    } catch (error) {
      console.error('Error adding/updating profile:', error);
    }
  };

  // Start editing a profile
  const handleEdit = (profile) => {
    setFormData({
      image: null, // Reset the image field, this could be handled differently depending on your needs
      name: profile.name,
      description: profile.description,
      niches: profile.niches, // Since niches is now a string, no need to handle it as an array
    });
    setEditingProfileId(profile.id); // Set the ID of the profile being edited
  };

  // Handle delete profile
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      try {
        const response = await fetch(`/api/profiles/${id}`, { // Corrected the path to match your API structure
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete profile');
        }

        setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));
      } catch (error) {
        console.error('Error deleting profile:', error);
      }
    }
  };

  return (
    <>
      <AdminNav />
      <section className="container flex flex-col items-center w-full px-5 mt-28">
        <h2 className="mb-5 text-3xl">VA Profile Dashboard</h2>
        <form onSubmit={handleSubmit} className="w-full mb-5">
          <div className="flex flex-col mb-4">
            <label>Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleInputChange}
              className="px-2 py-1 border rounded"
              required={!editingProfileId} // Make required only if adding
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="px-2 py-1 border rounded"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Niches:</label>
            <input
              type="text"
              name="niches"
              value={formData.niches}
              onChange={handleInputChange}
              className="px-2 py-1 border rounded"
              placeholder="e.g. Web Developer, Social Media Manager"
              required
            />
          </div>
          <button type="submit" className="px-4 py-2 text-white bg-teal-500 rounded">
            {editingProfileId ? 'Update Profile' : 'Add Profile'}
          </button>
        </form>

        <h3 className="mb-4 text-2xl">Existing Profiles</h3>
        <div className="flex flex-col">
          {profiles.map((profile) => (
            <div key={profile.id} className="flex flex-col items-start p-4 mb-2 border">
              <img src={`/uploads/${profile.image}`} alt={profile.name} className="mb-2" />
              <h4 className="text-xl">{profile.name}</h4>
              <p>{profile.description}</p>
              <p className="font-light text-gray-600">{profile.niches}</p>
              <div className="flex mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(profile)}
                  className="px-2 py-1 text-white bg-blue-500 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(profile.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default VAProfileDashboard;
