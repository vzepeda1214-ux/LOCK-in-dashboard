import { useState, useEffect, useRef } from 'react';
import { saveSession } from '../services/sessions';

const MODES = {
  pomodoro: 25 * 60,
  short_break: 5 * 60,
  long_break: 15 * 60,
};

export default function usePomodoro() {
  const [mode, setMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(MODES.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [subject, setSubject] = useState('General');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode]);

  const handleSessionComplete = async () => {
    setIsRunning(false);
    if (mode === 'pomodoro') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      try {
        await saveSession(subject, 25, newCount, 'pomodoro');
      } catch (err) {
        console.error('Failed to save session:', err);
      }
      if (newCount % 4 === 0) {
        switchMode('long_break');
      } else {
        switchMode('short_break');
      }
    } else {
      switchMode('pomodoro');
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setTimeLeft(MODES[newMode]);
    setIsRunning(false);
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(MODES[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return {
    mode,
    minutes,
    seconds,
    isRunning,
    sessionCount,
    subject,
    setSubject,
    switchMode,
    start,
    pause,
    reset,
  };
}