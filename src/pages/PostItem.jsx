
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories, actionMeta } from '../data/mockData'
import { createListing } from '../api'

const conditions = ['New', 'Like New', 'Good', 'Fair', 'Needs Repair']
const totalSteps = 6

export default function PostItem() {
  const [step, setStep] = useState(1)
  const [action, setAction] = useState('')

  const [name, setName] = useState('')
  const [category, setCategory] = useState(categories[0].name)
  const [description, setDescription] = useState('')
  const [condition, setCondition] = useState('Good')
  const [district, setDistrict] = useState('')
  const [sector, setSector] = useState('')
  const [generalLocation, setGeneralLocation] = useState('')
  const [price, setPrice] = useState('')
  const [extraInfo, setExtraInfo] = useState('')
  const [exchangeFor, setExchangeFor] = useState('')
  const [saving, setSaving] = useState(false)

  const [uploadedPhoto, setUploadedPhoto] = useState(null)
  const [showUploadConfirmation, setShowUploadConfirmation] = useState(false)

  const photoInputRef = useRef(null)
  const navigate = useNavigate()

  function next() {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  function back() {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  function handlePhotoUpload(event) {
    const file = event.target.files?.[0]

    if (!file) return

    setUploadedPhoto({
      name: file.name,
      url: URL.createObjectURL(file)
    })

    setShowUploadConfirmation(true)
    event.target.value = ''
  }

  async function publishItem() {
    if (!name.trim()) {
      alert('Please enter your item name.')
      setStep(1)
      return
    }

    if (!action) {
      alert('Please select what you want to do with your item.')
      setStep(4)
      return
    }

    const listing = {
      name,
      category,
      description,
      desc: description,
      condition,
      action,
      location: [district, sector, generalLocation]
        .filter(Boolean)
        .join(', '),
      price,
      extraInfo,
      exchangeFor
    }

    try {
      setSaving(true)

      await createListing(listing)

      alert('Your item has been published!')
      navigate('/app/explore')
    } catch (error) {
      console.error(error)
      alert('Could not publish your item. Please check that your backend server is running.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="post-item-page">
      <div className="page-header post-item-header">
        <h1 className="page-title">Post an Item</h1>
        <p className="page-sub">Step {step} of {totalSteps}</p>

        <div className="post-item-progress">
          <div
            className="post-item-progress-fill"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="card post-item-card">

        {step === 1 && (
          <div className="post-item-step">
            <h2>Tell us about your item</h2>

            <div className="field">
              <label>Item name</label>
              <input
                className="input"
                placeholder="e.g. Wooden Chair"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="field">
              <label>Category</label>
              <select
                className="input"
                value={category}
                onChange={event => setCategory(event.target.value)}
              >
                {categories.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label>Description</label>
              <textarea
                className="input"
                rows={4}
                placeholder="Describe your item..."
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="post-item-step">
            <h2>Add photos</h2>

            <div className="card post-item-photo-area">
              {uploadedPhoto ? (
                <img
                  src={uploadedPhoto.url}
                  alt={uploadedPhoto.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <span style={{ color: 'var(--gray)' }}>
                  Add photo
                </span>
              )}
            </div>

            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: 'none' }}
            />

            <button
              type="button"
              className="btn btn-secondary post-item-upload"
              onClick={() => photoInputRef.current?.click()}
            >
              Upload Photo
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="post-item-step">
            <h2>Condition</h2>

            <div className="row gap-8" style={{ flexWrap: 'wrap' }}>
              {conditions.map(c => (
                <button
                  key={c}
                  type="button"
                  className="pill-filter"
                  onClick={() => setCondition(c)}
                  style={{
                    border: condition === c
                      ? '2px solid var(--green-deep)'
                      : '1px solid var(--border)'
                  }}
                >
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
                    border: action === key
                      ? '2px solid var(--green-deep)'
                      : '1px solid var(--border)',
                    background: action === key
                      ? 'var(--green-soft)'
                      : '#fff'
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600 }}>
                    {meta.label}
                  </p>
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
              <input
                className="input"
                placeholder="e.g. Gasabo"
                value={district}
                onChange={event => setDistrict(event.target.value)}
              />
            </div>

            <div className="field">
              <label>Sector</label>
              <input
                className="input"
                placeholder="e.g. Kimironko"
                value={sector}
                onChange={event => setSector(event.target.value)}
              />
            </div>

            <div className="field">
              <label>General location</label>
              <input
                className="input"
                placeholder="e.g. Near Kimironko market"
                value={generalLocation}
                onChange={event => setGeneralLocation(event.target.value)}
              />
            </div>

            <p className="muted">
              We only show a general area — never your exact address.
            </p>
          </div>
        )}

        {step === 6 && (
          <div className="post-item-step">
            <h2>Almost done</h2>

            {action === 'exchange' && (
              <div className="field">
                <label>What would you like in exchange?</label>
                <input
                  className="input"
                  placeholder="e.g. Rain jacket, boots..."
                  value={exchangeFor}
                  onChange={event => setExchangeFor(event.target.value)}
                />
              </div>
            )}

            {(action === 'sell' || action === 'recycle') && (
              <div className="field">
                <label>
                  {action === 'recycle' ? 'Cost in RWF' : 'Price in RWF'}
                </label>
                <input
                  className="input"
                  placeholder={action === 'recycle' ? 'e.g. 2,000' : 'e.g. 15,000'}
                  value={price}
                  onChange={event => setPrice(event.target.value)}
                />
              </div>
            )}

            {(action === 'donate' || action === 'recycle') && (
              <div className="field">
                <label>
                  {action === 'donate'
                    ? 'Additional donation information'
                    : 'Additional information'}
                </label>
                <textarea
                  className="input"
                  rows={3}
                  placeholder="Add any important information..."
                  value={extraInfo}
                  onChange={event => setExtraInfo(event.target.value)}
                />
              </div>
            )}
          </div>
        )}

        <div className="post-item-actions">
          <button
            className="btn btn-ghost"
            onClick={back}
            disabled={step === 1 || saving}
            style={{
              visibility: step === 1 ? 'hidden' : 'visible'
            }}
          >
            Back
          </button>

          {step < totalSteps ? (
            <button
              className="btn btn-primary"
              onClick={next}
            >
              Continue
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={publishItem}
              disabled={saving}
            >
              {saving ? 'Publishing...' : 'Publish Item'}
            </button>
          )}
        </div>
      </div>

      {showUploadConfirmation && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setShowUploadConfirmation(false)}
        >
          <div
            className="exchange-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-upload-title"
            onClick={event => event.stopPropagation()}
          >
            <h2
              id="photo-upload-title"
              style={{ fontSize: 20, margin: '0 0 8px' }}
            >
              Photo uploaded
            </h2>

            <p className="muted" style={{ margin: '0 0 20px' }}>
              Your photo has been uploaded successfully.
            </p>

            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setShowUploadConfirmation(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
