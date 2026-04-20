import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLogin from '../pages/AdminLogin';

const AdminPanel = () => {
    const [token, setToken] = useState(localStorage.getItem('adminToken'));
    const location = useLocation();

    useEffect(() => {
        setToken(localStorage.getItem('adminToken'));
    }, [location]);
    
    if (token) {
        return <AdminDashboard />;
    }
    
    return <AdminLogin />;
};

export default AdminPanel;
