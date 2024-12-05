import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          {/* University Logo */}
          <img
            src="/images/UPC.png"
            alt="University Logo"
            className="university-logo"
          />
          <h1>Enigma Simulator</h1>
          <h2>Project Made by Moussa Akram NOUI</h2>
          <p>
            This Project is a simulation of the WWII encryption system called
            Enigma, made for Blockchain & Cryptography Course MIAGE M2
          </p>
          <button onClick={() => navigate("/simulation")}>
            Start Simulation
          </button>
        </div>
      </section>

      {/* Explanation Sections */}
      <div className="sections">
        <section className="simulation-section">
          <h2>About the Enigma Machine</h2>
          <p>
            The Enigma machine was a cipher device used by Nazi Germany during
            World War II to secure communications. It employed a complex system
            of rotating rotors and plugboard configurations, which created
            millions of possible settings, making it highly secure—until Allied
            cryptographers broke the code.
          </p>
        </section>

        <section className="simulation-section">
          <h2>How It Works</h2>
          <p>
            This simulation allows you to explore how the Enigma machine encoded
            messages. Adjust rotor positions, configure the plugboard, and see
            how each modification affects the encryption process in real-time.
          </p>
        </section>

        <section className="simulation-section">
          <h2>Key Features</h2>
          <ul>
            <li>Interactive rotors and plugboard settings</li>
            <li>Perform encryption and decryption process</li>
            <li>Keyboard and Lightboard similar to real Enigma</li>
          </ul>
        </section>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>
          This project was created by <span>Moussa Akram Noui</span> for the{" "}
          <span>Crypto & Blockchain Course</span>.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
