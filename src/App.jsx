import { useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  CONTACT,
  FOOTER_COLUMNS,
  FAQS,
  HERO_METRICS,
  HOW_IT_WORKS,
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

const SLIDES = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'packages', label: 'Health Packages', icon: '📦' },
  { id: 'services', label: 'Lab Services', icon: '🧪' },
  { id: 'why-us', label: 'Why Choose Us', icon: '✨' },
  { id: 'specialized', label: 'Care Solutions', icon: '🩺' },
  { id: 'reviews-faq', label: 'Reviews & FAQs', icon: '💬' },
  { id: 'contact', label: 'Book & Contact', icon: '📅' },
]

function App() {
  const [isReady, setIsReady] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB)
  const [drawerPackage, setDrawerPackage] = useState(PACKAGE_GROUPS[DEFAULT_TAB][0])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isOfferOpen, setIsOfferOpen] = useState(false)
  const [focusPackage, setFocusPackage] = useState('')
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const currentPackages = useMemo(() => PACKAGE_GROUPS[activeTab] ?? [], [activeTab])

  useEffect(() => {
    const readyTimer = window.setTimeout(() => setIsReady(true), 650)
    const offerTimer = window.setTimeout(() => setIsOfferOpen(false), 15000)

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

  // Listen to keyboard left/right arrow keys for sliding presentation
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Avoid sliding if user is typing in forms/inputs
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA' || 
          document.activeElement.tagName === 'SELECT') {
        return
      }

      if (event.key === 'ArrowRight') {
        setCurrentSlide((curr) => Math.min(SLIDES.length - 1, curr + 1))
      } else if (event.key === 'ArrowLeft') {
        setCurrentSlide((curr) => Math.max(0, curr - 1))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('modal-open', isDrawerOpen || isOfferOpen)
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [isDrawerOpen, isOfferOpen])

  useEffect(() => {
    const nextPackage = PACKAGE_GROUPS[activeTab]?.[0]
    if (nextPackage) {
      setDrawerPackage(nextPackage)
      setFocusPackage(nextPackage.name)
    }
  }, [activeTab])

  // Navigate to slide and update specific package tabs if selected
  const handleNav = (target, index) => {
    setCurrentSlide(index)
    setIsMobileMenuOpen(false)

    // Scroll the selected slide back to top
    const element = document.querySelectorAll('.slide-panel')[index]
    if (element) {
      element.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const navigateToSection = (key) => {
    // Check if key is a package key
    const isPackageKey = PACKAGE_TABS.some((tab) => tab.key === key)
    if (isPackageKey) {
      setActiveTab(key)
      handleNav('packages', 1)
      return
    }

    switch (key) {
      case 'home':
        handleNav('home', 0)
        break
      case 'packages':
        handleNav('packages', 1)
        break
      case 'services':
        handleNav('services', 2)
        break
      case 'about':
        handleNav('why-us', 3)
        break
      case 'home-collection':
      case 'corporate':
        handleNav('specialized', 4)
        if (key === 'corporate') {
          setActiveTab('corporate')
        }
        break
      case 'testimonials':
      case 'faq':
        handleNav('reviews-faq', 5)
        break
      case 'contact':
      case 'book-now':
        handleNav('contact', 6)
        break
      default:
        handleNav('home', 0)
    }
  }

  const openPackage = (pkg) => {
    setDrawerPackage(pkg)
    setIsDrawerOpen(true)
  }

  const bookPackage = (pkg) => {
    setFocusPackage(pkg.name)
    navigateToSection('contact')
  }

  return (
    <div className={`app-shell ${isReady ? 'app-ready' : 'app-loading'}`}>
      <script type="application/ld+json">{JSON.stringify(SITE_SCHEMA)}</script>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Desktop Persistent Left Sidebar */}
      <aside className="desktop-sidebar" aria-label="Main Navigation">
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <span className="brand-mark">FH+</span>
            <div className="brand-copy">
              <strong>Family Health Plus</strong>
              <span>Preventive health care</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                className={`sidebar-link ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => handleNav(slide.id, idx)}
              >
                <span className="sidebar-link-icon">{slide.icon}</span>
                <span>{slide.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button type="button" className="sidebar-cta-btn" onClick={() => navigateToSection('contact')}>
            Book Checkup Now
          </button>
          
          <div className="sidebar-contact-info">
            <span>Call: <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></span>
            <span>WhatsApp: <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">Chat now</a></span>
          </div>
        </div>
      </aside>

      {/* Mobile Top Navigation Header */}
      <header className="mobile-header">
        <div className="mobile-brand">
          <span className="brand-mark">FH+</span>
          <strong>Family Health Plus</strong>
        </div>

        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          type="button"
          aria-label="Toggle navigation drawer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile Slide-out Menu Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`sidebar-link ${currentSlide === idx ? 'active' : ''}`}
              onClick={() => handleNav(slide.id, idx)}
            >
              <span className="sidebar-link-icon">{slide.icon}</span>
              <span>{slide.label}</span>
            </button>
          ))}
        </nav>

        <button 
          type="button" 
          className="sidebar-cta-btn" 
          style={{ marginTop: '2rem' }} 
          onClick={() => navigateToSection('contact')}
        >
          Book Checkup Now
        </button>
      </div>

      {/* Main Slide-based Presentation Deck */}
      <main id="main-content" className="main-presentation-deck">
        <div 
          className="slides-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* SLIDE 0: HOME / HERO */}
          <section className="slide-panel" id="slide-home">
            <div className="hero-grid">
              <div className="glass-container" style={{ margin: 0 }}>
                <p className="eyebrow">Premium preventive healthcare</p>
                <h1 className="gradient-headline">
                  Book smarter health checkups for the whole family.
                </h1>
                <p className="hero-lead">
                  Family Health Plus brings together preventive checkups, lab tests, doctor review, home sample collection,
                  and corporate wellness into one clean, trusted booking experience.
                </p>

                <div className="hero-actions">
                  <button type="button" className="primary-btn" onClick={() => navigateToSection('contact')}>
                    Book a Health Checkup
                  </button>
                  <button type="button" className="secondary-btn" onClick={() => navigateToSection('packages')}>
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
                    <StatPill key={metric.label} metric={metric} visible={isReady && currentSlide === 0} />
                  ))}
                </div>

                <ul className="hero-benefits">
                  <li>Home sample collection for busy mornings</li>
                  <li>Clear package comparison and easy booking flow</li>
                  <li>Digital reports and optional report review support</li>
                </ul>
              </div>

              <div className="hero-panel">
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

          {/* SLIDE 1: HEALTH PACKAGES */}
          <section className="slide-panel" id="slide-packages">
            <SectionHeading
              eyebrow="Popular health packages"
              title="Compare packages, then book the one that fits your family best."
              text="The catalog below is organised to keep the decision simple: choose your life stage, compare the test counts, and open the details drawer before booking."
              align="left"
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

          {/* SLIDE 2: LAB SERVICES */}
          <section className="slide-panel" id="slide-services">
            <SectionHeading
              eyebrow="Health lab services"
              title="Everything your preventive care journey needs, in one place."
              text="Use this section to quickly explain the breadth of the offering, then guide users to the best package or support option."
              align="left"
            />

            <div className="service-grid">
              {SERVICE_CARDS.map((service) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </section>

          {/* SLIDE 3: WHY CHOOSE US & PROCESS */}
          <section className="slide-panel" id="slide-why-us">
            <div className="why-stats-layout">
              <div className="glass-container" style={{ margin: 0 }}>
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

              <div className="why-stats">
                {WHY_US.map((stat) => (
                  <CounterCard key={stat.label} stat={stat} visible={isReady && currentSlide === 3} />
                ))}
              </div>
            </div>

            <div style={{ marginTop: '3.5rem' }}>
              <SectionHeading
                eyebrow="How it works"
                title="A four-step flow that removes friction from the first booking."
                text="The same structure works for a callback lead form, a package booking flow, or a corporate quote request."
                align="left"
              />

              <div className="process-grid">
                {HOW_IT_WORKS.map((step) => (
                  <ProcessCard key={step.step} step={step} />
                ))}
              </div>
            </div>
          </section>

          {/* SLIDE 4: SPECIALIZED CARE (HOME & CORPORATE) */}
          <section className="slide-panel" id="slide-specialized">
            <div className="split-deck-layout">
              {/* Home Collection Section */}
              <div className="feature-copy">
                <SectionHeading
                  eyebrow="Home sample collection"
                  title="Book home collection without the back-and-forth."
                  text="A dedicated home-collection section gives this site a direct conversion path for busy users, senior citizens, and families who prefer to stay at home."
                  align="left"
                />

                <p className="feature-text">
                  Choose a package, share your location, and we will confirm the sample visit window.
                </p>

                <div className="visual-card lab-visual" style={{ margin: '1.2rem 0' }}>
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

                <div className="feature-actions">
                  <button type="button" className="primary-btn" onClick={() => navigateToSection('contact')}>
                    Book Home Collection
                  </button>
                  <a className="secondary-btn" href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Corporate Checkup Section */}
              <div className="feature-copy">
                <SectionHeading
                  eyebrow="Corporate health checkups"
                  title="Wellness options for teams, offices, and corporate leadership."
                  text="The corporate section is a dedicated B2B offering. It provides HR with a simple path to request customized group checkups."
                  align="left"
                />

                <ul className="bullet-list">
                  <li>Employee health screenings & checkups</li>
                  <li>Bulk diagnostic and risk profiling packages</li>
                  <li>Seamless onsite collection coordination</li>
                  <li>Custom team health assessment profiles</li>
                </ul>

                <div className="visual-card corporate-visual" style={{ margin: '1.2rem 0' }}>
                  <div className="corporate-stat">
                    <strong>On-site readiness</strong>
                    <span>Team-wide sample coordination and simple reporting</span>
                  </div>
                  <div className="corporate-grid">
                    <span>HR brief</span>
                    <span>Team slots</span>
                    <span>Volume pricing</span>
                    <span>Custom plans</span>
                  </div>
                  <div className="corporate-footer">Designed to support company wellness without friction</div>
                </div>

                <div className="feature-actions">
                  <button type="button" className="primary-btn" onClick={() => navigateToSection('contact')}>
                    Request Corporate Quote
                  </button>
                  <button type="button" className="secondary-btn" onClick={() => navigateToSection('corporate')}>
                    View Corporate Packages
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SLIDE 5: TESTIMONIALS & FAQ */}
          <section className="slide-panel" id="slide-reviews-faq">
            <div className="split-deck-layout">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <SectionHeading
                  eyebrow="Testimonials"
                  title="What patients say about us."
                  text="We focus on providing a calm, professional, and friction-free diagnostics experience."
                  align="left"
                />

                <div className="testimonial-slider">
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
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="slider-controls" style={{ padding: '0 2.2rem 1.5rem' }}>
                    <button type="button" onClick={() => setTestimonialIndex((index) => (index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>
                      Prev
                    </button>
                    <div className="slider-dots" aria-label="Testimonial slide controls">
                      {TESTIMONIALS.map((testimonial, idx) => (
                        <button
                          key={testimonial.name}
                          type="button"
                          className={testimonialIndex === idx ? 'active' : ''}
                          onClick={() => setTestimonialIndex(idx)}
                          aria-label={`Show testimonial ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <button type="button" onClick={() => setTestimonialIndex((index) => (index + 1) % TESTIMONIALS.length)}>
                      Next
                    </button>
                  </div>
                </div>

                <div className="glass-container" style={{ margin: 0, padding: '1.8rem' }}>
                  <SectionHeading
                    eyebrow={BRAND_STORY.eyebrow}
                    title={BRAND_STORY.title}
                    text={BRAND_STORY.copy}
                    align="left"
                  />
                  <div style={{ fontStyle: 'italic', borderLeft: '3px solid var(--teal)', paddingLeft: '1rem', marginTop: '1rem', color: 'var(--text-muted)' }}>
                    "{BRAND_STORY.quote}" – <strong>{BRAND_STORY.author}</strong>
                  </div>
                </div>
              </div>

              <div>
                <SectionHeading
                  eyebrow="Frequently asked questions"
                  title="Have questions about booking or samples?"
                  text="Check the common inquiries below, or submit the callback form for direct assistance."
                  align="left"
                />

                <div className="faq-list">
                  {FAQS.map((faq) => (
                    <details key={faq.question} className="faq-item">
                      <summary>{faq.question}</summary>
                      <p>{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SLIDE 6: CONTACT & BOOK NOW & FOOTER */}
          <section className="slide-panel" id="slide-contact">
            <SectionHeading
              eyebrow="Contact & Booking"
              title="Turn health intent into action. Request a callback now."
              text="Send us your details, and our care team will get back to you shortly to coordinate your package and sample collections."
              align="left"
            />

            <div className="contact-grid">
              <div className="contact-card">
                <h3>Talk to the team</h3>
                <p>Use the channels below if you want a callback, a WhatsApp reply, or a quick report review guide.</p>
                <ul>
                  <li><span>Phone</span><a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></li>
                  <li><span>WhatsApp</span><a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">{CONTACT.whatsappDisplay}</a></li>
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

            {/* Injected Footer at the bottom of the last slide */}
            <footer className="site-footer">
              <div className="footer-brand">
                <span className="brand-mark" style={{ width: '44px', height: '44px', borderRadius: '12px', fontSize: '0.95rem' }}>FH+</span>
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
                      <a key={link.label} href={link.href} onClick={(e) => {
                        e.preventDefault();
                        const rawKey = link.href.replace('#tab-', '').replace('#', '');
                        navigateToSection(rawKey);
                      }}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                ))}

                <div className="footer-column">
                  <h3>Contact</h3>
                  <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer">{CONTACT.whatsappDisplay}</a>
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
                  <a href="#privacy">Privacy</a>
                  <a href="#terms">Terms</a>
                  <a href="#refund">Refunds</a>
                </div>
              </div>
            </footer>
          </section>
        </div>
      </main>

      {/* Floating Presentation Navigation Controls (desktop and mobile overlay) */}
      <div className="deck-navigation-overlay">
        <button
          type="button"
          className="deck-arrow-btn"
          aria-label="Previous Slide"
          disabled={currentSlide === 0}
          onClick={() => setCurrentSlide((curr) => Math.max(0, curr - 1))}
        >
          ←
        </button>

        <div className="deck-indicator-dots" aria-label="Slide Deck progress">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`deck-dot ${currentSlide === idx ? 'active' : ''}`}
              title={`Go to ${slide.label}`}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="deck-arrow-btn"
          aria-label="Next Slide"
          disabled={currentSlide === SLIDES.length - 1}
          onClick={() => setCurrentSlide((curr) => Math.min(SLIDES.length - 1, curr + 1))}
        >
          →
        </button>
      </div>

      <FloatingCTA navigateToSection={navigateToSection} />

      {isDrawerOpen && (
        <div className="modal-overlay" role="presentation" onClick={() => setIsDrawerOpen(false)}>
          <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="package-drawer-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="close-button" aria-label="Close package details" onClick={() => setIsDrawerOpen(false)}>
              ×
            </button>
            <p className="drawer-kicker">Package details</p>
            <h2 id="package-drawer-title" style={{ fontFamily: "'Fraunces', Georgia, serif", color: '#fff', fontSize: '1.8rem', margin: '0 0 1rem' }}>{drawerPackage.name}</h2>
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
                <h3>Who should choose?</h3>
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
    <div className={`section-heading ${align}`} data-reveal="true" className={`section-heading ${align} is-visible`}>
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
      setCount(0)
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
      setCount(0)
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
    <article className="package-card" id={`card-${pkg.slug}`} data-reveal="true" className="package-card is-visible">
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

// Sleek Custom SVG Rendering instead of raw emojis
function ServiceIcon({ type }) {
  switch (type) {
    case 'checkup':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    case 'lab':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0M5.58 16.5h12.84" />
        </svg>
      )
    case 'heart':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )
    case 'diabetes':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    case 'women':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5" />
          <line x1="12" y1="13" x2="12" y2="22" />
          <line x1="9" y1="18" x2="15" y2="18" />
        </svg>
      )
    case 'senior':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="12" y1="8" x2="12" y2="16" />
        </svg>
      )
    case 'family':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'corporate':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
          <path d="M9 22V12h6v10" />
          <path d="M8 7h2v2H8V7zM14 7h2v2h-2V7z" />
        </svg>
      )
    case 'home':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 22V12h6v10" />
        </svg>
      )
    case 'doctor':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      )
    case 'report':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    default:
      return null
  }
}

function ServiceCard({ service }) {
  return (
    <article className="service-card" data-reveal="true" className="service-card is-visible">
      <div className="service-icon" aria-hidden="true">
        <ServiceIcon type={service.icon} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.text}</p>
    </article>
  )
}

function ProcessCard({ step }) {
  return (
    <article className="process-card" data-reveal="true" className="process-card is-visible">
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
      nextErrors.interest = 'Please select a package.'
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
    <form id={id} className={`lead-form ${compact ? 'compact' : ''}`} onSubmit={handleSubmit} noValidate data-reveal="true" className={`lead-form ${compact ? 'compact' : ''} is-visible`}>
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
        <label className="field field-full" style={{ marginTop: '0.85rem' }}>
          <span>Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us if you need home sample collection, a report review, or help choosing a package."
            rows="3"
          />
        </label>
      ) : null}

      <button type="submit" className="primary-btn full-width" style={{ marginTop: '1.2rem' }}>
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

function FloatingCTA({ navigateToSection }) {
  return (
    <div className="floating-cta" aria-label="Floating booking shortcuts">
      <a href={CONTACT.phoneHref} className="floating-item phone">
        <span>Call</span>
      </a>
      <a href={CONTACT.whatsappHref} className="floating-item whatsapp" target="_blank" rel="noreferrer">
        <span>WhatsApp</span>
      </a>
      <button type="button" className="floating-item book" onClick={() => navigateToSection('contact')}>
        <span>Book Now</span>
      </button>
    </div>
  )
}

export default App
