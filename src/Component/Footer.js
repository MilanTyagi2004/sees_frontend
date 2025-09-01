import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Mail, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', color: 'white', textDecoration: 'none' }}>
            <Lightbulb size={20} style={{ marginRight: '8px' }} />
            <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>SES</span>
          </Link>
        </div>
        
        <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
          Validate your business ideas before building. Save time and money with AI-powered market analysis.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <Link to="/validate" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>
            Validate Idea
          </Link>
          <a href="mailto:contact@ses.com" style={{ color: 'white', textDecoration: 'none', opacity: 0.8 }}>
            Contact
          </a>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <a href="https://twitter.com/ses" target="_blank" rel="noopener noreferrer" style={{ color: 'white', opacity: 0.8 }}>
            <Twitter size={20} />
          </a>
          <a href="https://linkedin.com/company/ses" target="_blank" rel="noopener noreferrer" style={{ color: 'white', opacity: 0.8 }}>
            <Linkedin size={20} />
          </a>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', opacity: 0.6 }}>
          <p>&copy; 2024 SES. Built for founders and freelancers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
