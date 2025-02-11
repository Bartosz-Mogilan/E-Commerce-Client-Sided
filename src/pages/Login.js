import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { ' Content Type': 'application/json'},
                body: JSON.stringify({ username, password}),
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            if(data.token) {
                localStorage.setItem('token', data.token);
            } 

            navigate('/');
            } catch(err) {
                setError(err.message);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = '/api/auth/google';
    };

    const handleFacebookLogin = () => {
        window.location.href = '/api/auth/facebook';
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                    id="password"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            <div style={{ marginTop: '1rem'}}>
                <p>Or login with:</p>
                <button onClick={handleGoogleLogin}>Google</button>
                <button onClick={handleFacebookLogin}>Facebook</button>
            </div>

            <p style={{ marginTop: '1rem'}}>
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
};

export default Login;