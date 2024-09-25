import React from 'react';
import './Home.css'; // Assuming you have a CSS file for styling
import { Link } from 'react-router-dom';
import ContactForm from './contact';
import { useInView } from 'react-intersection-observer'

const Home = () => {
  const { ref: section1Ref, inView: section1InView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // Trigger when 10% of the element is in view
  })
  const { ref: section2Ref, inView: section2InView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })



  return (
    <div ref={section1Ref} className="homepage  fade-in-left fade-in-left text-white primary animate-fadeIn">
      {/* Hero Section */}
      <section ref={section1Ref} className="flex flex-row small gap-10 wrap'">
        <div className='small w-full flex flex-col  gap-10  wrap'>
          <h1 style={{
            color: '',
          }} className="hero-title1 small wrap">Giving Hope, Sharing Love, Touching Hearts</h1>
          <h5 className='text-slate-300 text-lg '>
            Our mission is to empower individuals and uplift communities through our various initiatives.

            By providing resources, support, and opportunities, we aim to make a lasting impact on the lives of those in need.

            Together, we can create positive change.
          </h5>
          <Link to='/about' >
            <button className="btn">Learn More</button>
          </Link>
        </div>
        <img className='small img wrap'
          src="https://res.cloudinary.com/pitz/image/upload/v1727269505/WhatsApp_Image_2024-09-22_at_13.06.43_domw8a.jpg" alt="" />

      </section>
      {/* About the Foundation */}
      <section style={{
        color: 'white'
      }} ref={section1Ref} className="about text-zinc-50">
        <h2 style={{
          color: 'white'
        }} className='text-white'>About Us</h2>
        <p style={{
          color: 'white'
        }} >
          The Reuben Wairicu Foundation supports vulnerable groups including the elderly, inmates, and people living with disabilities.
        </p>
        <ul style={{
          color: 'white'
        }} >
          <li style={{
            color: 'white'
          }} >Founded in honor of Mr. & Mrs. Reuben Wairicu</li>
          <li style={{
            color: 'white'
          }} >Community support since the 70s with a focus on giving back and improving lives</li>
        </ul>
      </section>

      {/* Programs and Services */}
      <section ref={section1Ref} className="programs">
        <h2 style={{
          color: 'white'
        }} className="programs-heading">Our Programs</h2>
        <div style={{
          color: 'white'
        }} className="program-container">
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

      <section ref={section1Ref} className="get-involved">
        <h2>Get Involved</h2>
        <p>Support our mission by donating or volunteering.</p>
        <Link to='/donate' >
          <button className="btn">Donate Now</button>
        </Link>
      </section>
      <ContactForm />
    </div>
  );
};

export default Home;