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
  const CountUp = ({ value, duration = 700 }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
      let raf;
      const start = performance.now();
      const from = 0;
      const to = Number(value) || 0;
      const animate = (now) => {
        const elapsed = now - start;
        const t = Math.min(1, elapsed / duration);
        const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOutQuad
        setDisplay(Math.round(from + (to - from) * eased));
        if (t < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(raf);
    }, [value, duration]);
    return <>{display}</>;
  };
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
        <div className="dashboard-header sticky-header">
          <div className="user-info">
            <div className="user-avatar skeleton-avatar skeleton"></div>
            <div className="user-details">
              <div className="skeleton-text lg skeleton" style={{ width: '200px' }}></div>
              <div className="skeleton-text sm skeleton" style={{ width: '260px', marginTop: '8px' }}></div>
            </div>
          </div>
          <div className="dashboard-actions">
            <div className="timeframe-selector">
              <div className="skeleton-text skeleton" style={{ width: '140px', height: '36px', borderRadius: '8px' }}></div>
            </div>
            <div className="skeleton-text skeleton" style={{ width: '140px', height: '40px', borderRadius: '8px' }}></div>
            <div className="skeleton-text skeleton" style={{ width: '120px', height: '40px', borderRadius: '8px' }}></div>
          </div>
        </div>

        <div className="stats-grid">
          {[1,2,3,4].map(i => (
            <div key={i} className="stat-card glass-card skeleton-card">
              <div className="skeleton-text lg" style={{ width: '40%' }}></div>
              <div className="skeleton-text" style={{ width: '70%', marginTop: '12px' }}></div>
              <div className="skeleton-bar" style={{ marginTop: '16px' }}></div>
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          <div className="content-left">
            <div className="activity-section skeleton-card">
              <div className="section-header">
                <div className="skeleton-text" style={{ width: '160px' }}></div>
                <div className="skeleton-text" style={{ width: '80px' }}></div>
              </div>
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="activity-item">
                  <div className="skeleton-avatar"></div>
                  <div style={{ flex: 1 }}>
                    <div className="skeleton-text" style={{ width: '60%' }}></div>
                    <div className="skeleton-text sm" style={{ width: '40%', marginTop: '8px' }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="top-ideas-section skeleton-card">
              <div className="section-header">
                <div className="skeleton-text" style={{ width: '180px' }}></div>
                <div className="skeleton-text" style={{ width: '24px', height: '24px', borderRadius: '6px' }}></div>
              </div>
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="top-idea-item">
                  <div className="skeleton-text" style={{ width: '32px', height: '32px', borderRadius: '8px' }}></div>
                  <div style={{ flex: 1 }}>
                    <div className="skeleton-text" style={{ width: '50%' }}></div>
                    <div className="skeleton-text sm" style={{ width: '30%', marginTop: '8px' }}></div>
                  </div>
                  <div className="skeleton-text" style={{ width: '36px', height: '32px', borderRadius: '6px' }}></div>
                </div>
              ))}
            </div>
          </div>
          <div className="content-right">
            <div className="trends-section skeleton-card" style={{ height: '300px' }}></div>
            <div className="quick-actions-section skeleton-card" style={{ height: '160px' }}></div>
            <div className="team-overview-section skeleton-card" style={{ height: '200px' }}></div>
          </div>
        </div>

        <div className="ideas-section skeleton-card" style={{ minHeight: '200px' }}></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Enhanced Header */}
      <div className="dashboard-header sticky-header">
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
              aria-label="Select timeframe"
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
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3><CountUp value={stats.totalValidations} /></h3>
            <p>Total Validations</p>
            <div className="stat-trend positive">
              <ArrowUpRight size={16} />
              +{stats.thisMonth} this month
            </div>
            <div className="mini-spark">
              <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="spark-svg">
                <polyline fill="none" vectorEffect="non-scaling-stroke" points="0,18 12,14 24,16 36,10 48,12 60,8 72,9 84,6 96,4" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3><CountUp value={stats.successRate} />%</h3>
            <p>Success Rate</p>
            <div className="stat-trend positive">
              <ArrowUpRight size={16} />
              +5% from last month
            </div>
            <div className="mini-spark">
              <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="spark-svg">
                <polyline fill="none" vectorEffect="non-scaling-stroke" points="0,20 12,18 24,16 36,14 48,12 60,10 72,9 84,8 96,6" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3><CountUp value={stats.avgScore} /></h3>
            <p>Average Score</p>
            <div className="stat-trend positive">
              <ArrowUpRight size={16} />
              +3 points
            </div>
            <div className="mini-spark">
              <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="spark-svg">
                <polyline fill="none" vectorEffect="non-scaling-stroke" points="0,14 12,12 24,10 36,12 48,11 60,9 72,8 84,10 96,9" />
              </svg>
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
            <div className="mini-spark">
              <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="spark-svg">
                <polyline fill="none" vectorEffect="non-scaling-stroke" points="0,22 12,19 24,20 36,16 48,14 60,15 72,12 84,10 96,8" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Filters */}
      <div className="sticky-filters" role="region" aria-label="Applied filters">
        <span className="applied-chip">Time: {selectedTimeframe} <button className="remove" aria-label="Clear timeframe filter" onClick={() => setSelectedTimeframe('30d')}>×</button></span>
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
              </div>
            </div>
            <div className="trends-chart line-chart">
              {monthlyTrends.length > 0 && (() => {
                const maxVal = Math.max(1, ...monthlyTrends.map(t => t.validations));
                const stepX = monthlyTrends.length > 1 ? 100 / (monthlyTrends.length - 1) : 100;
                const points = monthlyTrends.map((t, i) => `${i * stepX},${100 - (t.validations / maxVal) * 100}`).join(' ');
                return (
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="line-svg">
                    <polyline points={points} />
                    <defs>
                      <linearGradient id="trendGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity=".8" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity=".15" />
                      </linearGradient>
                    </defs>
                  </svg>
                );
              })()}
              <div className="line-labels">
                {monthlyTrends.map((t, i) => (
                  <span key={i} className="bar-label">{t.month}</span>
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
