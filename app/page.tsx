import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { slugBase } from "@/lib/content";
import {
  cityAreas,
  citySuffixes,
  featuredNationalSlugs,
  getPageBySlug,
  mobilePageSlugForCity,
} from "@/lib/pages";
import { SERVICE_BLURBS, SERVICE_ICONS, SITE, STANDARDS } from "@/lib/site";

export default function HomePage() {
  const nationalPages = featuredNationalSlugs
    .map((s) => getPageBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getPageBySlug>>[];
  const marquee = [...nationalPages, ...nationalPages];

  return (
    <>
      <SiteHeader />
      <header className="hero">
        <div className="hero-bg" aria-hidden />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">
              Tags overdue? Gauge in the red? We help you fix it.
            </div>
            <h1>
              Fire extinguisher help across <em>Canada</em>
            </h1>
            <p className="hero-desc">
              Whether you manage one storefront or dozens of buildings,{" "}
              {SITE.name} schedules inspection, maintenance, recharge, and refill
              visits — and we explain what you need in plain language before we
              arrive.
            </p>
            <div className="hero-btns">
              <a className="btn-primary" href={`tel:${SITE.phoneTel}`}>
                Call {SITE.phoneDisplay}
              </a>
              <a className="btn-secondary btn-on-dark" href="#quote">
                Request a callback
              </a>
            </div>
            <ul className="hero-trust">
              <li>
                <span aria-hidden="true">✓</span>
                Inspection &amp; annual tagging
              </li>
              <li>
                <span aria-hidden="true">✓</span>
                Commercial, strata &amp; industrial
              </li>
              <li>
                <span aria-hidden="true">✓</span>
                Recharge after use or drills
              </li>
              <li>
                <span aria-hidden="true">✓</span>
                Talk to a person — no online queue
              </li>
            </ul>
          </div>
          <div className="hero-panel">
            <h2>Why people call us</h2>
            <div className="stat-grid">
              <div>
                <strong>170+</strong>
                <span>Service topics we can talk through</span>
              </div>
              <div>
                <strong>23 cities</strong>
                <span>Local teams where we operate</span>
              </div>
              <div>
                <strong>Same week</strong>
                <span>Often possible when you call early</span>
              </div>
              <div>
                <strong>Documented</strong>
                <span>Tags &amp; notes after every visit</span>
              </div>
            </div>
            <p className="panel-note">
              Availability changes by city and season — call and we will tell you
              straight if we can reach you this week.
            </p>
          </div>
        </div>
        <div className="marquee" aria-hidden>
          <div className="marquee-track">
            {marquee.map((p, i) => (
              <span key={`${p.slug}-${i}`}>
                {(p.primary_kw || p.title).replace(/\bnear me\b/i, "").trim()} ◆{" "}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="section about" id="about">
        <div className="container split about-split">
          <div>
            <p className="eyebrow">About us</p>
            <h2>Keep your extinguishers ready — without the guesswork</h2>
            <p>
              {SITE.name} exists for building owners, facility managers, and
              business operators who want fire equipment that actually works if
              something goes wrong. We inspect, service, recharge, and replace
              units so you are not caught off guard by an audit or a real
              emergency.
            </p>
            <ul className="check-list">
              <li>Walk-throughs for offices, retail, warehouses &amp; condos</li>
              <li>Annual visits and deeper maintenance when units require it</li>
              <li>CO₂, ABC, and kitchen-class equipment</li>
              <li>Clear pricing before we start work</li>
            </ul>
          </div>
          <div className="about-card">
            <h3>Not sure what you need?</h3>
            <p>
              Tell us how many extinguishers you have and what prompted the call
              — expired tag, red gauge, or an inspector&apos;s note. We will point
              you to the right visit.
            </p>
            <Link className="btn-primary" href="/fire-extinguisher-inspection">
              Start with inspection
            </Link>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="container">
          <p className="eyebrow">What we do</p>
          <h2>Services that match how you use your building</h2>
          <p className="section-lead">
            Pick the topic closest to your situation — each page explains what
            happens on a visit and how to book help near you.
          </p>
          <div className="service-grid">
            {nationalPages.map((p, i) => {
              const base = slugBase(p.slug, citySuffixes);
              const blurb =
                SERVICE_BLURBS[base] ??
                "Licensed technicians help you keep extinguishers compliant and ready.";
              const vol = p.vol ?? 0;
              const badge = vol >= 150 ? "Often requested" : null;
              const title =
                p.primary_kw
                  ?.replace(/\bnear me\b/i, "")
                  .replace(/\b\w/g, (c) => c.toUpperCase()) ||
                p.title.replace(" | Call Now", "");
              return (
                <article key={p.slug} className="service-card">
                  {badge ? <span className="pill">{badge}</span> : null}
                  <div className="svc-icon">{SERVICE_ICONS[i % SERVICE_ICONS.length]}</div>
                  <h3>
                    <Link href={`/${p.slug}`}>{title}</Link>
                  </h3>
                  <p>{blurb}</p>
                  <Link className="link-arrow" href={`/${p.slug}`}>
                    Learn more
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section fleet" id="commercial">
        <div className="container split">
          <div>
            <p className="eyebrow">Commercial &amp; multi-unit</p>
            <h2>Built for managers who cannot afford surprises</h2>
            <p>
              Strata councils, franchise owners, and facility teams use us for
              recurring visits, after-hours tagging, and refills after an
              incident — with records you can share with your board or insurer.
            </p>
            <div className="fleet-links">
              <Link href="/commercial-fire-extinguisher-inspection">
                Commercial inspection
              </Link>
              <Link href="/apartment-building-fire-extinguisher-inspection">
                Apartment buildings
              </Link>
              <Link href="/annual-fire-extinguisher-inspection">
                Annual inspection
              </Link>
              <Link href="/fire-extinguisher-recharge-and-refill">
                Recharge &amp; refill
              </Link>
            </div>
          </div>
          <div className="feature-stack">
            <article>
              <h3>Before an audit</h3>
              <p>We flag missing units, blocked cabinets, and expired tags first.</p>
            </article>
            <article>
              <h3>After a discharge</h3>
              <p>Recharge or swap the right type so the wall is not empty overnight.</p>
            </article>
            <article>
              <h3>Multiple locations?</h3>
              <p>
                Ask about rotating schedules — one contact number for several
                addresses.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section standards">
        <div className="container">
          <p className="eyebrow">Our promise</p>
          <h2>Six things you can expect every time</h2>
          <div className="std-grid">
            {STANDARDS.map((s) => (
              <div key={s.num} className="std-item">
                <span className="std-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section process">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <h2>From first call to tagged extinguishers</h2>
          <ol className="steps">
            <li>
              <strong>Call us</strong>
              <span>
                {SITE.phoneDisplay} — tell us your city, building type, and what
                worried you (tag date, gauge, missing unit).
              </span>
            </li>
            <li>
              <strong>Share access details</strong>
              <span>Hours, entrance, and how many floors we should include.</span>
            </li>
            <li>
              <strong>Get a clear quote</strong>
              <span>Scope and price before we roll a truck or open cabinets.</span>
            </li>
            <li>
              <strong>On-site visit</strong>
              <span>Inspect, service, recharge, or replace — with photos if you need them.</span>
            </li>
            <li>
              <strong>Keep your records</strong>
              <span>Updated tags and a summary you can file for insurance or your board.</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="section coverage" id="coverage">
        <div className="container">
          <p className="eyebrow">Where we serve</p>
          <h2>Local help in major Canadian cities</h2>
          <p className="section-lead">
            Choose your city for inspection, maintenance, recharge, and related
            services — we will confirm coverage when you call.
          </p>
          <div className="city-cloud">
            {cityAreas.map((city) => (
              <Link key={city} href={`/${mobilePageSlugForCity(city)}`}>
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-inner">
          <h2>Tags expired? Unit missing? Just want peace of mind?</h2>
          <p>One call — we will walk you through the next step for your building.</p>
          <a className="btn-primary btn-lg" href={`tel:${SITE.phoneTel}`}>
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </section>

      <section className="section quote" id="quote">
        <div className="container split quote-split">
          <div>
            <p className="eyebrow">Get help</p>
            <h2>Request a callback</h2>
            <p>
              Prefer we call you? Leave your details and someone from our team
              will reach out as soon as they can.
            </p>
            <ul className="contact-list">
              <li>
                <span>Phone</span>
                <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
              </li>
            </ul>
          </div>
          <QuoteForm />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
