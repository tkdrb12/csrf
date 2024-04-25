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

export const changePassword = async (newPassword: string) => {
  const token = localStorage.getItem('CSRF-TOKEN');
  const params = new URLSearchParams({ ...(token && { token }) }).toString();

  await fetch(`${BASE_URL}/user/password?${params}`, {
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
  const token = localStorage.getItem('CSRF-TOKEN');
  const params = new URLSearchParams({ ...(!!token && { token }) }).toString();

  const response = await fetch(`${BASE_URL}/user/posting?${params}`, {
    credentials: 'include',
    method: 'GET',
  });

  if (!response.ok) throw new Error('cannot read posting');

  const json = await response.json();
  return json;
};

export const turnOnTokenOption = async () => {
  const response = await fetch(`${BASE_URL}/user/token-check-on`, {
    method: 'POST',
    credentials: 'include',
  });

  const json = await response.json();
  return json;
};

export const checkTokenOption = async () => {
  const response = await fetch(`${BASE_URL}/user/token-check`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('cannot read posting');

  const json = await response.json();
  return json;
};

export const turnOffTokenOption = async () => {
  await fetch(`${BASE_URL}/user/token-check-off`, {
    method: 'POST',
    credentials: 'include',
  });
};

export const checkRefererOption = async () => {
  const response = await fetch(`${BASE_URL}/user/referer-check`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) throw new Error('cannot read posting');

  const json = await response.json();
  return json;
};

export const turnOnRefererOption = async () => {
  await fetch(`${BASE_URL}/user/referer-check-on`, {
    method: 'POST',
    credentials: 'include',
  });
};

export const turnOffRefererOption = async () => {
  await fetch(`${BASE_URL}/user/referer-check-off`, {
    method: 'POST',
    credentials: 'include',
  });
};
