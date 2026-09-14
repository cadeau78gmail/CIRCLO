import { impactStats, userImpact } from '../data/mockData'

const reuseValues = [40, 55, 48, 70, 65, 85, 92]
const movement = [['Exchange', 38], ['Donate', 30], ['Sell', 17], ['Recycle', 15]]
const categories = ['Furniture', 'Clothing', 'Electronics', 'Books', 'Household']

export default function Impact() {
  return (
    <div className="impact-page">
      <header className="impact-header">
        <h1 className="page-title">Our Circlo Impact</h1>
        <p>See how Circlo is helping useful things stay in circulation.</p>
      </header>

      <section className="impact-section" aria-labelledby="community-impact-title">
        <SectionHeading eyebrow="The Circlo community" title="Community Impact" id="community-impact-title" />
        <div className="impact-community-stats">
          <ImpactMetric value={impactStats.itemsKeptInUse} label="Items kept in use" />
          <ImpactMetric value={impactStats.itemsExchanged} label="Items exchanged" />
          <ImpactMetric value={impactStats.itemsDonated} label="Items donated" />
          <ImpactMetric value={impactStats.itemsRecycled} label="Items recycled" />
        </div>
      </section>

      <div className="impact-grid">
        <section className="impact-section" aria-labelledby="activity-title">
          <div className="impact-section-topline">
            <SectionHeading eyebrow="Reuse activity" title="Items reused over time" id="activity-title" />
            <span className="impact-time-label">Last 7 months</span>
          </div>
          <ReuseChart values={reuseValues} />
        </section>

        <section className="impact-section" aria-labelledby="movement-title">
          <SectionHeading eyebrow="A circular journey" title="How items move through Circlo" id="movement-title" />
          <div className="impact-movement-list">
            {movement.map(([label, percentage]) => (
              <div className="impact-movement-row" key={label}>
                <div className="impact-movement-label"><span>{label}</span><strong>{percentage}%</strong></div>
                <div className="impact-progress-track"><span style={{ width: `${percentage}%` }} /></div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="impact-section impact-categories" aria-labelledby="categories-title">
        <SectionHeading eyebrow="What people reuse" title="Most reused categories" id="categories-title" />
        <div className="impact-category-list">
          {categories.map((category) => <div className="impact-category-row" key={category}><span>{category}</span><span aria-hidden="true">→</span></div>)}
        </div>
      </section>

      <section className="impact-personal" aria-labelledby="personal-impact-title">
        <div>
          <p className="impact-eyebrow">Your contribution</p>
          <h2 id="personal-impact-title">Your Circlo Impact</h2>
          <p>Your contribution to keeping useful things in circulation.</p>
        </div>
        <div className="impact-personal-stats">
          <ImpactMetric value={userImpact.itemsExchanged} label="Items exchanged" />
          <ImpactMetric value={userImpact.itemsDonated} label="Items donated" />
          <ImpactMetric value={userImpact.itemsReused} label="Items reused" />
        </div>
      </section>

      <section className="impact-message" aria-labelledby="impact-message-title">
        <h2 id="impact-message-title">Every item has another possible life.</h2>
        <p>By exchanging, donating, selling, or responsibly recycling items, Circlo helps reduce unnecessary waste and keeps useful things moving.</p>
      </section>
    </div>
  )
}

function SectionHeading({ eyebrow, title, id }) {
  return <div className="impact-section-heading"><p className="impact-eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div>
}

function ImpactMetric({ value, label }) {
  return <div className="impact-metric"><strong>{value.toLocaleString()}</strong><span>{label}</span></div>
}

function ReuseChart({ values }) {
  const max = Math.max(...values)
  return (
    <div className="impact-chart" aria-label="Items reused over the last 7 months">
      <div className="impact-chart-grid"><span /><span /><span /></div>
      <div className="impact-bars">
        {values.map((value, index) => <div className="impact-bar-column" key={index}><span className="impact-bar" style={{ height: `${(value / max) * 100}%` }} /><small>{index + 1}</small></div>)}
      </div>
    </div>
  )
}
