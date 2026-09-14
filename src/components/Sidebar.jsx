import { NavLink } from 'react-router-dom'
import { conversations, currentUser, notifications } from '../data/mockData'

const unreadMessageCount = conversations.filter((conversation) => conversation.unread).length
const notificationCount = notifications.length

const topLinks = [
  { to: '/app/home', label: 'Home', icon: 'home' },
  { to: '/app/explore', label: 'Explore', icon: 'compass' },
  { to: '/app/my-reloop', label: 'My Circlo', icon: 'user' },
  { to: '/app/saved', label: 'Saved', icon: 'bookmark' },
  { to: '/app/messages', label: 'Messages', icon: 'message', count: unreadMessageCount },
  { to: '/app/notifications', label: 'Notifications', icon: 'bell', count: notificationCount }
]

const bottomLinks = [
  { to: '/app/profile', label: 'Profile', icon: 'user-circle' },
  { to: '/app/settings', label: 'Settings', icon: 'settings' },
  { to: '/app/help', label: 'Help', icon: 'help-circle' }
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-profile-avatar" aria-hidden="true">{currentUser.initials}</span>
        <span className="sidebar-profile-name">{currentUser.name}</span>
      </div>

      <nav className="sidebar-nav sidebar-nav-primary">
        {topLinks.map((l) => (
          <SidebarLink key={l.to} {...l} />
        ))}
      </nav>

      <div className="sidebar-divider" />

      <NavLink to="/app/post" className="sidebar-post">
        <span className="sidebar-post-icon" aria-hidden="true"><SidebarIcon name="plus" /></span>
        <span>Post an Item</span>
      </NavLink>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav sidebar-nav-community">
        <SidebarLink to="/app/impact" label="Impact" icon="sprout" />
        <SidebarLink to="/app/recycling" label="Recycling" icon="recycle" />
      </nav>

      <nav className="sidebar-nav sidebar-nav-account">
        {bottomLinks.map((l) => (
          <SidebarLink key={l.to} {...l} />
        ))}
      </nav>
    </aside>
  )
}

function SidebarLink({ to, label, icon, count = 0 }) {
  return (
    <NavLink to={to} className={({ isActive }) => 'sidebar-link' + (isActive ? ' is-active' : '')}>
      <SidebarIcon name={icon} />
      <span>{label}</span>
      {count > 0 && <span className="sidebar-count" aria-label={`${count} unread`}>{count}</span>}
    </NavLink>
  )
}

function SidebarIcon({ name }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20c.7-3.1 3.4-5 7.5-5s6.8 1.9 7.5 5" /></>,
    bookmark: <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.5L6 21V4.5Z" />,
    message: <><path d="M5 5.5h14v10H9l-4 3v-13Z" /><path d="M8 9h8M8 12h5" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
    sprout: <><path d="M12 20V10" /><path d="M12 14c-4 0-6-2.5-6-6 4 0 6 2.5 6 6ZM12 11c0-4 2-6 6-6 0 3.5-2 6-6 6Z" /></>,
    recycle: <><circle cx="12" cy="12" r="9.2" fill="none" /><path fill="currentColor" stroke="none" d="M10.1 4.1h2.6l2.5 4.3-2.3 1.3-1.3-2.2-.9 1.6H7.5l2.6-5Z" /><path fill="currentColor" stroke="none" d="m18.7 9.1 1.3 2.3-2.5 4.3h-4.9v-2.6h2.4l1.1-1.8-1.5.1v-2.6l4.1.3Z" /><path fill="currentColor" stroke="none" d="m9.1 19.4-2.6-1.4-2.5-4.3 1.3-2.3 1.4 2.3h2.2l-.8-1.3 2.3-1.3 2.2 3.8-3.5 4.5Z" /></>,
    'user-circle': <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="9" r="2.5" /><path d="M7.5 18c.5-2.2 2.1-3.5 4.5-3.5s4 1.3 4.5 3.5" /></>,
    settings: <><path d="m9.5 3.8.5 1.8a6.8 6.8 0 0 0-1.8 1L6.5 6l-1.4 2.4 1.4 1.2a6.8 6.8 0 0 0 0 2.1l-1.4 1.2L6.5 15l1.7-.6a6.8 6.8 0 0 0 1.8 1l-.5 1.8h5l-.5-1.8a6.8 6.8 0 0 0 1.8-1l1.7.6 1.4-2.4-1.4-1.2a6.8 6.8 0 0 0 0-2.1l1.4-1.2L17.5 6l-1.7.6a6.8 6.8 0 0 0-1.8-1l.5-1.8h-5Z" /><circle cx="12" cy="10.7" r="2.5" /></>,
    'help-circle': <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.2 1.8c-1.1.8-1.8 1.2-1.8 2.7" /><path d="M12 16.5h.01" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>
  }

  return (
    <svg className={`sidebar-icon${name === 'recycle' ? ' sidebar-icon-recycle' : ''}`} width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth={name === 'recycle' ? '2.2' : '1.7'} strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </g>
    </svg>
  )
}
