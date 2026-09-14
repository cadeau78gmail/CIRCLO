import { recyclingCategories } from '../data/mockData'

export default function Recycling() {
  return (
    <div className="recycling-page">
      <div className="page-header">
        <h1 className="page-title">Recycle Responsibly</h1>
        <p className="page-sub">Some items shouldn't simply be thrown away. Here's how to handle them responsibly.</p>
      </div>

      <section className="recycling-section" aria-labelledby="recycling-information-title">
        <h2 id="recycling-information-title" className="recycling-section-title">Recycling information</h2>
        <div className="recycling-list">
        {recyclingCategories.map((c) => (
          <div key={c.name} className="recycling-row">
            <p className="recycling-category">{c.name}</p>
            <p className="recycling-note">{c.note}</p>
          </div>
        ))}
        </div>
      </section>

      <section className="recycling-note-block" aria-labelledby="e-waste-title">
        <p id="e-waste-title" className="recycling-note-title">Responsible E-Waste Handling</p>
        <p className="recycling-note-copy">
          Electronics contain materials that shouldn't go in regular trash. Use an authorized collection or recycling
          channel rather than ordinary disposal.
        </p>
      </section>

      <section className="recycling-actions" aria-labelledby="recycling-actions-title">
        <h2 id="recycling-actions-title">Need help deciding what to do with your item?</h2>
        <div className="recycling-action-list">
          {['Reuse', 'Repair', 'Donate', 'Exchange', 'Recycle'].map((o) => (
            <span key={o} className="recycling-action">{o}<span aria-hidden="true">→</span></span>
          ))}
        </div>
      </section>
    </div>
  )
}
