import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const notificationDefaults = {
  requests: true,
  messages: true,
  saved: true,
  transactions: true,
  recommendations: false
}

const notificationRows = [
  ['requests', 'Requests', 'Updates about your item requests'],
  ['messages', 'Messages', 'New messages from other members'],
  ['saved', 'Saved item updates', 'Changes to items you saved'],
  ['transactions', 'Transaction updates', 'Updates about completed exchanges'],
  ['recommendations', 'Recommendations', 'Suggestions based on your interests']
]

export default function Settings() {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(notificationDefaults)
  const [values, setValues] = useState({
    email: 'isabelle@example.com',
    phone: '+250 788 123 456',
    location: 'Kigali',
    language: 'English',
    interests: 'Clothing, Books, Electronics'
  })
  const [modal, setModal] = useState(null)
  const [draft, setDraft] = useState('')

  function openEditor(key, value) {
    setDraft(value)
    setModal({ type: 'editor', key })
  }

  function saveEditor(event) {
    event.preventDefault()
    if (draft.trim()) setValues((current) => ({ ...current, [modal.key]: draft.trim() }))
    setModal(null)
  }

  function openInfo(title, description, options = []) {
    setModal({ type: 'info', title, description, options })
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-sub">Manage your account, preferences, notifications, and privacy.</p>
      </div>

      <SettingsSection title="Account">
        <SettingRow title="Email address" description={values.email} onClick={() => openEditor('email', values.email)} />
        <SettingRow title="Phone number" description={values.phone} onClick={() => openEditor('phone', values.phone)} />
        <SettingRow title="Password" description="••••••••" action="Change" onClick={() => setModal({ type: 'password' })} />
      </SettingsSection>

      <SettingsSection title="Preferences">
        <SettingRow title="Interests" description={values.interests} onClick={() => openEditor('interests', values.interests)} />
        <SettingRow title="Location" description={values.location} onClick={() => openEditor('location', values.location)} />
        <SettingRow title="Language" description={values.language} onClick={() => openInfo('Language', 'Choose the language you want to use across Circlo.', ['English', 'Kinyarwanda', 'French'])} />
      </SettingsSection>

      <SettingsSection title="Notifications">
        {notificationRows.map(([key, title, description]) => (
          <div className="settings-toggle-row" key={key}>
            <div><strong>{title}</strong><span>{description}</span></div>
            <button type="button" className={'settings-toggle' + (notifications[key] ? ' is-on' : '')} aria-pressed={notifications[key]} aria-label={`Toggle ${title}`} onClick={() => setNotifications((current) => ({ ...current, [key]: !current[key] }))}>
              <span />
            </button>
          </div>
        ))}
      </SettingsSection>

      <SettingsSection title="Privacy & Security">
        <SettingRow title="Privacy settings" description="Control who can see your activity" onClick={() => openInfo('Privacy settings', 'Choose how your activity is shared with other Circlo members.', ['Visible to members', 'Only people I interact with'])} />
        <SettingRow title="Who can contact me" description="Choose who can send you messages" onClick={() => openInfo('Who can contact me', 'Choose who can start a conversation with you.', ['Anyone on Circlo', 'People whose items I request'])} />
        <SettingRow title="Account security" description="Review your sign-in and security options" onClick={() => openInfo('Account security', 'Your account is protected with your email and password.')} />
        <SettingRow title="Delete account" description="Permanently remove your Circlo account" destructive onClick={() => setModal({ type: 'delete' })} />
      </SettingsSection>

      <SettingsSection title="Support">
        <LinkSettingRow to="/app/help" title="Help & Support" description="Find answers and contact support" />
        <SettingRow title="Report a problem" description="Tell us about an issue" onClick={() => setModal({ type: 'report' })} />
        <SettingRow title="Terms of Use" description="Review the rules for using Circlo" onClick={() => openInfo('Terms of Use', 'Please review the terms that guide the Circlo community.')} />
        <SettingRow title="Privacy Policy" description="Learn how your information is handled" onClick={() => openInfo('Privacy Policy', 'We only use your information to provide and improve Circlo.')} />
        <SettingRow title="About Circlo" description="Circlo · Version 1.0" onClick={() => openInfo('About Circlo', 'A community platform for keeping useful things in circulation.')} />
      </SettingsSection>

      <button type="button" className="settings-logout" onClick={() => navigate('/')}>Log out</button>

      {modal && <SettingsModal modal={modal} draft={draft} setDraft={setDraft} onClose={() => setModal(null)} onSave={saveEditor} onChooseOption={(option) => { if (modal.title === 'Language') setValues((current) => ({ ...current, language: option })); setModal(null) }} />}
    </div>
  )
}

function SettingsSection({ title, children }) {
  return <section className="settings-section"><h2>{title}</h2><div className="settings-list">{children}</div></section>
}

function SettingRow({ title, description, action, destructive, onClick }) {
  return (
    <button type="button" className={'settings-row' + (destructive ? ' is-destructive' : '')} onClick={onClick}>
      <span className="settings-row-copy"><strong>{title}</strong><span>{description}</span></span>
      {action ? <span className="settings-row-action">{action}</span> : <span className="settings-arrow" aria-hidden="true">→</span>}
    </button>
  )
}

function LinkSettingRow({ to, title, description }) {
  return <Link to={to} className="settings-row"><span className="settings-row-copy"><strong>{title}</strong><span>{description}</span></span><span className="settings-arrow" aria-hidden="true">→</span></Link>
}

function SettingsModal({ modal, draft, setDraft, onClose, onSave, onChooseOption }) {
  if (modal.type === 'editor') {
    const labels = { email: 'Email address', phone: 'Phone number', interests: 'Interests', location: 'Location' }
    return <div className="modal-backdrop" role="presentation" onClick={onClose}><form className="settings-modal" onSubmit={onSave} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><ModalHeading title={`Edit ${labels[modal.key]}`} onClose={onClose} /><label className="settings-field"><span>{labels[modal.key]}</span><input className="input" value={draft} onChange={(event) => setDraft(event.target.value)} required type={modal.key === 'email' ? 'email' : 'text'} /></label><ModalActions onClose={onClose} submit="Save Changes" /></form></div>
  }
  if (modal.type === 'password') return <div className="modal-backdrop" role="presentation" onClick={onClose}><form className="settings-modal" onSubmit={(event) => { event.preventDefault(); onClose() }} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><ModalHeading title="Change password" onClose={onClose} /><label className="settings-field"><span>Current password</span><input className="input" type="password" required /></label><label className="settings-field"><span>New password</span><input className="input" type="password" minLength="8" required /></label><ModalActions onClose={onClose} submit="Update Password" /></form></div>
  if (modal.type === 'report') return <div className="modal-backdrop" role="presentation" onClick={onClose}><form className="settings-modal" onSubmit={(event) => { event.preventDefault(); onClose() }} role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><ModalHeading title="Report a problem" onClose={onClose} /><label className="settings-field"><span>What went wrong?</span><textarea className="input" rows="4" required placeholder="Tell us what happened..." /></label><ModalActions onClose={onClose} submit="Send Report" /></form></div>
  if (modal.type === 'delete') return <div className="modal-backdrop" role="presentation" onClick={onClose}><div className="settings-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><ModalHeading title="Delete account" onClose={onClose} /><p className="settings-modal-copy">This permanently removes your account and activity from Circlo. This action cannot be undone.</p><div className="settings-modal-actions"><button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button><button type="button" className="btn settings-danger-button" onClick={onClose}>Delete Account</button></div></div></div>
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><div className="settings-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><ModalHeading title={modal.title} onClose={onClose} /><p className="settings-modal-copy">{modal.description}</p>{modal.options?.map((option) => <button type="button" className="settings-choice" key={option} onClick={() => onChooseOption(option)}>{option}<span>→</span></button>)}</div></div>
}

function ModalHeading({ title, onClose }) {
  return <div className="settings-modal-heading"><h2>{title}</h2><button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">×</button></div>
}

function ModalActions({ onClose, submit }) {
  return <div className="settings-modal-actions"><button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">{submit}</button></div>
}
