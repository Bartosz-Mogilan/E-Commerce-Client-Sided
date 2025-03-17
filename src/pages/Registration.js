import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if(password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username, email, password}),
            });
            
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            if(data.token) {
                localStorage.setItem('token', data.token);
            }

            navigate('/login');

        } catch(err) {
            setError(err.message);
        } 
    };

    return (
        <div className="registration-container" style={styles.container}>
            <h2>Create an account</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="email">Email:</label>
                    <input 
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="password">Password:</label>
                    <input 
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" style={styles.button}>Register</button>
            </form>

            <p>
                Already have an account? <Link to="/login">Login here</Link>.
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
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px'
    }
};

export default Registration;

