"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SITE } from "@/lib/site";

type NavActive = "" | "services" | "commercial" | "coverage" | "quote";

const SERVICE_LINKS = [
  { href: "/fire-extinguisher-inspection", label: "Fire extinguisher inspection" },
  { href: "/commercial-fire-extinguisher-inspection", label: "Commercial inspection" },
  { href: "/annual-fire-extinguisher-inspection", label: "Annual inspection" },
  { href: "/fire-extinguisher-maintenance", label: "Maintenance" },
  { href: "/fire-extinguisher-servicing", label: "Service" },
  { href: "/fire-extinguisher-recharge-and-refill", label: "Recharge & refill" },
  { href: "/co2-fire-extinguisher-refill", label: "CO₂ refill" },
  {
    href: "/apartment-building-fire-extinguisher-inspection",
    label: "Apartment buildings",
  },
] as const;

export function SiteHeader({ active = "" }: { active?: NavActive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <div className="topbar">
        <span className="topbar-l">🇨🇦 Fire extinguisher help coast to coast</span>
        <div className="topbar-r">
          <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
        </div>
      </div>
      <div className="site-nav-shell">
        <nav>
          <Link className="nav-logo" href="/" onClick={closeMenu}>
            <span className="logo-mark">
              <Image src="/logo.svg" alt="" width={42} height={42} priority />
            </span>
            <span className="logo-text">{SITE.name}</span>
          </Link>
          <ul className="nav-links">
            <li className="has-dropdown">
              <Link
                href="/#services"
                className={active === "services" ? "active" : undefined}
                aria-haspopup="true"
              >
                Services
                <span className="nav-caret" aria-hidden>
                  ▾
                </span>
              </Link>
              <ul className="nav-dropdown">
                {SERVICE_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/#services">All services</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/#commercial"
                className={active === "commercial" ? "active" : undefined}
              >
                Commercial
              </Link>
            </li>
            <li>
              <Link
                href="/#coverage"
                className={active === "coverage" ? "active" : undefined}
              >
                Cities
              </Link>
            </li>
            <li>
              <Link href="/#quote" className={active === "quote" ? "active" : undefined}>
                Get help
              </Link>
            </li>
          </ul>
          <div className="nav-cta">
            <a className="btn-call" href={`tel:${SITE.phoneTel}`}>
              Call now
            </a>
          </div>
          <button
            className={`hamburger${menuOpen ? " is-active" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
        <div
          id="mobile-nav"
          className={`mob-menu${menuOpen ? " is-open" : ""}`}
          aria-hidden={!menuOpen}
        >
          <button
            type="button"
            className={`mob-accordion${servicesOpen ? " is-open" : ""}`}
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen((o) => !o)}
          >
            Services
            <span aria-hidden>{servicesOpen ? "▴" : "▾"}</span>
          </button>
          <div className={`mob-sub${servicesOpen ? " is-open" : ""}`}>
            {SERVICE_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
            <Link href="/#services" onClick={closeMenu}>
              All services
            </Link>
          </div>
          <Link href="/#commercial" onClick={closeMenu}>
            Commercial
          </Link>
          <Link href="/#coverage" onClick={closeMenu}>
            Cities
          </Link>
          <Link href="/#quote" onClick={closeMenu}>
            Get help
          </Link>
          <div className="mob-cta">
            <a className="mc-call" href={`tel:${SITE.phoneTel}`}>
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
