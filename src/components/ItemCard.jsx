import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ActionBadge } from './Badges'

export default function ItemCard({ item, isSaved: initiallySaved = false, onRemove }) {
  const [isSaved, setIsSaved] = useState(initiallySaved)

  function toggleSaved(event) {
    event.preventDefault()
    event.stopPropagation()
    if (onRemove && isSaved) {
      onRemove()
      return
    }
    setIsSaved((saved) => !saved)
  }

  return (
    <Link to={`/app/item/${item.id}`} className="card item-card">
      <div className="item-card-image" aria-hidden="true" />
      <button
        type="button"
        onClick={toggleSaved}
        aria-label={onRemove ? 'Delete item from saved items' : isSaved ? 'Remove item from saved items' : 'Save item'}
        aria-pressed={isSaved}
        title={onRemove ? 'Delete saved item' : isSaved ? 'Saved' : 'Save item'}
        className={`item-card-save${onRemove ? ' is-delete' : ''}${isSaved ? ' is-saved' : ''}`}
      >
        {onRemove ? 'Delete' : <ArchiveIcon />}
      </button>
      <div className="item-card-body">
        <div className="item-card-title-row">
          <p className="item-card-title">{item.name}</p>
        </div>
        <ActionBadge action={item.action} />
        <p className="item-card-meta muted">
          {item.condition} · {item.location}
        </p>
        {item.price && <p className="item-card-price">{item.price}</p>}
      </div>
    </Link>
  )
}

function ArchiveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7.5h16M6 7.5v10.75c0 .69.56 1.25 1.25 1.25h9.5c.69 0 1.25-.56 1.25-1.25V7.5M9 11.5h6M5.25 4.5h13.5c.69 0 1.25.56 1.25 1.25v1.75H4V5.75c0-.69.56-1.25 1.25-1.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

