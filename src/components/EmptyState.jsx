export default function EmptyState({ title, cta, to }) {
  return (
    <div className="card" style={{ padding: 48, textAlign: 'center' }}>
      <p style={{ fontWeight: 600, marginBottom: 14 }}>{title}</p>
      {cta && (
        <a href={to} className="btn btn-primary" style={{ display: 'inline-flex' }}>
          {cta}
        </a>
      )}
    </div>
  )
}
