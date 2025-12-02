import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.js';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="nav-left">
          <Link to="/dashboard" className="nav-brand">
            ApplyFlow
          </Link>
        </div>

        <div className="nav-right">
          {user ? (
            <>
              <span>Hi, {user.name || 'User'}</span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

