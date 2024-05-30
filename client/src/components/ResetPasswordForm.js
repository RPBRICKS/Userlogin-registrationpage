import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./loginform.css";
import axios from "axios";

function ResetPasswordForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation checks
        if (!email || !password || !newPassword) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }

        axios.post('http://localhost:3001/reset-password', { email, password, newPassword })
            .then(result => {
                toast.success("Password successfully updated");
                navigate("/login");
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error("An error occurred while resetting the password.");
                }
                console.log(err);
            });
    };

    return (
        <form className="cover" onSubmit={handleSubmit}>
            <h1>Reset Password</h1>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Current Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your current password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="newPassword">New Password:</label>
                <input
                    type="password"
                    id="newPassword"
                    placeholder="Enter your new password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div
                className={`login-btn ${!email || !password || !newPassword ? "disabled" : ""}`}
                style={{ pointerEvents: !email || !password || !newPassword ? "none" : "auto" }}
                onClick={handleSubmit}
            >
                Reset Password
            </div>
        </form>
    );
};

export default ResetPasswordForm;
