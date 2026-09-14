import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { items } from '../data/mockData'
import { ActionBadge } from '../components/Badges'

const savedItemIds = items.slice(0, 3).map((item) => item.id)
const sortOptions = ['Recently saved', 'Recently added', 'Price: Low to high', 'Price: High to low']
const filterOptions = ['All', 'Exchange', 'Donate', 'Sell']

export default function Saved() {
  const [savedIds, setSavedIds] = useState(savedItemIds)
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Recently saved')
  const [removeTarget, setRemoveTarget] = useState(null)

  const savedItems = useMemo(() => {
    const filtered = items.filter((item) => savedIds.includes(item.id) && (filter === 'All' || item.action === filter.toLowerCase()))
    if (sort === 'Price: Low to high') return [...filtered].sort((a, b) => priceValue(a) - priceValue(b))
    if (sort === 'Price: High to low') return [...filtered].sort((a, b) => priceValue(b) - priceValue(a))
    return filtered
  }, [filter, savedIds, sort])

  function confirmRemove() {
    setSavedIds((current) => current.filter((id) => id !== removeTarget.id))
    setRemoveTarget(null)
  }

  return (
    <div className="saved-page">
      <header className="saved-header">
        <div>
          <h1 className="page-title">Saved Items</h1>
          <p>Items you've saved to revisit later.</p>
          <span className="saved-count">{savedIds.length} saved {savedIds.length === 1 ? 'item' : 'items'}</span>
        </div>
        <label className="saved-sort">
          <span>Sort by</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort saved items">
            {sortOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
      </header>

      <div className="saved-filters" role="tablist" aria-label="Saved item filters">
        {filterOptions.map((option) => <button key={option} type="button" role="tab" aria-selected={filter === option} className={filter === option ? 'is-active' : ''} onClick={() => setFilter(option)}>{option}</button>)}
      </div>

      {savedItems.length > 0 ? (
        <div className="saved-listings">
          {savedItems.map((item) => <SavedListing key={item.id} item={item} onRemove={() => setRemoveTarget(item)} />)}
        </div>
      ) : (
        <div className="saved-empty"><h2>No saved items yet</h2><p>Save items you like and come back to them later.</p><Link className="btn btn-primary" to="/app/explore">Explore items</Link></div>
      )}

      {removeTarget && (
        <div className="modal-backdrop" role="presentation" onClick={() => setRemoveTarget(null)}>
          <div className="saved-remove-modal" role="dialog" aria-modal="true" aria-labelledby="remove-saved-title" onClick={(event) => event.stopPropagation()}>
            <h2 id="remove-saved-title">Remove from saved items?</h2>
            <p>This only removes the bookmark. The original listing will remain available.</p>
            <div><button type="button" className="btn btn-ghost" onClick={() => setRemoveTarget(null)}>Cancel</button><button type="button" className="btn saved-remove-confirm" onClick={confirmRemove}>Remove</button></div>
          </div>
        </div>
      )}
    </div>
  )
}

function SavedListing({ item, onRemove }) {
  return (
    <article className="saved-listing">
      <Link to={`/app/item/${item.id}`} className="saved-listing-image" aria-label={`View ${item.name}`}>
        <span>{item.category}</span>
      </Link>
      <div className="saved-listing-content">
        <Link to={`/app/item/${item.id}`} className="saved-listing-title">{item.name}</Link>
        <ActionBadge action={item.action} />
        <p className="saved-listing-meta">{item.condition} · {item.location}</p>
        {item.price && <p className="saved-listing-price">{item.price}</p>}
        <div className="saved-listing-actions"><Link to={`/app/item/${item.id}`}>View item</Link><button type="button" onClick={onRemove}>Remove</button></div>
      </div>
    </article>
  )
}

function priceValue(item) {
  return item.price ? Number(item.price.replace(/[^0-9]/g, '')) : Number.POSITIVE_INFINITY
}
