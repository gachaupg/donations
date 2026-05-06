import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import heroImage from '../assets/hero-kitale-prison-visit.png';
import SponsorsSection from '../components/SponsorsSection.jsx';
import Programs from './programs';

const Home = () => {
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="homepage">
      <section ref={heroRef} className={`hero fold ${heroInView ? 'is-visible' : ''}`}>
        <div className="hero__content">
          <div className="hero__tag">Prison Ministry</div>
          <h1>
            Giving Hope, Sharing Love, <span className="hero__gold">Touching Hearts</span>
          </h1>
          <p>
            We uplift individuals in the communities affected by incarceration through compassion, action, and sustainable support.
          </p>
          <div className="hero__who">
            <span className="hero__who-tag">Who we are</span>
            <span className="hero__who-tag hero__who-tag--secondary">Rooted in Community</span>
            <p className="hero__who-title">The Reuben Wairicu Foundation (RWF)</p>
            <p className="hero__who-copy">
              Rooted in compassion and guided by purpose, we believe every individual deserves dignity, care,
              and opportunity.
              <br />
              We restore hope and strengthen communities through practical support and sustainable initiatives.
              Registered under Section 10 of the Non&#8209;Governmental Organizations Co&#8209;ordination Act
              on 10th September 2021.
            </p>
          </div>
          <div className="hero__actions">
            <Link to="/about" className="btn btn--gold">
              Discover Our Story
            </Link>
            <Link to="/programs" className="btn btn--gold">
              Explore Our Programs
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
        </div>
      </section>

      <section
        className="mission"
      >
        <div className="mission-band">
          <header className="mission-band__header">
            <h2 className="mission-band__title">The Reuben Wairicu Foundation (RWF)</h2>
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
              <li className="mission-ground__item">
                <span className="mission-ground__n" aria-hidden="true">
                  4
                </span>
                <div>
                  <p className="mission-ground__title">Future plans</p>
                  <p className="mission-ground__copy">
                    Continue quarterly prison visits to share love and give hope. Hold an annual fundraiser to
                    sustain and grow our impact.
                  </p>
                </div>
              </li>
              <li className="mission-ground__item">
                <span className="mission-ground__n" aria-hidden="true">
                  5
                </span>
                <div>
                  <p className="mission-ground__title">Our promise</p>
                  <p className="mission-ground__copy">
                    Stewardship and transparency guide every shilling—invested with care so donors and
                    neighbours know their trust is honoured.
                  </p>
                </div>
              </li>
            </ul>
            <div className="mission-programs">
              <Programs />
            </div>
            <div className="mission-trust" role="list">
              <span className="mission-trust__pill" role="listitem">
                Registered NGO
              </span>
              <span className="mission-trust__pill" role="listitem">
                Kenyan Roots
              </span>
              <span className="mission-trust__pill" role="listitem">
                Prison Ministry
              </span>
            </div>
          </div>

          <div className="mission-band__meta">
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
              <div className="mission-meta-panel__links">
                <Link to="/contact" className="mission-meta-panel__link mission-meta-panel__link--ghost">
                  Contact us
                </Link>
              </div>
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
                PayPal available
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SponsorsSection
        title="Our Sponsors"
        subtitle="Thank you to the partners who help us keep hope alive."
      />
    </div>
  );
};

export default Home;