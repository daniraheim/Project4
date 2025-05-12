import React from 'react';
import { Link } from 'react-router-dom'
import './App.css';

function Layout ({children}) {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb 4 fw-bold">Mindfulness</h1>
            <nav>
                <Link className="btn btn-primary me-2 text-center mb 4" to="/">Welcome</Link>
                <Link className="btn btn-info" to="/login">Login</Link>
            </nav>
            {children}
        </div>
    )
}

export default Layout