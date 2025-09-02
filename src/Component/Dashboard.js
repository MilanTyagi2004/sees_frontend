import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  Plus, 
  TrendingUp, 
  Target, 
  Award, 
  Clock, 
  BarChart3,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Zap,
  Users,
  DollarSign,
  Activity,
  CheckCircle,
  AlertCircle,
  Star,
  Rocket,
  Lightbulb,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Share2,
  Bell,
  Settings
} from 'lucide-react';

const Dashboard = ({ user, onLogout, onNewValidation, onViewReport }) => {
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [stats, setStats] = useState({
    totalValidations: 0,
    successRate: 0,
    avgScore: 0,
    thisMonth: 0,
    totalRevenue: 0,
    activeProjects: 0,
    teamMembers: 0,
    completionRate: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [topPerformingIdeas, setTopPerformingIdeas] = useState([]);
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [selectedTimeframe]);

  const loadDashboardData = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Load saved ideas from localStorage
      const saved = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
      setSavedIdeas(saved);

      // Calculate enhanced stats
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

      // Enhanced stats
      const totalRevenue = saved.reduce((sum, idea) => sum + (idea.estimatedRevenue || 0), 0);
      const activeProjects = saved.filter(idea => idea.status === 'active').length;
      const teamMembers = 3; // Mock data
      const completionRate = totalValidations > 0 ? Math.round((successfulValidations / totalValidations) * 100) : 0;

      setStats({
        totalValidations,
        successRate: totalValidations > 0 ? Math.round((successfulValidations / totalValidations) * 100) : 0,
        avgScore: Math.round(avgScore),
        thisMonth,
        totalRevenue,
        activeProjects,
        teamMembers,
        completionRate
      });

      // Generate recent activity
      const activity = generateRecentActivity(saved);
      setRecentActivity(activity);

      // Generate top performing ideas
      const topIdeas = saved
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
      setTopPerformingIdeas(topIdeas);

      // Generate monthly trends
      const trends = generateMonthlyTrends(saved, selectedTimeframe);
      setMonthlyTrends(trends);

      setIsLoading(false);
    }, 1000);
  };

  const generateRecentActivity = (ideas) => {
    const activities = [];
    ideas.slice(0, 10).forEach(idea => {
      activities.push({
        id: idea.id,
        type: 'validation',
        title: `Validated: ${idea.title}`,
        description: `Score: ${idea.score}/100`,
        timestamp: new Date(idea.date),
        icon: idea.score >= 70 ? CheckCircle : AlertCircle,
        color: idea.score >= 70 ? '#10b981' : '#f59e0b'
      });
    });
    return activities.sort((a, b) => b.timestamp - a.timestamp).slice(0, 8);
  };

  const generateMonthlyTrends = (ideas, timeframe) => {
    const months = [];
    const now = new Date();
    const monthsToShow = timeframe === '30d' ? 1 : timeframe === '90d' ? 3 : 6;
    
    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthIdeas = ideas.filter(idea => {
        const ideaDate = new Date(idea.date);
        return ideaDate.getMonth() === date.getMonth() && 
               ideaDate.getFullYear() === date.getFullYear();
      });
      
      months.push({
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        validations: monthIdeas.length,
        avgScore: monthIdeas.length > 0 ? 
          Math.round(monthIdeas.reduce((sum, idea) => sum + idea.score, 0) / monthIdeas.length) : 0,
        revenue: monthIdeas.reduce((sum, idea) => sum + (idea.estimatedRevenue || 0), 0)
      });
    }
    return months;
  };

  const handleDeleteIdea = (id) => {
    const updatedIdeas = savedIdeas.filter(idea => idea.id !== id);
    setSavedIdeas(updatedIdeas);
    localStorage.setItem('savedIdeas', JSON.stringify(updatedIdeas));
    loadDashboardData(); // Refresh data
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

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Enhanced Header */}
      <div className="dashboard-header">
        <div className="user-info">
          <div className="user-avatar">
            <img src={user.avatar} alt={user.name} />
            <div className="status-indicator online"></div>
          </div>
          <div className="user-details">
            <h2>Welcome back, {user.name}! 👋</h2>
            <p>Here's what's happening with your ideas today</p>
            <div className="user-stats">
              <span className="stat-badge">
                <Star size={14} />
                Premium Member
              </span>
              <span className="stat-badge">
                <Activity size={14} />
                {stats.activeProjects} Active Projects
              </span>
            </div>
          </div>
        </div>
        <div className="dashboard-actions">
          <div className="timeframe-selector">
            <select 
              value={selectedTimeframe} 
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="timeframe-select"
            >
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="6m">Last 6 months</option>
            </select>
          </div>
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

      {/* Enhanced Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalValidations}</h3>
            <p>Total Validations</p>
            <div className="stat-trend positive">
              <ArrowUpRight size={16} />
              +{stats.thisMonth} this month
            </div>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.successRate}%</h3>
            <p>Success Rate</p>
            <div className="stat-trend positive">
              <ArrowUpRight size={16} />
              +5% from last month
            </div>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.avgScore}</h3>
            <p>Average Score</p>
            <div className="stat-trend positive">
              <ArrowUpRight size={16} />
              +3 points
            </div>
          </div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>${stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
            <div className="stat-trend positive">
              <ArrowUpRight size={16} />
              +12% growth
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="content-left">
          {/* Recent Activity */}
          <div className="activity-section">
            <div className="section-header">
              <h3>Recent Activity</h3>
              <button className="view-all-btn">
                View All
                <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon" style={{ backgroundColor: activity.color + '20' }}>
                    <activity.icon size={16} color={activity.color} />
                  </div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className="activity-time">
                      {activity.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Ideas */}
          <div className="top-ideas-section">
            <div className="section-header">
              <h3>Top Performing Ideas</h3>
              <Filter size={16} />
            </div>
            <div className="top-ideas-list">
              {topPerformingIdeas.map((idea) => (
                <div key={idea.id} className="top-idea-item">
                  <div className="idea-rank">
                    <span className="rank-number">#{topPerformingIdeas.indexOf(idea) + 1}</span>
                  </div>
                  <div className="idea-info">
                    <h4>{idea.title}</h4>
                    <div className="idea-metrics">
                      <span className="score-badge" style={{ backgroundColor: getScoreColor(idea.score) + '20', color: getScoreColor(idea.score) }}>
                        {idea.score}/100
                      </span>
                      <span className="category-badge">{idea.category}</span>
                    </div>
                  </div>
                  <button className="view-btn" onClick={() => onViewReport(idea)}>
                    <Eye size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-right">
          {/* Monthly Trends Chart */}
          <div className="trends-section">
            <div className="section-header">
              <h3>Monthly Trends</h3>
              <div className="trend-controls">
                <button className="trend-btn active">Validations</button>
                <button className="trend-btn">Revenue</button>
                <button className="trend-btn">Scores</button>
              </div>
            </div>
            <div className="trends-chart">
              <div className="chart-bars">
                {monthlyTrends.map((trend, index) => (
                  <div key={index} className="chart-bar">
                    <div className="bar-tooltip">
                      <strong>{trend.validations}</strong> validations
                      <br />
                      Avg: {trend.avgScore}/100
                    </div>
                    <div 
                      className="bar-fill" 
                      style={{ 
                        height: `${(trend.validations / Math.max(...monthlyTrends.map(t => t.validations))) * 100}%`,
                        backgroundColor: getProgressColor(trend.avgScore)
                      }}
                    ></div>
                    <span className="bar-label">{trend.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <div className="section-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="actions-grid">
              <button className="action-card" onClick={onNewValidation}>
                <Rocket size={24} />
                <span>New Validation</span>
              </button>
              <button className="action-card">
                <Users size={24} />
                <span>Invite Team</span>
              </button>
              <button className="action-card">
                <Download size={24} />
                <span>Export Report</span>
              </button>
              <button className="action-card">
                <Share2 size={24} />
                <span>Share Dashboard</span>
              </button>
            </div>
          </div>

          {/* Team Overview */}
          <div className="team-overview-section">
            <div className="section-header">
              <h3>Team Overview</h3>
              <span className="team-count">{stats.teamMembers} members</span>
            </div>
            <div className="team-stats">
              <div className="team-stat">
                <div className="stat-circle" style={{ background: `conic-gradient(#10b981 ${stats.completionRate * 3.6}deg, #e5e7eb 0deg)` }}>
                  <span>{stats.completionRate}%</span>
                </div>
                <p>Completion Rate</p>
              </div>
              <div className="team-stat">
                <div className="stat-circle" style={{ background: `conic-gradient(#667eea ${(stats.successRate / 100) * 360}deg, #e5e7eb 0deg)` }}>
                  <span>{stats.successRate}%</span>
                </div>
                <p>Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Ideas Grid */}
      <div className="ideas-section">
        <div className="section-header">
          <h3>Your Saved Ideas</h3>
          <div className="ideas-controls">
            <input 
              type="text" 
              placeholder="Search ideas..." 
              className="search-input"
            />
            <select className="filter-select">
              <option value="all">All Ideas</option>
              <option value="excellent">Excellent (80+)</option>
              <option value="good">Good (60-79)</option>
              <option value="needs-work">Needs Work (&lt;60)</option>
            </select>
          </div>
        </div>

        <div className="ideas-grid">
          {savedIdeas.map((idea) => (
            <div key={idea.id} className="idea-card enhanced">
              <div className="idea-header">
                <div className="idea-title">
                  <h4>{idea.title}</h4>
                  <span className="idea-category">{idea.category}</span>
                </div>
                <div className="idea-score" style={{ color: getScoreColor(idea.score) }}>
                  <span className="score-number">{idea.score}</span>
                  <span className="score-label">/100</span>
                </div>
              </div>

              <div className="idea-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${idea.score}%`,
                      backgroundColor: getScoreColor(idea.score)
                    }}
                  ></div>
                </div>
                <span className="progress-label">{getScoreLabel(idea.score)}</span>
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
                  onClick={() => console.log('Edit functionality to be implemented')}
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
      </div>
    </div>
  );
};

export default Dashboard;
