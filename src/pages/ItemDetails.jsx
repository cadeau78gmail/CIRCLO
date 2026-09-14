import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { items } from '../data/mockData'
import { ActionBadge } from '../components/Badges'
import ItemCard from '../components/ItemCard'

const ctaLabel = {
  exchange: 'Propose Exchange',
  donate: 'Request Donation',
  sell: 'Request to Buy',
  recycle: 'Request This Item'
}

export default function ItemDetails() {
  const { id } = useParams()
  const item = items.find((i) => String(i.id) === id) || items[0]
  const similar = items.filter((i) => i.id !== item.id && i.category === item.category).slice(0, 4)
  const [isExchangeOpen, setIsExchangeOpen] = useState(false)
  const [exchangeItem, setExchangeItem] = useState('')
  const [requestSent, setRequestSent] = useState(false)
  const [isDonationSent, setIsDonationSent] = useState(false)
  const [isBuyRequestSent, setIsBuyRequestSent] = useState(false)
  const [isRecycleRequestSent, setIsRecycleRequestSent] = useState(false)

  function sendExchangeRequest(event) {
    event.preventDefault()
    const request = {
      id: Date.now(),
      text: `Someone proposed exchanging "${item.name}" for "${exchangeItem}".`,
      time: 'Just now'
    }
    const existingRequests = JSON.parse(localStorage.getItem('reloop-exchange-requests') || '[]')
    localStorage.setItem('reloop-exchange-requests', JSON.stringify([request, ...existingRequests]))
    setRequestSent(true)
  }

  function closeExchange() {
    setIsExchangeOpen(false)
    setRequestSent(false)
    setExchangeItem('')
  }

  return (
    <div>
      <Link to="/app/explore" className="muted" style={{ display: 'inline-block', marginBottom: 16 }}>
        ‹ Back to Explore
      </Link>

      <div className="grid grid-2" style={{ gridTemplateColumns: '1.1fr 1fr', gap: 32, marginBottom: 40 }}>
        <div>
          <div
            className="card"
            style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg, var(--green-soft), var(--bg-alt))', marginBottom: 10 }}
          />
          <div className="row gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="card" style={{ width: 70, height: 70, background: 'var(--bg-alt)' }} />
            ))}
          </div>
        </div>

        <div>
          <ActionBadge action={item.action} />
          <h1 style={{ fontSize: 26, margin: '12px 0 6px' }}>{item.name}</h1>
          <p className="muted" style={{ margin: 0 }}>
            {item.condition} · {item.location} · Posted {item.posted}
          </p>
          {item.price && <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--green-deep)', margin: '12px 0 0' }}>{item.price}</p>}

          <p style={{ margin: '18px 0', color: 'var(--charcoal)', lineHeight: 1.6 }}>{item.desc}</p>

          <div className="card row gap-12" style={{ padding: 14, marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--green-soft)' }} />
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Owner profile</p>
              <p className="muted" style={{ margin: 0 }}>Member since 2025 · {item.location}</p>
            </div>
          </div>

          <div className="row gap-12" style={{ flexWrap: 'wrap' }}>
            {item.action === 'exchange' ? (
              <button className="btn btn-primary" onClick={() => setIsExchangeOpen(true)}>{ctaLabel[item.action]}</button>
            ) : item.action === 'donate' ? (
              <button className="btn btn-primary" onClick={() => setIsDonationSent(true)}>{ctaLabel[item.action]}</button>
            ) : item.action === 'sell' ? (
              <button className="btn btn-primary" onClick={() => setIsBuyRequestSent(true)}>{ctaLabel[item.action]}</button>
            ) : (
              <button className="btn btn-primary" onClick={() => setIsRecycleRequestSent(true)}>{ctaLabel[item.action]}</button>
            )}
            <button className="btn btn-secondary">Save</button>
            <Link to="/app/messages" className="btn btn-secondary">Message</Link>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section>
          <h2 style={{ fontSize: 18, marginBottom: 14 }}>Similar Items</h2>
          <div className="grid grid-items">
            {similar.map((s) => (
              <ItemCard key={s.id} item={s} />
            ))}
          </div>
        </section>
      )}

      {isExchangeOpen && (
        <div className="modal-backdrop" role="presentation" onClick={closeExchange}>
          <div className="exchange-modal" role="dialog" aria-modal="true" aria-labelledby="exchange-title" onClick={(event) => event.stopPropagation()}>
            {!requestSent ? (
              <form onSubmit={sendExchangeRequest}>
                <div className="row-between" style={{ marginBottom: 8 }}>
                  <h2 id="exchange-title" style={{ fontSize: 20, margin: 0 }}>Propose an exchange</h2>
                  <button type="button" className="modal-close" onClick={closeExchange} aria-label="Close exchange dialog">×</button>
                </div>
                <p className="muted" style={{ margin: '0 0 18px' }}>What item would you like to offer for the {item.name}?</p>
                <label className="field">
                  <span>Item you want to give in exchange</span>
                  <input
                    className="input"
                    value={exchangeItem}
                    onChange={(event) => setExchangeItem(event.target.value)}
                    placeholder="e.g. Rain jacket or boots"
                    required
                    autoFocus
                  />
                </label>
                <div className="row" style={{ justifyContent: 'flex-end', gap: 10, marginTop: 22 }}>
                  <button type="button" className="btn btn-ghost" onClick={closeExchange}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Send Request</button>
                </div>
              </form>
            ) : (
              <div>
                <h2 id="exchange-title" style={{ fontSize: 20, margin: '0 0 8px' }}>Request sent</h2>
                <p className="muted" style={{ margin: '0 0 20px' }}>The owner has been notified about your exchange proposal.</p>
                <button type="button" className="btn btn-primary" onClick={closeExchange}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}

      {isDonationSent && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsDonationSent(false)}>
          <div className="exchange-modal" role="dialog" aria-modal="true" aria-labelledby="donation-title" onClick={(event) => event.stopPropagation()}>
            <h2 id="donation-title" style={{ fontSize: 20, margin: '0 0 8px' }}>Request sent</h2>
            <p className="muted" style={{ margin: '0 0 20px' }}>The owner has been notified about your donation request.</p>
            <button type="button" className="btn btn-primary" onClick={() => setIsDonationSent(false)}>Done</button>
          </div>
        </div>
      )}

      {isBuyRequestSent && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsBuyRequestSent(false)}>
          <div className="exchange-modal" role="dialog" aria-modal="true" aria-labelledby="buy-request-title" onClick={(event) => event.stopPropagation()}>
            <h2 id="buy-request-title" style={{ fontSize: 20, margin: '0 0 8px' }}>Request sent</h2>
            <p className="muted" style={{ margin: '0 0 20px' }}>Your request to buy this item has been sent to the seller.</p>
            <button type="button" className="btn btn-primary" onClick={() => setIsBuyRequestSent(false)}>Done</button>
          </div>
        </div>
      )}

      {isRecycleRequestSent && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsRecycleRequestSent(false)}>
          <div className="exchange-modal" role="dialog" aria-modal="true" aria-labelledby="recycle-request-title" onClick={(event) => event.stopPropagation()}>
            <h2 id="recycle-request-title" style={{ fontSize: 20, margin: '0 0 8px' }}>Request sent</h2>
            <p className="muted" style={{ margin: '0 0 20px' }}>The owner has been notified about your request to recycle this item.</p>
            <button type="button" className="btn btn-primary" onClick={() => setIsRecycleRequestSent(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  )
}
