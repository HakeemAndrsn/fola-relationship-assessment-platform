import { useState } from 'react'
import PaymentButton from '../components/PaymentButton'
import { DIMENSIONS } from '../data/dimensions'

export default function Landing() {
  const [email, setEmail] = useState('')

  return (
    <div className="landing">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="landing-hero">
        <p className="landing-wordmark">Love Better</p>
        <h1>Understand your relationship.<br />Grow it — together.</h1>
        <p className="hero-sub">
          The Love Better Assessment helps couples discover the real strengths
          and growth areas in their relationship — across eight dimensions that
          matter most.
        </p>
      </section>

      {/* ── About ────────────────────────────────────────────────── */}
      <section className="landing-about">
        <div className="container--narrow">
          <h2>What is the Love Better Assessment?</h2>
          <p>
            Most couples have a sense that something could be better — but
            struggle to name exactly what, or where to start. The Love Better
            Assessment gives you a clear, honest, and compassionate picture of
            your relationship across eight key dimensions.
          </p>
          <br />
          <p>
            In about 20 minutes, you and your partner will answer 40 questions
            together and receive a personalised report — with scores, insights,
            and practical guidance for each dimension. No jargon. No
            judgement. Just clarity.
          </p>
        </div>
      </section>

      {/* ── Eight Dimensions ─────────────────────────────────────── */}
      <section className="landing-dimensions">
        <div className="container">
          <h2>Eight dimensions. One clear picture.</h2>
          <p className="section-intro">
            Together, these dimensions give a comprehensive view of your
            relationship's health and depth.
          </p>
          <div className="dimensions-grid">
            {DIMENSIONS.map((dim, i) => (
              <div key={dim.id} className="dimension-card">
                <p className="dim-number">Dimension {i + 1}</p>
                <h3>{dim.title}</h3>
                <p>{dim.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Payment ────────────────────────────────────────── */}
      <section className="landing-cta" id="begin">
        <div className="container--narrow">
          <span className="cta-badge">R600 · One-time · For couples</span>
          <h2>Ready to see your relationship clearly?</h2>
          <p className="cta-sub">
            One secure payment unlocks the full assessment and your
            personalised report — available immediately after completion.
          </p>

          {/* Optional email — used for receipt and audit log */}
          <div className="email-field">
            <label htmlFor="partner-email">
              Email address <span style={{ color: 'var(--text-light)' }}>(optional — for your receipt)</span>
            </label>
            <input
              id="partner-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <PaymentButton email={email} />

          <p className="cta-guarantee" style={{ marginTop: 20 }}>
            Secured by YOCO · No card details stored
          </p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Love Better. All rights reserved.</p>
      </footer>
    </div>
  )
}
