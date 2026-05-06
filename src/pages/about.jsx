import React from 'react';
import ShareButtons from '../components/ShareButtons';
import image5 from '../assets/image_5.jpeg';
import aboutJourneyImage from '../assets/about-journey.png';

const About = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 lg:gap-20">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            Our Story
          </span>
          <h1 className="text-[clamp(2.7rem,4vw,3.8rem)] font-semibold leading-[1.03] text-white">
            The Reuben Wairicu Foundation (RWF)
          </h1>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200/90">
            Rooted in Community · Giving Hope, Sharing Love, Touching Hearts
          </p>
          <div className="mx-auto max-w-3xl space-y-4 text-left text-[clamp(1.02rem,1.9vw,1.18rem)] leading-[1.75] text-white/90">
            <p>
              The Reuben Wairicu Foundation (RWF) is a community-driven organisation committed to uplifting
              vulnerable people across Kenyan regions.
            </p>
            <p>
              Rooted in compassion and guided by purpose, we believe that every individual deserves dignity,
              care, and opportunity. Our work is grounded in restoring hope and strengthening communities as
              we aim to uplift vulnerable people across Kenyan regions through compassion, practical support,
              and sustainable initiatives. Officially registered under Section 10 of the Non-Governmental
              Organizations Co-ordination Act on{' '}
              <span className="font-semibold text-white">10th September 2021</span>.
            </p>
            <p>
              Together, we honour the legacy of Mr & Mrs. Reuben Wairicu by creating lasting impact in the
              lives of those we serve.
            </p>
          </div>
          <div className="flex justify-center pt-2">
            <ShareButtons
              title="About Reuben Wairicu Foundation"
              text="Learn our vision, mission, and the communities we serve in Kenya."
              path="/about"
            />
          </div>
        </header>

        <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="space-y-4 rounded-3xl border border-white/20 bg-white p-6 shadow-lg">
            <h2 className="text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-[1.12] text-emerald-700">Our journey in community</h2>
            <p className="text-[clamp(1.02rem,1.8vw,1.12rem)] leading-[1.7] text-slate-600">
              When the Wairicu family relocated to Kitale in the early 70s, their farm bordered what
              locals called "Farm Prison." The family quickly forged relationships with prison staff
              and inmates through everyday interactions—sharing milk, learning together, and
              collaborating on creative projects.
            </p>
            <p className="text-[clamp(1.02rem,1.8vw,1.12rem)] leading-[1.7] text-slate-600">
              These friendships sparked a lifelong commitment to stand with neighbours who society too
              often forgets. What began as regular family visits evolved into organised outreach that
              now spans mentorship, education, counselling, and practical aid.
            </p>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">Vision</p>
              <p className="mt-2 text-[clamp(1rem,1.7vw,1.08rem)] leading-[1.7] text-slate-600">
                To raise mature, selfless individuals who extend hope to communities through
                sustainable and compassionate action.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
            <img
              src={aboutJourneyImage}
              alt="Illustration of a person before many winding paths over green hills, symbolising community journey and choices"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src={image5}
              alt="Prison ministry outreach"
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
          <div className="space-y-4 rounded-3xl border border-white/20 bg-white p-6 shadow-lg">
            <h2 className="text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-[1.12] text-emerald-700">Our prison ministry</h2>
            <p className="text-[clamp(1.02rem,1.8vw,1.12rem)] leading-[1.7] text-slate-600">
              Quarterly prison visits provide essential supplies, mentorship, and encouragement. Even
              during the COVID-19 pandemic, we sustained support through coordinated deliveries of soap,
              toiletries, and baby supplies.
            </p>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-[clamp(1rem,1.7vw,1.08rem)] leading-[1.65] text-slate-600">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">Impact highlights</p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li>Trusted friendships with inmates and wardens built on mutual respect.</li>
                <li>Invitations to contribute to structured rehabilitation programmes.</li>
                <li>Advocacy helping returning citizens find dignified employment.</li>
                <li>Family reintegration support that reduces stigma and isolation.</li>
              </ul>
            </div>
            <p className="text-[clamp(1.02rem,1.8vw,1.12rem)] leading-[1.7] text-slate-600">
              With your partnership, we can extend these services to more facilities and expand
              aftercare support as individuals transition back into society.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/20 bg-white p-6 shadow-lg sm:p-8">
          <h2 className="text-[clamp(1.65rem,3vw,2.35rem)] font-semibold leading-[1.12] text-emerald-700">Our core values</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Sustainability', copy: 'We design programmes that endure beyond short-term aid.' },
              { title: 'Integrity', copy: 'Transparent stewardship guides every shilling invested.' },
              { title: 'Collaboration', copy: 'We partner with communities and institutions for deeper impact.' },
              { title: 'Compassion', copy: 'Every initiative begins with dignity, respect, and empathy.' },
            ].map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-[clamp(1rem,1.6vw,1.05rem)] leading-[1.65] text-slate-600 shadow-sm"
              >
                <h3 className="text-[clamp(1.05rem,1.8vw,1.2rem)] font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 leading-relaxed">{value.copy}</p>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
