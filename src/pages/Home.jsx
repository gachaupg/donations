import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import ContactForm from './contact';
import Programs from './programs';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: missionRef, inView: missionInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: impactRef, inView: impactInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: ctaRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="homepage">
      <section ref={heroRef} className={`hero fold ${heroInView ? 'is-visible' : ''}`}>
        <div className="hero__content">
          <div className="hero__tag">Rooted in Community</div>
          <h1>Giving Hope, Sharing Love, Touching Hearts</h1>
          <p>
            We uplift vulnerable families across Kenya with food security, health outreach, and
            restorative programs. Together, we honour the legacy of Reuben Wairicu by building a
            future where dignity is a human right, not a privilege.
          </p>
          <div className="hero__actions">
            <Link to="/donate" className="btn btn--primary">
              Donate Now
            </Link>
            <Link to="/about" className="btn btn--outline">
              Discover Our Story
            </Link>
          </div>
          <div className="hero__stats">
            <div className="stat-card">
              <span className="stat-card__value">1.2k+</span>
              <span className="stat-card__label">Families Supported</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">37</span>
              <span className="stat-card__label">Partner Communities</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">150</span>
              <span className="stat-card__label">Dedicated Volunteers</span>
            </div>
          </div>
        </div>
        <div className="hero__media">
          <div className="hero__image-frame">
            <img
              src="https://res.cloudinary.com/pitz/image/upload/v1727269505/WhatsApp_Image_2024-09-22_at_13.06.43_domw8a.jpg"
              alt="Volunteers delivering care packages to families"
            />
            <div className="hero__badge">Serving since 1970s</div>
          </div>
          <div className="hero__note">
            <strong>Community First</strong>
            <p>
              Every donation fuels on-the-ground initiatives that restore dignity and open doors to
              opportunity.
            </p>
          </div>
        </div>
      </section>

      <section
        ref={missionRef}
        className={`mission fold ${missionInView ? 'is-visible' : ''}`}
      >
        <div className="section-header">
          <span className="section-header__tag">About The Foundation</span>
          <h2>Carrying Forward A Legacy Of Compassion</h2>
          <p>
            The Reuben Wairicu Foundation offers holistic support to elders, caregivers, inmates, and
            persons with disabilities. We combine practical aid with mentorship to spark lasting
            change.
          </p>
        </div>
        <div className="mission__grid">
          <article className="info-card">
            <div className="info-card__icon">★</div>
            <h3>Our Why</h3>
            <p>
              Celebrating a lifetime dedicated to generosity, we stand in the gap for neighbours who
              are overlooked and underserved.
            </p>
          </article>
          <article className="info-card">
            <div className="info-card__icon">🤝</div>
            <h3>Our Approach</h3>
            <p>
              We respond quickly to urgent needs while empowering communities to design sustainable
              solutions for themselves.
            </p>
          </article>
          <article className="info-card">
            <div className="info-card__icon">✓</div>
            <h3>Our Promise</h3>
            <p>
              Transparency and stewardship are central to everything we do—every shilling is
              accounted for and invested with care.
            </p>
          </article>
        </div>
      </section>

      <section
        ref={impactRef}
        className={`impact fold ${impactInView ? 'is-visible' : ''}`}
      >
        <div className="section-header">
          <span className="section-header__tag">Our Focus</span>
          <h2>Programs That Meet People Where They Are</h2>
          <p>
            From food baskets to rehabilitation courses, our programs wrap around families with the
            support they need most.
          </p>
        </div>
        <div className="impact__grid">
          <article className="impact-card">
            <h3>Restoring Dignity</h3>
            <p>
              Home visits deliver nutrition essentials, companionship, and wellness checks to elderly
              caregivers and guardians.
            </p>
          </article>
          <article className="impact-card">
            <h3>Second Chances</h3>
            <p>
              Reintegration pathways provide mentorship, counselling, and vocational skills for
              inmates returning home.
            </p>
          </article>
          <article className="impact-card">
            <h3>Inclusive Futures</h3>
            <p>
              Assistive devices, therapy partnerships, and advocacy empower people living with
              disabilities to access opportunity.
            </p>
          </article>
          <article className="impact-card">
            <h3>Youth Empowerment</h3>
            <p>
              Leadership camps and scholarship support equip young people to become community
              champions.
            </p>
          </article>
        </div>
      </section>

      <section className="programs-section fold is-visible">
        <Programs />
      </section>

      <section ref={ctaRef} className={`call-to-action fold ${ctaInView ? 'is-visible' : ''}`}>
        <div className="cta__content">
          <span className="section-header__tag">Get Involved</span>
          <h2>Every Act Of Generosity Keeps Hope Alive</h2>
          <p>
            Become a monthly donor, host a fundraiser, or volunteer your time. Your support helps us
            stretch our reach to more families across the country.
          </p>
        </div>
        <div className="hero__actions">
          <Link to="/donate" className="btn btn--primary">
            Donate Today
          </Link>
          <Link to="/contact" className="btn btn--ghost">
            Talk To Our Team
          </Link>
        </div>
      </section>

      <section className="support-strip">
        <div className="support-strip__content">
          <h3>Together we can reach even more families.</h3>
          <p>Share our story with your community or invite us to speak at your next event.</p>
        </div>
        <Link to="/gallery" className="btn btn--lime">
          Explore Impact Stories
        </Link>
      </section>

      <div className="contact-section">
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;