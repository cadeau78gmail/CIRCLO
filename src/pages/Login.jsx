import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'

export default function Login() {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <AuthShell
      variant="login"
      title="Welcome back"
      sub="Log in to continue giving things another life."
      footer={
        <>
          New here? <Link to="/signup" style={{ color: 'var(--green-deep)', fontWeight: 600 }}>Create an account</Link>
        </>
      }
    >
      <div className="login-social">
        <button className="login-google" type="button">
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
        <div className="login-divider" role="separator"><span>OR</span></div>
      </div>
      <form className="login-form"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/app/home')
        }}
      >
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
        <button className="btn btn-primary btn-block" type="submit">Log in</button>
      </form>
    </AuthShell>
  )
}

function GoogleIcon() {
  return (
    <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M21.35 12.27c0-.78-.07-1.54-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.15c1.85-1.7 2.9-4.2 2.9-7.42Z" />
      <path fill="#34A853" d="M12 21.75c2.65 0 4.87-.87 6.49-2.36l-3.15-2.45c-.87.58-1.98.92-3.34.92-2.56 0-4.73-1.73-5.51-4.06H3.23v2.53A9.8 9.8 0 0 0 12 21.75Z" />
      <path fill="#FBBC05" d="M6.49 13.8A5.9 5.9 0 0 1 6.18 12c0-.63.11-1.24.31-1.8V7.67H3.23A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06.98 4.33l3.26-2.53Z" />
      <path fill="#EA4335" d="M12 6.14c1.44 0 2.73.5 3.75 1.49l2.81-2.81C16.86 3.23 14.65 2.25 12 2.25a9.8 9.8 0 0 0-8.77 5.42l3.26 2.53c.78-2.33 2.95-4.06 5.51-4.06Z" />
    </svg>
  )
}
