import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'

export default function Signup() {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  return (
    <AuthShell
      variant="signup"
      title="Create your account"
      sub="Join Circlo and start giving things another life."
      footer={
        <>
          Already have an account? <Link to="/login" style={{ color: 'var(--green-deep)', fontWeight: 600 }}>Log in</Link>
        </>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/verify-otp')
        }}
      >
        <div className="field">
          <label>Full name</label>
          <input className="input" placeholder="Isabelle K." />
        </div>
        <div className="field">
          <label>Email</label>
          <input className="input" type="email" placeholder="you@example.com" />
        </div>
        <div className="field">
          <label>Password</label>
          <div className="password-field">
            <input
              className="input"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="••••••••"
            />
            <button
              className="password-toggle"
              type="button"
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              title={passwordVisible ? 'Hide password' : 'Show password'}
              onClick={() => setPasswordVisible((visible) => !visible)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                <circle cx="12" cy="12" r="2.5" />
                {!passwordVisible && <path d="m4 4 16 16" />}
              </svg>
            </button>
          </div>
        </div>
        <div className="field">
          <label>Confirm password</label>
          <div className="password-field">
            <input
              className="input"
              type={confirmPasswordVisible ? 'text' : 'password'}
              placeholder="••••••••"
            />
            <button
              className="password-toggle"
              type="button"
              aria-label={confirmPasswordVisible ? 'Hide confirm password' : 'Show confirm password'}
              title={confirmPasswordVisible ? 'Hide confirm password' : 'Show confirm password'}
              onClick={() => setConfirmPasswordVisible((visible) => !visible)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
                <circle cx="12" cy="12" r="2.5" />
                {!confirmPasswordVisible && <path d="m4 4 16 16" />}
              </svg>
            </button>
          </div>
        </div>
        <div className="field">
          <label>Location</label>
          <input className="input" placeholder="e.g. Kigali" />
        </div>
        <button className="btn btn-primary btn-block" type="submit">Continue</button>
      </form>
    </AuthShell>
  )
}
