import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Enigma Simulator</h1>
      <p>
        Experience the historic encryption machine used during World War II.
        Encrypt messages, watch the rotors move, and relive history!
      </p>
      <button onClick={() => navigate("/simulation")}>Start Simulation</button>
    </div>
  );
};

export default LandingPage;
