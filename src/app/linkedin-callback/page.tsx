'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function CallbackContent() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const authCode = searchParams.get('code');
    if (authCode) {
      setCode(authCode);
    }
  }, [searchParams]);

  const copyToClipboard = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem',
      background: '#f9f5f0'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#2d1810', marginBottom: '1rem' }}>LinkedIn Authorization</h1>
        {code ? (
          <>
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              Authorization code received. Copy it below and send it to nanobot:
            </p>
            <div style={{
              background: '#f0f0f0',
              padding: '1rem',
              borderRadius: '8px',
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              marginBottom: '1rem',
              color: '#333'
            }}>
              {code}
            </div>
            <button
              onClick={copyToClipboard}
              style={{
                background: copied ? '#4CAF50' : '#8B4513',
                color: 'white',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {copied ? '✓ Copied!' : 'Copy Code'}
            </button>
          </>
        ) : (
          <p style={{ color: '#666' }}>Waiting for authorization code...</p>
        )}
      </div>
    </div>
  );
}

export default function LinkedInCallback() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        color: '#666'
      }}>
        Loading...
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
