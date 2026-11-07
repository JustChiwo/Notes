import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function Dashboard() {
  const navigate = useNavigate();
  const { user, clearUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setError('');
    setLoading(true);

    try {
      await logout();
      clearUser();
      navigate('/login');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg sm:p-10">
        <h1 className="text-2xl font-bold text-slate-900">Welcome, {user.email}</h1>
        <p className="mt-2 text-sm text-slate-600">Your private notes will be here.</p>
        {error && <p className="mt-5 text-sm text-red-600" role="alert">{error}</p>}
        <button
          className="mt-8 w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={loading}
          onClick={handleLogout}
          type="button"
        >
          {loading ? 'Logging out...' : 'Log out'}
        </button>
      </section>
    </main>
  );
}

export default Dashboard;
