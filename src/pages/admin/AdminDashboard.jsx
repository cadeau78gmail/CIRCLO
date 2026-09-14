import { adminStats, adminRecentListings, adminRecentUsers, adminReports } from '../../data/mockData'
import { ActionBadge, StatusBadge } from '../../components/Badges'

export default function AdminDashboard() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 32 }}>
        <StatCard n={adminStats.totalUsers} l="Total Users" />
        <StatCard n={adminStats.activeListings} l="Active Listings" />
        <StatCard n={adminStats.completedExchanges} l="Completed Exchanges" />
        <StatCard n={adminStats.donations} l="Donations" />
        <StatCard n={adminStats.reports} l="Reports" accent="var(--danger)" />
      </div>

      <div className="grid grid-2" style={{ gap: 24 }}>
        <div>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Recent listings</h2>
          <div className="card" style={{ overflow: 'hidden' }}>
            {adminRecentListings.map((l) => (
              <div key={l.id} className="row-between" style={{ padding: 14, borderBottom: '1px solid var(--border)' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{l.name}</p>
                  <p className="muted" style={{ margin: 0 }}>{l.user}</p>
                </div>
                <div className="row gap-8">
                  <ActionBadge action={l.action} />
                  <StatusBadge status={l.status} />
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: 16, margin: '24px 0 12px' }}>Recent users</h2>
          <div className="card" style={{ overflow: 'hidden' }}>
            {adminRecentUsers.map((u) => (
              <div key={u.id} className="row-between" style={{ padding: 14, borderBottom: '1px solid var(--border)' }}>
                <p style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{u.name}</p>
                <span className="muted">{u.location} · joined {u.joined}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Reported listings</h2>
          <div className="card" style={{ overflow: 'hidden' }}>
            {adminReports.map((r) => (
              <div key={r.id} style={{ padding: 14, borderBottom: '1px solid var(--border)' }}>
                <div className="row-between">
                  <p style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{r.listing}</p>
                  <StatusBadge status={r.status} />
                </div>
                <p className="muted" style={{ margin: '4px 0 10px' }}>{r.reason}</p>
                <div className="row gap-8">
                  <button className="btn btn-secondary btn-sm">View</button>
                  <button className="btn btn-secondary btn-sm">Approve</button>
                  <button className="btn btn-ghost btn-sm">Remove</button>
                  <button className="btn btn-primary btn-sm">Resolve Report</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ n, l, accent }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <p style={{ margin: 0, fontSize: 22, fontWeight: 700, color: accent || 'var(--green-deep)' }}>{n.toLocaleString()}</p>
      <p className="muted" style={{ margin: '4px 0 0' }}>{l}</p>
    </div>
  )
}
