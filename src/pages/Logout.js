import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const [loading, setLoading] = useState(false);
    const [logoutError, setLogoutError] = useState('');
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLoading(true);
        setLogoutError('');
        try{
            const response = await fetch('http://localhost:5000/api/v1/auth/logout', {
                method: 'GET',
                credentials: 'include'
            });
            if(response.ok) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                const errorData = await response.json();
                setLogoutError(errorData.error || 'Logout failed');
            }
        } catch (error) {
            console.error('Logout error', error);
            setLogoutError('Logout failed. Please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <button onClick={handleLogout} disabled={loading} style={styles.button}>
                {loading ? 'Logging out...' : 'Logout'}
            </button>
            {logoutError && <p style={{ color: 'red'}}>{logoutError}</p>}
        </div>
    )
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '2rem'
    },
    button: {
        padding: '0.8rem 1.2rem',
        fontSize: '1rem',
        cursor: 'pointer',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px'
    }
};

export default LogoutButton;


