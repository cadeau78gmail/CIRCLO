import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'

const OTP_LENGTH = 6
const RESEND_COOLDOWN_SECONDS = 30

export default function OtpVerification() {
  const navigate = useNavigate()
  const inputRefs = useRef([])
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
  const [error, setError] = useState('')
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (!cooldown) return undefined

    const timer = window.setInterval(() => {
      setCooldown((seconds) => Math.max(seconds - 1, 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [cooldown])

  function focusInput(index) {
    inputRefs.current[index]?.focus()
  }

  function updateDigit(index, value) {
    const digit = value.replace(/\D/g, '').slice(-1)
    const nextDigits = [...digits]
    nextDigits[index] = digit
    setDigits(nextDigits)
    setError('')

    if (digit && index < OTP_LENGTH - 1) {
      focusInput(index + 1)
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1)
    }
  }

  function handlePaste(event) {
    event.preventDefault()
    const pastedDigits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pastedDigits) return

    const nextDigits = Array(OTP_LENGTH).fill('')
    pastedDigits.split('').forEach((digit, index) => {
      nextDigits[index] = digit
    })
    setDigits(nextDigits)
    setError('')
    focusInput(Math.min(pastedDigits.length, OTP_LENGTH - 1))
  }

  function verifyCode(event) {
    event.preventDefault()
    if (digits.some((digit) => !digit)) {
      setError('Enter all 6 digits to continue.')
      focusInput(Math.max(0, digits.findIndex((digit) => !digit)))
      return
    }

    navigate('/preferences')
  }

  function resendCode() {
    if (cooldown) return
    setDigits(Array(OTP_LENGTH).fill(''))
    setError('')
    setCooldown(RESEND_COOLDOWN_SECONDS)
    focusInput(0)
  }

  return (
    <AuthShell variant="verify" title="Verify your account" sub="We sent a verification code to your email.">
      <div className="otp-content">
        <form onSubmit={verifyCode}>
          <div className="otp-inputs" onPaste={handlePaste}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(element) => { inputRefs.current[index] = element }}
                className="otp-input"
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={digit}
                aria-label={`Verification digit ${index + 1}`}
                onChange={(event) => updateDigit(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
              />
            ))}
          </div>

          {error && <p className="otp-error" role="alert">{error}</p>}

          <button className="btn btn-primary btn-block" type="submit">
            Verify &amp; Continue
          </button>
        </form>

        <p className="muted" style={{ margin: '16px 0 0', textAlign: 'center', fontSize: 13 }}>
          Didn&apos;t receive the code?
        </p>
        <button className="otp-resend" type="button" onClick={resendCode} disabled={cooldown > 0}>
          {cooldown ? `Resend code in ${cooldown}s` : 'Resend code'}
        </button>
        <Link className="otp-back" to="/signup">← Back to Create Account</Link>
      </div>
    </AuthShell>
  )
}