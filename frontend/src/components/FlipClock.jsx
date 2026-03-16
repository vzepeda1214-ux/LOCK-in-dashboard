export default function FlipClock({ minutes, seconds }) {
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
  
    return (
      <div style={styles.wrapper}>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
        <div style={styles.card}>
          <span style={styles.number}>{m[0]}</span>
        </div>
        <div style={styles.card}>
          <span style={styles.number}>{m[1]}</span>
        </div>
        <div style={styles.colon}>:</div>
        <div style={styles.card}>
          <span style={styles.number}>{s[0]}</span>
        </div>
        <div style={styles.card}>
          <span style={styles.number}>{s[1]}</span>
        </div>
      </div>
    );
  }
  
  const styles = {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    },
    card: {
      width: '160px',
      height: '200px',
      background: '#faf8f5',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      border: '1px solid #e8e0d5',
    },
    number: {
      fontSize: '9rem',
      fontWeight: '800',
      color: '#1a1008',
      fontFamily: 'Noto Sans, sans-serif',
      lineHeight: '1',
      userSelect: 'none',
    },
    colon: {
      fontSize: '6rem',
      color: '#f5e6c8',
      fontFamily: 'Noto Sans, sans-serif',
      fontWeight: '700',
      opacity: '0.7',
      paddingBottom: '0.5rem',
    }
  };