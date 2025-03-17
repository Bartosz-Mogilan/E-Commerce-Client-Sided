import React from "react";

function Home() {
    return (
        <div style={styles.container}>
            <h1>Welcome to The E-Commerce App</h1>
            <p>Your one-stop shop for the best products online.</p>
        </div>
    );
}

const styles = {
    container: {
        padding: '2rem',
        textAlign: 'center'
    }
};

export default Home;

