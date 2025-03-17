import React from "react";
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main style={styles.container}>
            <section>
                <h1 style={styles.heading}>Error 404 - Page not found</h1>
                <p style={styles.paragraph}>The page you are looking for does not exist.</p>
                <Link to="/">Go back to Home</Link>
            </section>
        </main>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '2rem',
    },
    heading: {
        fontSize: '2rem',
        color: '#333',
    },
    paragraph: {
        fontSize: '1.2rem',
        color: '#555',
    },
};

export default NotFound;

