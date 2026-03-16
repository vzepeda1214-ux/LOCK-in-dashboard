import FlipClock from './FlipClock';
import usePomodoro from '../hooks/usePomodoro';

const SUBJECTS = [
  'General', 'Math', 'Algorithms', 'Biology',
  'Chemistry', 'History', 'Reading', 'Writing', 'Coding'
];

const MODE_LABELS = {
  pomodoro: 'Focus Session',
  short_break: 'Short Break',
  long_break: 'Long Break',
};

const MODE_COLORS = {
  pomodoro: '#c084fc',
  short_break: '#86efac',
  long_break: '#93c5fd',
};

export default function PomodoroTimer({ onMinimize }) {
  const {
    mode, minutes, seconds, isRunning,
    sessionCount, subject, setSubject,
    switchMode, start, pause, reset,
  } = usePomodoro();

  return (
    <div style={styles.fullscreen}>
      {/* header */}
      <div style={styles.header}>
        <div style={styles.sessionBadge}>
          Session {sessionCount + 1} of 4
        </div>
        <button
          style={styles.minimizeBtn}
          onClick={onMinimize}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          ↙ Back to Dashboard
        </button>
      </div>

      {/* mode selector */}
      <div style={styles.modeRow}>
        {Object.keys(MODE_LABELS).map(m => (
          <button
            key={m}
            style={{
              ...styles.modeBtn,
              background: mode === m ? MODE_COLORS[m] : 'transparent',
              color: mode === m ? '#1a1008' : '#a89070',
              border: `1px solid ${mode === m ? MODE_COLORS[m] : '#3a2a18'}`,
            }}
            onClick={() => switchMode(m)}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      {/* flip clock */}
      <div style={styles.clockWrapper}>
        <FlipClock minutes={minutes} seconds={seconds} />
      </div>

      {/* subject selector */}
      <div style={styles.subjectRow}>
        <span style={styles.subjectLabel}>Studying:</span>
        <select
          style={styles.select}
          value={subject}
          onChange={e => setSubject(e.target.value)}
        >
          {SUBJECTS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* controls */}
      <div style={styles.controls}>
        <button
          style={styles.resetBtn}
          onClick={reset}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          ↺ Reset
        </button>

        <button
          style={{
            ...styles.mainBtn,
            background: isRunning
              ? 'transparent'
              : `linear-gradient(135deg, ${MODE_COLORS[mode]}, #f5e6c8)`,
            color: isRunning ? '#f5e6c8' : '#1a1008',
            border: isRunning ? '2px solid #f5e6c8' : 'none',
          }}
          onClick={isRunning ? pause : start}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>

        <button
          style={styles.resetBtn}
          onClick={() => switchMode('pomodoro')}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          ↩ Restart
        </button>
      </div>

      {/* session dots */}
      <div style={styles.dotsRow}>
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            style={{
              ...styles.dot,
              background: i < sessionCount % 4
                ? MODE_COLORS.pomodoro
                : '#3a2a18',
            }}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  fullscreen: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: '#0d0800',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    gap: '2rem',
  },
  header: {
    position: 'absolute',
    top: '1.5rem',
    left: 0, right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
  },
  sessionBadge: {
    color: '#a89070',
    fontSize: '0.9rem',
    fontFamily: 'Georgia, serif',
    letterSpacing: '0.05em',
  },
  minimizeBtn: {
    background: 'transparent',
    border: '1px solid #3a2a18',
    color: '#a89070',
    padding: '0.4rem 1rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'transform 0.1s ease',
  },
  modeRow: {
    display: 'flex',
    gap: '0.75rem',
  },
  modeBtn: {
    padding: '0.5rem 1.2rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontFamily: 'Georgia, serif',
    transition: 'transform 0.1s ease',
  },
  clockWrapper: {
    padding: '1rem 0',
  },
  subjectRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  subjectLabel: {
    color: '#a89070',
    fontFamily: 'Georgia, serif',
    fontSize: '0.95rem',
  },
  select: {
    background: '#1a1008',
    border: '1px solid #3a2a18',
    color: '#f5e6c8',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontFamily: 'Georgia, serif',
    cursor: 'pointer',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  mainBtn: {
    padding: '1rem 3rem',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontFamily: 'Georgia, serif',
    cursor: 'pointer',
    transition: 'transform 0.1s ease',
    fontWeight: '600',
    letterSpacing: '0.05em',
  },
  resetBtn: {
    background: 'transparent',
    border: '1px solid #3a2a18',
    color: '#a89070',
    padding: '0.6rem 1.2rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontFamily: 'Georgia, serif',
    transition: 'transform 0.1s ease',
  },
  dotsRow: {
    display: 'flex',
    gap: '0.75rem',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    transition: 'background 0.3s ease',
  },
};