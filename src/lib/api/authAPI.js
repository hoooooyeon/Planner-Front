import client from './client';

export const login = ({ email, password }) => {
  return client.post('/api/auth/login', { email, password });
};

export const register = ({ email, password, username, nickname }) => {
  return client.post('/api/auth/register', { email, password, username, nickname });
};
