import React from "react";

function About() {
    return (
        <div style={styles.container}>
            <h1>About Us</h1>
            <p>Welcome to our e-commerce platform.</p>
        </div>
    );
}

const styles = {
    container: {
        padding: '2rem',
        textAlign: 'center'
    }
};

export default About;

