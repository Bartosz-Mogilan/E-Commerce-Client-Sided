import React from "react";

function Home() {
  return (
    <div style={styles.container}>
      <h1>Welcome to TechGear Hub</h1>
      <p>Your one-stop shop for cutting-edge tech gadgets and gaming accessories.</p>
      <p>Discover the latest smart devices, gaming gear, and more!</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    background: '#f9f9f9'
  }
};

export default Home;




