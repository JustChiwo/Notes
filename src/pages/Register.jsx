import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/api.js';
import AuthLayout from '../components/AuthLayout.jsx';
import FormField from '../components/FormField.jsx';
import SubmitButton from '../components/SubmitButton.jsx';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password);
      navigate('/login');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      description="Keep your notes private and secure."
      footer={(
        <p className="mt-7 text-center text-sm text-muted">
          Already have an account?{' '}
          <Link className="font-semibold text-brand hover:underline" to="/login">
            Log in
          </Link>
        </p>
      )}
      title="Create your account"
    >
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <FormField
          autoComplete="email"
          id="email"
          label="Email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
        <FormField
          autoComplete="new-password"
          id="password"
          label="Password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />

        {error && <p className="text-sm font-medium text-red-600" role="alert">{error}</p>}

        <SubmitButton disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </SubmitButton>
      </form>
    </AuthLayout>
  );
}

export default Register;
