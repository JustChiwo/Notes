const API_BASE_URL = import.meta.env.VITE_API_URL;
const USER_STORAGE_KEY = 'user';

async function request(path, { method = 'GET', body, isAuthRequest = false } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 401 && !isAuthRequest) {
      // Expired sessions should not leave a stale user in the app.
      localStorage.removeItem(USER_STORAGE_KEY);
      window.location.href = '/login';
    }

    throw new Error(data?.message || 'Something went wrong.');
  }

  return data;
}

export function signup(email, password) {
  return request('/api/auth/signup', {
    method: 'POST',
    body: { email, password },
    isAuthRequest: true,
  });
}

export function login(email, password) {
  return request('/api/auth/login', {
    method: 'POST',
    body: { email, password },
    isAuthRequest: true,
  });
}

export function logout() {
  return request('/api/auth/logout', { method: 'POST' });
}

export function getNotes() {
  return request('/api/notes');
}

export function createNote(title, content) {
  return request('/api/notes', {
    method: 'POST',
    body: { title, content },
  });
}

export function updateNote(id, data) {
  return request(`/api/notes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: { title: data.title, content: data.content },
  });
}

export function deleteNote(id) {
  return request(`/api/notes/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
