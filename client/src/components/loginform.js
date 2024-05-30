import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./loginform.css";
import axios from "axios";

function LoginForm({ setIsAuthenticated, setUsertype }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                if (result.data.message === "Success") {
                    setIsAuthenticated(true);
                    setUsertype(result.data.usertype);
                    if (result.data.usertype === "Admin") {
                        navigate("/admin-dashboard");
                    } else {
                        navigate("/Contact");
                    }
                    toast.success("Successful login");
                } else {
                    setErrorMessage("result.data.message");
                }
            })
            .catch(err => {
                if (err.response && err.response.data.message) {
                    setErrorMessage(err.response.data.message); 
                    toast.error(err.response.data.message)
                } else {
                    setErrorMessage("An error occurred during login.");     
                }
            });
    };

    return (
        <form className="cover" onSubmit={handleSubmit}>
            <h1>Account Login</h1>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your Email"
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
                    placeholder="Enter your Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className={`login-btn ${!email || !password ? "disabled" : ""}`}
            >
                Login
            </button>
            <p onClick={() => navigate('/register')}>Don't have an account? Register</p>
            <p onClick={() => navigate('/reset-password')}>Forgot your password? Reset Password</p>
        </form>
    );
}

export default LoginForm;
