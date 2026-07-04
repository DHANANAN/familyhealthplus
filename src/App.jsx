import { useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  CONTACT,
  FOOTER_COLUMNS,
  FAQS,
  HERO_METRICS,
  HOW_IT_WORKS,
  NAV_LINKS,
  PACKAGE_BOOKING_OPTIONS,
  PACKAGE_GROUPS,
  PACKAGE_TABS,
  QUICK_LINKS,
  BRAND_STORY,
  ILLUSTRATIONS,
  SERVICE_CARDS,
  SITE_SCHEMA,
  SOCIAL_LINKS,
  TESTIMONIALS,
  TRUST_BADGES,
  WHY_POINTS,
  WHY_US,
} from './data'

const DEFAULT_TAB = PACKAGE_TABS[0].key

function App() {
  const [isReady, setIsReady] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [isPackagesOpen, setIsPackagesOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB)
  const [drawerPackage, setDrawerPackage] = useState(PACKAGE_GROUPS[DEFAULT_TAB][0])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isOfferOpen, setIsOfferOpen] = useState(false)
  const [focusPackage, setFocusPackage] = useState('')
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const currentPackages = useMemo(() => PACKAGE_GROUPS[activeTab] ?? [], [activeTab])

  useEffect(() => {
    const readyTimer = window.setTimeout(() => setIsReady(true), 650)
    const offerTimer = window.setTimeout(() => setIsOfferOpen(false), 12000)

    return () => {
      window.clearTimeout(readyTimer)
      window.clearTimeout(offerTimer)
    }
  }, [])

  useEffect(() => {
    const autoplay = window.setInterval(() => {
      setTestimonialIndex((index) => (index + 1) % TESTIMONIALS.length)
    }, 6500)

    return () => window.clearInterval(autoplay)
  }, [])

  useEffect(() => {
    const revealed = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16 },
    )

    revealed.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nextPackage = PACKAGE_GROUPS[activeTab]?.[0]
    if (nextPackage) {
      setDrawerPackage(nextPackage)
      setFocusPackage(nextPackage.name)
    }
  }, [activeTab])

  useEffect(() => {
    document.body.classList.toggle('modal-open', isDrawerOpen || isOfferOpen)

    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isDrawerOpen, isOfferOpen])

  const closeNav = () => {
    setIsMobileNavOpen(false)
    setIsPackagesOpen(false)
  }

  const scrollToSection = (id) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    closeNav()
  }

  const openPackage = (pkg) => {
    setDrawerPackage(pkg)
    setIsDrawerOpen(true)
  }

  const bookPackage = (pkg) => {
    setFocusPackage(pkg.name)
    scrollToSection('book-now')
  }

  return (
    <div className={`app-shell ${isReady ? 'app-ready' : 'app-loading'}`}>
      <script type="application/ld+json">{JSON.stringify(SITE_SCHEMA)}</script>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header" id="top">
        <div className="announcement-bar">
          <p className="announcement-copy">Book preventive health checkups with home sample collection.</p>
          <div className="announcement-links">
            {QUICK_LINKS.map((link) => (
              <a key={link.label} href={link.href} onClick={closeNav}>
                {link.label}
              </a>
            ))}
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>
          </div>
        </div>

        <div className="nav-shell">
          <a className="brand" href="#home" onClick={closeNav}>
            <span className="brand-mark">FH+</span>
            <span className="brand-copy">
              <strong>Family Health Plus</strong>
              <span>Preventive health and lab care</span>
            </span>
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={isMobileNavOpen}
            aria-controls="primary-nav"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileNavOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`primary-nav ${isMobileNavOpen ? 'open' : ''}`} id="primary-nav">
            <div className="nav-links">
              {NAV_LINKS.slice(0, 2).map((link) => (
                <a key={link.label} href={link.href} onClick={closeNav}>
                  {link.label}
                </a>
              ))}

              <div
                className={`packages-menu ${isPackagesOpen ? 'open' : ''}`}
                onMouseLeave={() => setIsPackagesOpen(false)}
              >
                <button
                  type="button"
                  className="menu-trigger"
                  aria-expanded={isPackagesOpen}
                  onClick={() => setIsPackagesOpen((open) => !open)}
                >
                  Health Packages
                  <span aria-hidden="true">▾</span>
                </button>
                <div className="packages-menu-panel">
                  {PACKAGE_TABS.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      className="menu-chip"
                      onClick={() => {
                        setActiveTab(tab.key)
                        scrollToSection('packages')
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="menu-cta"
                    onClick={() => {
                      scrollToSection('book-now')
                      setIsPackagesOpen(false)
                    }}
                  >
                    Book a Health Checkup
                  </button>
                </div>
              </div>

              {NAV_LINKS.slice(2).map((link) => (
                <a key={link.label} href={link.href} onClick={closeNav}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="nav-actions">
              <a className="text-link" href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <button type="button" className="primary-btn" onClick={() => scrollToSection('book-now')}>
                Book Now
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero-section" id="home">
          <div className="hero-background" aria-hidden="true">
            <span className="orb orb-one" />
            <span className="orb orb-two" />
            <span className="orb orb-three" />
          </div>

          <div className="hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">Premium preventive healthcare</p>
              <h1>
                Book smarter health checkups for the whole family.
              </h1>
              <p className="hero-lead">
                Family Health Plus brings together preventive checkups, lab tests, doctor review, home sample collection,
                and corporate wellness into one clean, trusted booking experience.
              </p>

              <div className="hero-actions">
                <button type="button" className="primary-btn" onClick={() => scrollToSection('book-now')}>
                  Book a Health Checkup
                </button>
                <button type="button" className="secondary-btn" onClick={() => scrollToSection('packages')}>
                  View Packages
                </button>
              </div>

              <div className="trust-badges" aria-label="Trust badges">
                {TRUST_BADGES.map((badge) => (
                  <span key={badge}>{badge}</span>
                ))}
              </div>

              <div className="hero-metrics">
                {HERO_METRICS.map((metric) => (
                  <StatPill key={metric.label} metric={metric} visible={isReady} />
                ))}
              </div>

              <ul className="hero-benefits">
                <li>Home sample collection for busy mornings</li>
                <li>Clear package comparison and easy booking flow</li>
                <li>Digital reports and optional report review support</li>
              </ul>
            </div>

            <div className="hero-panel" data-reveal>
              <div className="hero-art-card">
                <div className="hero-art-head">
                  <span className="hero-art-badge">Fast booking</span>
                  <span className="hero-art-badge alt">Trusted care</span>
                </div>
                <div className="hero-art-visual" aria-hidden="true">
                  <div className="art-screen art-screen-large">
                    <div className="screen-bar" />
                    <div className="screen-lines">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="art-card art-card-floating one">
                    <strong>Home Sample</strong>
                    <span>Flexible doorstep collection</span>
                  </div>
                  <div className="art-card art-card-floating two">
                    <strong>Report Review</strong>
                    <span>Guided explanation on request</span>
                  </div>
                  <div className="art-card art-card-chip">
                    <span>Certified Labs</span>
                    <span>Accurate Reports</span>
                    <span>Expert Support</span>
                  </div>
                </div>
              </div>

              <LeadForm
                id="book-now"
                title="Request a callback"
                subtitle="Tell us what you need and we will call you back with the best-fit package."
                submitLabel="Submit Request"
                defaultInterest={focusPackage}
                compact={false}
              />
            </div>
          </div>
        </section>

        <section className="packages-section section-block" id="packages">
          <SectionHeading
            eyebrow="Popular health packages"
            title="Compare packages, then book the one that fits your family best."
            text="The catalog below is organised to keep the decision simple: choose your life stage, compare the test counts, and open the details drawer before booking."
          />

          <div className="tab-row" role="tablist" aria-label="Package categories">
            {PACKAGE_TABS.map((tab) => (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`tab-chip ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="package-grid">
            {isReady
              ? currentPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.slug}
                    pkg={pkg}
                    onKnowMore={() => openPackage(pkg)}
                    onBookNow={() => bookPackage(pkg)}
                  />
                ))
              : Array.from({ length: 3 }).map((_, index) => (
                  <article key={index} className="package-card skeleton-card" aria-hidden="true">
                    <div className="skeleton-line short" />
                    <div className="skeleton-line long" />
                    <div className="skeleton-pills">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="skeleton-block" />
                    <div className="skeleton-line medium" />
                  </article>
                ))}
          </div>
        </section>

        <section className="services-section section-block" id="services">
          <SectionHeading
            eyebrow="Health lab services"
            title="Everything your preventive care journey needs, in one place."
            text="Use this section to quickly explain the breadth of the offering, then guide users to the best package or support option."
          />

          <div className="service-grid">
            {SERVICE_CARDS.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </section>

        <section className="why-section section-block" id="about">
          <div className="split-layout">
            <div className="split-copy" data-reveal>
              <SectionHeading
                eyebrow="Why choose Family Health Plus"
                title="Built for clarity, trust, and a calmer booking experience."
                text="This design keeps the healthcare message front and centre: fewer distractions, clearer comparison, and faster ways to take action."
                align="left"
              />

              <div className="why-points">
                {WHY_POINTS.map((point) => (
                  <div key={point} className="why-point">
                    <span className="why-dot" aria-hidden="true" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="why-stats" data-reveal>
              {WHY_US.map((stat) => (
                <CounterCard key={stat.label} stat={stat} visible={isReady} />
              ))}
            </div>
          </div>
        </section>

        <section className="process-section section-block">
          <SectionHeading
            eyebrow="How it works"
            title="A four-step flow that removes friction from the first booking."
            text="The same structure works for a callback lead form, a package booking flow, or a corporate quote request."
          />

          <div className="process-grid">
            {HOW_IT_WORKS.map((step) => (
              <ProcessCard key={step.step} step={step} />
            ))}
          </div>
        </section>

        <section className="feature-band section-block" id="home-collection">
          <div className="feature-copy" data-reveal>
            <SectionHeading
              eyebrow="Home sample collection"
              title="Book home collection without the back-and-forth."
              text="A dedicated home-collection section gives this site a direct conversion path for busy users, senior citizens, and families who prefer to stay at home."
              align="left"
            />

            <p className="feature-text">
              Keep the promise simple: choose a package, share your location, and we will confirm the sample visit window.
            </p>

            <div className="feature-actions">
              <button type="button" className="primary-btn" onClick={() => scrollToSection('book-now')}>
                Book Home Sample Collection
              </button>
              <a className="secondary-btn link-btn" href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="feature-visual" data-reveal>
            <div className="visual-card lab-visual">
              <div className="lab-figure" aria-hidden="true">
                <div className="lab-circle large" />
                <div className="lab-circle small" />
                <div className="lab-vial" />
                <div className="lab-report">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className="visual-caption">
                <strong>Sample collection and report flow</strong>
                <span>Clean, calm, and designed for a quick handoff</span>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section section-block" id="story">
          <div className="story-layout">
            <div className="story-copy" data-reveal>
              <SectionHeading
                eyebrow={BRAND_STORY.eyebrow}
                title={BRAND_STORY.title}
                text={BRAND_STORY.copy}
                align="left"
              />

              <div className="story-quote">
                <span className="story-quote-mark">“</span>
                <p>{BRAND_STORY.quote}</p>
                <strong>{BRAND_STORY.author}</strong>
              </div>

              <div className="story-chips">
                <span>Family-first tone</span>
                <span>Soft premium visuals</span>
                <span>Calm healthcare flow</span>
              </div>
            </div>

            <div className="story-gallery" data-reveal>
              <figure className="story-card large">
                <img src={ILLUSTRATIONS.family} alt="Illustrated family wellness scene" />
                <figcaption>Family wellness and yearly checkups</figcaption>
              </figure>
              <figure className="story-card">
                <img src={ILLUSTRATIONS.lab} alt="Illustrated lab and report scene" />
                <figcaption>Lab clarity with gentle reporting</figcaption>
              </figure>
              <figure className="story-card">
                <img src={ILLUSTRATIONS.doctor} alt="Illustrated doctor consultation scene" />
                <figcaption>Doctor guidance when users need it</figcaption>
              </figure>
              <figure className="story-card accent">
                <img src={ILLUSTRATIONS.heart} alt="Illustrated heart health scene" />
                <figcaption>Heart health with a softer visual tone</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="feature-band reverse section-block" id="corporate">
          <div className="feature-copy" data-reveal>
            <SectionHeading
              eyebrow="Corporate health checkups"
              title="A premium wellness option for teams, offices, and leadership groups."
              text="The corporate section should read as a serious B2B offer, not a generic package page. Give HR a simple route to request a tailored quote."
              align="left"
            />

            <ul className="bullet-list">
              <li>Employee wellness packages</li>
              <li>Bulk health checkups</li>
              <li>On-site sample collection</li>
              <li>Custom corporate plans</li>
            </ul>

            <div className="feature-actions">
              <button type="button" className="primary-btn" onClick={() => scrollToSection('book-now')}>
                Request Corporate Quote
              </button>
              <button type="button" className="secondary-btn" onClick={() => setActiveTab('corporate')}>
                View Corporate Packages
              </button>
            </div>
          </div>

          <div className="feature-visual" data-reveal>
            <div className="visual-card corporate-visual">
              <div className="corporate-stat">
                <strong>On-site readiness</strong>
                <span>Team-wide sample coordination and simple reporting</span>
              </div>
              <div className="corporate-grid">
                <span>HR brief</span>
                <span>Team slots</span>
                <span>Bulk pricing</span>
                <span>Custom plans</span>
              </div>
              <div className="corporate-footer">Designed to support company wellness without friction</div>
            </div>
          </div>
        </section>

        <section className="testimonial-section section-block" id="testimonials">
          <SectionHeading
            eyebrow="Testimonials"
            title="Patient feedback should feel reassuring, specific, and believable."
            text="These are intentionally placeholder testimonials. Replace them with real approved quotes before launch."
          />

          <div className="testimonial-slider" data-reveal>
            <div
              className="testimonial-track"
              style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
              aria-live="polite"
            >
              {TESTIMONIALS.map((testimonial) => (
                <article className="testimonial-card" key={testimonial.name}>
                  <p className="testimonial-quote">“{testimonial.quote}”</p>
                  <div className="testimonial-meta">
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.location}</span>
                    </div>
                    <small>{testimonial.note}</small>
                  </div>
                </article>
              ))}
            </div>

            <div className="slider-controls">
              <button type="button" onClick={() => setTestimonialIndex((index) => (index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>
                Prev
              </button>
              <div className="slider-dots" aria-label="Testimonial slide controls">
                {TESTIMONIALS.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    className={testimonialIndex === index ? 'active' : ''}
                    onClick={() => setTestimonialIndex(index)}
                    aria-label={`Show testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button type="button" onClick={() => setTestimonialIndex((index) => (index + 1) % TESTIMONIALS.length)}>
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="faq-section section-block" id="faq">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Handle the most common booking objections before they reach support."
            text="An accessible accordion keeps the page compact while still addressing the details people care about before they convert."
          />

          <div className="faq-list" data-reveal>
            {FAQS.map((faq) => (
              <details key={faq.question} className="faq-item">
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section section-block" id="contact">
          <SectionHeading
            eyebrow="Contact and booking"
            title="Turn visitors into leads with one simple, visible action."
            text="The final section combines the booking form, the contact channels, and trust details so users do not have to hunt for the next step."
          />

          <div className="contact-grid">
            <div className="contact-card" data-reveal>
              <h3>Talk to the team</h3>
              <p>Use the channels below if you want a callback, a WhatsApp reply, or a quick report review guide.</p>
              <ul>
                <li><span>Phone</span><a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></li>
                <li><span>WhatsApp</span><a href={CONTACT.whatsappHref}>{CONTACT.whatsappDisplay}</a></li>
                <li><span>Email</span><a href={CONTACT.emailHref}>{CONTACT.email}</a></li>
                <li><span>Location</span><span>{CONTACT.location}</span></li>
              </ul>
            </div>

            <LeadForm
              id="contact-booking"
              title="Request a callback"
              subtitle="Send your details and we will help you choose the best package."
              submitLabel="Request Callback"
              compact
              defaultInterest={focusPackage}
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand" data-reveal>
          <div className="brand-mark large">FH+</div>
          <div>
            <strong>Family Health Plus</strong>
            <p>Modern preventive healthcare, lab tests, home sample collection, and corporate screening.</p>
          </div>
        </div>

        <div className="footer-columns">
          {FOOTER_COLUMNS.map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}

          <div className="footer-column">
            <h3>Contact</h3>
            <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            <a href={CONTACT.whatsappHref}>{CONTACT.whatsappDisplay}</a>
            <a href={CONTACT.emailHref}>{CONTACT.email}</a>
            <span>{CONTACT.address}</span>

            <div className="social-links" aria-label="Social media links">
              {SOCIAL_LINKS.map((social) => (
                <a key={social.label} href={social.href}>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright {new Date().getFullYear()} Family Health Plus. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms &amp; Conditions</a>
            <a href="#refund">Refund Policy</a>
          </div>
        </div>
      </footer>

      <FloatingCTA />

      {isDrawerOpen && (
        <div className="modal-overlay" role="presentation" onClick={() => setIsDrawerOpen(false)}>
          <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="package-drawer-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-button" aria-label="Close package details" onClick={() => setIsDrawerOpen(false)}>
              ×
            </button>
            <p className="drawer-kicker">Package details</p>
            <h2 id="package-drawer-title">{drawerPackage.name}</h2>
            <p className="drawer-summary">{drawerPackage.summary}</p>

            <div className="drawer-pricing">
              <div>
                <span>Indicative price</span>
                <strong>{drawerPackage.price}</strong>
              </div>
              <div>
                <span>Offer price</span>
                <strong>{drawerPackage.discount}</strong>
              </div>
            </div>

            <div className="drawer-meta">
              <span>{drawerPackage.tests}</span>
              {drawerPackage.badge ? <span>{drawerPackage.badge}</span> : null}
              <span>{drawerPackage.homeSample ? 'Home sample available' : 'Centre visit only'}</span>
            </div>

            <div className="drawer-sections">
              <div>
                <h3>Included tests</h3>
                <ul>
                  {drawerPackage.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Preparation</h3>
                <p>{drawerPackage.prep}</p>
              </div>
              <div>
                <h3>Who should choose this package?</h3>
                <p>{drawerPackage.who}</p>
              </div>
              <div>
                <h3>Report delivery</h3>
                <p>{drawerPackage.report}</p>
              </div>
            </div>

            <div className="drawer-actions">
              <button type="button" className="primary-btn" onClick={() => bookPackage(drawerPackage)}>
                Book Now
              </button>
              <button type="button" className="secondary-btn" onClick={() => setIsDrawerOpen(false)}>
                Continue browsing
              </button>
            </div>
          </aside>
        </div>
      )}

      {isOfferOpen && (
        <div className="offer-panel" role="dialog" aria-modal="true" aria-labelledby="offer-title">
          <button type="button" className="close-button" aria-label="Close offer popup" onClick={() => setIsOfferOpen(false)}>
            ×
          </button>
          <p className="drawer-kicker">Limited-time follow-up offer</p>
          <h2 id="offer-title">Get a call back for the best health package.</h2>
          <p>Leave your details and we will help you compare the right health checkup before you book.</p>
          <LeadForm
            id="offer-form"
            title="Quick callback request"
            subtitle="Short and simple, with just the details the team needs to follow up."
            submitLabel="Send details"
            compact
            defaultInterest={focusPackage}
          />
          <button type="button" className="text-link dismiss-link" onClick={() => setIsOfferOpen(false)}>
            Not now
          </button>
        </div>
      )}
    </div>
  )
}

function SectionHeading({ eyebrow, title, text, align = 'center' }) {
  return (
    <div className={`section-heading ${align}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  )
}

function StatPill({ metric, visible }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) {
      return undefined
    }

    let frameId = 0
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / 1200, 1)
      setCount(Math.round(metric.value * (1 - Math.pow(1 - progress, 3))))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    frameId = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frameId)
  }, [metric.value, visible])

  return (
    <div className="metric-pill">
      <strong>
        {count}
        {metric.suffix}
      </strong>
      <span>{metric.label}</span>
    </div>
  )
}

function CounterCard({ stat, visible }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visible) {
      return undefined
    }

    let frameId = 0
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / 1200, 1)
      setCount(Math.round(stat.value * (1 - Math.pow(1 - progress, 3))))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    frameId = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frameId)
  }, [stat.value, visible])

  return (
    <div className="counter-card">
      <strong>
        {count}
        {stat.suffix}
      </strong>
      <span>{stat.label}</span>
    </div>
  )
}

function PackageCard({ pkg, onKnowMore, onBookNow }) {
  return (
    <article className="package-card" id={`card-${pkg.slug}`} data-reveal>
      <div className="package-card-top">
        <div>
          <span className="package-badge">{pkg.badge || 'Wellness'}</span>
          <h3>{pkg.name}</h3>
        </div>
        <div className="package-price">
          <strong>{pkg.discount}</strong>
          <span>{pkg.price}</span>
        </div>
      </div>

      <p className="package-summary">{pkg.summary}</p>

      <ul className="package-included">
        {pkg.included.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="package-meta">
        <span>{pkg.tests}</span>
        <span>{pkg.report}</span>
        <span>{pkg.homeSample ? 'Home sample available' : 'Centre visit'}</span>
      </div>

      <div className="package-actions">
        <button type="button" className="secondary-btn small" onClick={onKnowMore}>
          Know More
        </button>
        <button type="button" className="primary-btn small" onClick={onBookNow}>
          Book Now
        </button>
      </div>
    </article>
  )
}

function ServiceCard({ service }) {
  return (
    <article className="service-card" data-reveal>
      <div className="service-icon" aria-hidden="true">
        <span>{service.icon}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.text}</p>
    </article>
  )
}

function ProcessCard({ step }) {
  return (
    <article className="process-card" data-reveal>
      <span className="process-step">{step.step}</span>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </article>
  )
}

function LeadForm({ id, title, subtitle, submitLabel, defaultInterest = '', compact = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    interest: defaultInterest,
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })

  useEffect(() => {
    if (defaultInterest) {
      setFormData((current) => ({ ...current, interest: defaultInterest }))
    }
  }, [defaultInterest])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setStatus({ type: '', message: '' })
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Please enter a phone number.'
    } else if (!/^[0-9+()\-\s]{10,}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone number.'
    }

    if (!formData.city.trim()) {
      nextErrors.city = 'Please tell us your city.'
    }

    if (!formData.interest.trim()) {
      nextErrors.interest = 'Please select a package or service.'
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    // TODO: Connect this payload to CRM, email, WhatsApp, or Google Sheets automation.
    setStatus({
      type: 'success',
      message: `Thanks ${formData.name.split(' ')[0] || 'there'} - we will call you back shortly.`,
    })

    setFormData({
      name: '',
      phone: '',
      city: '',
      interest: defaultInterest,
      message: '',
    })
  }

  return (
    <form id={id} className={`lead-form ${compact ? 'compact' : ''}`} onSubmit={handleSubmit} noValidate data-reveal>
      <div className="lead-form-head">
        <div>
          <p className="eyebrow">{title}</p>
          <h3>Request a callback</h3>
        </div>
        <p>{subtitle}</p>
      </div>

      <div className="form-grid">
        <Field
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your full name"
        />
        <Field
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="+91 9XXXXXXXXX"
          type="tel"
        />
        <Field
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          placeholder="Your city"
        />
        <Field
          label="Interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          error={errors.interest}
          as="select"
          options={PACKAGE_BOOKING_OPTIONS}
        />
      </div>

      {!compact ? (
        <label className="field field-full">
          <span>Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us if you need home sample collection, a report review, or help choosing a package."
            rows="4"
          />
        </label>
      ) : null}

      <button type="submit" className="primary-btn full-width">
        {submitLabel}
      </button>

      {status.message ? (
        <p className={`form-status ${status.type}`} aria-live="polite">
          {status.message}
        </p>
      ) : (
        <p className="form-note">We will use this information only to follow up on your booking request.</p>
      )}
    </form>
  )
}

function Field({ label, name, value, onChange, error, placeholder, type = 'text', as = 'input', options = [] }) {
  return (
    <label className="field">
      <span>{label}</span>
      {as === 'select' ? (
        <select name={name} value={value} onChange={onChange} aria-invalid={Boolean(error)}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} aria-invalid={Boolean(error)} />
      )}
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  )
}

function FloatingCTA() {
  return (
    <div className="floating-cta" aria-label="Floating booking shortcuts">
      <a href={CONTACT.phoneHref} className="floating-item phone">
        <span>Call</span>
      </a>
      <a href={CONTACT.whatsappHref} className="floating-item whatsapp" target="_blank" rel="noreferrer">
        <span>WhatsApp</span>
      </a>
      <button type="button" className="floating-item book" onClick={() => document.getElementById('book-now')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
        <span>Book Now</span>
      </button>
    </div>
  )
}

export default App
