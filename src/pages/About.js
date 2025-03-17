import React from "react";

function About() {
  return (
    <div style={styles.container}>
      <h1>About TechGear Hub</h1>
      <p>At TechGear Hub, we are passionate about delivering the best in tech gadgets and gaming accessories. Our mission is to provide innovative products that enhance your digital and gaming experience.</p>
      <p>Whether you're a tech enthusiast or a dedicated gamer, our curated selection ensures you get quality, performance, and style. Explore our collection and join us on the journey to elevate your tech game!</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    background: '#fff'
  }
};

export default About;



