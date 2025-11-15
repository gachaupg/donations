import React from 'react';
import Programs from './programs';

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
        </header>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src="https://res.cloudinary.com/pitz/image/upload/v1727543722/images_1_qnydeo.png"
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
              src="https://res.cloudinary.com/pitz/image/upload/v1727439404/WhatsApp_Image_2024-09-27_at_15.07.02_dfrybe.jpg"
              alt="Community outreach"
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src="https://res.cloudinary.com/pitz/image/upload/v1727035586/WhatsApp_Image_2024-09-22_at_13.06.47_1_l4xolk.jpg"
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
      </div>
    </div>
  );
};

export default About;
