import { NavLink } from 'react-router-dom'

const links = [
  { to: '/app/home', label: 'Home', icon: '⌂' },
  { to: '/app/explore', label: 'Explore', icon: '⌕' },
  { to: '/app/post', label: 'Post', icon: '+', emphasize: true },
  { to: '/app/saved', label: 'Saved', icon: '♡' },
  { to: '/app/profile', label: 'Profile', icon: '◐' }
]

export default function MobileNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 14,
        left: 14,
        right: 14,
        background: 'var(--green-deep)',
        borderRadius: 999,
        boxShadow: '0 10px 26px rgba(38,48,31,0.28)',
        display: 'none',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '10px 10px',
        zIndex: 20
      }}
      className="mobile-nav"
    >
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            fontSize: 10,
            fontWeight: 600,
            color: isActive ? 'var(--cream)' : 'rgba(247,242,223,0.55)'
          })}
        >
          <span
            style={{
              fontSize: l.emphasize ? 17 : 15,
              width: l.emphasize ? 32 : 26,
              height: l.emphasize ? 32 : 26,
              borderRadius: '50%',
              background: l.emphasize ? 'var(--cream)' : 'transparent',
              color: l.emphasize ? 'var(--green-darker)' : 'inherit',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {l.icon}
          </span>
          {l.label}
        </NavLink>
      ))}
    </nav>
  )
}
