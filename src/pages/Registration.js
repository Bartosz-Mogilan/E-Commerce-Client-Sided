import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username, password}),
            });
            
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            if(data.token) {
                localStorage.setItem('token', data.token);
            }

            navigate('/');

        } catch(err) {
            setError(err.message);
        } 
    };

return (
    <div className="registration.container">
        <h2>Create an account</h2>
        {error && <p style ={{ color: 'red'}}>{error}</p>}

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input 
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>

            <button type="submit">Register</button>
        </form>

        <p>
            Already have an account? <Link to="/login">Login here</Link>.
        </p>
    </div>
    );
};

export default Registration;