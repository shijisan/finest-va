"use client";

import { useState, useEffect } from "react";
import AdminNav from "@/app/components/AdminNav";
import { useAuthCheck } from "@/app/utils/auth"; // Import the auth check function

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" });
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Define loading state
  const { isAuthenticated } = useAuthCheck(); // Get auth status

  // Fetch all admins when the page loads
  useEffect(() => {
    async function fetchAdmins() {
      setLoading(true); // Set loading to true when fetching starts
      const res = await fetch("/api/admins");

      if (!res.ok) {
        const errorMessage = await res.text();
        setError(errorMessage);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setAdmins(data);
      setLoading(false); // Set loading to false when fetching ends
    }

    fetchAdmins();
  }, []);

  // While loading, return a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If not authenticated, you should already have redirected
  if (!isAuthenticated) {
    return null; // Or return a message, but the router should redirect
  }

  // Handle form submission for adding a new admin
  const handleAddAdmin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAdmin),
    });

    if (res.ok) {
      const newAddedAdmin = await res.json();
      setAdmins([...admins, newAddedAdmin]);
      setNewAdmin({ username: "", password: "" });
    } else {
      const errorMessage = await res.text();
      setError(errorMessage);
    }
  };

  // Handle deleting an admin
  const handleDeleteAdmin = async (id) => {
    const res = await fetch(`/api/admins/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setAdmins(admins.filter((admin) => admin.id !== id));
    } else {
      const errorMessage = await res.text();
      setError(errorMessage);
    }
  };

  // Handle updating an admin
  const handleUpdateAdmin = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/admins/${editingAdmin.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingAdmin),
    });

    if (res.ok) {
      const updatedAdmin = await res.json();
      setAdmins(
        admins.map((admin) =>
          admin.id === updatedAdmin.id ? updatedAdmin : admin
        )
      );
      setEditingAdmin(null); // Clear editing state
    } else {
      const errorMessage = await res.text();
      setError(errorMessage);
    }
  };

  return (
    <>
      <AdminNav />

      <div className="container mt-10">
        <h1 className="mb-6 text-2xl font-bold">Admin Management</h1>
        {error && <p className="text-red-500">{error}</p>}

        {/* Admin List */}
        <div className="px-5">
          <table className="w-full mb-6 border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-4 py-2 border">{admin.id}</td>
                  <td className="px-4 py-2 border">{admin.username}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded"
                      onClick={() => setEditingAdmin(admin)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 text-white bg-red-500 rounded"
                      onClick={() => handleDeleteAdmin(admin.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form to add a new admin */}
        <div className="px-5">
          <h2 className="mb-4 text-xl font-bold">Add New Admin</h2>
          <form onSubmit={handleAddAdmin} className="mb-6">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={newAdmin.username}
                onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                className="w-full px-4 py-2 border"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                className="w-full px-4 py-2 border"
                required
              />
            </div>
            <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded">
              Add Admin
            </button>
          </form>
        </div>

        {/* Modal for editing an admin */}
        {editingAdmin && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-8 bg-white rounded-lg shadow-lg">
              <h2 className="mb-4 text-xl font-bold">Edit Admin</h2>
              <form onSubmit={handleUpdateAdmin}>
                <div className="mb-4">
                  <label htmlFor="editUsername" className="block mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="editUsername"
                    value={editingAdmin.username}
                    onChange={(e) =>
                      setEditingAdmin({ ...editingAdmin, username: e.target.value })
                    }
                    className="w-full px-4 py-2 border"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="editPassword" className="block mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="editPassword"
                    value={editingAdmin.password || ''} // Maintain password input for editing
                    onChange={(e) =>
                      setEditingAdmin({ ...editingAdmin, password: e.target.value })
                    }
                    className="w-full px-4 py-2 border"
                  />
                </div>
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
                  Update Admin
                </button>
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
                  className="px-4 py-2 ml-4 text-white bg-gray-500 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
