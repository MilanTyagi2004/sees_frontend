import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Mail, Twitter, Linkedin, Github, ArrowRight, Star, Users, TrendingUp, Shield, Heart, Globe, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Footer Content */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Brand Section */}
          <div>
            <Link to="/" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              color: 'white', 
              textDecoration: 'none',
              marginBottom: '1rem'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                padding: '8px',
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Lightbulb size={24} color="white" />
              </div>
              <div>
                <span style={{ fontWeight: '700', fontSize: '1.5rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SES</span>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '-2px' }}>Smart Entrepreneur System</div>
              </div>
            </Link>
            
            <p style={{ marginBottom: '1.5rem', opacity: 0.8, lineHeight: '1.6' }}>
              Transform your ideas into validated business opportunities with AI-powered market analysis. 
              Save time, reduce risk, and make data-driven decisions.
            </p>
            
            {/* Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#10b981' }}>10K+</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Ideas Validated</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#667eea' }}>95%</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Accuracy Rate</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f59e0b' }}>24/7</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>AI Analysis</div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 style={{ 
              color: 'white', 
              marginBottom: '1rem', 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/validate" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                opacity: 0.8,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                padding: '0.5rem 0'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '0.8';
                e.target.style.transform = 'translateX(0)';
              }}>
                <ArrowRight size={16} />
                Validate Your Idea
              </Link>
              <Link to="/dashboard" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                opacity: 0.8,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                padding: '0.5rem 0'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '0.8';
                e.target.style.transform = 'translateX(0)';
              }}>
                <TrendingUp size={16} />
                Analytics Dashboard
              </Link>
              <a href="mailto:contact@ses.com" style={{ 
                color: 'white', 
                textDecoration: 'none', 
                opacity: 0.8,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                padding: '0.5rem 0'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '0.8';
                e.target.style.transform = 'translateX(0)';
              }}>
                <Mail size={16} />
                Contact Support
              </a>
            </div>
          </div>
          
          {/* Features */}
          <div>
            <h4 style={{ 
              color: 'white', 
              marginBottom: '1rem', 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Why Choose SES?
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                <Zap size={16} color="#f59e0b" />
                <span>Instant AI Analysis</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                <Shield size={16} color="#10b981" />
                <span>Data-Driven Insights</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                <Users size={16} color="#667eea" />
                <span>Expert Recommendations</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                <Globe size={16} color="#8b5cf6" />
                <span>Global Market Data</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
              Stay Updated with Market Insights
            </h4>
            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
              Get weekly reports on trending markets and validation tips
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            maxWidth: '400px', 
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '0.9rem'
              }}
            />
            <button style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              Subscribe
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        
        {/* Social Links */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <a 
            href="https://twitter.com/ses" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              color: 'white', 
              opacity: 0.8,
              padding: '0.75rem',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.background = 'rgba(29, 161, 242, 0.2)';
              e.target.style.borderColor = 'rgba(29, 161, 242, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.8';
              e.target.style.background = 'rgba(255,255,255,0.05)';
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <Twitter size={20} />
          </a>
          <a 
            href="https://linkedin.com/company/ses" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              color: 'white', 
              opacity: 0.8,
              padding: '0.75rem',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.background = 'rgba(0, 119, 181, 0.2)';
              e.target.style.borderColor = 'rgba(0, 119, 181, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.8';
              e.target.style.background = 'rgba(255,255,255,0.05)';
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <Linkedin size={20} />
          </a>
          <a 
            href="https://github.com/ses" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              color: 'white', 
              opacity: 0.8,
              padding: '0.75rem',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.background = 'rgba(36, 41, 46, 0.2)';
              e.target.style.borderColor = 'rgba(36, 41, 46, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.8';
              e.target.style.background = 'rgba(255,255,255,0.05)';
              e.target.style.borderColor = 'rgba(255,255,255,0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <Github size={20} />
          </a>
        </div>
        
        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ opacity: 0.6, fontSize: '0.9rem' }}>
            <p style={{ margin: 0 }}>
              &copy; 2024 SES. Built with <Heart size={14} color="#ef4444" style={{ margin: '0 4px' }} /> for entrepreneurs worldwide.
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            fontSize: '0.9rem',
            opacity: 0.6,
            flexWrap: 'wrap'
          }}>
            <a href="/privacy" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/terms" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</a>
            <a href="/cookies" style={{ color: 'white', textDecoration: 'none' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
