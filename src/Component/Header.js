import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  BarChart3, 
  FileText, 
  User, 
  LogIn, 
  LogOut, 
  Settings,
  TrendingUp,
  Home as HomeIcon,
  ChevronDown
} from 'lucide-react';

const Header = ({ user, onLogin, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <Lightbulb size={24} style={{ marginRight: '8px' }} />
          SES
        </Link>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/">
                <HomeIcon size={16} style={{ marginRight: '4px' }} />
                Home
              </Link>
            </li>
            <li>
              <Link to="/validate">
                <FileText size={16} style={{ marginRight: '4px' }} />
                Validate Idea
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/dashboard">
                    <BarChart3 size={16} style={{ marginRight: '4px' }} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/analytics">
                    <TrendingUp size={16} style={{ marginRight: '4px' }} />
                    Analytics
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        
        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <button 
                className="user-button"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img src={user.avatar} alt={user.name} className="user-avatar" />
                <span className="user-name">{user.name}</span>
                <ChevronDown size={16} />
              </button>
              
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <img src={user.avatar} alt={user.name} />
                    <div>
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/dashboard" className="dropdown-item">
                    <BarChart3 size={16} />
                    Dashboard
                  </Link>
                  <Link to="/analytics" className="dropdown-item">
                    <TrendingUp size={16} />
                    Analytics
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={onLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-button" onClick={onLogin}>
              <LogIn size={16} />
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
