import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, actionMeta } from '../data/mockData'

const conditions = ['New', 'Like New', 'Good', 'Fair', 'Needs Repair']
const totalSteps = 6

export default function PostItem() {
  const [step, setStep] = useState(1)
  const [action, setAction] = useState('')
  const [uploadedPhoto, setUploadedPhoto] = useState(null)
  const [showUploadConfirmation, setShowUploadConfirmation] = useState(false)
  const photoInputRef = useRef(null)
  const navigate = useNavigate()

  function next() {
    if (step < totalSteps) setStep(step + 1)
    else navigate('/app/my-reloop')
  }
  function back() {
    if (step > 1) setStep(step - 1)
  }

  function handlePhotoUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setUploadedPhoto({ name: file.name, url: URL.createObjectURL(file) })
    setShowUploadConfirmation(true)
    event.target.value = ''
  }

  return (
    <div className="post-item-page">
      <div className="page-header post-item-header">
        <h1 className="page-title">Post an Item</h1>
        <p className="page-sub">Step {step} of {totalSteps}</p>
        <div className="post-item-progress">
          <div className="post-item-progress-fill" style={{ width: `${(step / totalSteps) * 100}%` }} />
        </div>
      </div>

      <div className="card post-item-card">
        {step === 1 && (
          <div className="post-item-step">
            <h2>Tell us about your item</h2>
            <div className="field">
              <label>Item name</label>
              <input className="input" placeholder="e.g. Wooden Chair" />
            </div>
            <div className="field">
              <label>Category</label>
              <select className="input">
                {categories.map((c) => (
                  <option key={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Description</label>
              <textarea className="input" rows={4} placeholder="Describe your item..." />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="post-item-step">
            <h2>Add photos</h2>
            <div
              className="card post-item-photo-area"
            >
              {uploadedPhoto ? (
                <img src={uploadedPhoto.url} alt={uploadedPhoto.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: 'var(--gray)' }}>Add photo</span>
              )}
            </div>
            <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
            <button type="button" className="btn btn-secondary post-item-upload" onClick={() => photoInputRef.current?.click()}>
              Upload Photo
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="post-item-step">
            <h2>Condition</h2>
            <div className="row gap-8" style={{ flexWrap: 'wrap' }}>
              {conditions.map((c) => (
                <button key={c} type="button" className="pill-filter">
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="post-item-step">
            <h2>What would you like to do?</h2>
            <div className="grid grid-2" style={{ gap: 12 }}>
              {Object.entries(actionMeta).map(([key, meta]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAction(key)}
                  className="card"
                  style={{
                    padding: 18,
                    textAlign: 'left',
                    border: action === key ? '2px solid var(--green-deep)' : '1px solid var(--border)',
                    background: action === key ? 'var(--green-soft)' : '#fff'
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600 }}>{meta.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="post-item-step">
            <h2>Location</h2>
            <div className="field">
              <label>District</label>
              <input className="input" placeholder="e.g. Gasabo" />
            </div>
            <div className="field">
              <label>Sector</label>
              <input className="input" placeholder="e.g. Kimironko" />
            </div>
            <div className="field">
              <label>General location</label>
              <input className="input" placeholder="e.g. Near Kimironko market" />
            </div>
            <p className="muted">We only show a general area — never your exact address.</p>
          </div>
        )}

        {step === 6 && (
          <div className="post-item-step">
            <h2>Almost done</h2>
            {action === 'exchange' && (
              <div className="field">
                <label>What would you like in exchange?</label>
                <input className="input" placeholder="e.g. Rain jacket, boots..." />
              </div>
            )}
            {(action === 'sell' || action === 'recycle') && (
              <div className="field">
                <label>{action === 'recycle' ? 'Cost in RWF' : 'Price in RWF'}</label>
                <input className="input" placeholder={action === 'recycle' ? 'e.g. 2,000' : 'e.g. 15,000'} />
              </div>
            )}
            {action === 'donate' && (
              <div className="field">
                <label>Additional donation information</label>
                <textarea className="input" rows={3} placeholder="Anything the recipient should know..." />
              </div>
            )}
            {action === 'recycle' && (
              <div className="field">
                <label>Add a small description</label>
                <textarea className="input" rows={3} placeholder="Condition, hazards, or handling notes..." />
              </div>
            )}
            {!action && <p className="muted">No extra details needed for this action — you're ready to publish.</p>}
          </div>
        )}

        <div className="post-item-actions">
          <button className="btn btn-ghost" onClick={back} disabled={step === 1} style={{ visibility: step === 1 ? 'hidden' : 'visible' }}>
            Back
          </button>
          <button className="btn btn-primary" onClick={next}>
            {step === totalSteps ? 'Publish Item' : 'Continue'}
          </button>
        </div>
      </div>

      {showUploadConfirmation && (
        <div className="modal-backdrop" role="presentation" onClick={() => setShowUploadConfirmation(false)}>
          <div className="exchange-modal" role="dialog" aria-modal="true" aria-labelledby="photo-upload-title" onClick={(event) => event.stopPropagation()}>
            <h2 id="photo-upload-title" style={{ fontSize: 20, margin: '0 0 8px' }}>Photo uploaded</h2>
            <p className="muted" style={{ margin: '0 0 20px' }}>Your photo has been uploaded successfully.</p>
            <button type="button" className="btn btn-primary" onClick={() => setShowUploadConfirmation(false)}>Done</button>
          </div>
        </div>
      )}
    </div>
  )
}
