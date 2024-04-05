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

  if (response.redirected) return (window.location.href = response.url);

  const json = await response.json();
  return json;
};

export const logoutSession = async () => {
  await fetch(`${BASE_URL}/user/logout`, {
    method: 'POST',
    credentials: 'include',
  });
};

export const validateLogin = async () => {
  const response = await fetch(`${BASE_URL}/user/test`, {
    credentials: 'include',
  });

  if (!response.ok) throw new Error('not login');

  const json = await response.json();
  return json;
};

export const getPosting = async () => {
  const response = await fetch(`${BASE_URL}/user/posting`, {
    credentials: 'include',
  });

  if (!response.ok) throw new Error('cannot read posting');

  const json = await response.json();
  return json;
};
