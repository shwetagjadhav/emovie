import React from 'react';
import './Welcome.css';
 
const WelcomePage = () => {
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1 className="welcome-text">Welcome to Cinemate</h1>
        <div className="buttons">
          <button className="btn btn-outline-light" onClick={() => window.location.href='/signup'}>Sign Up</button>
          <button className="btn btn-outline-light" onClick={() => window.location.href='/login'}>Login</button>
        </div>
        <br/><br/>
        <p>Experience the magic of Cinema with our seamless booking platform.</p> 
      </div>
      
    </div>
  );
};

export default WelcomePage;