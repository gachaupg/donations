import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import ContactForm from './contact';
import Gallery from './Gallery';
import Programs from './programs';
import { useInView } from 'react-intersection-observer';
import ShareButtons from '../components/ShareButtons';
import heroImage from '../assets/Image_1.jpeg';
import SponsorsSection from '../components/SponsorsSection.jsx';

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
        </div>
        <div className="hero__media">
          <div className="hero__image-frame">
            <img
              src={heroImage}
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
        <div className="mission-pillars">
          <article className="pillar-card pillar-card--mission">
            <div className="pillar-card__top">
              <span className="pillar-card__badge">Our Mission</span>
              <h3 className="pillar-card__title">Restore dignity with practical help + mentorship</h3>
              <p className="pillar-card__lead">
                We mobilise resources and partnerships to support vulnerable households across Kenya
                with timely aid, mentorship, and consistent follow-up—so support turns into stability.
              </p>
            </div>
            <div className="pillar-card__body">
              <p className="pillar-card__label">Concrete work we do</p>
              <ul className="pillar-card__list">
                <li>
                  <strong>Food security + home visits</strong> — nutrition support, household essentials,
                  and wellness check-ins for elderly caregivers and vulnerable families.
                </li>
                <li>
                  <strong>Prison ministry + reintegration</strong> — quarterly visits, counselling, and
                  aftercare so returning citizens rebuild stable lives.
                </li>
                <li>
                  <strong>Children leaving with an incarcerated parent in prison</strong> — counselling,
                  safe spaces, caregiver and school coordination, and practical support through transition.
                </li>
                <li>
                  <strong>Teen mums mentorship</strong> — family follow-ups and guidance that protects dignity
                  and helps young mothers stay on track.
                </li>
              </ul>
              <div className="pillar-card__chips">
                <span className="chip">Follow-up</span>
                <span className="chip">Mentorship</span>
                <span className="chip">Partnerships</span>
                <span className="chip">Accountability</span>
              </div>
            </div>
          </article>

          <article className="pillar-card pillar-card--vision">
            <div className="pillar-card__top">
              <span className="pillar-card__badge">Our Vision</span>
              <h3 className="pillar-card__title">Communities where hope is sustainable and shared</h3>
              <p className="pillar-card__lead">
                To raise mature, selfless individuals who extend hope through sustainable and compassionate
                action—so families can thrive, not just survive.
              </p>
            </div>
            <div className="pillar-card__body">
              <p className="pillar-card__label">What that looks like</p>
              <ul className="pillar-card__list">
                <li>
                  <strong>Disability support + advocacy</strong> — assistive support, referrals to services,
                  and advocacy that promotes inclusion and access.
                </li>
                <li>
                  <strong>Youth empowerment</strong> — leadership mentorship, skills support, and scholarship
                  pathways that help young people become community champions.
                </li>
                <li>
                  <strong>Community partnerships</strong> — working with local leaders, institutions, and
                  volunteers to deliver coordinated, accountable support.
                </li>
              </ul>
              <div className="pillar-card__chips">
                <span className="chip">Sustainability</span>
                <span className="chip">Dignity</span>
                <span className="chip">Inclusion</span>
                <span className="chip">Second chances</span>
              </div>
            </div>
          </article>
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
            <h3>Food security + home visits</h3>
            <p>
              Nutrition support, household essentials, and wellness check-ins for elderly caregivers and
              vulnerable families.
            </p>
          </article>
          <article className="impact-card">
            <h3>Prison ministry + reintegration</h3>
            <p>
              Quarterly visits, counselling, and aftercare support that helps returning citizens rebuild
              stable lives.
            </p>
          </article>
          <article className="impact-card">
            <h3>Children leaving with an incarcerated parent in prison</h3>
            <p>
              Counselling, safe peer spaces, caregiver and school coordination, and practical support so
              children stay grounded when a parent is in custody.
            </p>
          </article>
          <article className="impact-card">
            <h3>Teen mums mentorship</h3>
            <p>
              Mentorship, family follow-ups, and guidance that protects dignity and helps young mothers
              stay on track.
            </p>
          </article>
          <article className="impact-card">
            <h3>Disability support + advocacy</h3>
            <p>
              Assistive support, referrals to services, and advocacy that promotes inclusion and access.
            </p>
          </article>
          <article className="impact-card">
            <h3>Youth empowerment</h3>
            <p>
              Leadership mentorship, skills support, and scholarship pathways that help young people become
              community champions.
            </p>
          </article>
          <article className="impact-card">
            <h3>Community partnerships</h3>
            <p>
              Working with local leaders, institutions, and volunteers to deliver coordinated, accountable
              support.
            </p>
          </article>
        </div>
      </section>

      <section className="programs-section fold is-visible">
        <Programs />
      </section>

      <SponsorsSection
        title="Our Sponsors"
        subtitle="Thank you to the partners who help us keep hope alive."
      />

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
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/gallery" className="btn btn--lime">
            Explore Impact Stories
          </Link>
          <ShareButtons
            title="Reuben Wairicu Foundation"
            text="Help us restore dignity across Kenya. Learn our mission and get involved."
            path="/"
          />
        </div>
      </section>

      <div className="contact-section">
        <ContactForm embedded />
      </div>

      <section className="home-gallery-preview fold is-visible">
        <Gallery embedded />
      </section>
    </div>
  );
};

export default Home;