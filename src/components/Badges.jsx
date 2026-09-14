import { actionMeta } from '../data/mockData'

export function ActionBadge({ action }) {
  const meta = actionMeta[action]
  if (!meta) return null
  return (
    <span className={`badge ${meta.badge}`}>
      {meta.label}
    </span>
  )
}

export function StatusBadge({ status }) {
  const key = (status || '').toLowerCase()
  let cls = 'status'
  if (key.includes('active')) cls += ' status-active'
  else if (key.includes('pending') || key.includes('requested') || key.includes('reserved')) cls += ' status-pending'
  else if (key.includes('completed') || key.includes('accepted')) cls += ' status-completed'
  return <span className={cls}>{status}</span>
}
