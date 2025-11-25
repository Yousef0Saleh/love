'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store session in localStorage
        localStorage.setItem('surpriseSession', JSON.stringify({
          surpriseId: data.surpriseId,
          timestamp: Date.now()
        }));
        router.push(`/surprise/${data.surpriseId}`);
      } else {
        setError(data.error || 'كلمة السر غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ، حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card english-cursive">
        <h1 className="title">💌 Enter Password</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className="input"
            placeholder="Enter your secret"
            value={password}
            style={{
              textAlign: 'center'
            }}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          {error && <div className="error">{error}</div>}

          {loading ? (
            <div className="spinner"></div>
          ) : (
            <button type="submit" className="button" style={{ marginTop: '30px' }}>
              Enter 💖
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
