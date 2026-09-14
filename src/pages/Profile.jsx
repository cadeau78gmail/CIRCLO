import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { myListings, userImpact } from '../data/mockData'

const initialProfile = {
  name: 'Isabelle Cadeau',
  username: 'isabelle',
  location: 'Kigali',
  bio: 'Giving useful things another life.'
}

export default function Profile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(initialProfile)
  const [draft, setDraft] = useState(initialProfile)
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [isPhotoOpen, setIsPhotoOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [errors, setErrors] = useState({})
  const photoInputRef = useRef(null)
  const editPhotoInputRef = useRef(null)

  function choosePhoto(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const nextPreview = URL.createObjectURL(file)
    setPhoto(file)
    setPhotoPreview(nextPreview)
    event.target.value = ''
  }

  function savePhoto() {
    if (photoPreview) setProfile((current) => ({ ...current, photo: photoPreview }))
    setIsPhotoOpen(false)
  }

  function openEdit() {
    setDraft(profile)
    setErrors({})
    setIsEditOpen(true)
  }

  function saveProfile(event) {
    event.preventDefault()
    const nextErrors = {}
    if (!draft.name.trim()) nextErrors.name = 'Enter your full name.'
    if (!draft.username.trim()) nextErrors.username = 'Enter a username.'
    if (!draft.location.trim()) nextErrors.location = 'Enter your location.'
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setProfile({ ...draft, username: draft.username.replace(/^@/, ''), photo: photoPreview || profile.photo })
    setIsEditOpen(false)
  }

  return (
    <div className="profile-page">
      <div className="profile-header profile-reveal">
        <button type="button" className="profile-avatar-button" onClick={() => setIsPhotoOpen(true)} aria-label="Change profile picture">
          <Avatar profile={profile} />
          <span className="profile-camera" aria-hidden="true"><CameraIcon /></span>
        </button>
        <div className="profile-identity">
          <p className="profile-eyebrow">Your profile</p>
          <h1>{profile.name}</h1>
          <p className="profile-username">@{profile.username.replace(/^@/, '')}</p>
          <p className="profile-location">{profile.location}</p>
          <p className="profile-bio">{profile.bio}</p>
        </div>
        <button type="button" className="btn btn-secondary profile-edit-button" onClick={openEdit}>Edit Profile</button>
      </div>

      <section className="profile-section profile-reveal profile-delay-1" aria-labelledby="activity-title">
        <div className="profile-section-heading">
          <div>
            <p className="profile-eyebrow">Activity</p>
            <h2 id="activity-title">Your activity</h2>
          </div>
        </div>
        <div className="profile-stats">
          <ProfileStat value={myListings.length} label="Items Listed" />
          <ProfileStat value={userImpact.itemsReused} label="Items Circloed" />
          <ProfileStat value={3} label="Items Saved" />
          <ProfileStat value={myListings.filter((item) => item.status === 'Completed').length} label="Items Completed" />
        </div>
      </section>

      <section className="profile-section profile-reveal profile-delay-2" aria-labelledby="my-reloop-title">
        <div className="profile-section-heading">
          <div>
            <p className="profile-eyebrow">Keep things moving</p>
            <h2 id="my-reloop-title">My Circlo</h2>
          </div>
        </div>
        <div className="profile-links">
          <ProfileLink to="/app/my-reloop" icon={<ListingIcon />} title="My Listings" description="Items you've posted" />
          <ProfileLink to="/app/my-reloop" icon={<RequestIcon />} title="My Requests" description="Requests you've made" />
          <ProfileLink to="/app/saved" icon={<SavedIcon />} title="Saved Items" description="Items you've saved" />
          <ProfileLink to="/app/my-reloop" icon={<CheckIcon />} title="Completed" description="Completed Circlo activities" />
        </div>
      </section>

      <section className="profile-impact profile-reveal profile-delay-3" aria-labelledby="impact-title">
        <div>
          <p className="profile-eyebrow">Making a difference</p>
          <h2 id="impact-title">Your Circlo Impact</h2>
          <p className="profile-impact-copy">Your choices are helping useful things stay in circulation.</p>
        </div>
        <div className="profile-impact-stats">
          <ProfileStat value={userImpact.itemsReused} label="Items kept in circulation" />
          <ProfileStat value={userImpact.itemsExchanged} label="Items exchanged" />
          <ProfileStat value={userImpact.itemsDonated} label="Items donated" />
        </div>
      </section>

      <section className="profile-section profile-settings" aria-labelledby="settings-title">
        <div className="profile-section-heading">
          <div>
            <p className="profile-eyebrow">Account</p>
            <h2 id="settings-title">Settings</h2>
          </div>
        </div>
        <div className="profile-links">
          <ProfileLink to="/app/settings" icon={<BellIcon />} title="Notifications" description="Manage your alerts" />
          <ProfileLink to="/app/settings" icon={<LockIcon />} title="Privacy & Security" description="Control your account privacy" />
          <ProfileLink to="/app/help" icon={<HelpIcon />} title="Help & Support" description="Find answers and contact support" />
        </div>
        <button type="button" className="profile-logout" onClick={() => navigate('/')}>Log out</button>
      </section>

      <input ref={photoInputRef} type="file" accept="image/*" onChange={choosePhoto} hidden />

      {isPhotoOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsPhotoOpen(false)}>
          <div className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="photo-title" onClick={(event) => event.stopPropagation()}>
            <div className="profile-modal-heading">
              <div><p className="profile-eyebrow">Profile picture</p><h2 id="photo-title">Change your photo</h2></div>
              <button type="button" className="modal-close" onClick={() => setIsPhotoOpen(false)} aria-label="Close photo dialog">×</button>
            </div>
            <div className="profile-photo-preview"><Avatar profile={{ ...profile, photo: photoPreview || profile.photo }} /></div>
            <button type="button" className="btn btn-secondary profile-upload-button" onClick={() => photoInputRef.current?.click()}>Choose Photo</button>
            <div className="profile-modal-actions"><button type="button" className="btn btn-ghost" onClick={() => setIsPhotoOpen(false)}>Cancel</button><button type="button" className="btn btn-primary" onClick={savePhoto} disabled={!photo}>Save Photo</button></div>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setIsEditOpen(false)}>
          <form className="profile-modal profile-edit-form" onSubmit={saveProfile} role="dialog" aria-modal="true" aria-labelledby="edit-profile-title" onClick={(event) => event.stopPropagation()}>
            <div className="profile-modal-heading"><div><p className="profile-eyebrow">Profile details</p><h2 id="edit-profile-title">Edit Profile</h2></div><button type="button" className="modal-close" onClick={() => setIsEditOpen(false)} aria-label="Close edit profile dialog">×</button></div>
            <div className="profile-edit-photo-row"><Avatar profile={{ ...profile, photo: profile.photo }} /><button type="button" className="btn btn-secondary btn-sm" onClick={() => editPhotoInputRef.current?.click()}>Change photo</button><input ref={editPhotoInputRef} type="file" accept="image/*" onChange={choosePhoto} hidden /></div>
            <ProfileField label="Full name" value={draft.name} error={errors.name} onChange={(value) => setDraft({ ...draft, name: value })} />
            <ProfileField label="Username" value={draft.username} error={errors.username} onChange={(value) => setDraft({ ...draft, username: value })} prefix="@" />
            <ProfileField label="Location" value={draft.location} error={errors.location} onChange={(value) => setDraft({ ...draft, location: value })} />
            <label className="profile-field"><span>Bio</span><textarea className="input" rows="3" value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} /></label>
            <div className="profile-modal-actions"><button type="button" className="btn btn-ghost" onClick={() => setIsEditOpen(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save Changes</button></div>
          </form>
        </div>
      )}
    </div>
  )
}

function Avatar({ profile }) {
  return profile.photo ? <img className="profile-avatar" src={profile.photo} alt={`${profile.name} profile`} /> : <span className="profile-avatar profile-avatar-initials">{profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
}

function ProfileStat({ value, label }) {
  return <div className="profile-stat"><strong>{value.toLocaleString()}</strong><span>{label}</span></div>
}

function ProfileLink({ to, icon, title, description }) {
  return <Link to={to} className="profile-link"><span className="profile-link-icon">{icon}</span><span className="profile-link-copy"><strong>{title}</strong><span>{description}</span></span><span className="profile-arrow" aria-hidden="true">→</span></Link>
}

function ProfileField({ label, value, error, onChange, prefix }) {
  return <label className="profile-field"><span>{label}</span><div className="profile-input-wrap">{prefix && <span>{prefix}</span>}<input className="input" value={value} onChange={(event) => onChange(event.target.value)} /></div>{error && <small>{error}</small>}</label>
}

function Icon({ children }) { return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">{children}</svg> }
function CameraIcon() { return <Icon><path d="M5 8.5h3l1.25-2h5.5l1.25 2H19a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 19 18.5H5A1.5 1.5 0 0 1 3.5 17V10A1.5 1.5 0 0 1 5 8.5Z M12 15.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></Icon> }
function ListingIcon() { return <Icon><path d="M4 7.5h16M6 7.5v10.75c0 .69.56 1.25 1.25 1.25h9.5c.69 0 1.25-.56 1.25-1.25V7.5M5.25 4.5h13.5c.69 0 1.25.56 1.25 1.25v1.75H4V5.75c0-.69.56-1.25 1.25-1.25Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></Icon> }
function RequestIcon() { return <Icon><path d="M5 5.5h14v13H5zM8 9h8M8 12h6M8 15h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></Icon> }
function SavedIcon() { return <Icon><path d="m12 4 1.8 4.1 4.45.4-3.37 2.95 1 4.3L12 13.5l-3.88 2.25 1-4.3L5.75 8.5l4.45-.4L12 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></Icon> }
function CheckIcon() { return <Icon><path d="m5 12 4.2 4.2L19 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></Icon> }
function BellIcon() { return <Icon><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></Icon> }
function LockIcon() { return <Icon><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" /><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></Icon> }
function HelpIcon() { return <Icon><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" /><path d="M9.8 9.5a2.3 2.3 0 1 1 3.7 1.8c-.9.7-1.5 1-1.5 2.2M12 16.5h.01" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></Icon> }
