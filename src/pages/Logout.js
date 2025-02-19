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
            const response = await fetch('/api/logout', {
                method: 'GET',
                credentials: 'include'
            });
            if(response.ok) {
                console.log('Logged out successfully');
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
        <div>
            <button onClick={handleLogout} disabled={loading}>
                {loading ? 'Logging out...' : 'Logout'}
            </button>
            {logoutError && <p style={{ color: 'red'}}>{logoutError}</p>}
        </div>
    )
};

export default LogoutButton;
