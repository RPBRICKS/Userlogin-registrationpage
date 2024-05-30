import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AdminDashboard.css"; 

function AdminDashboard() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            setUsers(response.data);
        } catch (err) {
            toast.error("An error occurred while fetching users.");
        }
    };

    const approveUser = async (id) => {
        try {
            await axios.put(`http://localhost:3001/approve-user/${id}`);
            toast.success("User approved successfully");
            fetchUsers();  
        } catch (err) {
            toast.error("An error occurred while approving the user.");
        }
    };

    const rejectUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/reject-user/${id}`);
            toast.success("User rejected successfully");
            fetchUsers(); 
        } catch (err) {
            toast.error("An error occurred while rejecting the user.");
        }
    };

    return (
        <div className="page">
            <div className="cover">
                <h1>Admin Dashboard</h1>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="approve-btn" onClick={() => approveUser(user._id)}>Approve</button>
                                    <button className="reject-btn" onClick={() => rejectUser(user._id)}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
