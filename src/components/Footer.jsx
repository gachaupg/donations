import React, { useEffect, useMemo, useState } from 'react';
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from 'react-icons/bs'; 
import { useBranding } from '../context/BrandingContext.jsx';
import defaultLogo from '../assets/rwf-logo.png';

const Footer = () => {
  const { branding } = useBranding();
  const resolvedBrandLogo = useMemo(() => {
    const candidate = typeof branding?.logoUrl === 'string' ? branding.logoUrl.trim() : '';
    return candidate.length > 0 ? candidate : defaultLogo;
  }, [branding?.logoUrl]);

  const [logoSrc, setLogoSrc] = useState(resolvedBrandLogo);

  useEffect(() => {
    setLogoSrc(resolvedBrandLogo);
  }, [resolvedBrandLogo]);

  return (
    <footer className="mt-14 border-t border-white/10 bg-slate-950/30 text-white">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4">
        <div className="space-y-4">
          <img
            className="h-20 w-auto max-w-[min(100%,280px)] object-contain object-left sm:h-24 sm:max-w-[min(100%,320px)]"
            src={logoSrc}
            alt="Reuben Wairicu Foundation logo"
            onError={() => setLogoSrc(defaultLogo)}
          />
          <p className="text-sm leading-relaxed text-white/80">
            The Reuben Wairicu Foundation supports vulnerable families across Kenya through practical
            aid, mentorship, and restorative programmes—so dignity and opportunity are within reach.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/donate"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
            >
              Donate
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              Partner with us
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Quick links
          </h3>
          <ul className="space-y-2 text-sm text-white/85">
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Programs', href: '/programs' },
              { label: 'Sponsorship', href: '/sponsorship' },
              { label: 'Gallery', href: '/gallery' },
              { label: 'Contact', href: '/contact' },
              { label: 'Donate', href: '/donate' },
            ].map((link) => (
              <li key={link.href}>
                <a className="transition hover:text-white hover:underline" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Follow us
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: 'https://www.facebook.com/reuben.wairicufoundation?_rdc=1&_rdr#', label: 'Facebook', Icon: BsFacebook },
              { href: 'https://twitter.com', label: 'X', Icon: BsTwitter },
              { href: 'https://instagram.com', label: 'Instagram', Icon: BsInstagram },
              { href: 'https://youtube.com', label: 'YouTube', Icon: BsYoutube },
            ].map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl text-white/90 backdrop-blur transition hover:bg-white/15"
              >
                <Icon />
              </a>
            ))}
          </div>
          <p className="text-sm text-white/70">
            Share our story and help more families find support.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
            Newsletter
          </h3>
          <p className="text-sm text-white/80">
            Get updates on outreach, upcoming visits, and ways to partner.
          </p>
          <form className="grid gap-2">
            <input
              type="email"
              className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-white/30 focus:bg-white/15"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-white/60">
            We respect your inbox. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 text-center">
          <p className="text-sm text-white/70">
          &copy; {new Date().getFullYear()} Reuben Wairicu Foundation. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
