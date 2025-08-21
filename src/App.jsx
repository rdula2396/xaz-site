import React, { useState, useEffect } from "react";

// Xclusive Arizona — One‑Page React/Tailwind (Logo + Brand + Expanded Gallery)
// Clean, neutral styling; all services + bigger gallery on one page.
// Fix: ensure BEFORE_AFTER exists, remove stray JSX, and add light dev assertions.

// ===== Brand =====
const BRAND = {
  primary: "text-blue-700",
  primaryBg: "bg-blue-600",
  primaryRing: "focus:ring-blue-200",
};

// Provide a logo image. For Vite, place /public/xaz-logo.png and use "/xaz-logo.png" here.
const LOGO = {
  src: "/xaz-logo.png",
  alt: "XAZ Auto Detailing",
};

const PHONE = "(480) 868-1262";
const TEL = "tel:+14808681262";

// ===== Images =====
// Pairs that show the PROCESS (often "during" foam stage) and the finished result.
const BEFORE_AFTER = [
  {
    before:
      "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_2452-high.jpg?crop=1920%2C1806%2Cx0%2Cy1%2Csafe&enable=upscale&enable-io=true&height=969&width=1030",
    after:
      "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_2456-high.jpg?crop=1920%2C1575%2Cx0%2Cy0%2Csafe&enable=upscale&enable-io=true&height=845&width=1030",
    extra:
      "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_2455-high.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773",
    alt: "Porsche 911 — foam stage to finished",
    extraAlt: "Porsche 911 — interior",
  },
];

// SINGLES: show at least 16 items. (You can append more — grid will grow.)
const SINGLES = [
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1039-high.jpg?crop=1920%2C1634%2Cx0%2Cy0%2Csafe&enable=upscale&enable-io=true&height=877&width=1030", alt: "Blue McLaren exterior after detail" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/2398cd76-252b-4297-b250-ffd6936d5cec-high-u48bga.jpg?crop=1918%2C1445%2Cx1%2Cy0%2Csafe&enable=upscale&enable-io=true&height=776&width=1030", alt: "Ferrari exterior — glossy finish" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_2114-high.jpg?crop=1919%2C1440%2Cx1%2Cy0%2Csafe&enable=upscale&enable-io=true&height=773&width=1030", alt: "GMC + mobile detailing van on site" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_2117-high.jpg?crop=1919%2C1440%2Cx1%2Cy0%2Csafe&enable=upscale&enable-io=true&height=773&width=1030", alt: "Engine bay cleaned" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1844-high.jpg?enable-io=true&enable=upscale&crop=1920%2C1497%2Cx0%2Cy1%2Csafe&width=1030&height=803", alt: "Garage results — Mustang + Range Rover" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1937-high.jpg?enable-io=true&enable=upscale&crop=1919%2C1460%2Cx0%2Cy0%2Csafe&width=1030&height=784", alt: "Black Bronco with doors open" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/mf0afh/img_0538.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Ford Bronco exterior after detail" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1900-high.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "XAZ van — mobile service" },
  // extras to reach 16 — safe known shots from the same gallery
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_2026-high.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Black Cadillac" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1802-high.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Finished Tesla Model X" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1612-high.jpg?enable-io=true&enable=upscale&crop=1920%2C1511%2Cx0%2Cy0%2Csafe&width=1030&height=811", alt: "Clean RV" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/w92v3t/img_0542.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Porsche in driveway" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/gwrpb4/img_0540.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Clean off-road vehicle" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/7penxq/img_0578.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Red truck washing" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/5ky6bl/img_0595.jpg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773", alt: "Car clean interior" },
  { src: "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/img_1719-high-dvakvt.webp", alt: "In‑progress & finished collage" },
];

// ===== Dev sanity checks (not tests, just guardrails during dev) =====
if (import.meta && import.meta.env && import.meta.env.DEV) {
  console.assert(Array.isArray(SINGLES) && SINGLES.length >= 16, "SINGLES should have at least 16 images.");
  console.assert(Array.isArray(BEFORE_AFTER), "BEFORE_AFTER must be an array (can be empty).");
  console.assert(BEFORE_AFTER.every((i) => !i.extra || typeof i.extra === "string"), "BEFORE_AFTER.extra, if present, must be a string URL.");
}

const HOURS = [
  { d: "Monday", h: "6 AM – 6 PM" },
  { d: "Tuesday", h: "6 AM – 6 PM" },
  { d: "Wednesday", h: "6 AM – 6 PM" },
  { d: "Thursday", h: "6 AM – 6 PM" },
  { d: "Friday", h: "6 AM – 6 PM" },
  { d: "Saturday", h: "7 AM – 5 PM" },
  { d: "Sunday", h: "Closed" },
];

const CORE_SERVICES = [
  {
    title: "Foam Wash",
    price: "$79",
    bullets: ["Pre‑rinse & foam bath", "Hand wash", "Wheels & tires", "Towel dry"],
  },
  {
    title: "Mini Detail",
    price: "$199",
    bullets: [
      "Exterior foam wash",
      "Interior vacuum",
      "Interior wipe‑down",
      "Windows inside/out",
      "Tire shine",
    ],
  },
  {
    title: "Complete Detail",
    price: "$299",
    bullets: [
      "Exterior decon & sealant",
      "Full interior shampoo",
      "Interior wipe‑down",
      "Windows, wheels & tires",
    ],
    featured: true,
  },
];

const ADDONS = [
  { name: "Engine Bay Cleaning", price: "$59" },
  { name: "Upholstery Shampoo", price: "$49" },
  { name: "Odor Eliminator", price: "$79" },
];

const QUOTE_ONLY = [
  { name: "Ceramic Coating", note: "Request a custom quote" },
  { name: "Window Tint", note: "Request a custom quote" },
];

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Container({ children, className = "" }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200">
      <Container className="flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-3">
          {LOGO.src ? (
            <img src={LOGO.src} alt={LOGO.alt} className="h-8 w-auto" />
          ) : (
            <div className="h-8 w-8 rounded-md bg-gray-900 text-white grid place-items-center text-[11px] font-bold">XA</div>
          )}
          <span className="font-medium tracking-tight">Xclusive Arizona Detailing</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-[15px] text-gray-700">
          <a href="#services" className="hover:text-gray-900">Services</a>
          <a href="#gallery" className="hover:text-gray-900">Gallery</a>
          <a href="#process" className="hover:text-gray-900">Process</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
        </nav>
        <a href={TEL} className="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-[15px] font-medium hover:bg-gray-50">
          {PHONE}
        </a>
      </Container>
    </header>
  );
}

function Hero() {
  // Use the collage that shows cleaning + cleaned in one image
  const HERO_IMAGE = "https://primary.jwwb.nl/public/r/t/y/temp-fsbgljphxlkfzfjwqqcn/sdxug2/2a7d6f15-0528-445a-805d-81ca25c1aa2c.jpeg?enable-io=true&enable=upscale&crop=1919%2C1440%2Cx1%2Cy0%2Csafe&width=1030&height=773";
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
              <a href={TEL} className={cx("rounded-md px-5 py-2.5 text-white text-sm font-semibold hover:bg-blue-700", BRAND.primaryBg)}>Call Now</a>
              <a href="#contact" onClick={(e)=>{ const el=document.getElementById('contact'); if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'});} }} className={cx("rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold hover:bg-gray-50")}>Get a Quote</a>
            </div>
            <div className="mt-5 text-sm text-gray-600">
              Mon–Fri 6 AM–6 PM · Sat 7 AM–5 PM · Sun Closed
            </div>
          </div>
          <div>
            <img src={HERO_IMAGE} alt="In‑progress and finished results" className="aspect-[4/3] w-full rounded-md border border-gray-200 object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ s }) {
  return (
    <div className={cx("rounded-md border bg-white p-5 hover:shadow-sm transition-shadow", s.featured ? "border-gray-900" : "border-gray-200")}>
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold tracking-tight text-gray-900">{s.title}</h3>
        {s.price && <div className="text-base font-semibold text-gray-900">{s.price}</div>}
      </div>
      {s.bullets && (
        <ul className="mt-3 space-y-1.5 text-[15px] text-gray-700">
          {s.bullets.map((b, i) => (
            <li key={i} className="flex gap-2"><span className="text-gray-400">•</span><span>{b}</span></li>
          ))}
        </ul>
      )}
      <div className="mt-5">
        <a href="#contact" className={cx("inline-flex items-center rounded-sm px-3 py-1.5 text-sm font-medium border hover:bg-gray-50", s.featured ? "border-gray-900" : "border-gray-300")}>Get this service</a>
      </div>
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="bg-transparent scroll-mt-28 md:scroll-mt-32">
      <Container className="py-10 sm:py-14">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Services & Pricing</h2>
          <p className="mt-1.5 text-gray-600">All services on one page. No extra clicks.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CORE_SERVICES.map((s) => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-md border border-gray-200 bg-gray-50 p-5">
            <h3 className="text-base font-semibold">Add‑Ons</h3>
            <ul className="mt-3 divide-y divide-gray-200">
              {ADDONS.map((a) => (
                <li key={a.name} className="flex items-center justify-between py-2 text-[15px]">
                  <span>{a.name}</span>
                  <span className="font-medium">{a.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-5">
            <h3 className="text-base font-semibold">Quote‑Only Services</h3>
            <ul className="mt-3 space-y-2 text-[15px]">
              {QUOTE_ONLY.map((q) => (
                <li key={q.name} className="flex items-center justify-between">
                  <span>{q.name}</span>
                  <a href="#contact" className="inline-flex items-center rounded-sm border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50">Request quote</a>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-gray-500">Provide vehicle details and location for accurate pricing.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function BeforeAfterCard({ item }) {
  const hasExtra = Boolean(item.extra);
  const cols = hasExtra ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2";
  return (
    <div className={`grid ${cols} gap-2`}>
      <figure className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <img src={item.before} alt={(item.alt || "During") + " — during"} className="aspect-square w-full object-cover" />
        <figcaption className={cx("px-2 py-1 text-xs font-medium text-white", BRAND.primaryBg)}>During</figcaption>
      </figure>
      <figure className="overflow-hidden rounded-md border border-gray-200 bg-white">
        <img src={item.after} alt={(item.alt || "After") + " — after"} className="aspect-square w-full object-cover" />
        <figcaption className="px-2 py-1 text-xs font-medium bg-emerald-600 text-white">After</figcaption>
      </figure>
      {hasExtra && (
        <figure className="overflow-hidden rounded-md border border-gray-200 bg-white">
          <img src={item.extra} alt={item.extraAlt || "Interior — after"} className="aspect-square w-full object-cover" />
          <figcaption className="px-2 py-1 text-xs font-medium bg-emerald-600 text-white">Interior</figcaption>
        </figure>
      )}
    </div>
  );
}

function Gallery() {
  // Show all singles (16+) with no tabs; keep it simple
  return (
    <section id="gallery" className="bg-transparent border-t border-b border-gray-200 scroll-mt-28 md:scroll-mt-32">
      <Container className="py-10 sm:py-14">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Process & Result</h2>
          <p className="mt-1.5 text-gray-600">A look at in‑progress shots and the finished results.</p>
        </div>
        {BEFORE_AFTER.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {BEFORE_AFTER.map((ba, i) => (
              <BeforeAfterCard key={i} item={ba} />
            ))}
          </div>
        ) : null}

        <div className="mt-10">
          <h3 className="text-lg font-semibold">Recent Work</h3>
          {SINGLES.length > 0 ? (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
              {SINGLES.map((img, i) => (
                <figure key={i} className="overflow-hidden rounded-md border border-gray-200 bg-white">
                  <img src={img.src} alt={img.alt || "Detail photo"} className="aspect-square w-full object-cover" />
                </figure>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-500">Add standalone photos in the SINGLES array.</p>
          )}
        </div>
      </Container>
    </section>
  );
}

function Process() {
  const steps = [
    { t: "Book", d: "Call or send a quick quote request with your vehicle and location." },
    { t: "We Come to You", d: "Mobile service across the Valleywide area." },
    { t: "Shine", d: "Drive a like‑new vehicle." },
  ];
  return (
    <section id="process" className="bg-transparent scroll-mt-28 md:scroll-mt-32">
      <Container className="py-10 sm:py-14">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Process</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.t} className="rounded-md border border-gray-200 p-5">
              <div className="text-sm text-gray-500">Step {i + 1}</div>
              <h3 className="mt-1 text-lg font-semibold">{s.t}</h3>
              <p className="mt-1.5 text-[15px] text-gray-700">{s.d}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e) {
    // In development: simulate success without leaving the page
    if (import.meta.env && import.meta.env.DEV) {
      e.preventDefault();
      setSubmitted(true);
      return;
    }
    // In production: allow natural POST so Netlify can capture the submission
  }

  return (
    <section id="contact" className="bg-transparent scroll-mt-28 md:scroll-mt-32">
      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-md border border-gray-200 p-5">
            <h2 className="text-xl font-semibold">Contact & Hours</h2>
            <div className="mt-3 text-sm text-gray-600">Phone</div>
            <a href={TEL} className="mt-1 block text-lg font-medium hover:underline">{PHONE}</a>

            <div className="mt-5 text-sm text-gray-600">Hours</div>
            <ul className="mt-1 divide-y divide-gray-200">
              {HOURS.map((h) => (
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

          <div className="rounded-md border border-gray-200 p-5">
            <h3 className="text-base font-semibold">Request a Quote</h3>
            {submitted ? (
              <div className="mt-4 rounded-sm bg-green-50 border border-green-200 p-4 text-green-900 text-sm">
                Thanks! Your request was captured (demo). Hook this up to Netlify/Formspark/Post to receive submissions.
              </div>
            ) : (
              <form onSubmit={onSubmit} name="quote" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/?submitted=1#contact" className="mt-4 grid gap-4">
                <input type="hidden" name="form-name" value="quote" />
                <p className="hidden"><label>Don’t fill this out: <input name="bot-field" /></label></p>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Name</label>
                  <input name="name" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.primaryRing)} required />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Phone</label>
                  <input name="phone" type="tel" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.primaryRing)} required />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">City / ZIP</label>
                  <input name="location" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.primaryRing)} />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Vehicle</label>
                  <input name="vehicle" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.primaryRing)} placeholder="Year / Make / Model" />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Service</label>
                  <select name="service" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.primaryRing)}>
                    {CORE_SERVICES.map((s) => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                    {ADDONS.map((a) => (
                      <option key={a.name}>{a.name}</option>
                    ))}
                    {QUOTE_ONLY.map((q) => (
                      <option key={q.name}>{q.name}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Preferred Date/Time</label>
                  <input name="preference" type="text" className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.primaryRing)} placeholder="e.g., Friday morning" />
                </div>
                <div className="grid gap-1">
                  <label className="text-sm text-gray-700">Notes</label>
                  <textarea name="notes" rows={3} className={cx("rounded-sm border border-gray-300 px-3 py-2 outline-none focus:ring-2", BRAND.primaryRing)} placeholder="Anything we should know?" />
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

export default function XclusiveArizonaSite() {
  // Enable smooth scrolling for anchor links across the site
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'smooth';
    return () => { root.style.scrollBehavior = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-[#ebf8fa] text-gray-900">
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
