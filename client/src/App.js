import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Contact from './Pages/Contact';
import APIKEY from './Pages/APIKEY';
import LoginForm from './components/loginform';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './Pages/ProtectedRoute';
import './App.css';
import PageNotFound from './components/pagenotfound';
import ResetPasswordForm from './components/ResetPasswordForm';
import AdminRegisterForm from './components/AdminRegisterForm';
import UserRegisterForm from './components/UserRegisterForm'

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usertype, setUsertype] = useState('');

    return (
        <div className="app">
            <Routes>
                <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} setUsertype={setUsertype} />} />
                <Route path="/register" element={<UserRegisterForm setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register-admin" element={<AdminRegisterForm setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/reset-password" element={<ResetPasswordForm />} />
                <Route
                    path="/Contact"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Contact />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/Contact/APIKEY"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <APIKEY />
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/admin-dashboard" 
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated && usertype === 'Admin'}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
