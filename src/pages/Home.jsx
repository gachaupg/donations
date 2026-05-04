import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import ContactForm from './contact';
import Gallery from './Gallery';
import Programs from './programs';
import { useInView } from 'react-intersection-observer';
import ShareButtons from '../components/ShareButtons';
import heroImage from '../assets/hero-kitale-prison-visit.png';
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
            We uplift vulnerable families through compassion, action, and sustainable support.
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
              alt="RWF team and volunteers at Kitale Women Prison with donation bags after a community visit"
            />
            <div className="hero__badge">The Reuben Wairicu Foundation (RWF)</div>
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
        <div className="mission-band">
          <header className="mission-band__header">
            <span className="mission-band__eyebrow">Who we are</span>
            <h2 className="mission-band__title">The Reuben Wairicu Foundation (RWF)</h2>
            <div className="mission-band__lede">
              <p>
                The Reuben Wairicu Foundation (RWF) is a community-driven organisation committed to uplifting
                vulnerable people across Kenyan regions.
              </p>
              <p>
                Rooted in compassion and guided by purpose, we believe that every individual deserves dignity,
                care, and opportunity. Our work is grounded in restoring hope and strengthening communities as
                we aim to uplift vulnerable people across Kenyan regions through compassion, practical support,
                and sustainable initiatives. Officially registered under Section 10 of the Non-Governmental
                Organizations Co-ordination Act on <strong>10th September 2021</strong>.
              </p>
              <p>
                Together, we honour the legacy of Mr & Mrs. Reuben Wairicu by creating lasting impact in the
                lives of those we serve.
              </p>
            </div>
          </header>

          <div className="mission-band__split">
            <article className="mission-statement mission-statement--mission">
              <span className="mission-statement__label">Our mission</span>
              <h3 className="mission-statement__headline">
                Giving hope, Sharing Love and touching Hearts
              </h3>
              <p className="mission-statement__text">
                We believe every person deserves dignity, care, and opportunity. Our work restores hope
                and strengthens communities through compassion, practical help, and sustainable
                initiatives.
              </p>
            </article>
            <article className="mission-statement mission-statement--vision">
              <span className="mission-statement__label">Our vision</span>
              <h3 className="mission-statement__headline">
                A future where dignity is a human right, not a privilege
              </h3>
              <p className="mission-statement__text">
                We are building toward mature, selfless leadership in the community—where vulnerable
                households are seen, supported, and equipped to thrive with consistent follow-up.
              </p>
            </article>
          </div>

          <div className="mission-band__block">
            <h3 className="mission-band__block-title">Our values</h3>
            <div className="mission-values">
              {[
                {
                  name: 'Sustainability',
                  text: 'Programmes designed to endure beyond one-off relief.',
                },
                {
                  name: 'Integrity',
                  text: 'Transparent stewardship and honest relationships.',
                },
                {
                  name: 'Collaboration',
                  text: 'Growing impact alongside communities and partners.',
                },
                {
                  name: 'Compassion',
                  text: 'Meeting people with respect, empathy, and presence.',
                },
              ].map((v) => (
                <div key={v.name} className="mission-values__item">
                  <p className="mission-values__name">{v.name}</p>
                  <p className="mission-values__desc">{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mission-band__block">
            <h3 className="mission-band__block-title">On the ground</h3>
            <ul className="mission-ground">
              <li className="mission-ground__item">
                <span className="mission-ground__n" aria-hidden="true">
                  1
                </span>
                <div>
                  <p className="mission-ground__title">Prison ministry</p>
                  <p className="mission-ground__copy">
                    Quarterly visits to share love, essentials, and hope.
                  </p>
                </div>
              </li>
              <li className="mission-ground__item">
                <span className="mission-ground__n" aria-hidden="true">
                  2
                </span>
                <div>
                  <p className="mission-ground__title">Community hub vision</p>
                  <p className="mission-ground__copy">
                    Developing donated land and container-based spaces for offices and programme delivery.
                  </p>
                </div>
              </li>
              <li className="mission-ground__item">
                <span className="mission-ground__n" aria-hidden="true">
                  3
                </span>
                <div>
                  <p className="mission-ground__title">Partnerships & advocacy</p>
                  <p className="mission-ground__copy">
                    Expanding networks and inviting others to speak up for change.
                  </p>
                </div>
              </li>
            </ul>
            <div className="mission-trust" role="list">
              <span className="mission-trust__pill" role="listitem">
                Registered NGO
              </span>
              <span className="mission-trust__pill" role="listitem">
                Kitale roots
              </span>
              <span className="mission-trust__pill" role="listitem">
                Follow-up first
              </span>
            </div>
          </div>

          <div className="mission-highlights">
            <article className="mission-highlight">
              <span className="mission-highlight__step" aria-hidden="true">
                01
              </span>
              <h3 className="mission-highlight__title">Our focus</h3>
              <ul className="mission-highlight__list">
                <li>Children living with their incarcerated parent in prison.</li>
                <li>Incarcerated individuals rebuilding their lives.</li>
                <li>Elderly care.</li>
                <li>People living with disabilities.</li>
                <li>Teen moms mentorships.</li>
                <li>Recovering addicts.</li>
              </ul>
            </article>
            <article className="mission-highlight">
              <span className="mission-highlight__step" aria-hidden="true">
                02
              </span>
              <h3 className="mission-highlight__title">Future plans</h3>
              <ul className="mission-highlight__list">
                <li>Continue quarterly prison visits to share love and give hope.</li>
                <li>
                  Establish fabricated container spaces for offices and program delivery.
                </li>
                <li>Develop the 5-acre donated land into a thriving Community Hub.</li>
                <li>Expand networks and collaboration with other organisations.</li>
                <li>Hold an annual fundraiser to sustain and grow our impact.</li>
              </ul>
            </article>
            <article className="mission-highlight">
              <span className="mission-highlight__step" aria-hidden="true">
                03
              </span>
              <h3 className="mission-highlight__title">Our promise</h3>
              <p className="mission-highlight__body">
                Stewardship and transparency guide every shilling—invested with care so donors and
                neighbours know their trust is honoured.
              </p>
            </article>
          </div>

          <div className="mission-band__meta">
            <div className="mission-meta-panel mission-meta-panel--involve">
              <h3 className="mission-meta-panel__title">Get involved</h3>
              <ul className="mission-meta-panel__list">
                <li>Donate to support our mission.</li>
                <li>Volunteer your time and skills.</li>
                <li>Partner with us.</li>
                <li>Advocate for change.</li>
              </ul>
              <div className="mission-meta-panel__links">
                <Link to="/donate" className="mission-meta-panel__link">
                  Donate
                </Link>
                <Link to="/contact" className="mission-meta-panel__link mission-meta-panel__link--ghost">
                  Contact us
                </Link>
              </div>
            </div>
            <div className="mission-meta-panel mission-meta-panel--contact">
              <h3 className="mission-meta-panel__title">Contacts</h3>
              <dl className="mission-meta-panel__dl">
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:reubenwairicufoundation@gmail.com">reubenwairicufoundation@gmail.com</a>
                  </dd>
                </div>
                <div>
                  <dt>Facebook</dt>
                  <dd>
                    <a
                      href="https://www.facebook.com/reuben.wairicufoundation?_rdc=1&_rdr#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Reuben Wairicu Foundation
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Instagram</dt>
                  <dd>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                      Reuben Wairicu Foundation
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Contact person</dt>
                  <dd>Milcah Ochoki</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href="tel:+254723237149">+254 723 237149</a>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mission-meta-panel mission-meta-panel--kenya">
              <h3 className="mission-meta-panel__title">Kenya support</h3>
              <p className="mission-meta-panel__intro">
                <strong className="text-white/95">Donate to:</strong> Reuben Wairicu Foundation — Equity
                Bank, Kitale. For financial support. Thanking you in advance.
              </p>
              <dl className="mission-meta-panel__dl mission-meta-panel__dl--compact">
                <div>
                  <dt>Account name</dt>
                  <dd>Reuben Wairicu Foundation</dd>
                </div>
                <div>
                  <dt>Account number</dt>
                  <dd className="mission-meta-panel__mono">0330284842169</dd>
                </div>
                <div>
                  <dt>Bank</dt>
                  <dd>Equity Bank, Kitale</dd>
                </div>
                <div>
                  <dt>M-Pesa line</dt>
                  <dd>+254 723 237149 (Milcah Ochoki)</dd>
                </div>
              </dl>
              <Link to="/donate" className="mission-meta-panel__link mission-meta-panel__link--block">
                Full giving options (PayPal & Australia)
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={impactRef}
        className={`impact fold ${impactInView ? 'is-visible' : ''}`}
      >
        <div className="section-header">
          <span className="section-header__tag">Our focus</span>
          <h2>Where we invest our energy</h2>
          <p>
            These priorities keep our teams aligned—from prison visits to mentorship—so compassion shows
            up as consistent, practical care.
          </p>
        </div>
        <div className="impact__grid">
          <article className="impact-card">
            <h3>Children living with their incarcerated parent in prison</h3>
            <p>
              Counselling, safe spaces, caregiver and school coordination, essentials, and practical help
              so children and caregivers stay grounded through custody and transition.
            </p>
          </article>
          <article className="impact-card">
            <h3>Incarcerated individuals rebuilding their lives</h3>
            <p>
              Quarterly prison visits, essentials, counselling, and reintegration support that reduces
              stigma and helps returning citizens find stability.
            </p>
          </article>
          <article className="impact-card">
            <h3>Elderly care</h3>
            <p>
              Home visits, nutrition support, medical referrals, and age-appropriate activities that honour
              dignity in later life.
            </p>
          </article>
          <article className="impact-card">
            <h3>People living with disabilities</h3>
            <p>
              Support for carers, assistive referrals, outings, and advocacy that improves access and
              inclusion.
            </p>
          </article>
          <article className="impact-card">
            <h3>Teen moms mentorships</h3>
            <p>
              Mentorship, family follow-ups, and guidance that protects dignity and helps young mothers
              stay on track.
            </p>
          </article>
          <article className="impact-card">
            <h3>Recovering addicts</h3>
            <p>
              Compassionate pathways for recovering individuals—mentorship, referrals, and practical help
              that reinforces healthy choices.
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
          <span className="section-header__tag">Get involved</span>
          <h2>Join the movement for dignity and hope</h2>
          <p>
            Donate to support our mission. Volunteer your time and skills. Partner with us. Advocate for
            change—every pathway widens the circle of hope.
          </p>
        </div>
        <div className="hero__actions">
          <Link to="/donate" className="btn btn--primary">
            Donate
          </Link>
          <Link to="/contact" className="btn btn--outline">
            Volunteer or partner
          </Link>
          <Link to="/about" className="btn btn--ghost">
            Learn our story
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
            text="The Reuben Wairicu Foundation: giving hope, sharing love, touching hearts across Kenya."
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