import Link from "next/link";
import type { SeoPage } from "@/lib/pages";
import { citySuffixes, mobilePageSlugForCity } from "@/lib/pages";
import { SERVICE_BLURBS, SITE } from "@/lib/site";
import {
  getCityProfile,
  localCallTips,
  localHeroLead,
  localPageTitle,
  localSituations,
  SERVICE_TITLES,
} from "@/lib/local-pages";
import { slugBase } from "@/lib/content";

type Props = {
  page: SeoPage;
  serviceBase: string;
  related: SeoPage[];
};

export function LocationServicePage({ page, serviceBase, related }: Props) {
  const city = page.area;
  const profile = getCityProfile(city);
  const blurb =
    SERVICE_BLURBS[serviceBase] ??
    "Licensed technicians help you keep fire extinguishers ready.";
  const title = localPageTitle(city, serviceBase);
  const serviceLabel = SERVICE_TITLES[serviceBase] ?? "Fire extinguisher help";
  const situations = localSituations(city, serviceBase);
  const callTips = localCallTips(serviceBase);

  return (
    <>
      <header className="page-hero page-hero-local">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> /{" "}
            <Link href={`/${mobilePageSlugForCity(city)}`}>{city}</Link> /{" "}
            <span>{serviceLabel}</span>
          </nav>
          <p className="eyebrow eyebrow-local">
            {serviceLabel} · {profile.province}
          </p>
          <h1>{title}</h1>
          <p>{localHeroLead(profile, serviceBase)}</p>
          <ul className="hero-chips">
            <li>On-site visits</li>
            <li>{profile.region}</li>
            <li>Commercial &amp; residential</li>
          </ul>
          <div className="page-cta">
            <a className="btn-primary btn-lg" href={`tel:${SITE.phoneTel}`}>
              Call {SITE.phoneDisplay}
            </a>
            <Link className="btn-secondary btn-on-dark" href="/#quote">
              Request callback
            </Link>
          </div>
        </div>
      </header>

      <section className="section local-situations">
        <div className="container">
          <p className="eyebrow">When to call</p>
          <h2>Common reasons {city} calls us</h2>
          <ul className="situation-list">
            {situations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-surface">
        <div className="container split">
          <div>
            <h2>What happens when you call</h2>
            <p>{blurb}</p>
            <p>
              A coordinator confirms access, quotes the visit, and schedules a
              technician for {profile.name}.
            </p>
            <h3>Have this ready</h3>
            <ul className="check-list">
              {callTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <aside className="sidebar sidebar-call">
            <p className="sidebar-kicker">Fastest help</p>
            <h3>Talk to dispatch</h3>
            <p>No app required — a real person answers and schedules your visit.</p>
            <a className="btn-primary btn-lg sidebar-phone" href={`tel:${SITE.phoneTel}`}>
              {SITE.phoneDisplay}
            </a>
            <hr className="sidebar-divider" />
            <h4>More in {city}</h4>
            <ul>
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`}>
                    {(SERVICE_TITLES[slugBase(p.slug, citySuffixes)] ?? "Service") +
                      ` · ${city}`}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section local-areas">
        <div className="container">
          <p className="eyebrow">Where we go</p>
          <h2>Roads and areas we often serve around {city}</h2>
          <p className="section-lead">
            These are typical zones — if your building is nearby, call and we
            will confirm we can reach you.
          </p>
          <div className="local-pill-group">
            <span className="pill-label">Highways &amp; corridors</span>
            <div className="city-cloud">
              {profile.corridors.map((c) => (
                <span key={c} className="pill-static">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="local-pill-group">
            <span className="pill-label">Neighbourhoods &amp; districts</span>
            <div className="city-cloud">
              {profile.neighborhoods.map((n) => (
                <span key={n} className="pill-static pill-muted">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-inner">
          <h2>
            Need fire extinguisher help in {city}?
          </h2>
          <p>One call — we will tell you what to prepare and how soon we can visit.</p>
          <a className="btn-primary btn-lg" href={`tel:${SITE.phoneTel}`}>
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
