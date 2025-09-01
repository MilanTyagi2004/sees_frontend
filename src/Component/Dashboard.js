import React, { useState, useEffect } from 'react';
import { 
  User, 
  LogOut, 
  Plus, 
  TrendingUp, 
  Target, 
  Award, 
  Clock, 
  BarChart3,
  FileText,
  Download,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Star,
  Zap
} from 'lucide-react';

const Dashboard = ({ user, onLogout, onNewValidation, onViewReport }) => {
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [stats, setStats] = useState({
    totalValidations: 0,
    successRate: 0,
    avgScore: 0,
    thisMonth: 0
  });

  useEffect(() => {
    // Load saved ideas from localStorage
    const saved = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
    setSavedIdeas(saved);

    // Calculate stats
    const totalValidations = saved.length;
    const successfulValidations = saved.filter(idea => idea.score >= 70).length;
    const avgScore = totalValidations > 0 ? 
      saved.reduce((sum, idea) => sum + idea.score, 0) / totalValidations : 0;
    const thisMonth = saved.filter(idea => {
      const ideaDate = new Date(idea.date);
      const now = new Date();
      return ideaDate.getMonth() === now.getMonth() && 
             ideaDate.getFullYear() === now.getFullYear();
    }).length;

    setStats({
      totalValidations,
      successRate: totalValidations > 0 ? Math.round((successfulValidations / totalValidations) * 100) : 0,
      avgScore: Math.round(avgScore),
      thisMonth
    });
  }, []);

  const handleDeleteIdea = (id) => {
    const updatedIdeas = savedIdeas.filter(idea => idea.id !== id);
    setSavedIdeas(updatedIdeas);
    localStorage.setItem('savedIdeas', JSON.stringify(updatedIdeas));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Work';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="user-details">
            <h2>Welcome back, {user.name}!</h2>
            <p>Ready to validate your next big idea?</p>
          </div>
        </div>
        <div className="dashboard-actions">
          <button className="btn-primary" onClick={onNewValidation}>
            <Plus size={20} />
            New Validation
          </button>
          <button className="btn-secondary" onClick={onLogout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalValidations}</h3>
            <p>Total Validations</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.successRate}%</h3>
            <p>Success Rate</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.avgScore}</h3>
            <p>Average Score</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.thisMonth}</h3>
            <p>This Month</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-header">
          <h3>Your Saved Ideas</h3>
          <p>Track and manage your validated ideas</p>
        </div>

        {savedIdeas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Zap size={48} />
            </div>
            <h4>No ideas yet</h4>
            <p>Start validating your first idea to see it here</p>
            <button className="btn-primary" onClick={onNewValidation}>
              <Plus size={20} />
              Validate Your First Idea
            </button>
          </div>
        ) : (
          <div className="ideas-grid">
            {savedIdeas.map((idea) => (
              <div key={idea.id} className="idea-card">
                <div className="idea-header">
                  <div className="idea-title">
                    <h4>{idea.productName}</h4>
                    <span className="idea-category">{idea.category}</span>
                  </div>
                  <div className="idea-score" style={{ color: getScoreColor(idea.score) }}>
                    <span className="score-number">{idea.score}</span>
                    <span className="score-label">{getScoreLabel(idea.score)}</span>
                  </div>
                </div>
                
                <div className="idea-description">
                  <p>{idea.description.substring(0, 120)}...</p>
                </div>

                <div className="idea-metrics">
                  <div className="metric">
                    <TrendingUp size={16} />
                    <span>Demand: {idea.demandScore}/100</span>
                  </div>
                  <div className="metric">
                    <BarChart3 size={16} />
                    <span>Competition: {idea.competitionScore}/100</span>
                  </div>
                  <div className="metric">
                    <Clock size={16} />
                    <span>{new Date(idea.date).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="idea-actions">
                  <button 
                    className="btn-action primary"
                    onClick={() => onViewReport(idea)}
                  >
                    <Eye size={16} />
                    View Report
                  </button>
                  <button 
                    className="btn-action secondary"
                    onClick={() => {/* Implement edit functionality */}}
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button 
                    className="btn-action danger"
                    onClick={() => handleDeleteIdea(idea.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
