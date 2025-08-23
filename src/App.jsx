import React, { useEffect, useState } from "react";

/**
 * Xclusive Arizona — One‑Page React/Tailwind site
 * -------------------------------------------------
 * Single‑file app so everything works without imports.
 * Includes:
 *  - Sticky header with logo + section nav
 *  - Hero with strong CTA (Call Now / Get a Quote)
 *  - Services list (price‑sorted; supports CMS override)
 *  - Gallery (loads /data/gallery.json when present)
 *  - Contact section with hours + Netlify‑ready quote form
 *  - Smooth in‑page scrolling
 *
 * NOTE: The old "Process & Results" section was removed per request.
 */

// ===== Brand palette and helpers =====
const BRAND = {
  primaryBg: "bg-blue-600", // CTA background color
  focusRing: "focus:ring-blue-200", // input focus ring
};

// Simple utility to join class names conditionally
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Contact info used in multiple places
const PHONE = "(480) 868-1262";
const TEL = "tel:+14808681262";

// Optional logo under /public/xaz-logo.png
const LOGO = { src: "/xaz-logo.png", alt: "XAZ Auto Detailing" };

// ===== Default content (used if CMS JSON files are missing) =====
const SERVICES_DEFAULT = [
  { name: "Upholstery Shampoo", price: "$49" },
  { name: "Engine Bay Detail", price: "$59" },
  { name: "Foam Wash Service", price: "$79" },
  { name: "Odor Eliminator", price: "$79" },
  { name: "Mini Detail Service", price: "$199" },
  { name: "Complete Detail Service", price: "$299" },
  { name: "Ceramic Coatings", price: "Call for Free Quote" },
  { name: "Window Tint", price: "Call for Free Quote" },
];

const HOURS_DEFAULT = [
  { d: "Monday", h: "6 AM – 6 PM" },
  { d: "Tuesday", h: "6 AM – 6 PM" },
  { d: "Wednesday", h: "6 AM – 6 PM" },
  { d: "Thursday", h: "6 AM – 6 PM" },
  { d: "Friday", h: "6 AM – 6 PM" },
  { d: "Saturday", h: "7 AM – 5 PM" },
  { d: "Sunday", h: "Closed" },
];

// Fallback gallery items (will be replaced by /data/gallery.json if present)
const SINGLES = [
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1039-high.jpg?crop=1920%2C1634%2Cx0%2Cy0%2Csafe&enable=upscale&enable-io=true&height=877&width=1030", alt: "Blue McLaren exterior after detail" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/2398cd76-252b-4297-b250-ffd6936d5cec-high-u48bga.jpg?crop=1918%2C1445%2Cx1%2Cy0%2Csafe&enable=upscale&enable-io=true&height=776&width=1030", alt: "Ferrari exterior — glossy finish" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_2114-high.jpg?crop=1919%2C1440%2Cx1%2Cy0%2Csafe&enable=upscale&enable-io=true&height=773&width=1030", alt: "GMC + mobile detailing van on site" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_2117-high.jpg?crop=1919%2C1440%2Cx1%2Cy0%2Csafe&enable=upscale&enable-io=true&height=773&width=1030", alt: "Engine bay cleaned" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1844-high.jpg?enable-io=true&enable=upscale&crop=1920%2C1497%2Cx0%2Cy1%2Csafe&width=1030&height=803", alt: "Garage results — Mustang + Range Rover" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1937-high.jpg?enable-io=true&enable=upscale&crop=1919%2C1460%2Cx0%2Cy0%2Csafe&width=1030&height=784", alt: "Black Bronco with doors open" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/mf0afh/img_0538.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Ford Bronco exterior after detail" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1900-high.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "XAZ van — mobile service" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_2026-high.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Black Cadillac" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1802-high.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Finished Tesla Model X" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1612-high.jpg?enable-io=true&enable=upscale&crop=1920%2C1511%2Cx0%2Cy0%2Csafe&width=1030&height=811", alt: "Clean RV" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/w92v3t/img_0542.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Porsche in driveway" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/gwrpb4/img_0540.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Clean off-road vehicle" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/7penxq/img_0578.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Red truck washing" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/5ky6bl/img_0595.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Car clean interior" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1719-high-dvakvt.webp", alt: "In‑progress & finished collage" },
];

// ===== Layout =====
function Container({ children, className = "" }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200">
      <Container className="flex items-center justify-between py-3">
        {/* Left: Logo + brand */}
        <a href="#home" className="flex items-center gap-3">
          {LOGO.src ? (
            <img src={LOGO.src} alt={LOGO.alt} className="h-8 w-auto" />
          ) : (
            <div className="h-8 w-8 rounded-md bg-gray-900 text-white grid place-items-center text-[11px] font-bold">XA</div>
          )}
          <span className="font-medium tracking-tight">Xclusive Arizona Detailing</span>
        </a>

        {/* Middle: section links */}
        <nav className="hidden md:flex items-center gap-6 text-[15px] text-gray-700">
          <a href="#services" className="hover:text-gray-900">Services</a>
          <a href="#gallery" className="hover:text-gray-900">Gallery</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </nav>

        {/* Right: quick call */}
        <a href={TEL} className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-[15px] font-medium hover:bg-gray-50">
          {PHONE}
        </a>
      </Container>
    </header>
  );
}

function Hero() {
  const HERO_IMAGE =
    "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/sdxug2/2a7d6f15-0528-445a-805d-81ca25c1aa2c.jpeg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773";

  return (
    <section id="home" className="bg-transparent scroll-mt-28 md:scroll-mt-32">
      <Container className="py-10 sm:py-14">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              Xclusive Arizona Mobile Detailing
            </h1>
            <p className="mt-3 text-[17px] leading-7 text-gray-700">
              Mobile service across the Valleywide area. Book a wash or full detail and get a like‑new finish at your driveway.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={TEL}
                className={cx("rounded-md px-5 py-2.5 text-white text-sm font-semibold hover:bg-blue-700", BRAND.primaryBg)}
              >
                Call Now
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  const el = document.getElementById("contact");
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold hover:bg-gray-50"
              >
                Get a Quote
              </a>
            </div>
            <div className="mt-5 text-sm text-gray-600">Mon–Fri 6 AM–6 PM · Sat 7 AM–5 PM · Sun Closed</div>
          </div>

          <div>
            <img src={HERO_IMAGE} alt="In‑progress and finished results" className="aspect-[4/3] w-full rounded-md border border-gray-200 object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}

// A single service row
function ServiceRow({ s }) {
  const isQuote = /call for free quote/i.test(s.price);
  return (
    <li className="flex items-center justify-between py-2.5 border-b last:border-b-0 border-gray-200">
      <span className="text-[15px]">{s.name}</span>
      <span className={cx("text-[15px] font-semibold", isQuote && "text-gray-700")}>{s.price}</span>
    </li>
  );
}

function Services() {
  // Start with defaults; attempt CMS override from /data/services.json when available
  const [services, setServices] = useState(SERVICES_DEFAULT);

  useEffect(() => {
    fetch("/data/services.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        // Support both array form and { services: [...] }
        if (Array.isArray(json) && json.length) setServices(json);
        else if (json && Array.isArray(json.services) && json.services.length) setServices(json.services);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="services" className="bg-transparent scroll-mt-28 md:scroll-mt-32">
      <Container className="py-10 sm:py-14">
        <div className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Services & Pricing</h2>
          <p className="mt-2 text-lg font-medium text-gray-800">
            We also do Boats, RV’s, Harleys & Planes! We come to you!
          </p>
        </div>
        <div className="rounded-md border border-gray-200 bg-white p-5">
          <ul>
            {services.map((s) => (
              <ServiceRow key={s.name} s={s} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function Gallery() {
  // Try to load CMS data from /data/gallery.json; fall back to SINGLES
  const [cmsGallery, setCmsGallery] = useState(null);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (json && Array.isArray(json.items)) setCmsGallery(json.items);
      })
      .catch(() => {});
  }, []);

  const items = Array.isArray(cmsGallery) && cmsGallery.length ? cmsGallery : SINGLES;

  return (
    <section id="gallery" className="bg-transparent border-t border-b border-gray-200 scroll-mt-28 md:scroll-mt-32">
      <Container className="py-10 sm:py-14">
        {/* Keep the anchor id as "gallery" so the nav can scroll here, but show a friendlier title */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">See our work!</h2>
        {items.length > 0 ? (
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            {items.map((img, i) => (
              <figure key={i} className="overflow-hidden rounded-md border border-gray-200 bg-white">
                <img src={img.src} alt={img.alt || "Detail photo"} className="aspect-square w-full object-cover" />
              </figure>
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-500">Add images via the CMS or populate the SINGLES array.</p>
        )}
      </Container>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e) {
    // In dev, prevent navigation and show a friendly message
    if (import.meta.env && import.meta.env.DEV) {
      e.preventDefault();
      setSubmitted(true);
      return;
    }
    // In production on Netlify, allow the natural POST so Forms can capture it
  }

  // Hours (with CMS override)
  const [hours, setHours] = useState(HOURS_DEFAULT);
  useEffect(() => {
    fetch("/data/hours.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (Array.isArray(json) && json.length) setHours(json);
        else if (json && Array.isArray(json.hours) && json.hours.length) setHours(json.hours);
      })
      .catch(() => {});
  }, []);

  // Services for the dropdown (kept local so it always exists)
  const [servicesForForm, setServicesForForm] = useState(SERVICES_DEFAULT);
  useEffect(() => {
    fetch("/data/services.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (Array.isArray(json) && json.length) setServicesForForm(json);
        else if (json && Array.isArray(json.services) && json.services.length) setServicesForForm(json.services);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="contact" className="bg-transparent scroll-mt-28 md:scroll-mt-32">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: basic info + hours */}
          <div className="rounded-md border border-gray-200 p-5">
            <h2 className="text-xl font-semibold">Contact & Hours</h2>

            <div className="mt-3 text-sm text-gray-600">Phone</div>
            <a href={TEL} className="mt-1 block text-lg font-medium hover:underline">{PHONE}</a>

            <div className="mt-5 text-sm text-gray-600">Hours</div>
            <ul className="mt-1 divide-y divide-gray-200">
              {hours.map((h) => (
                <li key={h.d} className="flex items-center justify-between py-2 text-sm">
                  <span>{h.d}</span>
                  <span className="font-medium">{h.h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <a
                href="https://linktr.ee/xclusivearizona"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-sm border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
              >
                Linktree
              </a>
            </div>
          </div>

          {/* Right: Quote form (Netlify‑ready) */}
          <div className="rounded-md border border-gray-200 p-5">
            <h3 className="text-base font-semibold">Request a Quote</h3>
            {submitted ? (
              <div className="mt-4 rounded-sm bg-green-50 border border-green-200 p-4 text-green-900 text-sm">
                Thanks! Your request was captured (demo). Hook this up to Netlify/Forms to receive submissions.
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                name="quote"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                action="/?submitted=1#contact"
                className="mt-4 grid gap-4"
              >
                <input type="hidden" name="form-name" value="quote" />
                <p className="hidden">
                  <label>
                    Don’t fill this out: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Name</label>
                  <input name="name" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.focusRing)} required />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Phone</label>
                  <input name="phone" type="tel" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.focusRing)} required />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">City / ZIP</label>
                  <input name="location" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.focusRing)} />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Vehicle</label>
                  <input name="vehicle" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.focusRing)} placeholder="Year / Make / Model" />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Service</label>
                  <select name="service" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.focusRing)}>
                    {servicesForForm.map((s) => (
                      <option key={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Preferred Date/Time</label>
                  <input name="preference" type="text" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.focusRing)} placeholder="e.g., Friday morning" />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Notes</label>
                  <textarea name="notes" rows={3} className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.focusRing)} placeholder="Anything we should know?" />
                </div>
                <button type="submit" className={cx("mt-2 inline-flex items-center justify-center rounded-md px-5 py-2.5 text-white text-sm font-semibold hover:bg-blue-700", BRAND.primaryBg)}>
                  Send Request
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <Container className="py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-gray-600">
          <div>
            <div className="font-medium text-gray-800">Xclusive Arizona</div>
            <div className="mt-1">{PHONE}</div>
            <div className="mt-1">Valleywide mobile service</div>
          </div>
          <div className="flex items-center gap-3">
            <a href={TEL} className="inline-flex items-center rounded-sm border border-gray-300 px-3 py-2 font-medium hover:bg-gray-100">Call</a>
            <a href="#contact" className="inline-flex items-center rounded-sm border border-gray-300 px-3 py-2 font-medium hover:bg-gray-100">Get a Quote</a>
            <a href="#home" className="inline-flex items-center rounded-sm border border-gray-300 px-3 py-2 font-medium hover:bg-gray-100">Back to top</a>
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-400">© {new Date().getFullYear()} Xclusive Arizona. All rights reserved.</div>
      </Container>
    </footer>
  );
}

// ===== App root =====
export default function XclusiveArizonaSite() {
  // Enable smooth scrolling globally
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "smooth";
    return () => {
      root.style.scrollBehavior = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#ebf8fa] text-gray-900">
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
