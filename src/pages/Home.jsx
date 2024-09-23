import React from 'react';
import './Home.css'; // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Giving Hope, Sharing Love, Touching Hearts</h1>
        <Link to='/about' >
          <button className="btn">Learn More</button>
        </Link>
      </section>

      {/* About the Foundation */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          The Reuben Wairicu Foundation supports vulnerable groups including the elderly, inmates, and people living with disabilities.
        </p>
        <ul>
          <li>Founded in honor of Mr. & Mrs. Reuben Wairicu</li>
          <li>Community support since the 70s with a focus on giving back and improving lives</li>
        </ul>
      </section>

      {/* Programs and Services */}
      <section className="programs">
        <h2 className="programs-heading">Our Programs</h2>
        <div className="program-container">
          <div className="program">
            <h3>Prison Ministry</h3>
            <p>Supporting inmates with basic needs and counseling.</p>
          </div>
          <div className="program">
            <h3>Elderly Care</h3>
            <p>Providing assistance and companionship to the elderly.</p>
          </div>
          <div className="program">
            <h3>Support for Teen Mums</h3>
            <p>Empowering young mothers with skills and support.</p>
          </div>
        </div>
      </section>

      <section className="get-involved">
        <h2>Get Involved</h2>
        <p>Support our mission by donating or volunteering.</p>
        <Link to='/donate' >
        <button className="btn">Donate Now</button>
        </Link>
      </section>
    </div>
  );
};

export default Home;