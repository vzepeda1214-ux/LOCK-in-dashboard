import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login, register } from '../services/auth';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      loginUser(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleGuest = async () => {
    try {
      const guestEmail = `guest_${Date.now()}@guest.com`;
      const data = await register(guestEmail, 'Guest', 'guest123456');
      loginUser(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError('Could not start guest session');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔒 Lock In</h1>
        <p style={styles.subtitle}>Your study dashboard</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            style={styles.button}
            type="submit"
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Log In
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>or</span>
          <span style={styles.dividerLine}></span>
        </div>

        <button
          style={styles.guestButton}
          onClick={handleGuest}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          👀 Try as Guest
        </button>

        <p style={styles.link}>
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fdf6ff 0%, #f0f4ff 100%)' },
  card: { background: 'white', padding: '2.5rem', borderRadius: '20px', width: '100%', maxWidth: '400px', border: '1px solid #ede9fe', boxShadow: '0 4px 24px rgba(167, 139, 202, 0.2)' },
  title: { color: '#7c3aed', textAlign: 'center', fontSize: '2rem', margin: '0 0 0.5rem', fontFamily: 'Georgia, serif' },
  subtitle: { color: '#a78bca', textAlign: 'center', margin: '0 0 1.5rem', fontSize: '0.95rem' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '10px', border: '1px solid #e8d5f5', background: '#fdf6ff', color: '#5b21b6', fontSize: '1rem', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: '#fff', fontSize: '1rem', cursor: 'pointer', transition: 'transform 0.1s ease' },
  guestButton: { width: '100%', padding: '0.75rem', borderRadius: '10px', border: '2px dashed #d8b4fe', background: 'white', color: '#7c3aed', fontSize: '1rem', cursor: 'pointer', transition: 'transform 0.1s ease', marginBottom: '1rem' },
  divider: { display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0' },
  dividerLine: { flex: 1, height: '1px', background: '#ede9fe' },
  dividerText: { color: '#c4b5d4', fontSize: '0.85rem' },
  error: { color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem' },
  link: { color: '#a78bca', textAlign: 'center', marginTop: '0.5rem', fontSize: '0.9rem' }
};