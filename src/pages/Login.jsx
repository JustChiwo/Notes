import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../api/api.js';
import AuthLayout from '../components/AuthLayout.jsx';
import FormField from '../components/FormField.jsx';
import SubmitButton from '../components/SubmitButton.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Login() {
  const navigate = useNavigate();
  const { user, saveUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(email, password);
      saveUser(response.user);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      description="Log in to access your private notes."
      footer={(
        <p className="mt-7 text-center text-sm text-muted">
          Don&apos;t have an account?{' '}
          <Link className="font-semibold text-brand hover:underline" to="/register">
            Create one
          </Link>
        </p>
      )}
      title="Welcome back"
    >
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <FormField
          autoComplete="email"
          id="email"
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="test@gmail.com"
          required
          type="email"
          value={email}
        />
        <FormField
          autoComplete="current-password"
          id="password"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="test1234"
          required
          type="password"
          value={password}
        />

        {error && <p className="text-sm font-medium text-red-600" role="alert">{error}</p>}

        <SubmitButton disabled={loading}>
          {loading ? 'Logging in...' : 'Log in'}
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}

export default Login;
