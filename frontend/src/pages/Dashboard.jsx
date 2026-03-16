import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🔒 Lock In</h1>
          <p style={styles.subtitle}>let's get it done, {user?.username} ✨</p>
        </div>
        <button style={styles.logoutBtn} onClick={logout}>Log out</button>
      </div>

      <div style={styles.grid}>
        <div style={styles.panel}>
          <div style={styles.panelIcon}>⏱</div>
          <h2 style={styles.panelTitle}>Pomodoro Timer</h2>
          <p style={styles.coming}>Coming soon...</p>
        </div>
        <div style={styles.panel}>
          <div style={styles.panelIcon}>✅</div>
          <h2 style={styles.panelTitle}>Tasks</h2>
          <p style={styles.coming}>Coming soon...</p>
        </div>
        <div style={styles.panel}>
          <div style={styles.panelIcon}>📊</div>
          <h2 style={styles.panelTitle}>Analytics</h2>
          <p style={styles.coming}>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf6ff 0%, #f0f4ff 100%)',
    padding: '1.5rem',
    fontFamily: 'Georgia, serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '1px solid #e8d5f5',
    paddingBottom: '1rem'
  },
  title: {
    color: '#7c3aed',
    margin: 0,
    fontSize: '1.8rem',
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#a78bca',
    margin: '0.25rem 0 0',
    fontSize: '0.95rem'
  },
  logoutBtn: {
    padding: '0.5rem 1.2rem',
    borderRadius: '20px',
    border: '1px solid #d8b4fe',
    background: 'white',
    color: '#7c3aed',
    cursor: 'pointer',
    fontSize: '0.9rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  panel: {
    background: 'white',
    borderRadius: '16px',
    padding: '1.8rem',
    border: '1px solid #ede9fe',
    boxShadow: '0 2px 12px rgba(167, 139, 202, 0.15)'
  },
  panelIcon: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem'
  },
  panelTitle: {
    color: '#5b21b6',
    margin: '0 0 0.75rem',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  coming: {
    color: '#c4b5d4',
    fontStyle: 'italic',
    fontSize: '0.9rem'
  }
};