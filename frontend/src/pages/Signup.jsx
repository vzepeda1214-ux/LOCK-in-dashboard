import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/auth';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register(email, username, password);
      loginUser(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError('Could not create account. Email may already exist.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🔒 Lock In</h1>
        <p style={styles.subtitle}>Create your account</p>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
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
          <button style={styles.button} type="submit">Create Account</button>
        </form>
        <p style={styles.link}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f0f' },
  card: { background: '#1a1a1a', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', border: '1px solid #333' },
  title: { color: '#ffffff', textAlign: 'center', fontSize: '2rem', margin: '0 0 0.5rem' },
  subtitle: { color: '#888', textAlign: 'center', margin: '0 0 1.5rem' },
  input: { width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #333', background: '#0f0f0f', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' },
  button: { width: '100%', padding: '0.75rem', borderRadius: '8px', border: 'none', background: '#6366f1', color: '#fff', fontSize: '1rem', cursor: 'pointer' },
  error: { color: '#ef4444', marginBottom: '1rem', textAlign: 'center' },
  link: { color: '#888', textAlign: 'center', marginTop: '1rem' }
};