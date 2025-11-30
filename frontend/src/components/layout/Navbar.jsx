import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/useAuth.js";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
      <Link to="/dashboard" style={{ marginRight: '1rem' }}>
        ApplyFlow
      </Link>

      {user ? (
        <>
          <span style={{ marginRight: '1rem' }}>Hi, {user.name || 'User'}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
