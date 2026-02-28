import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * YOCO Payment Button
 *
 * - Initialises the YOCO Popup SDK using the VITE_YOCO_PUBLIC_KEY env var.
 * - On click, opens the YOCO popup (never on page load).
 * - On popup success, POSTs the token to /.netlify/functions/verify-payment.
 * - On server verification success, sets lb_payment_verified in sessionStorage
 *   and navigates to /assessment.
 * - On failure or cancel, shows inline error or resets button — no alert() calls.
 *
 * @param {{ email: string }} props - Optional partner email from landing page form.
 */
export default function PaymentButton({ email }) {
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const yocoRef = useRef(null)
  const navigate = useNavigate()

  // Initialise YOCO SDK once after the page loads.
  // The script tag in index.html loads the SDK; we wait for it to be available.
  useEffect(() => {
    const init = () => {
      if (window.YocoSDK) {
        yocoRef.current = new window.YocoSDK({
          publicKey: import.meta.env.VITE_YOCO_PUBLIC_KEY,
        })
      }
    }

    if (window.YocoSDK) {
      init()
    } else {
      // SDK not yet available — listen for it to load
      const yocoScript = document.querySelector('script[src*="yoco"]')
      if (yocoScript) {
        yocoScript.addEventListener('load', init)
        return () => yocoScript.removeEventListener('load', init)
      }
    }
  }, [])

  const handleClick = () => {
    // Guard: SDK must be loaded
    if (!yocoRef.current) {
      setStatus('error')
      setErrorMessage('Payment system is not available. Please refresh the page and try again.')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    yocoRef.current.showPopup({
      amountInCents: 60000, // R600 in cents
      currency: 'ZAR',
      name: 'Love Better',
      description: 'Love Better Relationship Assessment',
      callback: async (result) => {
        if (result.error) {
          // Distinguish between a deliberate cancel and a payment failure.
          // YOCO signals cancel via an error object; payment failures contain
          // specific messages about the card or transaction.
          const errStr = JSON.stringify(result.error).toLowerCase()
          const isCancel =
            errStr.includes('cancel') ||
            errStr.includes('close') ||
            errStr.includes('dismiss') ||
            !result.error.message

          if (isCancel) {
            // User dismissed popup — silently reset, stay on landing page
            setStatus('idle')
          } else {
            setStatus('error')
            setErrorMessage(
              'Payment unsuccessful. Please try a different card or contact your bank.',
            )
          }
          return
        }

        // Payment token received — verify server-side before unlocking
        try {
          const response = await fetch('/.netlify/functions/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: result.id,
              email: email || '',
            }),
          })

          if (response.ok) {
            // Server confirmed payment — set session token and enter assessment
            sessionStorage.setItem('lb_payment_verified', 'true')
            navigate('/assessment')
          } else {
            setStatus('error')
            setErrorMessage(
              'Payment verification failed. Please contact support if you were charged.',
            )
          }
        } catch {
          setStatus('error')
          setErrorMessage('Something went wrong. Please refresh and try again.')
        }
      },
    })
  }

  return (
    <div className="payment-btn-wrapper">
      <button
        className="payment-btn"
        onClick={handleClick}
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
        aria-describedby={errorMessage ? 'payment-error' : undefined}
      >
        {status === 'loading' && <span className="spinner" aria-hidden="true" />}
        {status === 'loading' ? 'Processing…' : 'Begin Assessment — R600'}
      </button>

      {status === 'error' && errorMessage && (
        <p id="payment-error" className="payment-error" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
