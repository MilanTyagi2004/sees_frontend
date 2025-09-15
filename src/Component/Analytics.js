import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Award,
  Calendar,
  Download,
  Activity
} from 'lucide-react';

import './Analytics.css';

const Analytics = ({ user }) => {
  const [analyticsData, setAnalyticsData] = useState({
    totalValidations: 0,
    successRate: 0,
    avgScore: 0,
    monthlyTrend: [],
    categoryBreakdown: [],
    scoreDistribution: [],
    topPerformingIdeas: [],
    recentActivity: []
  });
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minScore, setMinScore] = useState(0);
  const [trendMetric, setTrendMetric] = useState('validations'); // 'validations' | 'avgScore'
  const [showCumulative, setShowCumulative] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadAnalyticsData = useCallback(async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const rawIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
    const savedIdeas = rawIdeas.filter(idea => {
      const categoryOk = selectedCategory === 'all' || idea.category === selectedCategory;
      const scoreOk = (idea.score || 0) >= Number(minScore || 0);
      return categoryOk && scoreOk;
    });
    
    // Calculate analytics
    const totalValidations = savedIdeas.length;
    const successfulValidations = savedIdeas.filter(idea => idea.score >= 70).length;
    const avgScore = totalValidations > 0 ? 
      savedIdeas.reduce((sum, idea) => sum + idea.score, 0) / totalValidations : 0;

    // Monthly trend data
    const monthlyTrend = generateMonthlyTrend(savedIdeas, timeRange, showCumulative);
    
    // Category breakdown
    const categoryBreakdown = generateCategoryBreakdown(savedIdeas);
    
    // Score distribution
    const scoreDistribution = generateScoreDistribution(savedIdeas);
    
    // Top performing ideas
    const topPerformingIdeas = savedIdeas
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    
    // Recent activity
    const recentActivity = generateRecentActivity(savedIdeas);

    setAnalyticsData({
      totalValidations,
      successRate: totalValidations > 0 ? Math.round((successfulValidations / totalValidations) * 100) : 0,
      avgScore: Math.round(avgScore),
      monthlyTrend,
      categoryBreakdown,
      scoreDistribution,
      topPerformingIdeas,
      recentActivity
    });
    
    setLoading(false);
  }, [timeRange, selectedCategory, minScore, showCumulative]);

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange, loadAnalyticsData]);

  const generateMonthlyTrend = (ideas, range, cumulative) => {
    const months = [];
    const now = new Date();
    const monthCount = range === '3months' ? 3 : range === '6months' ? 6 : 12;
    let runningTotal = 0;
    
    for (let i = monthCount - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const monthIdeas = ideas.filter(idea => {
        const ideaDate = new Date(idea.date);
        return ideaDate.getMonth() === date.getMonth() && 
               ideaDate.getFullYear() === date.getFullYear();
      });
      
      runningTotal += monthIdeas.length;
      months.push({
        month: monthName,
        validations: cumulative ? runningTotal : monthIdeas.length,
        avgScore: monthIdeas.length > 0 ? 
          Math.round(monthIdeas.reduce((sum, idea) => sum + idea.score, 0) / monthIdeas.length) : 0
      });
    }
    
    return months;
  };

  const generateCategoryBreakdown = (ideas) => {
    const categories = {};
    ideas.forEach(idea => {
      categories[idea.category] = (categories[idea.category] || 0) + 1;
    });
    
    return Object.entries(categories).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / ideas.length) * 100)
    }));
  };

  const generateScoreDistribution = (ideas) => {
    const ranges = [
      { range: '0-20', min: 0, max: 20, color: '#ef4444' },
      { range: '21-40', min: 21, max: 40, color: '#f97316' },
      { range: '41-60', min: 41, max: 60, color: '#f59e0b' },
      { range: '61-80', min: 61, max: 80, color: '#10b981' },
      { range: '81-100', min: 81, max: 100, color: '#059669' }
    ];
    
    return ranges.map(range => ({
      ...range,
      count: ideas.filter(idea => idea.score >= range.min && idea.score <= range.max).length
    }));
  };

  const generateRecentActivity = (ideas) => {
    return ideas
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10)
      .map(idea => ({
        id: idea.id,
        name: idea.productName,
        score: idea.score,
        date: idea.date,
        type: 'validation'
      }));
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const categories = useMemo(() => {
    const raw = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
    return Array.from(new Set(raw.map(i => i.category).filter(Boolean)));
  }, []);

  const headlineInsight = useMemo(() => {
    const m = analyticsData.monthlyTrend;
    if (!m || m.length < 2) return '';
    const last = m[m.length - 1];
    const prev = m[m.length - 2];
    const metric = trendMetric === 'avgScore' ? 'avg score' : 'validations';
    const lastVal = trendMetric === 'avgScore' ? last.avgScore : last.validations;
    const prevVal = trendMetric === 'avgScore' ? prev.avgScore : prev.validations;
    const delta = prevVal === 0 ? (lastVal > 0 ? 100 : 0) : Math.round(((lastVal - prevVal) / prevVal) * 100);
    const dir = delta >= 0 ? 'up' : 'down';
    return `${dir === 'up' ? '▲' : '▼'} ${Math.abs(delta)}% ${dir} vs last month`;
  }, [analyticsData, trendMetric]);

  const exportCsv = () => {
    const rows = [
      ['Month', 'Validations', 'Average Score'],
      ...analyticsData.monthlyTrend.map(m => [m.month, m.validations, m.avgScore])
    ];
    const csv = rows.map(r => r.map(String).map(v => v.includes(',') ? `"${v}"` : v).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'analytics_export.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="analytics loading">
        <div className="loading-content">
          <Activity size={48} className="loading-icon" />
          <h3>Loading Analytics...</h3>
          <p>Crunching the numbers for your insights</p>
        </div>
      </div>
    );
  }

  const isEmpty = analyticsData.totalValidations === 0;

  return (
    <div className="analytics">
      <div className="analytics-header">
        <div className="header-content">
          <h2>Analytics Dashboard</h2>
          <p>Track your validation performance and insights</p>
        </div>
        <div className="header-actions">
          <div className="filters">
            <select 
              className="time-range-select"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              aria-label="Time range"
            >
              <option value="3months">Last 3 months</option>
              <option value="6months">Last 6 months</option>
              <option value="12months">Last 12 months</option>
            </select>
            <select
              className="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Category filter"
            >
              <option value="all">All categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="score-filter">
              <label htmlFor="minScore">Min score</label>
              <input
                id="minScore"
                type="number"
                min="0"
                max="100"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
              />
            </div>
            <button className="btn-secondary" onClick={exportCsv} title="Export monthly trend as CSV">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="headline-insight" role="status">{headlineInsight}</div>

      <div className="analytics-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>{analyticsData.totalValidations}</h3>
            <p>Total Validations</p>
            <span className="stat-trend positive">
              <TrendingUp size={14} />
              +12% this month
            </span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>{analyticsData.successRate}%</h3>
            <p>Success Rate</p>
            <span className="stat-trend positive">
              <TrendingUp size={14} />
              +5% this month
            </span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <BarChart3 size={24} />
          </div>
          <div className="stat-content">
            <h3>{analyticsData.avgScore}</h3>
            <p>Average Score</p>
            <span className="stat-trend positive">
              <TrendingUp size={14} />
              +3 points
            </span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>{analyticsData.monthlyTrend[analyticsData.monthlyTrend.length - 1]?.validations || 0}</h3>
            <p>This Month</p>
            <span className="stat-trend positive">
              <TrendingUp size={14} />
              +8% vs last month
            </span>
          </div>
        </div>
      </div>

      <div className="analytics-charts">
        <div className="chart-container">
          <div className="chart-header">
            <h3>Monthly Trend</h3>
            <p>Validation activity over time</p>
            <div className="chart-controls">
              <div className="toggle-group" role="group" aria-label="Trend metric">
                <button
                  className={`toggle ${trendMetric === 'validations' ? 'active' : ''}`}
                  onClick={() => setTrendMetric('validations')}
                >
                  Validations
                </button>
                <button
                  className={`toggle ${trendMetric === 'avgScore' ? 'active' : ''}`}
                  onClick={() => setTrendMetric('avgScore')}
                >
                  Avg Score
                </button>
              </div>
              <label className="checkbox">
                <input type="checkbox" checked={showCumulative} onChange={(e) => setShowCumulative(e.target.checked)} />
                Cumulative
              </label>
            </div>
          </div>
          <div className="chart-content">
            <div className="trend-chart">
              {analyticsData.monthlyTrend.map((month, index) => (
                <div key={index} className="trend-bar">
                  <div 
                    className="bar"
                    style={{ 
                      height: `${Math.max(((trendMetric === 'avgScore' ? month.avgScore : month.validations) || 0) * (trendMetric === 'avgScore' ? 1 : 10), 20)}px`,
                      backgroundColor: trendMetric === 'avgScore' ? '#10b981' : '#667eea'
                    }}
                    title={`${month.month}: ${trendMetric === 'avgScore' ? month.avgScore : month.validations}`}
                  ></div>
                  <span className="bar-label">{month.month}</span>
                  <span className="bar-value">{trendMetric === 'avgScore' ? month.avgScore : month.validations}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3>Category Breakdown</h3>
            <p>Ideas by category</p>
          </div>
          <div className="chart-content">
            <div className="category-chart">
              {analyticsData.categoryBreakdown.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{category.category}</span>
                    <span className="category-count">{category.count}</span>
                  </div>
                  <div className="category-bar">
                    <div 
                      className="category-fill"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)`
                      }}
                    ></div>
                  </div>
                  <span className="category-percentage">{category.percentage}%</span>
                </div>
              ))}
              {analyticsData.categoryBreakdown.length === 0 && (
                <div className="empty-state small">No categories in the selected filters.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-details">
        <div className="details-section">
          <div className="section-header">
            <h3>Top Performing Ideas</h3>
            <p>Your highest-scoring validations</p>
          </div>
          <div className="top-ideas">
            {analyticsData.topPerformingIdeas.map((idea, index) => (
              <div key={idea.id} className="top-idea-item">
                <div className="idea-rank">#{index + 1}</div>
                <div className="idea-info">
                  <h4>{idea.productName}</h4>
                  <p>{idea.category}</p>
                </div>
                <div className="idea-score" style={{ color: getScoreColor(idea.score) }}>
                  {idea.score}
                </div>
              </div>
            ))}
            {analyticsData.topPerformingIdeas.length === 0 && (
              <div className="empty-state">No ideas match the current filters.</div>
            )}
          </div>
        </div>

        <div className="details-section">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <p>Your latest validations</p>
          </div>
          <div className="recent-activity">
            {analyticsData.recentActivity.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <Target size={16} />
                </div>
                <div className="activity-content">
                  <h4>{activity.name}</h4>
                  <p>Validated with score of {activity.score}</p>
                </div>
                <div className="activity-time">
                  {new Date(activity.date).toLocaleDateString()}
                </div>
              </div>
            ))}
            {analyticsData.recentActivity.length === 0 && (
              <div className="empty-state">No recent activity found.</div>
            )}
          </div>
        </div>
      </div>

      {isEmpty && (
        <div className="blank-state">
          <h3>No analytics yet</h3>
          <p>Validate some ideas to populate your dashboard. Your actions will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;

