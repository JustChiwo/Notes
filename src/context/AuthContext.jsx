import { createContext, useContext, useState } from 'react';

const USER_STORAGE_KEY = 'user';
const AuthContext = createContext(null);

function getSavedUser() {
  try {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);

  function saveUser(nextUser) {
    setUser(nextUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
  }

  function clearUser() {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, saveUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Keep the hook beside its provider so consumers share the same context.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
