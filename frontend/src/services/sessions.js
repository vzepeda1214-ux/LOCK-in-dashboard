import api from './api';

export const saveSession = async (subject, duration_minutes, session_number, session_type) => {
  const res = await api.post('/sessions', {
    subject,
    duration_minutes,
    session_number,
    session_type
  });
  return res.data;
};

export const getToday = async () => {
  const res = await api.get('/sessions/stats/today');
  return res.data;
};

export const getWeekly = async () => {
  const res = await api.get('/sessions/stats/weekly');
  return res.data;
};