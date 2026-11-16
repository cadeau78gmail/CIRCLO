import { useEffect, useState } from 'react'
import ItemCard from '../components/ItemCard'
import { items as sampleItems } from '../data/mockData'
import { getListings } from '../api'

const actionFilters = [
  { key: 'all', label: 'All' },
  { key: 'exchange', label: 'Exchange' },
  { key: 'donate', label: 'Donate' },
  { key: 'sell', label: 'Sell' },
  { key: 'recycle', label: 'Recycle' }
]

const sortOptions = ['Recently Added', 'Closest', 'Most Relevant']

export default function Explore() {
  const [filter, setFilter] = useState('all')
const [items, setItems] = useState(sampleItems)
useEffect(() => {
  getListings()
    .then(serverItems => {
      if (serverItems.length > 0) {
        setItems(
          serverItems.map(item => ({
            ...item,
            desc: item.description,
            posted: 'Just now'
          }))
        )
      }
    })
    .catch(error => {
      console.log('Could not load listings:', error)
    })
}, [])
  const [sort, setSort] = useState('Recently Added')
  const [isSortOpen, setIsSortOpen] = useState(false)

  const visible = filter === 'all' ? items : items.filter((i) => i.action === filter)

  return (
    <div className="explore-page">
      <div className="page-header explore-header">
        <h1 className="page-title">Explore Circlo</h1>
        <p className="page-sub">Browse what people are exchanging, donating, selling, and recycling.</p>
      </div>

      <div className="explore-search">
        <SearchIcon />
        <input className="input" placeholder="Search items..." />
      </div>

      <div className="explore-actions" aria-label="Item actions">
        {actionFilters.map((f) => (
          <button
            key={f.key}
            className={'pill-filter' + (filter === f.key ? ' active' : '')}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="explore-toolbar">
        <div className="explore-filters">
          <button type="button" className="filter-control">Category <ChevronIcon /></button>
          <button type="button" className="filter-control">Location <ChevronIcon /></button>
          <button type="button" className="filter-control">Condition <ChevronIcon /></button>
          <button type="button" className="filter-control">Price <ChevronIcon /></button>
          <button type="button" className="filter-control">Date <ChevronIcon /></button>
        </div>
        <div className="sort-control">
          <button
            type="button"
            className="sort-select"
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
            onClick={() => setIsSortOpen((open) => !open)}
          >
            <span>{sort}</span>
            <span className={'sort-chevron' + (isSortOpen ? ' open' : '')} aria-hidden="true">⌄</span>
          </button>
          {isSortOpen && (
            <div className="sort-menu" role="listbox" aria-label="Sort items">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={sort === option}
                  className={'sort-option' + (sort === option ? ' selected' : '')}
                  onClick={() => {
                    setSort(option)
                    setIsSortOpen(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-items">
        {visible.map((it) => (
          <ItemCard key={it.id} item={it} />
        ))}
      </div>
    </div>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m7 9 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
