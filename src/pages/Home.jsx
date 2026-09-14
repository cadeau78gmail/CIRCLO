import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { currentUser, items, impactStats } from '../data/mockData'

export default function Home() {
  return (
    <div className="home-page">
      <section className="page-header home-hero">
        <div className="home-header-row">
          <p className="eyebrow">Good morning, Isabelle</p>
          <div className="home-account-actions">
            <Link to="/app/notifications" className="home-notifications" aria-label="View notifications" title="Notifications">
              <BellIcon />
              <span className="home-notification-dot" aria-hidden="true">1</span>
            </Link>
            <div className="home-profile" aria-label={`${currentUser.name}, Circlo member`}>
            <span className="home-profile-avatar" aria-hidden="true">{currentUser.initials}</span>
            <span className="home-profile-copy">
              <strong>{currentUser.name}</strong>
              <span>Circlo member</span>
            </span>
            </div>
          </div>
        </div>
        <h1 className="page-title">Put something useful back in circulation.</h1>
        <div className="home-search-actions">
          <input className="input" placeholder="Search for furniture, clothes, electronics..." />
          <Link to="/app/post" className="btn btn-primary">+ Post an Item</Link>
          <Link to="/app/explore" className="btn btn-secondary">Exchange</Link>
          <Link to="/app/explore" className="btn btn-secondary">Donate</Link>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <h2>Recommended for You</h2>
          <Link to="/app/explore" className="muted">See all</Link>
        </div>
        <div className="grid grid-items">
          {items.slice(0, 4).map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <h2>Popular Near You</h2>
          <Link to="/app/explore" className="muted">See all</Link>
        </div>
        <div className="grid grid-items">
          {items.slice(2, 6).map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <h2>Recently Added</h2>
          <Link to="/app/explore" className="muted">See all</Link>
        </div>
        <div className="grid grid-items">
          {items.slice(4, 8).map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}
        </div>
      </section>

      <section className="home-impact">
        <div className="home-impact-content">
          <div>
            <h2>Total Impact</h2>
            <div className="home-impact-stats">
              <ImpactMini n={impactStats.itemsKeptInUse} l="Items reused" />
              <ImpactMini n={impactStats.itemsDonated} l="Items donated" />
              <ImpactMini n={impactStats.itemsExchanged} l="Items exchanged" />
              <ImpactMini n={impactStats.peopleParticipating} l="People participating" />
            </div>
          </div>
          <Link to="/app/impact" className="btn btn-primary">See Community Impact</Link>
        </div>
      </section>
    </div>
  )
}

function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ImpactMini({ n, l }) {
  return (
    <div className="home-impact-stat">
      <p>{n.toLocaleString()}</p>
      <p className="muted">{l}</p>
    </div>
  )
}
