import React from 'react';
import Programs from './programs';
import ShareButtons from '../components/ShareButtons';
import image9 from '../assets/image_9.jpeg';
import image3 from '../assets/image_3.jpeg';
import image5 from '../assets/image_5.jpeg';

const About = () => {
  return (
    <div className="py-12 px-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            Our Story
          </span>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Honouring a legacy of compassion across generations
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base">
            The Reuben Wairicu Foundation (RWF) is a registered family initiative rooted in Kitale,
            Kenya. Founded by the eight children of Mr. Reuben and Mrs. Hellen Wairicu, we continue
            their lifelong commitment to giving hope, restoring dignity, and empowering neighbours who
            need it most.
          </p>
          <div className="flex justify-center pt-2">
            <ShareButtons
              title="About Reuben Wairicu Foundation"
              text="Learn our vision, mission, and the communities we serve in Kenya."
              path="/about"
            />
          </div>
        </header>

        <section className="grid gap-6 rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-lg backdrop-blur lg:grid-cols-3">
          <article className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                Our Mission
              </p>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                Practical + relational care
              </span>
            </div>
            <p className="text-base leading-relaxed text-white/90">
              We mobilise resources and partnerships to restore dignity across Kenya through practical
              aid, mentorship, and consistent follow-up—so families move from crisis to stability.
            </p>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/75">
                What this means on the ground
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/90">
                <li>
                  <strong className="text-white">Home visits + food support</strong> for elderly
                  caregivers and guardians.
                </li>
                <li>
                  <strong className="text-white">Prison ministry</strong> with essentials, counselling,
                  and reintegration support.
                </li>
                <li>
                  <strong className="text-white">Teen mums mentorship</strong> with family follow-ups
                  and referrals.
                </li>
              </ul>
            </div>
          </article>

          <article className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                Our Vision
              </p>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                Sustainable hope
              </span>
            </div>
            <p className="text-base leading-relaxed text-white/90">
              To raise mature, selfless individuals who extend hope through sustainable and
              compassionate action—building communities where dignity is protected and opportunity is
              accessible.
            </p>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/75">
                The outcomes we pursue
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/90">
                <li>
                  <strong className="text-white">Second chances</strong> for returning citizens through
                  skills and mentorship.
                </li>
                <li>
                  <strong className="text-white">Inclusive futures</strong> through assistive support,
                  advocacy, and access to services.
                </li>
                <li>
                  <strong className="text-white">Youth empowerment</strong> through leadership,
                  scholarship support, and guidance.
                </li>
              </ul>
            </div>
          </article>

          <article className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
              Who we serve
            </p>
            <p className="text-sm leading-relaxed text-white/90">
              We prioritise households and individuals most at risk of being overlooked—meeting needs
              with compassion and coordinated support.
            </p>
            <div className="grid gap-3">
              {[
                { title: 'Elderly caregivers + widowers', copy: 'Home visits, nutrition support, and companionship.' },
                { title: 'Inmates + returning citizens', copy: 'Mentorship, counselling, and reintegration pathways.' },
                { title: 'Teen mums + vulnerable youth', copy: 'Mentorship, family follow-up, and opportunities.' },
                { title: 'Persons living with disabilities', copy: 'Assistive support, referrals, and advocacy.' },
              ].map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-4"
                >
                  <p className="text-sm font-semibold text-white">{group.title}</p>
                  <p className="mt-1 text-sm text-white/85">{group.copy}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src={image9}
              alt="Foundation certificate of registration"
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
          <div className="space-y-4 rounded-3xl border border-white/20 bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-emerald-700">
              Registered to serve with integrity
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              The Reuben Wairicu Foundation (RWF) is registered under Section 10 of the
              Non-Governmental Organizations Co-ordination Act. Our mandate is to mobilise resources
              and partnerships that uplift the elderly, inmates, widowers, teen mums, people living
              with disabilities, and individuals rebuilding after addiction or incarceration.
            </p>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Established in honour of Mr. & Mrs. Reuben Wairicu, the foundation channels decades of
              community care into structured programmes that provide practical aid, mentorship, and
              consistent follow-up.
            </p>
            <dl className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-emerald-600">Founded</dt>
                <dd className="text-base font-semibold text-slate-900">1970s legacy, registered 2024</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-emerald-600">Focus</dt>
                <dd>Holistic support for vulnerable families across Kenya</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="space-y-6">
          <header className="mx-auto max-w-3xl space-y-2 text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
              What we do
            </span>
            <h2 className="text-3xl font-semibold text-white">Programmes built for lasting change</h2>
            <p className="text-sm leading-relaxed text-white/90 sm:text-base">
              We combine immediate relief with mentorship and referrals, then follow up—so support
              doesn’t stop at a one-time visit.
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Food security + home visits',
                copy: 'Nutrition support, household essentials, and wellness check-ins for elderly caregivers and vulnerable families.',
              },
              {
                title: 'Prison ministry + reintegration',
                copy: 'Quarterly visits, counselling, and aftercare support that helps returning citizens rebuild stable lives.',
              },
              {
                title: 'Teen mums mentorship',
                copy: 'Mentorship, family follow-ups, and guidance that protects dignity and helps young mothers stay on track.',
              },
              {
                title: 'Disability support + advocacy',
                copy: 'Assistive support, referrals to services, and advocacy that promotes inclusion and access.',
              },
              {
                title: 'Youth empowerment',
                copy: 'Leadership mentorship, skills support, and scholarship pathways that help young people become community champions.',
              },
              {
                title: 'Community partnerships',
                copy: 'Working with local leaders, institutions, and volunteers to deliver coordinated, accountable support.',
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/20 bg-white p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-emerald-700">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-lg backdrop-blur md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-white/15 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                How we measure impact
              </p>
              <p className="text-sm leading-relaxed text-white/90">
                We track follow-ups, referrals, and outcomes to ensure giving translates into
                sustained progress.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-white/15 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Follow-up first</p>
              <p className="text-sm text-white/85">
                We prioritise consistent check-ins after each intervention to reduce relapse into crisis.
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-white/15 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Transparency</p>
              <p className="text-sm text-white/85">
                Stewardship guides every shilling—donors and partners deserve clarity and accountability.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="space-y-4 rounded-3xl border border-white/20 bg-white p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-emerald-700">Our journey in community</h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              When the Wairicu family relocated to Kitale in the early 70s, their farm bordered what
              locals called "Farm Prison." The family quickly forged relationships with prison staff
              and inmates through everyday interactions—sharing milk, learning together, and
              collaborating on creative projects.
            </p>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              These friendships sparked a lifelong commitment to stand with neighbours who society too
              often forgets. What began as regular family visits evolved into organised outreach that
              now spans mentorship, education, counselling, and practical aid.
            </p>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">Vision</p>
              <p className="mt-2 text-sm text-slate-600">
                To raise mature, selfless individuals who extend hope to communities through
                sustainable and compassionate action.
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src={image3}
              alt="Community outreach"
              className="h-full w-full rounded-3xl object-cover"
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
            <h2 className="text-2xl font-semibold text-emerald-700">Our prison ministry</h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Quarterly prison visits provide essential supplies, mentorship, and encouragement. Even
              during the COVID-19 pandemic, we sustained support through coordinated deliveries of soap,
              toiletries, and baby supplies.
            </p>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-slate-600">
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">Impact highlights</p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li>Trusted friendships with inmates and wardens built on mutual respect.</li>
                <li>Invitations to contribute to structured rehabilitation programmes.</li>
                <li>Advocacy helping returning citizens find dignified employment.</li>
                <li>Family reintegration support that reduces stigma and isolation.</li>
              </ul>
            </div>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              With your partnership, we can extend these services to more facilities and expand
              aftercare support as individuals transition back into society.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/20 bg-white p-6 shadow-lg sm:p-8">
          <h2 className="text-2xl font-semibold text-emerald-700">Our core values</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Sustainability', copy: 'We design programmes that endure beyond short-term aid.' },
              { title: 'Integrity', copy: 'Transparent stewardship guides every shilling invested.' },
              { title: 'Collaboration', copy: 'We partner with communities and institutions for deeper impact.' },
              { title: 'Compassion', copy: 'Every initiative begins with dignity, respect, and empathy.' },
            ].map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">{value.title}</h3>
                <p className="mt-2 leading-relaxed">{value.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <Programs />
        </section>

        <section className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-lg backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-white">Help us reach more families</h2>
              <p className="text-sm leading-relaxed text-white/90 sm:text-base">
                Sharing our mission is one of the fastest ways to grow visibility and unlock new
                partnerships.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
              >
                Donate
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Partner with us
              </a>
            </div>
          </div>
          <div className="mt-4">
            <ShareButtons
              title="Reuben Wairicu Foundation"
              text="Support and share the Reuben Wairicu Foundation — restoring dignity across Kenya."
              path="/about"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
