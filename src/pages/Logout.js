import React from 'react';

const LogoutButton = () => {
    const handleLogout = async () => {
        try{
            const response = await fetch('/api/logout', {
                method: 'GET',
                credentials: 'include'
            });
            if(response.ok) {
                console.log('Logged out successfully');
            }
        } catch (error) {
            console.error('Logout error', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
