import React from 'react';
import Programs from './programs';
import ShareButtons from '../components/ShareButtons';
import image2 from '../assets/image_2.jpeg';
import image5 from '../assets/image_5.jpeg';
import image6 from '../assets/image_6.jpeg';
import aboutJourneyImage from '../assets/about-journey.png';
import integrityRegisteredImage from '../assets/integrity-registered.png';
import whoWeAreThumb from '../assets/gallery/gallery-rwf-team.png';
import workThumbFood from '../assets/gallery/gallery-home-visits-donation.png';

const About = () => {
  return (
    <div className="font-about py-12 px-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 lg:gap-20">
        <header className="space-y-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            Our Story
          </span>
          <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            The Reuben Wairicu Foundation (RWF)
          </h1>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-200/90">
            Rooted in Community · Giving Hope, Sharing Love, Touching Hearts
          </p>
          <div className="mx-auto max-w-3xl space-y-4 text-left text-sm leading-relaxed text-white/90 sm:text-base">
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

        <section className="font-about text-slate-800">
          <div className="mx-auto grid max-w-7xl gap-10 px-1 sm:gap-12 lg:grid-cols-3 lg:gap-14 lg:px-4">
            <article className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xl sm:p-10 lg:p-11">
              <div className="aspect-[5/4] w-full overflow-hidden rounded-xl ring-1 ring-black/[0.06]">
                <img
                  src={whoWeAreThumb}
                  alt="Reuben Wairicu Foundation team and community"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="my-7 h-px w-full bg-gradient-to-r from-transparent via-amber-400/90 to-transparent"
                aria-hidden="true"
              />
              <h2 className="font-display text-2xl font-semibold tracking-tight text-emerald-900 sm:text-[1.65rem]">
                Who We Are
              </h2>
              <div className="mt-5 space-y-4 text-[0.98rem] leading-[1.75] text-[#5c4033]">
                <p>
                  The Reuben Wairicu Foundation (RWF) is a community-driven organisation uplifting vulnerable
                  families across Kenya.
                </p>
                <p>We believe dignity is a human right, not a privilege.</p>
              </div>
            </article>

            <article className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-8 shadow-xl sm:p-10 lg:p-11">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="aspect-square overflow-hidden rounded-lg ring-1 ring-black/[0.06]">
                  <img
                    src={workThumbFood}
                    alt="Food and home visit support"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg ring-1 ring-black/[0.06]">
                  <img src={image2} alt="Community health outreach" className="h-full w-full object-cover" />
                </div>
                <div className="aspect-square overflow-hidden rounded-lg ring-1 ring-black/[0.06]">
                  <img src={image6} alt="Restorative programmes" className="h-full w-full object-cover" />
                </div>
              </div>
              <div
                className="my-7 h-px w-full bg-gradient-to-r from-transparent via-amber-400/90 to-transparent"
                aria-hidden="true"
              />
              <h2 className="font-display text-2xl font-semibold tracking-tight text-emerald-900 sm:text-[1.65rem]">
                Our Work
              </h2>
              <ul className="mt-5 space-y-3.5 text-[0.98rem] font-semibold leading-snug">
                <li className="flex gap-3 text-emerald-900">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" aria-hidden="true" />
                  Food Security Programs
                </li>
                <li className="flex gap-3 text-amber-800">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                  Health Outreach
                </li>
                <li className="flex gap-3 text-emerald-900">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" aria-hidden="true" />
                  Restorative Programs
                </li>
              </ul>
            </article>

            <article className="relative flex flex-col overflow-hidden rounded-2xl border border-amber-200/60 bg-[#fdfaf3] p-8 shadow-xl sm:p-10 lg:p-11">
              <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
                <img
                  src={aboutJourneyImage}
                  alt=""
                  className="h-full w-full object-cover"
                  aria-hidden="true"
                />
              </div>
              <div className="relative z-10 flex flex-1 flex-col space-y-8">
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-wide text-amber-700 sm:text-xl">
                    Mission
                  </h3>
                  <p className="mt-3 text-[0.98rem] font-semibold leading-relaxed text-emerald-900 sm:text-base">
                    To uplift vulnerable families through compassion and sustainable support.
                  </p>
                </div>
                <div
                  className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/90 to-transparent"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-wide text-amber-700 sm:text-xl">
                    Vision
                  </h3>
                  <p className="mt-3 text-[0.98rem] font-semibold leading-relaxed text-emerald-900 sm:text-base">
                    A future where dignity is a human right, not a privilege.
                  </p>
                </div>
                <div
                  className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/90 to-transparent"
                  aria-hidden="true"
                />
                <div className="pb-1">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-emerald-900 sm:text-xl">
                    Looking Ahead
                  </h3>
                  <ul className="mt-4 list-none space-y-2.5 pl-0 text-[0.95rem] leading-relaxed text-emerald-900/95">
                    {[
                      'Quarterly prison visits',
                      'Container office & program spaces',
                      'Develop 5-acre Community Hub',
                      'Expand partnerships',
                      'Annual fundraiser',
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-white/20 bg-white p-6 text-slate-800 shadow-lg sm:p-8">
          <header className="space-y-2 border-b border-slate-100 pb-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-emerald-600">
              Contacts & giving
            </span>
            <h2 className="text-2xl font-semibold text-emerald-800">Connect with us and give in Kenya</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Reach us on email and social media, speak with our contact person, or use the Equity / M-Pesa
              details below. For PayPal or bank transfer options, open the Donate page.
            </p>
          </header>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Contacts</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="font-semibold text-slate-900">Email</dt>
                  <dd>
                    <a
                      href="mailto:reubenwairicufoundation@gmail.com"
                      className="text-emerald-700 underline underline-offset-2"
                    >
                      reubenwairicufoundation@gmail.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Facebook</dt>
                  <dd>
                    <a
                      href="https://www.facebook.com/reuben.wairicufoundation?_rdc=1&_rdr#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 underline underline-offset-2"
                    >
                      Reuben Wairicu Foundation
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Instagram</dt>
                  <dd>
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 underline underline-offset-2"
                    >
                      Reuben Wairicu Foundation
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Contact person</dt>
                  <dd className="text-slate-600">Milcah Ochoki</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-900">Phone</dt>
                  <dd>
                    <a href="tel:+254723237149" className="text-emerald-700 underline underline-offset-2">
                      +254 723 237149
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm">
              <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
                Kenya support — donate to
              </h3>
              <p className="font-semibold text-slate-900">Reuben Wairicu Foundation — Equity Bank, Kitale</p>
              <p className="text-slate-600">For financial support. Thanking you in advance.</p>
              <dl className="space-y-2 border-t border-slate-200 pt-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Account name</dt>
                  <dd className="font-medium text-slate-900">Reuben Wairicu Foundation</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Account number</dt>
                  <dd className="font-mono text-base font-semibold text-slate-900">0330284842169</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">Bank</dt>
                  <dd className="text-slate-700">Equity Bank, Kitale</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">M-Pesa line</dt>
                  <dd className="text-slate-700">+254 723 237149 (Milcah Ochoki)</dd>
                </div>
              </dl>
              <a
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
              >
                Donate (all options)
              </a>
            </div>
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="flex min-h-[200px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:min-h-[240px] lg:min-h-[280px]">
            <img
              src={integrityRegisteredImage}
              alt="Word art centred on Integrity, surrounded by values such as Ethics, Accountability, Honesty, and Core Values"
              className="max-h-[min(52vw,22rem)] w-full object-contain sm:max-h-[min(48vw,26rem)] lg:max-h-[min(40vw,28rem)]"
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
                <dd className="text-base font-semibold text-slate-900">
                  10th September 2021 — founded as RWF, building on a 1970s family legacy in Kitale
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-emerald-600">Our focus</dt>
                <dd>
                  Children with an incarcerated parent, prison ministry and reintegration, elderly care,
                  disability support, teen moms mentorships, recovery support, and community partnerships.
                </dd>
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
                title: 'Children leaving with an incarcerated parent in prison',
                copy:
                  'When a parent is in custody, children need stability fast—including children living alongside a parent in prison. Counselling, safe spaces, caregiver and school coordination, essentials, and practical support keep families grounded.',
              },
              {
                title: 'Teen moms mentorships',
                copy: 'Mentorship, family follow-ups, and guidance that protects dignity and helps young mothers stay on track.',
              },
              {
                title: 'Recovering addicts',
                copy: 'Mentorship, referrals, and practical help for recovering individuals—reinforcing healthy choices with compassion and follow-up.',
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
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-white">Get involved</h2>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/90 sm:text-base">
                <li>Donate to support our mission.</li>
                <li>Volunteer your time and skills.</li>
                <li>Partner with us.</li>
                <li>Advocate for change.</li>
              </ul>
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
                Volunteer or partner
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
