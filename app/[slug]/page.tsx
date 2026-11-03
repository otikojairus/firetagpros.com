import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LocationServicePage } from "@/components/LocationServicePage";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  areaLabel,
  displayServiceLabel,
  secondaryKeywords,
  slugBase,
} from "@/lib/content";
import { localPageTitle } from "@/lib/local-pages";
import {
  allPages,
  citySuffixes,
  getPageBySlug,
  getRelatedPages,
} from "@/lib/pages";
import { SERVICE_BLURBS, SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return {};

  const area = areaLabel(page.area);
  const isLocal = !page.area.includes("National");
  const serviceBase = slugBase(page.slug, citySuffixes);
  const title = isLocal
    ? localPageTitle(page.area, serviceBase)
    : page.title.replace(" | Call Now", "");
  const primary = page.primary_kw || title;
  const description = isLocal
    ? `${title} — inspection, service, and refill help in ${area}. Call ${SITE.phoneDisplay} to book a visit.`
    : `Need ${primary} in ${area}? We inspect, maintain, and recharge extinguishers. Call ${SITE.phoneDisplay} now.`;
  const url = `https://${SITE.domain}/${slug}`;

  return {
    title: isLocal ? `${title} | ${SITE.name}` : page.title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  const isLocal = !page.area.includes("National");

  if (isLocal) {
    const serviceBase = slugBase(page.slug, citySuffixes);
    const related = getRelatedPages(page);
    return (
      <>
        <SiteHeader active="services" />
        <LocationServicePage
          page={page}
          serviceBase={serviceBase}
          related={related}
        />
        <SiteFooter />
      </>
    );
  }

  const area = areaLabel(page.area);
  const base = slugBase(page.slug, citySuffixes);
  const blurb =
    SERVICE_BLURBS[base] ??
    "Licensed technicians help you keep fire extinguishers ready and documented.";
  const secondaries = secondaryKeywords(page.secondary_kw);
  const related = getRelatedPages(page);
  const eyebrow = displayServiceLabel(page);

  return (
    <>
      <SiteHeader active="services" />
      <header className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <span>{area}</span>
          </nav>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{page.title.replace(" | Call Now", "")}</h1>
          <p>
            {eyebrow} across Canada — we come to your building, warehouse, or
            storefront and explain what we found before we leave.
          </p>
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
      <section className="section section-surface">
        <div className="container split">
          <div>
            <h2>What you get</h2>
            <p>{blurb}</p>
            <p>
              When you call, tell us how many extinguishers you have and what
              prompted the visit — expired tag, discharge, or an upcoming
              audit. We will confirm scope and price before we start.
            </p>
            {secondaries.length > 0 ? (
              <>
                <h3>People also ask us about</h3>
                <ul className="tag-list">
                  {secondaries.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
          <aside className="sidebar">
            <h3>More services in {area}</h3>
            <ul>
              {related.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`}>
                    {p.title.replace(" | Call Now", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
