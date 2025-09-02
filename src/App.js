import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Component/NewFeatures.css';
import Header from './Component/Header';
import Home from './Component/Home';
import ValidationForm from './Component/ValidationForm';
import Report from './Component/Report';
import Footer from './Component/Footer';
import Auth from './Component/Auth';
import Dashboard from './Component/Dashboard';
import Analytics from './Component/Analytics';
import AISuggestions from './Component/AISuggestions';
import AIChat from './Component/AIChat';
import TrendsDashboard from './Component/TrendsDashboard';
import CompetitorTracking from './Component/CompetitorTracking';
import FundingCalculator from './Component/FundingCalculator';
import TeamCollaboration from './Component/TeamCollaboration';
import Gamification from './Component/Gamification';

function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showCmdk, setShowCmdk] = useState(false);
  const [cmdkQuery, setCmdkQuery] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (isAuthenticated && userData) {
      setUser(JSON.parse(userData));
    }

    // Listen for AI suggestions event
    const handleAISuggestions = (event) => {
      setCurrentReport(event.detail);
      setShowAISuggestions(true);
    };

    // Listen for AI chat event
    const handleAIChat = () => {
      setShowAIChat(true);
    };

    window.addEventListener('showAISuggestions', handleAISuggestions);
    window.addEventListener('openAIChat', handleAIChat);
    
    return () => {
      window.removeEventListener('showAISuggestions', handleAISuggestions);
      window.removeEventListener('openAIChat', handleAIChat);
    };
  }, []);

  // Theme removed

  // Command palette keybinding
  useEffect(() => {
    const onKeyDown = (e) => {
      const key = typeof e.key === 'string' ? e.key.toLowerCase() : '';
      const isK = key === 'k';
      const meta = e.ctrlKey || e.metaKey;
      if (meta && isK) {
        e.preventDefault();
        setShowCmdk((v) => !v);
      }
      if (e.key === 'Escape') {
        setShowCmdk(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const paletteItems = useMemo(() => {
    const items = [
      { label: 'Go: Home', path: '/' },
      { label: 'Go: Dashboard', path: '/dashboard' },
      { label: 'Go: Validate Idea', path: '/validate' },
      { label: 'Go: Trends', path: '/trends' },
      { label: 'Go: Competitors', path: '/competitors' },
      { label: 'Go: Funding Calculator', path: '/funding' },
      { label: 'Go: Team Collaboration', path: '/team' },
      { label: 'Go: Gamification', path: '/gamification' },
      { label: 'Action: Open AI Assistant', action: () => setShowAIChat(true) }
    ];
    const query = (cmdkQuery || '').toLowerCase();
    return items.filter((it) => (it.label || '').toLowerCase().includes(query));
  }, [cmdkQuery]);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
  };

  const handleNewValidation = () => {
    // Navigate to validation form
    window.location.href = '/validate';
  };

  const handleViewReport = (idea) => {
    setCurrentReport(idea);
    // Navigate to report page
    window.location.href = '/report';
  };

  const handleApplySuggestion = (suggestion) => {
    // Show success message
    alert(`Applied suggestion: ${suggestion.title}`);
    setShowAISuggestions(false);
  };

  return (
    <Router>
      <div className="App">
        <div className="noise-overlay"></div>
        <Header 
          user={user} 
          onLogin={() => setShowAuth(true)}
          onLogout={handleLogout}
        />
        

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} onLogin={() => setShowAuth(true)} />} />
            <Route path="/validate" element={<ValidationForm user={user} />} />
            <Route path="/report" element={<Report data={currentReport} />} />
            <Route path="/dashboard" element={
              user ? <Dashboard 
                user={user} 
                onLogout={handleLogout}
                onNewValidation={handleNewValidation}
                onViewReport={handleViewReport}
              /> : <Home user={user} onLogin={() => setShowAuth(true)} />
            } />
            <Route path="/analytics" element={
              user ? <Analytics user={user} /> : <Home user={user} onLogin={() => setShowAuth(true)} />
            } />
            <Route path="/trends" element={
              user ? <TrendsDashboard user={user} /> : <Home user={user} onLogin={() => setShowAuth(true)} />
            } />
            <Route path="/competitors" element={
              user ? <CompetitorTracking user={user} /> : <Home user={user} onLogin={() => setShowAuth(true)} />
            } />
            <Route path="/funding" element={
              user ? <FundingCalculator user={user} /> : <Home user={user} onLogin={() => setShowAuth(true)} />
            } />
            <Route path="/team" element={
              user ? <TeamCollaboration user={user} /> : <Home user={user} onLogin={() => setShowAuth(true)} />
            } />
            <Route path="/gamification" element={
              user ? <Gamification user={user} /> : <Home user={user} onLogin={() => setShowAuth(true)} />
            } />
          </Routes>
        </main>
        <Footer />
        
        {/* Auth Modal */}
        {showAuth && (
          <Auth 
            onAuthSuccess={handleAuthSuccess}
            onClose={() => setShowAuth(false)}
          />
        )}
        
        {/* AI Suggestions Modal */}
        {showAISuggestions && currentReport && (
          <div className="modal-overlay">
            <div className="modal-content ai-suggestions-modal">
              <button 
                className="modal-close"
                onClick={() => setShowAISuggestions(false)}
              >
                ×
              </button>
              <AISuggestions 
                validationData={currentReport}
                onApplySuggestion={handleApplySuggestion}
              />
            </div>
          </div>
        )}
        
        {/* AI Chat Assistant */}
        {showAIChat && (
          <AIChat 
            isOpen={showAIChat}
            onClose={() => setShowAIChat(false)}
            validationData={currentReport}
          />
        )}

        {/* Command Palette */}
        {showCmdk && (
          <div className="cmdk-overlay" onClick={() => setShowCmdk(false)}>
            <div className="cmdk" onClick={(e) => e.stopPropagation()}>
              <div className="cmdk-header">
                <input 
                  className="cmdk-input" 
                  placeholder="Type a command or search (Ctrl/Cmd+K)" 
                  value={cmdkQuery}
                  onChange={(e) => setCmdkQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="cmdk-list">
                {paletteItems.map((item, idx) => (
                  <button 
                    key={idx} 
                    className="cmdk-item"
                    onClick={() => {
                      setShowCmdk(false);
                      if (item.path) window.location.href = item.path;
                      if (item.action) item.action();
                    }}
                  >
                    <span>{item.label}</span>
                    <span className="cmdk-hint">Enter</span>
                  </button>
                ))}
                {paletteItems.length === 0 && (
                  <div className="cmdk-item" style={{ opacity: .7 }}>No results</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
