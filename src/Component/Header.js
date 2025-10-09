import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  BarChart3, 
  FileText, 
  LogIn, 
  LogOut,
  TrendingUp,
  Home as HomeIcon,
  ChevronDown,
  Bot,
  Globe,
  Users,
  DollarSign,
  MessageCircle,
  Settings,
  User,
  Menu,
  X,
  Zap,
  BookOpen,
  HelpCircle
} from 'lucide-react';

const Header = ({ user, onLogin, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const userMenuRef = useRef(null);
  const featuresMenuRef = useRef(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user menu if clicked outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      
      // Close features menu if clicked outside
      if (featuresMenuRef.current && !featuresMenuRef.current.contains(event.target)) {
        setShowFeaturesMenu(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mainFeatures = [
    { name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
    { name: 'Validate Idea', icon: FileText, path: '/validate' }
  ];

  const additionalFeatures = [
    { name: 'Trends', icon: Globe, path: '/trends', description: 'Market trends analysis' },
    { name: 'Competitors', icon: Users, path: '/competitors', description: 'Track your competition' },
    { name: 'Funding Calculator', icon: DollarSign, path: '/funding', description: 'Calculate funding needs' },
    { name: 'Team Collab', icon: MessageCircle, path: '/team', description: 'Work with your team' },
    { name: 'Analytics', icon: TrendingUp, path: '/analytics', description: 'Detailed insights' },
    { name: 'Reports', icon: BookOpen, path: '/reports', description: 'Generate reports' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <Lightbulb size={24} style={{ marginRight: '8px' }} />
          SES
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li>
              <Link to="/">
                <HomeIcon size={16} style={{ marginRight: '4px' }} />
                Home
              </Link>
            </li>
            
            {/* Main Features */}
            {user && mainFeatures.map((feature) => (
              <li key={feature.name}>
                <Link to={feature.path}>
                  <feature.icon size={16} style={{ marginRight: '4px' }} />
                  {feature.name}
                </Link>
              </li>
            ))}

            {/* More Features Dropdown */}
            {user && (
              <li className="features-dropdown" ref={featuresMenuRef}>
                <button 
                  className="features-button"
                  onClick={() => setShowFeaturesMenu(!showFeaturesMenu)}
                >
                  <Zap size={16} style={{ marginRight: '4px' }} />
                  More Features
                  <ChevronDown size={14} />
                </button>
                
                {showFeaturesMenu && (
                  <div className="features-dropdown-menu">
                    <div className="features-grid">
                      {additionalFeatures.map((feature) => (
                        <Link 
                          key={feature.name} 
                          to={feature.path} 
                          className="feature-item"
                          onClick={() => setShowFeaturesMenu(false)}
                        >
                          <div className="feature-icon">
                            <feature.icon size={20} />
                          </div>
                          <div className="feature-content">
                            <h4>{feature.name}</h4>
                            <p>{feature.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className="header-actions">
          {/* AI Chat Button */}
          <button 
            className="ai-chat-btn"
            onClick={() => {
              if (user) {
                window.dispatchEvent(new CustomEvent('openAIChat'));
              } else {
                alert('Please log in to use the AI Assistant');
                onLogin();
              }
            }}
          >
            <Bot size={16} />
            AI Assistant
          </button>

          {/* User Menu */}
          {user ? (
            <div className="user-menu" ref={userMenuRef}>
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
                      <span className="user-status">Premium Member</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  
                  <Link to="/dashboard" className="dropdown-item">
                    <BarChart3 size={16} />
                    Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item">
                    <User size={16} />
                    Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item">
                    <Settings size={16} />
                    Settings
                  </Link>
                  
                  <div className="dropdown-divider"></div>
                  
                  <Link to="/help" className="dropdown-item">
                    <HelpCircle size={16} />
                    Help & Support
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

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <nav className="mobile-nav">
            <ul className="mobile-nav-links">
              <li>
                <Link to="/" onClick={() => setShowMobileMenu(false)}>
                  <HomeIcon size={16} />
                  Home
                </Link>
              </li>
              
              {user && mainFeatures.map((feature) => (
                <li key={feature.name}>
                  <Link to={feature.path} onClick={() => setShowMobileMenu(false)}>
                    <feature.icon size={16} />
                    {feature.name}
                  </Link>
                </li>
              ))}
              
              {user && additionalFeatures.map((feature) => (
                <li key={feature.name}>
                  <Link to={feature.path} onClick={() => setShowMobileMenu(false)}>
                    <feature.icon size={16} />
                    {feature.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;