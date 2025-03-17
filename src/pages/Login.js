import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
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
        window.location.href = 'http://localhost:5000/api/v1/auth/google';
    };

    const handleFacebookLogin = () => {
        window.location.href = 'http://localhost:5000/api/v1/auth/facebook';
    };

    return (
        <div className="login-container" style={styles.container}>
            <h2>Login</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor='password'>Password</label>
                    <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>

                <button type="submit" style={styles.button}>Login</button>
            </form>

            <div style={{ marginTop: '1rem'}}>
                <p>Or login with:</p>
                <button onClick={handleGoogleLogin} style={styles.button}>Google</button>
                <button onClick={handleFacebookLogin} style={styles.button}>Facebook</button>
            </div>

            <p style={{ marginTop: '1rem'}}>
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    inputGroup: {
        marginBottom: '1rem'
    },
    button: {
        padding: '0.8rem 1.2rem',
        fontSize: '1rem',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        marginTop: '0.5rem'
    }
};

export default Login;
