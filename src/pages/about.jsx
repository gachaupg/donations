import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiEye, FiHeart, FiRefreshCw, FiShield, FiTarget, FiUsers } from 'react-icons/fi';
import ShareButtons from '../components/ShareButtons';
import PartnersSection from '../components/PartnersSection.jsx';
import image5 from '../assets/image_5.jpeg';
import aboutJourneyImage from '../assets/about-journey.png';
import teamImage from '../assets/gallery/gallery-rwf-team.png';

const STATS = [
  { value: '1970s', label: 'Roots in Kitale' },
  { value: '2021', label: 'Registered NGO' },
  { value: '6', label: 'Core programmes' },
  { value: 'Quarterly', label: 'Prison visits' },
];

const JOURNEY = [
  {
    period: 'Early 1970s',
    title: 'Neighbours to "Farm Prison"',
    copy: 'The Wairicu family relocated to Kitale, to a farm bordering what locals called "Farm Prison."',
  },
  {
    period: 'Over the years',
    title: 'Friendships built on everyday kindness',
    copy: 'Sharing milk, learning together, and creative projects built trust with prison staff and inmates.',
  },
  {
    period: 'Growing outreach',
    title: 'From family visits to programmes',
    copy: 'Regular visits grew into organised outreach: mentorship, education, counselling, and practical aid.',
  },
  {
    period: '10th September 2021',
    title: 'Officially registered',
    copy: 'Registered under Section 10 of the Non-Governmental Organizations Co-ordination Act.',
  },
];

const HIGHLIGHTS = [
  'Trusted friendships with inmates and wardens built on mutual respect.',
  'Invitations to contribute to structured rehabilitation programmes.',
  'Advocacy helping returning citizens find dignified employment.',
  'Family reintegration support that reduces stigma and isolation.',
];

const VALUES = [
  { title: 'Sustainability', copy: 'Programmes that endure beyond short-term aid.', Icon: FiRefreshCw },
  { title: 'Integrity', copy: 'Transparent stewardship of every shilling invested.', Icon: FiShield },
  { title: 'Collaboration', copy: 'Partnering with communities and institutions.', Icon: FiUsers },
  { title: 'Compassion', copy: 'Every initiative begins with dignity and empathy.', Icon: FiHeart },
];

const SectionLabel = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-black/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-amber-100">
    <span className="h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden="true" />
    {children}
  </span>
);

const sectionTitle = 'text-[clamp(1.35rem,2.4vw,1.8rem)] font-semibold leading-tight text-white';
const bodyText = 'text-sm leading-relaxed text-white/75 sm:text-[0.95rem]';
const glassCard = 'rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur';

const About = () => {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-14">
        <header className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-4">
            <SectionLabel>Our story</SectionLabel>
            <h1 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-[1.1] text-white">
              Rooted in community, <span className="rwf-gold-text">driven by compassion</span>
            </h1>
            <p className="text-[0.95rem] leading-relaxed text-white/90 sm:text-base">
              The Reuben Wairicu Foundation (RWF) is a community-driven organisation committed to uplifting
              vulnerable people across Kenyan regions.
            </p>
            <p className={bodyText}>
              Guided by purpose, we believe every individual deserves dignity, care, and opportunity. Through
              compassion, practical support, and sustainable initiatives, we honour the legacy of Mr &amp; Mrs.
              Reuben Wairicu by creating lasting impact in the lives of those we serve.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link to="/programs" className="btn btn--gold !px-5 !py-2.5 !text-sm">
                Explore Our Programs
              </Link>
              <ShareButtons
                title="About Reuben Wairicu Foundation"
                text="Learn our vision, mission, and the communities we serve in Kenya."
                path="/about"
              />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-300/25 via-transparent to-emerald-400/20 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-xl shadow-black/30">
              <img
                src={teamImage}
                alt="RWF volunteers standing together in Supporting Communities shirts"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 rounded-xl border border-amber-300/40 bg-[#1c3021]/90 px-4 py-2 shadow-lg backdrop-blur">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-amber-200/80">Registered NGO</p>
              <p className="text-sm font-semibold text-white">10th September 2021</p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((stat) => (
            <article key={stat.label} className={`${glassCard} px-3 py-4 text-center`}>
              <p className="rwf-gold-text text-xl font-bold leading-none sm:text-2xl">{stat.value}</p>
              <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/70">{stat.label}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className={`${glassCard} p-5 sm:p-6`}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-200 to-amber-500 text-emerald-950">
                <FiTarget aria-hidden="true" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">Our mission</p>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-white">Giving hope, sharing love, touching hearts</h2>
            <p className={`mt-2 ${bodyText}`}>
              We believe every person deserves dignity, care, and opportunity. Our work restores hope and
              strengthens communities through compassion, practical help, and sustainable initiatives.
            </p>
          </article>
          <article className={`${glassCard} p-5 sm:p-6`}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-200 to-emerald-500 text-emerald-950">
                <FiEye aria-hidden="true" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-200">Our vision</p>
            </div>
            <h2 className="mt-3 text-lg font-semibold text-white">Hope extended through every community</h2>
            <p className={`mt-2 ${bodyText}`}>
              To raise mature, selfless individuals who extend hope to communities through sustainable and
              compassionate action.
            </p>
          </article>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-3 lg:sticky lg:top-28">
            <SectionLabel>Our journey</SectionLabel>
            <h2 className={sectionTitle}>From neighbours to a registered foundation</h2>
            <p className={bodyText}>
              These friendships sparked a lifelong commitment to stand with neighbours who society too often
              forgets.
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/20">
              <img
                src={aboutJourneyImage}
                alt="A person before winding paths over green hills, symbolising the community journey"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          <ol className="relative space-y-3 border-l border-amber-300/30 pl-6">
            {JOURNEY.map((step) => (
              <li key={step.title} className="relative" data-reveal>
                <span
                  className="absolute -left-[1.95rem] top-5 h-3 w-3 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 ring-4 ring-[#2f4f36]"
                  aria-hidden="true"
                />
                <div className={`${glassCard} p-4 transition hover:border-amber-300/30 hover:bg-white/[0.09]`}>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-amber-200">{step.period}</p>
                  <h3 className="mt-1 text-base font-semibold text-white">{step.title}</h3>
                  <p className={`mt-1 ${bodyText}`}>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[13rem] sm:min-h-[16rem]">
              <img
                src={image5}
                alt="RWF team with a prison officer outside the main prison gate"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="space-y-3 p-5 sm:p-7">
              <SectionLabel>Prison ministry</SectionLabel>
              <h2 className={sectionTitle}>Standing with those society forgets</h2>
              <p className={bodyText}>
                Quarterly prison visits provide essential supplies, mentorship, and encouragement. Even during the
                COVID-19 pandemic, we sustained support through deliveries of soap, toiletries, and baby supplies.
              </p>
              <ul className="space-y-2">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-white/85 sm:text-[0.95rem]">
                    <FiCheckCircle className="mt-0.5 flex-shrink-0 text-amber-300" aria-hidden="true" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-1">
                <Link to="/donate" className="btn btn--gold !px-5 !py-2.5 !text-sm">
                  Support this work
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <div className="space-y-2 text-center">
            <SectionLabel>What guides us</SectionLabel>
            <h2 className={sectionTitle}>Our core values</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {VALUES.map(({ title, copy, Icon }) => (
              <article
                key={title}
                className={`group ${glassCard} p-4 transition duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.09]`}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-amber-300/40 bg-amber-300/10 text-amber-200 transition group-hover:bg-amber-300/20">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-white sm:text-base">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-white/70 sm:text-sm">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-amber-300/30 bg-gradient-to-br from-[#2d4f35] via-[#244129] to-[#1a2f1f] px-5 py-8 text-center sm:px-10">
          <div
            className="absolute -top-20 left-1/2 h-40 w-[30rem] -translate-x-1/2 rounded-full bg-amber-300/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-xl space-y-3">
            <h2 className={sectionTitle}>Walk with us</h2>
            <p className={bodyText}>
              Your support helps us restore hope, strengthen families, and stand with vulnerable people across Kenya.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <Link to="/donate" className="btn btn--gold !px-5 !py-2.5 !text-sm">
                Donate
              </Link>
              <Link to="/sponsorship" className="btn btn--outline !px-5 !py-2.5 !text-sm">
                Become a sponsor
              </Link>
            </div>
          </div>
        </section>

        <PartnersSection />
      </div>
    </div>
  );
};

export default About;
