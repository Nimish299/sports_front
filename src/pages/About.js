import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Welcome to Sports Connect</h1>
        <p style={styles.subheading}>
          Where Players Meet Coaches to Elevate Their Game
        </p>
      </div>
      <div style={styles.content}>
        <h2 style={styles.sectionHeading}>Our Mission</h2>
        <p style={styles.paragraph}>
          At Sports Connect, we are dedicated to helping athletes unlock their
          full potential by connecting them with top-tier coaches who provide
          personalized training and guidance.
        </p>
        <h2 style={styles.sectionHeading}>Why Choose Sports Connect?</h2>
        <p style={styles.paragraph}>
          Whether you're aiming to refine your skills or excel in your sport, we
          offer:
        </p>
        <ul style={styles.list}>
          <li>
            Access to a diverse network of certified coaches across various
            sports disciplines
          </li>
          <li>
            Customized training programs tailored to your unique abilities and
            goals
          </li>
          <li>
            Flexible scheduling options to accommodate your busy lifestyle
          </li>
          <li>State-of-the-art facilities for optimal training experiences</li>
          <li>A supportive community to keep you motivated and inspired</li>
        </ul>
        <h2 style={styles.sectionHeading}>Join Us Today</h2>
        <p style={styles.paragraph}>
          Ready to take your game to the next level? Sign up with Sports Connect
          and embark on a journey of growth, improvement, and success!
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "40px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  heading: {
    fontSize: "36px",
    margin: "0",
    color: "#333",
  },
  subheading: {
    fontSize: "18px",
    color: "#666",
  },
  content: {
    lineHeight: "1.6",
  },
  sectionHeading: {
    marginTop: "40px",
    marginBottom: "20px",
    fontSize: "24px",
    color: "#333",
  },
  paragraph: {
    marginBottom: "20px",
    fontSize: "16px",
    color: "#555",
  },
  list: {
    paddingLeft: "20px",
    marginBottom: "20px",
  },
};

export default About;
