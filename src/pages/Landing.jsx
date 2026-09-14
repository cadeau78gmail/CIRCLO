import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, impactStats } from '../data/mockData'

const steps = [
  { n: 1, title: 'List an item', icon: '📝' },
  { n: 2, title: 'Choose what to do with it', icon: '🔁' },
  { n: 3, title: 'Connect with someone', icon: '🤝' },
  { n: 4, title: 'Give it another life', icon: '🌱' }
]

const recentItems = [
  {
    id: 1,
    name: 'Wooden Chair',
    condition: 'Good condition',
    location: 'Kigali',
    action: 'Give Away',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    condition: 'Like new',
    location: 'Kigali',
    action: 'Exchange',
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: "Children's Clothes",
    condition: 'Good condition',
    location: 'Kigali',
    action: 'Donate',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'School Books',
    condition: 'Very good condition',
    location: 'Kicukiro',
    action: 'Give Away',
    image:
      'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=900&q=80'
  }
]

const openingImages = [
  {
    src: '/hero-images/recycling.png',
    alt: 'Recycling bin filled with plastic bottles and recyclable materials'
  },
  {
    src: '/hero-images/clothes.png',
    alt: 'Clothes in a laundry basket'
  },
  {
    src: '/hero-images/electronics.png',
    alt: 'Old computer and electronic equipment'
  },
  {
    src: '/hero-images/furniture.png',
    alt: 'Wooden furniture and cabinet'
  }
]

const actionCards = [
  {
    key: 'give',
    title: 'Give Away',
    desc: 'Give something you no longer need to someone who wants it.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'
  },
  {
    key: 'exchange',
    title: 'Exchange',
    desc: 'Trade your item for something you actually need.',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
  },
  {
    key: 'donate',
    title: 'Donate',
    desc: 'Pass useful things to someone who needs them.',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
  },
  {
    key: 'sell',
    title: 'Sell',
    desc: 'Give an item another owner while earning from it.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
  }
]

const categoryImages = {
  Clothing: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  Furniture: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  Electronics: 'https://images.unsplash.com/photo-1518441902114-0b5b7c8e6f26?auto=format&fit=crop&w=800&q=80',
  Books: 'https://images.unsplash.com/photo-1524578271613-d550eacf6090?auto=format&fit=crop&w=800&q=80',
  Household: 'https://images.unsplash.com/photo-1556911220-e15b29be8c66?auto=format&fit=crop&w=800&q=80',
  'Kids & Toys': 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
  Tools: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
  Garden: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80'
}

const communityCards = [
  {
    title: 'Give',
    desc: 'Help someone use what you no longer need.',
    image:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Exchange',
    desc: 'Find something useful without buying something new.',
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Reuse',
    desc: 'Keep useful things in circulation for longer.',
    image:
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80'
  }
]

const stats = [
  { value: impactStats.itemsKeptInUse.toLocaleString(), label: 'Items Circloed' },
  { value: impactStats.itemsExchanged.toLocaleString(), label: 'Items Exchanged' },
  { value: impactStats.itemsDonated.toLocaleString(), label: 'Items Donated' },
  { value: impactStats.peopleParticipating.toLocaleString(), label: 'People Participating' }
]

function AboutStory() {
  const [visibleCards, setVisibleCards] = useState({})

  useEffect(() => {
    const cards = document.querySelectorAll('.about-story-card')
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((current) => {
          const next = { ...current }
          entries.forEach((entry) => {
            if (entry.isIntersecting) next[entry.target.dataset.card] = true
          })
          return next
        })
      },
      { threshold: 0.18 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="landing-section about-section">
      <div className="section-shell about-story-shell">
        <h2 className="about-page-title">About Us</h2>
        <article className={`about-story-card about-story-card-problem ${visibleCards.problem ? 'is-visible' : ''}`} data-card="problem">
          <div className="about-story-copy">
            <p className="about-story-kicker">01 / Why Circlo Exists</p>
            <h2>Too many useful things become waste.</h2>
            <p>People often have clothes, furniture, electronics, books, and household items they no longer use. Circlo gives those things a chance to find someone who can use them again.</p>
          </div>
          <div className="unused-items-visual" aria-label="Everyday items ready for reuse">
            <img src="/hero-images/clothes.png" alt="Clothes ready to be reused" />
            <img src="/hero-images/electronics.png" alt="Electronics ready to be reused" />
            <img src="/hero-images/furniture.png" alt="Furniture ready to be reused" />
            <span className="visual-reuse-line">unused <b>→</b> useful again</span>
          </div>
        </article>

        <article className={`about-story-card about-story-card-idea ${visibleCards.idea ? 'is-visible' : ''}`} data-card="idea">
          <div className="about-story-copy about-story-copy-centered">
            <p className="about-story-kicker">02 / Our Main Idea</p>
            <h2>Give things another life.</h2>
            <p>Circlo makes it easier for people to give away, exchange, donate, sell, and reuse things they no longer need.</p>
          </div>
          <div className="reloop-cycle" aria-label="Unused, shared, reused, new life">
            <span className="cycle-orbit cycle-orbit-one" />
            <span className="cycle-orbit cycle-orbit-two" />
            <div className="cycle-stage cycle-stage-unused"><b>01</b>Unused</div>
            <div className="cycle-stage cycle-stage-shared"><b>02</b>Shared</div>
            <div className="cycle-stage cycle-stage-reused"><b>03</b>Reused</div>
            <div className="cycle-stage cycle-stage-life"><b>04</b>New life</div>
            <span className="cycle-center">Circlo</span>
          </div>
        </article>

        <article className={`about-story-card about-story-card-community ${visibleCards.community ? 'is-visible' : ''}`} data-card="community">
          <div className="community-visual" aria-label="Community connection">
            <img src="/hero-images/hhhhh.png" alt="Community visual" />
          </div>
          <div className="about-story-copy">
            <p className="about-story-kicker">03 / Built for communities</p>
            <h2>Reuse starts with our communities.</h2>
            <p>Circlo is designed for everyday community life, connecting people with useful items nearby and making reuse, sharing, and responsible consumption easier.</p>
          </div>
        </article>
      </div>
    </section>
  )
}

export default function Landing() {
  const [activeSection, setActiveSection] = useState('home')

  const scrollToSection = (event, sectionId) => {
    event.preventDefault()
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToHome = (event) => {
    event.preventDefault()
    setActiveSection('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const sections = ['about', 'why-reloop', 'impact', 'contact', 'footer']
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const updateActiveSection = () => {
      const navigationOffset = 96
      const currentPosition = window.scrollY + navigationOffset

      if (currentPosition < sections[0].offsetTop) {
        setActiveSection('home')
        return
      }

      const currentSection = sections.reduce((active, section) => {
        return section.offsetTop <= currentPosition ? section : active
      }, sections[0])

      setActiveSection(currentSection.id)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-header-inner">
          <Link to="/" className="landing-brand" aria-label="Circlo home">
            <img className="landing-logo-image" src="/hero-images/cccccc.png" alt="Circlo" />
          </Link>
          <nav className="landing-nav" aria-label="Landing page sections">
            <a className={activeSection === 'home' ? 'is-active' : ''} href="#home" onClick={scrollToHome}>Home</a>
            <a className={activeSection === 'about' ? 'is-active' : ''} href="#about" onClick={(event) => scrollToSection(event, 'about')}>About Us</a>
            <a className={activeSection === 'why-reloop' ? 'is-active' : ''} href="#why-reloop" onClick={(event) => scrollToSection(event, 'why-reloop')}>Why Circlo</a>
            <a className={activeSection === 'impact' ? 'is-active' : ''} href="#impact" onClick={(event) => scrollToSection(event, 'impact')}>Impact</a>
            <a className={activeSection === 'contact' ? 'is-active' : ''} href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>Contact Us</a>
            <Link to="/login" className="landing-nav-auth-start">Log in</Link>
            <Link to="/signup" className="landing-nav-action">Sign up</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section section-shell">
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Give it another life.</p>
              <h1>Give your things another life.</h1>
              <p className="hero-subtext">
                Circlo helps people give away, exchange, donate, sell, and reuse items instead of
                letting useful things go to waste.
              </p>

              <div className="cta-row">
                <a href="#contact" className="btn btn-primary" onClick={(event) => scrollToSection(event, 'contact')}>Contact Circlo</a>
                <Link to="/signup" className="btn btn-secondary">Get Started</Link>
              </div>
            </div>

            <div className="landing-hero-visual" aria-label="Two people sharing an item">
              <div className="hero-cycle" aria-hidden="true">
                <span className="hero-cycle-center">Circlo</span>
                <span className="hero-cycle-label hero-cycle-unused">Unused</span>
                <span className="hero-cycle-label hero-cycle-shared">Shared</span>
                <span className="hero-cycle-label hero-cycle-life">New life</span>
              </div>
              <img className="hero-sharing-people" src="/hero-images/lading.png" alt="People giving useful items another life" />
              <div className="hero-services" aria-label="Circlo services">
                <span>Exchange</span><b>·</b><span>Donate</span><b>·</b><span>Sell</span>
              </div>
            </div>

          </div>
        </section>

        <AboutStory />

        <section id="why-reloop" className="landing-section soft unified-reloop-section">
          <div className="section-shell unified-reloop-shell">
            <div className="unified-reloop-heading">
              <h2>Why Circlo?</h2>
              <p>A simpler way to keep useful things moving.</p>
            </div>

            <div className="unified-reloop-main">
              <div className="unified-reloop-visual">
                <div className="reloop-visual-board" aria-label="Everyday items ready to be reused">
                  <div className="reloop-visual-panel reloop-visual-panel-bottles">
                    <img src="/hero-images/recycling.png" alt="Reusable bottles and materials" decoding="sync" fetchPriority="high" />
                  </div>
                  <div className="reloop-visual-panel reloop-visual-panel-clothes">
                    <img src="/hero-images/clothes.png" alt="Clothing ready to be reused" decoding="sync" fetchPriority="high" />
                  </div>
                  <div className="reloop-visual-panel reloop-visual-panel-electronics">
                    <img src="/hero-images/electronics.png" alt="Old electronics ready to be reused" decoding="sync" fetchPriority="high" />
                  </div>
                  <div className="reloop-visual-panel reloop-visual-panel-furniture">
                    <img src="/hero-images/furniture.png" alt="Furniture ready to be reused" decoding="sync" fetchPriority="high" />
                  </div>
                  <span className="reloop-visual-label">Reuse. Share. Circlo.</span>
                </div>
              </div>

              <div className="unified-reloop-process">
                <article className="unified-reloop-step">
                  <span className="unified-reloop-number">01</span>
                  <div><h3>Exchange</h3><p>Trade what you have for what you need.</p></div>
                </article>
                <article className="unified-reloop-step">
                  <span className="unified-reloop-number">02</span>
                  <div><h3>Donate</h3><p>Help useful items reach someone else.</p></div>
                </article>
                <article className="unified-reloop-step">
                  <span className="unified-reloop-number">03</span>
                  <div><h3>Sell</h3><p>Give an item a new owner while earning.</p></div>
                </article>
              </div>
            </div>

            <div className="unified-reloop-impact">
              <div className="unified-reloop-impact-points">
                <strong>Less waste</strong>
                <strong>More value</strong>
                <strong>More reuse</strong>
              </div>
              <p>Circlo gives useful things another path instead of letting them sit unused or become waste.</p>
            </div>
          </div>
        </section>

        <section id="impact" className="landing-section community-impact-section">
          <div className="section-shell community-impact-shell">
            <div className="community-impact-heading">
              <h2>Community Impact</h2>
              <p>Circlo keeps useful things moving through people.</p>
            </div>

            <div className="impact-grid">
              {stats.map((stat) => (
                <div key={stat.label} className="impact-item">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="impact-flow">Unused item → Circlo → New owner → Less waste</div>

            <div className="community-impact-message">
              <h3>Not everything that is old is waste.</h3>
              <p>What no longer works for one person can still be useful to another.</p>
              <div className="community-impact-categories" aria-label="Everyday Circlo categories">
                Bottles <span>·</span> Clothes <span>·</span> Books <span>·</span> Shoes <span>·</span> Furniture <span>·</span> Electronics <span>·</span> Tools
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-shell contact-shell">
            <div className="contact-intro">
              <h2>Have a question about Circlo?</h2>
              <p className="contact-lead">We're here to help.</p>
              <p className="contact-description">Whether you have a question, feedback, or an issue to report, reach out to the Circlo team.</p>

              <dl className="contact-details">
                <div>
                  <dt>Email</dt>
                  <dd><a href="mailto:support@circlo.rw">support@circlo.rw</a></dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>Community support</dd>
                </div>
              </dl>
            </div>

            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <div className="contact-field">
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-email">Email</label>
                <input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows="4" placeholder="How can we help?" required />
              </div>
              <button type="submit" className="btn btn-primary">Send message</button>
            </form>
          </div>
        </section>

      </main>

      <footer id="footer" className="landing-footer">
        <section className="cta-banner">
          <div className="cta-content">
            <h2>Have something you no longer need?</h2>
            <p>Give it another life.</p>
            <Link to="/login" className="btn btn-light">Log in Circlo</Link>
          </div>
        </section>

        <div className="section-shell footer-shell">
          <div className="footer-brand">
            <div className="footer-title">CIRCLO</div>
            <p>Give your things another life.</p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#home" onClick={scrollToHome}>Home</a>
            <a href="#about" onClick={(event) => scrollToSection(event, 'about')}>About Us</a>
            <a href="#why-reloop" onClick={(event) => scrollToSection(event, 'why-reloop')}>Why Circlo</a>
            <a href="#impact" onClick={(event) => scrollToSection(event, 'impact')}>Impact</a>
            <a href="#contact" onClick={(event) => scrollToSection(event, 'contact')}>Contact Us</a>
            <Link to="/signup" className="footer-action">Get Started</Link>
          </nav>
        </div>

        <div className="section-shell footer-bottom">
          <div className="footer-meta">© {new Date().getFullYear()} Circlo <span>Privacy</span> <span>Terms</span></div>
          <div className="social-row" aria-label="Social links">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
