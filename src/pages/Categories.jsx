import { categories } from '../data/mockData'

export default function Categories() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Categories</h1>
      </div>
      <div className="grid grid-4">
        {categories.map((c) => (
          <div key={c.name} className="card" style={{ padding: 24, textAlign: 'center' }}>
            <p style={{ margin: 0, fontWeight: 600 }}>{c.name}</p>
            <p className="muted" style={{ margin: '6px 0 0' }}>{c.count} items</p>
          </div>
        ))}
      </div>
    </div>
  )
}
