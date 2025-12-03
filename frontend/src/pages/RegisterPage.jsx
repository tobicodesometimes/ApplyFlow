import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../api/authApi.js';
import { useAuth } from "../context/useAuth.js";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await registerApi({ name, email, password });
      const { token, ...userData } = data;
      login(userData, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="shell">
      <section className="section-card auth-card">
        <h1 className="page-title" style={{ fontSize: '1.9rem', textAlign: 'center' }}>
          Create an Account
        </h1>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          Track your job applications, follow-ups, and offers in one place.
        </p>

        <form onSubmit={handleSubmit} className="form-stack">
          <div className="form-field">
            <label htmlFor="register-name">Name</label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p style={{ color: 'red', fontSize: '0.85rem' }}>
              {error}
            </p>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
              }}
            >
              Clear
            </button>
          </div>
        </form>

        <p
          className="text-muted"
          style={{ marginTop: '1rem', textAlign: 'center' }}
        >
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#4f46e5', textDecoration: 'none' }}>
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default RegisterPage;
