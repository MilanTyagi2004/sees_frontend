import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Globe, Calendar, Filter, Download, RefreshCw, Eye, EyeOff } from 'lucide-react';

const TrendsDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6m');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [isLoading, setLoading] = useState(false);
  const [trendsData, setTrendsData] = useState(null);

  useEffect(() => {
    loadTrendsData();
  }, [selectedTimeframe, selectedIndustry]);

  const loadTrendsData = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrendsData(generateMockTrendsData());
      setLoading(false);
    }, 1500);
  };

  const generateMockTrendsData = () => {
    return {
      marketSize: {
        current: 45.2,
        previous: 38.7,
        growth: 16.8
      },
      searchVolume: {
        total: 2840000,
        growth: 23.5,
        topKeywords: [
          { keyword: 'AI automation', volume: 450000, trend: 'up' },
          { keyword: 'business validation', volume: 320000, trend: 'up' },
          { keyword: 'startup tools', volume: 280000, trend: 'up' },
          { keyword: 'market research', volume: 250000, trend: 'down' },
          { keyword: 'idea validation', volume: 180000, trend: 'up' }
        ]
      },
      competitorActivity: [
        { name: 'Competitor A', funding: 15.2, employees: 45, growth: 12.3 },
        { name: 'Competitor B', funding: 8.7, employees: 28, growth: 8.9 },
        { name: 'Competitor C', funding: 22.1, employees: 67, growth: 15.7 }
      ],
      industryTrends: [
        { category: 'SaaS', growth: 18.5, marketShare: 35.2 },
        { category: 'Mobile Apps', growth: 12.3, marketShare: 28.7 },
        { category: 'E-commerce', growth: 15.8, marketShare: 22.1 },
        { category: 'Fintech', growth: 22.4, marketShare: 14.0 }
      ],
      geographicData: [
        { region: 'North America', marketShare: 42.3, growth: 16.2 },
        { region: 'Europe', marketShare: 28.7, growth: 14.8 },
        { region: 'Asia Pacific', marketShare: 19.5, growth: 21.3 },
        { region: 'Others', marketShare: 9.5, growth: 12.1 }
      ],
      predictions: {
        nextQuarter: { growth: 18.2, confidence: 87 },
        nextYear: { growth: 24.7, confidence: 76 },
        marketSaturation: 34.2
      }
    };
  };

  const timeframes = [
    { value: '1m', label: '1 Month' },
    { value: '3m', label: '3 Months' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' },
    { value: '2y', label: '2 Years' }
  ];

  const industries = [
    { value: 'all', label: 'All Industries' },
    { value: 'saas', label: 'SaaS' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'fintech', label: 'Fintech' },
    { value: 'healthtech', label: 'Health Tech' }
  ];

  if (!trendsData) {
    return (
      <div className="trends-dashboard">
        <div className="loading-state">
          <RefreshCw size={32} className="spinner" />
          <p>Loading market trends...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trends-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Market Trends Dashboard</h1>
          <p>Real-time market intelligence and trend analysis</p>
        </div>
        <div className="header-controls">
          <div className="control-group">
            <Filter size={16} />
            <select 
              value={selectedTimeframe} 
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="control-select"
            >
              {timeframes.map(tf => (
                <option key={tf.value} value={tf.value}>{tf.label}</option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <Globe size={16} />
            <select 
              value={selectedIndustry} 
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="control-select"
            >
              {industries.map(ind => (
                <option key={ind.value} value={ind.value}>{ind.label}</option>
              ))}
            </select>
          </div>
          <button onClick={loadTrendsData} className="refresh-btn" disabled={isLoading}>
            <RefreshCw size={16} className={isLoading ? 'spinner' : ''} />
          </button>
          <button className="download-btn">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Market Overview */}
        <div className="dashboard-card market-overview">
          <div className="card-header">
            <h3>Market Overview</h3>
            <BarChart3 size={20} color="#667eea" />
          </div>
          <div className="market-stats">
            <div className="stat-item">
              <div className="stat-value">${trendsData.marketSize.current}B</div>
              <div className="stat-label">Current Market Size</div>
              <div className="stat-change positive">
                <TrendingUp size={14} />
                +{trendsData.marketSize.growth}%
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{trendsData.searchVolume.total.toLocaleString()}</div>
              <div className="stat-label">Monthly Searches</div>
              <div className="stat-change positive">
                <TrendingUp size={14} />
                +{trendsData.searchVolume.growth}%
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{trendsData.predictions.nextYear.growth}%</div>
              <div className="stat-label">Projected Growth</div>
              <div className="stat-change positive">
                <TrendingUp size={14} />
                Next Year
              </div>
            </div>
          </div>
        </div>

        {/* Top Keywords */}
        <div className="dashboard-card keywords-card">
          <div className="card-header">
            <h3>Top Trending Keywords</h3>
            <TrendingUp size={20} color="#10b981" />
          </div>
          <div className="keywords-list">
            {trendsData.searchVolume.topKeywords.map((keyword, index) => (
              <div key={index} className="keyword-item">
                <div className="keyword-rank">#{index + 1}</div>
                <div className="keyword-content">
                  <div className="keyword-text">{keyword.keyword}</div>
                  <div className="keyword-volume">{keyword.volume.toLocaleString()} searches</div>
                </div>
                <div className={`keyword-trend ${keyword.trend}`}>
                  {keyword.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Trends */}
        <div className="dashboard-card industry-trends">
          <div className="card-header">
            <h3>Industry Growth</h3>
            <PieChart size={20} color="#f59e0b" />
          </div>
          <div className="industry-chart">
            {trendsData.industryTrends.map((industry, index) => (
              <div key={index} className="industry-item">
                <div className="industry-info">
                  <div className="industry-name">{industry.category}</div>
                  <div className="industry-share">{industry.marketShare}% market share</div>
                </div>
                <div className="industry-growth">
                  <div className="growth-bar">
                    <div 
                      className="growth-fill" 
                      style={{ width: `${industry.growth}%` }}
                    ></div>
                  </div>
                  <div className="growth-value">+{industry.growth}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="dashboard-card geographic-card">
          <div className="card-header">
            <h3>Geographic Distribution</h3>
            <Globe size={20} color="#8b5cf6" />
          </div>
          <div className="geographic-chart">
            {trendsData.geographicData.map((region, index) => (
              <div key={index} className="region-item">
                <div className="region-info">
                  <div className="region-name">{region.region}</div>
                  <div className="region-share">{region.marketShare}%</div>
                </div>
                <div className="region-growth">
                  <div className="growth-indicator">
                    <TrendingUp size={12} />
                    +{region.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Activity */}
        <div className="dashboard-card competitor-activity">
          <div className="card-header">
            <h3>Competitor Activity</h3>
            <BarChart3 size={20} color="#ef4444" />
          </div>
          <div className="competitor-list">
            {trendsData.competitorActivity.map((competitor, index) => (
              <div key={index} className="competitor-item">
                <div className="competitor-info">
                  <div className="competitor-name">{competitor.name}</div>
                  <div className="competitor-details">
                    ${competitor.funding}M funding • {competitor.employees} employees
                  </div>
                </div>
                <div className="competitor-growth">
                  <div className="growth-value">+{competitor.growth}%</div>
                  <div className="growth-label">Growth</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Predictions */}
        <div className="dashboard-card predictions-card">
          <div className="card-header">
            <h3>Market Predictions</h3>
            <Calendar size={20} color="#06b6d4" />
          </div>
          <div className="predictions-content">
            <div className="prediction-item">
              <div className="prediction-period">Next Quarter</div>
              <div className="prediction-value">+{trendsData.predictions.nextQuarter.growth}%</div>
              <div className="prediction-confidence">
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill" 
                    style={{ width: `${trendsData.predictions.nextQuarter.confidence}%` }}
                  ></div>
                </div>
                <span>{trendsData.predictions.nextQuarter.confidence}% confidence</span>
              </div>
            </div>
            <div className="prediction-item">
              <div className="prediction-period">Next Year</div>
              <div className="prediction-value">+{trendsData.predictions.nextYear.growth}%</div>
              <div className="prediction-confidence">
                <div className="confidence-bar">
                  <div 
                    className="confidence-fill" 
                    style={{ width: `${trendsData.predictions.nextYear.confidence}%` }}
                  ></div>
                </div>
                <span>{trendsData.predictions.nextYear.confidence}% confidence</span>
              </div>
            </div>
            <div className="prediction-item">
              <div className="prediction-period">Market Saturation</div>
              <div className="prediction-value">{trendsData.predictions.marketSaturation}%</div>
              <div className="prediction-note">Current saturation level</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsDashboard;
