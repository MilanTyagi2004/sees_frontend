import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, BarChart3, FileText } from 'lucide-react';

const Header = () => {
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
                <BarChart3 size={16} style={{ marginRight: '4px' }} />
                Home
              </Link>
            </li>
            <li>
              <Link to="/validate">
                <FileText size={16} style={{ marginRight: '4px' }} />
                Validate Idea
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
