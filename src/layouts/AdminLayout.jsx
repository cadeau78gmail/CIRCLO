import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/admin', label: 'Dashboard', icon: '▦', end: true },
  { to: '/admin/users', label: 'Users', icon: '◐' },
  { to: '/admin/listings', label: 'Listings', icon: '◍' },
  { to: '/admin/categories', label: 'Categories', icon: '☰' },
  { to: '/admin/reports', label: 'Reports', icon: '⚑' },
  { to: '/admin/transactions', label: 'Transactions', icon: '⇄' },
  { to: '/admin/impact', label: 'Impact', icon: '🌱' },
  { to: '/admin/settings', label: 'Settings', icon: '⚙' }
]

export default function AdminLayout() {
  return (
    <div className="app-shell">
      <aside
        className="sidebar"
        style={{
          background: 'var(--green-deep)',
          color: 'var(--cream)',
          height: '100vh',
          position: 'sticky',
          top: 0,
          padding: '22px 14px',
          borderTopRightRadius: 28,
          borderBottomRightRadius: 28
        }}
      >
        <div className="row gap-8" style={{ padding: '0 8px 20px' }}>
          <span
            style={{
              fontSize: 15,
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'var(--cream)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            🌱
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Circlo Admin</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => 'sidebar-link' + (isActive ? ' is-active' : '')}>
              <span style={{ width: 18, textAlign: 'center' }}>{l.icon}</span>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main-col">
        <Outlet />
      </main>
    </div>
  )
}
