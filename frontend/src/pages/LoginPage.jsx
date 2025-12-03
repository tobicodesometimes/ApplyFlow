import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginApi } from "../api/authApi.js";
import { useAuth } from "../context/useAuth.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await loginApi({ email, password });
      const { token, ...userData } = data;
      login(userData, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <main className="shell">
      <section className="section-card auth-card">
        <h1
          className="page-title"
          style={{ fontSize: "1.9rem", textAlign: "center" }}
        >
          Log In
        </h1>
        <p
          className="text-muted"
          style={{ textAlign: "center", marginBottom: "1.25rem" }}
        >
          Sign in to see your job applications and follow-ups.
        </p>

        <form onSubmit={handleSubmit} className="form-stack">
          <div className="form-field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="login-password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                // optional: clear fields
                setEmail("");
                setPassword("");
                setError("");
              }}
            >
              Clear
            </button>
          </div>
        </form>

        <p
          className="text-muted"
          style={{ marginTop: "1rem", textAlign: "center" }}
        >
          No account yet?{" "}
          <Link
            to="/register"
            style={{ color: "#4f46e5", textDecoration: "none" }}
          >
            Register
          </Link>
        </p>
      </section>
    </main>
  );
};

export default LoginPage;
