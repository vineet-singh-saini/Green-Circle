import { useNavigate } from 'react-router-dom';
import './Logout.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      <i className="fas fa-sign-out-alt"></i> Logout
    </button>
  );
};

export default LogoutButton;
