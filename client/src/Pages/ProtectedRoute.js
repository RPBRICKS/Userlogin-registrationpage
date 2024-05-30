import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, usertype, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (usertype && usertype !== "Admin") {
        return <Navigate to="/Contact" />;
    }

    return children;
};

export default ProtectedRoute;
