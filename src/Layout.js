import React from 'react';
import { Link } from 'react-router-dom'

function Layout ({children}) {
    return (
        <div className="container mt-4">
            <h2 className="text-center mb 4">Mindfulness</h2>
            <nav>
                <Link className="btn btn-primary me-2" to="/">Register</Link>
                <Link className="btn btn-info" to="/login">Login</Link>
            </nav>
            {children}
        </div>
    )
}

export default Layout