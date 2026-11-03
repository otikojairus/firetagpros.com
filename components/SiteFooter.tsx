import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">{SITE.name}</div>
          <p>
            {SITE.tagline}. Inspection, maintenance, recharge, and refill when
            your building needs to stay ready and documented.
          </p>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Popular services</h4>
          <ul>
            <li>
              <Link href="/fire-extinguisher-inspection">Fire extinguisher inspection</Link>
            </li>
            <li>
              <Link href="/commercial-fire-extinguisher-inspection">
                Commercial inspection
              </Link>
            </li>
            <li>
              <Link href="/annual-fire-extinguisher-inspection">Annual inspection</Link>
            </li>
            <li>
              <Link href="/fire-extinguisher-recharge-and-refill">Recharge &amp; refill</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 {SITE.name}</span>
        <span>{SITE.hoursNote}</span>
      </div>
    </footer>
  );
}
