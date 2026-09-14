import { receivedRequests, sentRequests } from '../data/mockData'
import { StatusBadge } from '../components/Badges'

export default function Exchange() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Exchange Requests</h1>
      </div>

      <div className="grid grid-2" style={{ gap: 28 }}>
        <section>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Received Requests</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {receivedRequests.map((r) => (
              <div key={r.id} className="card" style={{ padding: 16 }}>
                <p style={{ margin: '0 0 12px', fontSize: 14 }}>{r.text}</p>
                <div className="row gap-8">
                  <button className="btn btn-primary btn-sm">Accept</button>
                  <button className="btn btn-secondary btn-sm">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Sent Requests</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sentRequests.map((r) => (
              <div key={r.id} className="card row-between" style={{ padding: 16 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{r.item}</p>
                <StatusBadge status={r.status} />
              </div>
            ))}
            <div className="card" style={{ padding: 16, background: 'var(--green-soft)', border: 'none' }}>
              <p style={{ margin: '0 0 10px', fontWeight: 600, fontSize: 14 }}>Exchange accepted</p>
              <button className="btn btn-primary btn-sm">Mark as Completed</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
