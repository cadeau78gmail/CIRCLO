import { Link } from 'react-router-dom'

export default function AuthShell({ title, sub, children, footer, variant = '' }) {
  return (
    <div
      className={`auth-shell${variant ? ` auth-${variant}` : ''}`}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-alt)',
        padding: 20
      }}
    >
      <div
        className="card auth-card"
        style={{
          width: 820,
          maxWidth: '100%',
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          minHeight: 480
        }}
      >
        <div
          style={{
            flex: '0 0 42%',
            background: 'var(--green-deep)',
            color: 'var(--cream)',
            padding: '22px 36px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          className="auth-hero"
        >
          <Link to="/" className="auth-brand row gap-8">
            {variant === 'signup' || variant === 'login' || variant === 'verify' || variant === 'preferences' ? (
              <img src="/hero-images/cccccc.png" alt="Circlo" style={{ width: 180, height: 'auto' }} />
            ) : (
              <img src="/hero-images/best.png" alt="Circlo Rwanda" style={{ width: 180, height: 'auto', filter: 'brightness(0) invert(1)' }} />
            )}
          </Link>
          {(variant === 'signup' || variant === 'login' || variant === 'verify' || variant === 'preferences') && (
            <div className="auth-hero-motif" aria-hidden="true">
              <img
                className="auth-hero-motif-image"
                src={variant === 'signup' ? '/hero-images/circlo.png' : variant === 'login' ? '/hero-images/illustration.png' : variant === 'verify' ? '/hero-images/recycle.png' : '/hero-images/choice.png'}
                alt=""
              />
            </div>
          )}
          <h2 className="auth-hero-title" style={{ fontSize: 30, lineHeight: 1.15, color: 'var(--cream)', fontWeight: 700 }}>
            {variant === 'login' ? 'Find it a new Home' : variant === 'verify' ? 'Keep useful things moving' : variant === 'preferences' ? 'Make every Choice count' : 'Give it another life.'}
          </h2>
          <p className="auth-hero-copy" style={{ color: 'rgba(247,242,223,0.7)', fontSize: 13, lineHeight: 1.6, maxWidth: 280, margin: 0 }}>
            Give, exchange, donate, sell, and reuse. Together, we keep useful things in circulation.
          </p>
        </div>

        <div className="auth-content" style={{ flex: 1, padding: 36 }}>
          <h1 style={{ fontSize: 24, marginBottom: 4, fontWeight: 700 }}>{title}</h1>
          {sub && <p className="muted" style={{ marginBottom: 22 }}>{sub}</p>}
          {children}
          {footer && <p className="muted" style={{ marginTop: 16, textAlign: 'center' }}>{footer}</p>}
        </div>
      </div>
    </div>
  )
}
