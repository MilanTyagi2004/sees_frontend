import React, { useState, useEffect } from 'react';
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
      </div>
    </Router>
  );
}

export default App;
