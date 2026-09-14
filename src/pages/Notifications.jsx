import { useEffect, useMemo, useState } from 'react'
import { notifications } from '../data/mockData'

const readStorageKey = 'reloop-read-notifications'

export default function Notifications() {
  const [exchangeRequests, setExchangeRequests] = useState([])
  const [readIds, setReadIds] = useState(() => JSON.parse(localStorage.getItem(readStorageKey) || '[]'))
  const [view, setView] = useState('all')

  useEffect(() => {
    setExchangeRequests(JSON.parse(localStorage.getItem('reloop-exchange-requests') || '[]'))
  }, [])

  const allNotifications = useMemo(() => {
    const requests = exchangeRequests.map((notification) => ({ ...notification, id: `exchange-${notification.id}` }))
    return [...requests, ...notifications]
  }, [exchangeRequests])
  const unreadNotifications = allNotifications.filter((notification) => !readIds.includes(String(notification.id)))
  const visibleNotifications = view === 'unread' ? unreadNotifications : allNotifications
  const groups = groupNotifications(visibleNotifications)

  function markRead(id) {
    const nextReadIds = [...new Set([...readIds, String(id)])]
    setReadIds(nextReadIds)
    localStorage.setItem(readStorageKey, JSON.stringify(nextReadIds))
  }

  function markAllRead() {
    const allIds = allNotifications.map((notification) => String(notification.id))
    setReadIds(allIds)
    localStorage.setItem(readStorageKey, JSON.stringify(allIds))
  }

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div className="notifications-title-wrap">
          <h1 className="page-title">Notifications</h1>
          {unreadNotifications.length > 0 && <span className="notifications-unread-count">{unreadNotifications.length} unread</span>}
        </div>
        <button type="button" className="notifications-mark-read" onClick={markAllRead} disabled={unreadNotifications.length === 0}>Mark all as read</button>
      </div>

      <div className="notifications-tabs" role="tablist" aria-label="Notification views">
        <button type="button" role="tab" aria-selected={view === 'all'} className={view === 'all' ? 'is-active' : ''} onClick={() => setView('all')}>All</button>
        <button type="button" role="tab" aria-selected={view === 'unread'} className={view === 'unread' ? 'is-active' : ''} onClick={() => setView('unread')}>Unread</button>
      </div>

      {groups.length > 0 ? groups.map((group) => (
        <section className="notifications-group" key={group.label}>
          <h2>{group.label}</h2>
          <div className="notifications-list">
            {group.items.map((notification) => {
              const isUnread = !readIds.includes(String(notification.id))
              return <NotificationRow key={notification.id} notification={notification} isUnread={isUnread} onRead={() => markRead(notification.id)} />
            })}
          </div>
        </section>
      )) : (
        <div className="notifications-empty">
          <p>You're all caught up.</p>
          <span>No new notifications right now.</span>
        </div>
      )}
    </div>
  )
}

function NotificationRow({ notification, isUnread, onRead }) {
  const type = getNotificationType(notification.text)
  const destination = type === 'exchange' ? '/app/exchange' : type === 'recommendation' ? '/app/explore' : null
  const content = (
    <>
      <span className="notification-indicator"><NotificationIcon type={type} /></span>
      <span className="notification-copy"><strong>{notification.text}</strong><time>{notification.time}</time></span>
      {isUnread && <span className="notification-unread-dot" aria-label="Unread" />}
    </>
  )

  return destination ? <a href={destination} className={'notification-row' + (isUnread ? ' is-unread' : '')} onClick={onRead}>{content}</a> : <button type="button" className={'notification-row' + (isUnread ? ' is-unread' : '')} onClick={onRead}>{content}</button>
}

function getNotificationType(text) {
  if (text.includes('proposed exchanging') || text.includes('exchange request')) return 'exchange'
  if (text.includes('saved your item')) return 'saved'
  if (text.includes('requested your item')) return 'request'
  if (text.includes('marked as completed')) return 'completed'
  return 'recommendation'
}

function groupNotifications(items) {
  const groups = { Today: [], Yesterday: [], 'This week': [], Older: [] }
  items.forEach((notification) => groups[getTimeGroup(notification.time)].push(notification))
  return Object.entries(groups).filter(([, groupItems]) => groupItems.length > 0).map(([label, groupItems]) => ({ label, items: groupItems }))
}

function getTimeGroup(time) {
  if (time === 'Just now' || /h ago$/.test(time)) return 'Today'
  const dayMatch = time.match(/(\d+)d ago$/)
  if (!dayMatch) return 'Older'
  const days = Number(dayMatch[1])
  if (days === 1) return 'Yesterday'
  if (days <= 7) return 'This week'
  return 'Older'
}

function NotificationIcon({ type }) {
  const paths = {
    exchange: <path d="M5 8h10M12 5l3 3-3 3M19 16H9m3-3-3 3 3 3" />,
    saved: <path d="m12 5 1.8 4.1 4.4.4-3.3 2.9 1 4.3-3.9-2.2-3.9 2.2 1-4.3-3.3-2.9 4.4-.4L12 5Z" />,
    request: <path d="M5 6.5h14v11H5zM8 10h8M8 13h5" />,
    completed: <path d="m5 12 4.2 4.2L19 6.5" />,
    recommendation: <path d="M12 4v4m0 8v4m8-8h-4M8 12H4m13.7-5.7-2.8 2.8m-5.8 5.8-2.8 2.8m11.4 0-2.8-2.8m-5.8-5.8L4.3 6.3" />
  }
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>
}