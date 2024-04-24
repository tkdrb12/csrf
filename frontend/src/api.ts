const BASE_URL = 'http://localhost:3001';

export const loginSession = async (id: string, password: string) => {
  const body = JSON.stringify({ id, password });
  const response = await fetch(`${BASE_URL}/user/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body,
    credentials: 'include',
  });

  if (!response.ok) throw new Error('failed login');
};

export const logoutSession = async (token?: string) => {
  await fetch(`${BASE_URL}/user/logout`, {
    method: 'POST',
    credentials: 'include',
  });
};

export const changePassword = async (newPassword: string, token?: string) => {
  await fetch(`${BASE_URL}/user/password`, {
    method: 'POST',
    credentials: 'include',
  });
};

export const validateLogin = async (token?: string) => {
  const response = await fetch(`${BASE_URL}/user/test`, {
    credentials: 'include',
  });

  if (!response.ok) throw new Error('not login');

  const json = await response.json();
  return json;
};

export const getPosting = async (token?: string) => {
  const response = await fetch(`${BASE_URL}/user/posting`, {
    credentials: 'include',
  });

  if (!response.ok) throw new Error('cannot read posting');

  const json = await response.json();
  return json;
};
