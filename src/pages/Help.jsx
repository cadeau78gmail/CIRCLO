import { useMemo, useState } from 'react'
import { faqs } from '../data/mockData'

const answerByQuestion = {
  'How do I post an item?': 'Select Post an Item, then add the item name, category, description, photos, condition, and location. Choose whether you want to exchange, donate, or sell it. Add a price for selling, or explain what you would like in return for exchanging.',
  'How do exchanges work?': 'The owner lists an item and explains what they are looking for. Another user can send a request or proposal, and the owner can accept or decline it. Once accepted, both users can message each other and arrange the handover.',
  'How do I request an item?': 'Open an available listing, select the relevant action, and send your request. The owner can review it and decide whether to accept or decline.',
  'How do I report a listing?': 'Open the listing, select Report, choose or describe the reason, and submit the report. The report will then be reviewed appropriately.',
  'How do I mark an item as completed?': 'After an exchange, donation, or sale is successfully completed, mark the transaction as completed so the item is no longer treated as active.',
  'What should I do with electronics?': 'First consider repairing, reusing, exchanging, donating, or selling working electronics. If an item cannot reasonably be reused, use a responsible e-waste or recycling option rather than disposing of it carelessly.'
}

const topics = [
  ['Getting started', 'Learn how to post and manage an item'],
  ['Exchanges & requests', 'Understand how requesting and exchanging works'],
  ['Safety & responsible reuse', 'Learn how to use Circlo responsibly']
]

export default function Help() {
  const [open, setOpen] = useState(null)
  const [query, setQuery] = useState('')
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [isMessageSent, setIsMessageSent] = useState(false)
  const helpFaqs = useMemo(() => faqs.map((faq) => ({ ...faq, a: answerByQuestion[faq.q] || faq.a })), [])
  const filteredFaqs = helpFaqs.filter((faq) => faq.q.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div className="help-page">
      <div className="page-header">
        <h1 className="page-title">Help</h1>
        <div className="help-intro">
          <p>How can we help?</p>
          <span>Find answers to common questions about using Circlo.</span>
        </div>
      </div>

      <label className="help-search">
        <SearchIcon />
        <input value={query} onChange={(event) => { setQuery(event.target.value); setOpen(null) }} placeholder="Search for help..." aria-label="Search for help" />
      </label>

      <section className="help-section" aria-labelledby="topics-title">
        <h2 id="topics-title">Popular topics</h2>
        <div className="help-topic-list">
          {topics.map(([title, description]) => (
            <a href="#faq-title" className="help-topic-row" key={title}>
              <span><strong>{title}</strong><small>{description}</small></span>
              <span className="help-topic-arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </section>

      <section className="help-section" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently asked questions</h2>
        <div className="help-faq-list">
          {filteredFaqs.map((f, i) => (
          <div key={f.q} className={'help-faq-item' + (open === i ? ' is-open' : '')}>
            <button
              type="button"
              className="help-faq-question"
              aria-expanded={open === i}
              aria-controls={`faq-answer-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{f.q}</span>
              <span className="help-faq-indicator" aria-hidden="true">{open === i ? '−' : '+'}</span>
            </button>
            <div id={`faq-answer-${i}`} className="help-faq-answer" role="region">
              <p>{f.a}</p>
            </div>
          </div>
        ))}
          {filteredFaqs.length === 0 && <p className="help-no-results">No results found.</p>}
        </div>
      </section>

      <section className="help-contact" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">Still need help?</h2>
          <p>Can't find what you're looking for? Contact us and we'll help you out.</p>
        </div>
        <button type="button" className="help-contact-link" onClick={() => setIsSupportOpen(true)}>Contact Support <span aria-hidden="true">→</span></button>
      </section>

      {isSupportOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsSupportOpen(false)}>
          <form
            className="settings-modal help-support-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-form-title"
            onClick={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault()
              setIsSupportOpen(false)
              setIsMessageSent(true)
            }}
          >
            <div className="settings-modal-heading">
              <h2 id="support-form-title">Contact Support</h2>
              <button type="button" className="modal-close" onClick={() => setIsSupportOpen(false)} aria-label="Close support form">×</button>
            </div>
            <label className="settings-field">
              <span>What do you need help with?</span>
              <input className="input" required placeholder="e.g. Help with a request" />
            </label>
            <label className="settings-field">
              <span>Message</span>
              <textarea className="input" rows="4" required placeholder="Tell us how we can help..." />
            </label>
            <div className="settings-modal-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setIsSupportOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
          </form>
        </div>
      )}

      {isMessageSent && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsMessageSent(false)}>
          <div className="settings-modal help-support-modal" role="dialog" aria-modal="true" aria-labelledby="message-sent-title" onClick={(event) => event.stopPropagation()}>
            <div className="settings-modal-heading"><h2 id="message-sent-title">Message sent</h2><button type="button" className="modal-close" onClick={() => setIsMessageSent(false)} aria-label="Close confirmation">×</button></div>
            <p className="settings-modal-copy">Thanks for reaching out. Our support team will get back to you soon.</p>
            <div className="settings-modal-actions"><button type="button" className="btn btn-primary" onClick={() => setIsMessageSent(false)}>Done</button></div>
          </div>
        </div>
      )}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4.3 4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
