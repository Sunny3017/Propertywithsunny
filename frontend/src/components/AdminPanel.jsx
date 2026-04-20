import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLogin from '../pages/AdminLogin';

const AdminPanel = () => {
    const token = localStorage.getItem('adminToken');
    
    if (token) {
        return <AdminDashboard />;
    }
    
    return <AdminLogin />;
};

export default AdminPanel;
