import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./loginform.css";
import axios from "axios";

function AdminRegisterForm({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const usertype = 'Admin'
    const [secretKey, setSecretKey] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmpassword) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }
        if (password !== confirmpassword) {
            toast.error("Passwords do not match.");
            return;
        }

        axios.post('http://localhost:3001/register', { username, email, password, usertype, secretKey })
            .then(result => {
                toast.success("Successfully created Admin account");
                navigate("/admin-dashboard");
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error("An error occurred while creating the account.");
                }
                console.log(err);
            });
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <form className="cover" onSubmit={handleSubmit}>
            <h1>Register Account</h1>
            
                <div className="input-group">
                    <label htmlFor="secretkey">Secret Key:</label>
                    <input
                        type="text"
                        id="secretkey"
                        placeholder="Enter your Secret Key"
                        name="secretkey"
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                    />
                </div>
            <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
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
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label htmlFor="confirmpassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmpassword"
                    placeholder="Confirm your password"
                    name="confirmpassword"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className={`login-btn ${!username || !password || !email || !confirmpassword || !usertype ? "disabled" : ""}`}
                onClick={handleSubmit}
            >
                Register
            </button>
            <p onClick={() => navigate('/login')}>Already have an account? Log in</p>
            <p onClick={() => navigate('/reset-password')}>Reset Password?</p>
        </form>
    );
};

export default AdminRegisterForm;
