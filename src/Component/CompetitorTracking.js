import React, { useState, useEffect } from 'react';
import { Search, Plus, Bell, Eye, EyeOff, TrendingUp, TrendingDown, DollarSign, Users, Globe, Calendar, AlertTriangle, CheckCircle, XCircle, Filter, Download, RefreshCw } from 'lucide-react';

const CompetitorTracking = () => {
  const [competitors, setCompetitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingCompetitor, setIsAddingCompetitor] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    website: '',
    industry: '',
    description: ''
  });
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCompetitors();
    loadAlerts();
  }, []);

  const loadCompetitors = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCompetitors(generateMockCompetitors());
      setIsLoading(false);
    }, 1000);
  };

  const loadAlerts = () => {
    setAlerts([
      {
        id: 1,
        type: 'pricing',
        competitor: 'Competitor A',
        message: 'Reduced pricing by 20% on premium plans',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        severity: 'high'
      },
      {
        id: 2,
        type: 'funding',
        competitor: 'Competitor B',
        message: 'Raised $15M Series A funding',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        severity: 'medium'
      },
      {
        id: 3,
        type: 'feature',
        competitor: 'Competitor C',
        message: 'Launched new AI-powered analytics feature',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        severity: 'low'
      }
    ]);
  };

  const generateMockCompetitors = () => {
    return [
      {
        id: 1,
        name: 'Competitor A',
        website: 'competitor-a.com',
        industry: 'SaaS',
        description: 'Leading platform for business automation',
        funding: 25.5,
        employees: 120,
        marketShare: 18.5,
        growth: 12.3,
        pricing: { starter: 29, pro: 99, enterprise: 299 },
        features: ['Analytics', 'Automation', 'Integrations'],
        lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'active',
        alerts: 3
      },
      {
        id: 2,
        name: 'Competitor B',
        website: 'competitor-b.com',
        industry: 'Mobile Apps',
        description: 'Mobile-first business solutions',
        funding: 15.2,
        employees: 85,
        marketShare: 12.8,
        growth: 8.9,
        pricing: { starter: 19, pro: 79, enterprise: 199 },
        features: ['Mobile App', 'Offline Sync', 'Push Notifications'],
        lastUpdate: new Date(Date.now() - 5 * 60 * 60 * 1000),
        status: 'active',
        alerts: 1
      },
      {
        id: 3,
        name: 'Competitor C',
        website: 'competitor-c.com',
        industry: 'E-commerce',
        description: 'E-commerce platform with AI features',
        funding: 42.1,
        employees: 200,
        marketShare: 22.3,
        growth: 15.7,
        pricing: { starter: 39, pro: 129, enterprise: 399 },
        features: ['AI Analytics', 'Inventory Management', 'Multi-channel'],
        lastUpdate: new Date(Date.now() - 24 * 60 * 60 * 1000),
        status: 'active',
        alerts: 2
      }
    ];
  };

  const handleAddCompetitor = () => {
    if (!newCompetitor.name || !newCompetitor.website) return;

    const competitor = {
      id: Date.now(),
      ...newCompetitor,
      funding: 0,
      employees: 0,
      marketShare: 0,
      growth: 0,
      pricing: { starter: 0, pro: 0, enterprise: 0 },
      features: [],
      lastUpdate: new Date(),
      status: 'active',
      alerts: 0
    };

    setCompetitors(prev => [...prev, competitor]);
    setNewCompetitor({ name: '', website: '', industry: '', description: '' });
    setIsAddingCompetitor(false);
  };

  const toggleCompetitorStatus = (id) => {
    setCompetitors(prev => prev.map(comp => 
      comp.id === id ? { ...comp, status: comp.status === 'active' ? 'paused' : 'active' } : comp
    ));
  };

  const filteredCompetitors = competitors.filter(competitor =>
    competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    competitor.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <XCircle size={16} />;
      case 'medium': return <AlertTriangle size={16} />;
      case 'low': return <CheckCircle size={16} />;
      default: return <CheckCircle size={16} />;
    }
  };

  return (
    <div className="competitor-tracking">
      <div className="tracking-header">
        <div className="header-content">
          <h1>Competitor Tracking</h1>
          <p>Monitor your competitors' activities, pricing, and market moves</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setIsAddingCompetitor(true)}
            className="add-competitor-btn"
          >
            <Plus size={16} />
            Add Competitor
          </button>
          <button onClick={loadCompetitors} className="refresh-btn" disabled={isLoading}>
            <RefreshCw size={16} className={isLoading ? 'spinner' : ''} />
          </button>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="alerts-section">
        <div className="section-header">
          <h3>Recent Alerts</h3>
          <Bell size={20} color="#f59e0b" />
        </div>
        <div className="alerts-list">
          {alerts.map(alert => (
            <div key={alert.id} className="alert-item">
              <div className="alert-icon" style={{ color: getSeverityColor(alert.severity) }}>
                {getSeverityIcon(alert.severity)}
              </div>
              <div className="alert-content">
                <div className="alert-message">{alert.message}</div>
                <div className="alert-meta">
                  <span className="alert-competitor">{alert.competitor}</span>
                  <span className="alert-time">{alert.timestamp.toLocaleString()}</span>
                </div>
              </div>
              <div className="alert-type">{alert.type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="search-section">
        <div className="search-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search competitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-controls">
          <Filter size={16} />
          <select className="filter-select">
            <option value="all">All Industries</option>
            <option value="saas">SaaS</option>
            <option value="mobile">Mobile Apps</option>
            <option value="ecommerce">E-commerce</option>
          </select>
        </div>
      </div>

      {/* Competitors Grid */}
      <div className="competitors-grid">
        {filteredCompetitors.map(competitor => (
          <div key={competitor.id} className="competitor-card">
            <div className="competitor-header">
              <div className="competitor-info">
                <h3>{competitor.name}</h3>
                <p>{competitor.website}</p>
                <span className="industry-tag">{competitor.industry}</span>
              </div>
              <div className="competitor-controls">
                <button 
                  onClick={() => toggleCompetitorStatus(competitor.id)}
                  className={`status-btn ${competitor.status}`}
                >
                  {competitor.status === 'active' ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                {competitor.alerts > 0 && (
                  <div className="alert-badge">{competitor.alerts}</div>
                )}
              </div>
            </div>

            <div className="competitor-metrics">
              <div className="metric-item">
                <DollarSign size={16} color="#10b981" />
                <div className="metric-content">
                  <div className="metric-value">${competitor.funding}M</div>
                  <div className="metric-label">Funding</div>
                </div>
              </div>
              <div className="metric-item">
                <Users size={16} color="#667eea" />
                <div className="metric-content">
                  <div className="metric-value">{competitor.employees}</div>
                  <div className="metric-label">Employees</div>
                </div>
              </div>
              <div className="metric-item">
                <TrendingUp size={16} color="#f59e0b" />
                <div className="metric-content">
                  <div className="metric-value">+{competitor.growth}%</div>
                  <div className="metric-label">Growth</div>
                </div>
              </div>
            </div>

            <div className="competitor-details">
              <div className="pricing-section">
                <h4>Pricing</h4>
                <div className="pricing-tiers">
                  <div className="pricing-tier">
                    <span>Starter:</span>
                    <span>${competitor.pricing.starter}/mo</span>
                  </div>
                  <div className="pricing-tier">
                    <span>Pro:</span>
                    <span>${competitor.pricing.pro}/mo</span>
                  </div>
                  <div className="pricing-tier">
                    <span>Enterprise:</span>
                    <span>${competitor.pricing.enterprise}/mo</span>
                  </div>
                </div>
              </div>

              <div className="features-section">
                <h4>Key Features</h4>
                <div className="features-list">
                  {competitor.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="competitor-footer">
              <div className="last-update">
                <Calendar size={14} />
                <span>Updated {competitor.lastUpdate.toLocaleDateString()}</span>
              </div>
              <div className="market-share">
                <Globe size={14} />
                <span>{competitor.marketShare}% market share</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Competitor Modal */}
      {isAddingCompetitor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Competitor</h3>
              <button 
                onClick={() => setIsAddingCompetitor(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  value={newCompetitor.name}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter company name"
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  value={newCompetitor.website}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://example.com"
                />
              </div>
              <div className="form-group">
                <label>Industry</label>
                <select
                  value={newCompetitor.industry}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, industry: e.target.value }))}
                >
                  <option value="">Select industry</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Mobile Apps">Mobile Apps</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Health Tech">Health Tech</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newCompetitor.description}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the competitor"
                  rows={3}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setIsAddingCompetitor(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddCompetitor}
                className="save-btn"
              >
                Add Competitor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitorTracking;
