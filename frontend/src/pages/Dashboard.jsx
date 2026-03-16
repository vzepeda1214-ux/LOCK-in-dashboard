import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🔒 Lock In Dashboard</h1>
        <div style={styles.headerRight}>
          <span style={styles.username}>Hey, {user?.username}!</span>
          <button style={styles.logoutBtn} onClick={logout}>Log out</button>
        </div>
      </div>
      <div style={styles.grid}>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>⏱ Pomodoro Timer</h2>
          <p style={styles.coming}>Coming soon...</p>
        </div>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>✅ Tasks</h2>
          <p style={styles.coming}>Coming soon...</p>
        </div>
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>📊 Analytics</h2>
          <p style={styles.coming}>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', background: '#0f0f0f', padding: '1.5rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' },
  title: { color: '#fff', margin: 0, fontSize: '1.5rem' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1rem' },
  username: { color: '#888' },
  logoutBtn: { padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #333', background: 'transparent', color: '#fff', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
  panel: { background: '#1a1a1a', borderRadius: '12px', padding: '1.5rem', border: '1px solid #333' },
  panelTitle: { color: '#fff', margin: '0 0 1rem', fontSize: '1.1rem' },
  coming: { color: '#555', fontStyle: 'italic' }
};