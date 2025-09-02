import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  Target, 
  PieChart, 
  Download, 
  Share2, 
  Lightbulb, 
  AlertCircle, 
  CheckCircle,
  BarChart3,
  LineChart,
  Activity,
  Zap,
  Rocket,
  Star,
  Award,
  Clock,
  Eye,
  Settings,
  RefreshCw,
  Save,
  Play,
  Pause,
  SkipForward,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  Bell,
  BookOpen,
  Globe,
  Shield,
  Heart,
  Target as TargetIcon
} from 'lucide-react';

const FundingCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    teamSize: 1,
    runway: 12,
    growthRate: 20,
    targetValuation: 0,
    equityOffering: 20,
    customerLifetimeValue: 0,
    customerAcquisitionCost: 0,
    churnRate: 5,
    marketSize: 0,
    competitiveAdvantage: 50
  });

  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState('calculator');
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [investorInsights, setInvestorInsights] = useState([]);
  const [fundingHistory, setFundingHistory] = useState([]);

  useEffect(() => {
    calculateFunding();
    loadInvestorInsights();
    loadFundingHistory();
  }, [inputs]);

  const calculateFunding = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      const {
        monthlyRevenue,
        monthlyExpenses,
        teamSize,
        runway,
        growthRate,
        targetValuation,
        equityOffering,
        customerLifetimeValue,
        customerAcquisitionCost,
        churnRate,
        marketSize,
        competitiveAdvantage
      } = inputs;

      // Enhanced calculations
      const burnRate = monthlyExpenses - monthlyRevenue;
      const monthlyBurnRate = Math.max(0, burnRate);
      const fundingNeeded = monthlyBurnRate * runway;
      const currentRunway = monthlyRevenue > 0 ? (monthlyRevenue / monthlyBurnRate) * 12 : 0;
      const revenueMultiple = targetValuation > 0 ? targetValuation / (monthlyRevenue * 12) : 0;
      const equityValue = targetValuation * (equityOffering / 100);
      const avgSalary = 80000;
      const teamCosts = teamSize * avgSalary;
      const projectedRevenue = monthlyRevenue * Math.pow(1 + growthRate / 100, runway / 12);
      
      // Advanced metrics
      const ltv = customerLifetimeValue || (monthlyRevenue * 24);
      const cac = customerAcquisitionCost || (teamCosts / (monthlyRevenue * 12) * 1000);
      const ltvCacRatio = ltv / cac;
      const netRetentionRate = 100 - churnRate;
      const marketShare = marketSize > 0 ? (monthlyRevenue * 12) / marketSize * 100 : 0;
      
      // Funding stage determination
      let fundingStage = 'Pre-Seed';
      let stageColor = '#6b7280';
      if (monthlyRevenue > 10000) {
        fundingStage = 'Seed';
        stageColor = '#10b981';
      }
      if (monthlyRevenue > 50000) {
        fundingStage = 'Series A';
        stageColor = '#667eea';
      }
      if (monthlyRevenue > 200000) {
        fundingStage = 'Series B';
        stageColor = '#8b5cf6';
      }

      // Investor attractiveness score
      const attractivenessScore = calculateAttractivenessScore({
        ltvCacRatio,
        growthRate,
        netRetentionRate,
        marketShare,
        competitiveAdvantage,
        teamSize
      });

      // Generate scenarios
      const scenarioData = generateScenarios(inputs);
      setScenarios(scenarioData);

      setResults({
        fundingNeeded,
        monthlyBurnRate,
        currentRunway,
        revenueMultiple,
        equityValue,
        teamCosts,
        projectedRevenue,
        ltv,
        cac,
        ltvCacRatio,
        fundingStage,
        stageColor,
        netRetentionRate,
        marketShare,
        attractivenessScore,
        investorReturn: targetValuation > 0 ? 
          (targetValuation * (equityOffering / 100)) / fundingNeeded : 0,
        recommendations: generateRecommendations({
          fundingNeeded,
          monthlyBurnRate,
          ltvCacRatio,
          growthRate,
          teamSize,
          netRetentionRate,
          marketShare
        }),
        riskAssessment: generateRiskAssessment({
          burnRate,
          ltvCacRatio,
          churnRate,
          marketShare,
          teamSize
        })
      });
      setIsCalculating(false);
    }, 800);
  };

  const calculateAttractivenessScore = (metrics) => {
    let score = 0;
    
    // LTV:CAC Ratio (30% weight)
    if (metrics.ltvCacRatio >= 3) score += 30;
    else if (metrics.ltvCacRatio >= 2) score += 20;
    else if (metrics.ltvCacRatio >= 1) score += 10;
    
    // Growth Rate (25% weight)
    if (metrics.growthRate >= 50) score += 25;
    else if (metrics.growthRate >= 30) score += 20;
    else if (metrics.growthRate >= 15) score += 15;
    else if (metrics.growthRate >= 5) score += 10;
    
    // Net Retention (20% weight)
    if (metrics.netRetentionRate >= 95) score += 20;
    else if (metrics.netRetentionRate >= 90) score += 15;
    else if (metrics.netRetentionRate >= 80) score += 10;
    
    // Market Share (15% weight)
    if (metrics.marketShare >= 5) score += 15;
    else if (metrics.marketShare >= 2) score += 10;
    else if (metrics.marketShare >= 1) score += 5;
    
    // Competitive Advantage (10% weight)
    score += (metrics.competitiveAdvantage / 100) * 10;
    
    return Math.round(score);
  };

  const generateScenarios = (currentInputs) => {
    const scenarios = [
      {
        name: 'Conservative',
        description: 'Slow growth, lower burn',
        inputs: { ...currentInputs, growthRate: currentInputs.growthRate * 0.7, monthlyExpenses: currentInputs.monthlyExpenses * 0.9 }
      },
      {
        name: 'Aggressive',
        description: 'Fast growth, higher burn',
        inputs: { ...currentInputs, growthRate: currentInputs.growthRate * 1.5, monthlyExpenses: currentInputs.monthlyExpenses * 1.3 }
      },
      {
        name: 'Balanced',
        description: 'Moderate growth and burn',
        inputs: { ...currentInputs, growthRate: currentInputs.growthRate * 1.1, monthlyExpenses: currentInputs.monthlyExpenses * 1.05 }
      }
    ];
    return scenarios;
  };

  const generateRiskAssessment = (metrics) => {
    const risks = [];
    
    if (metrics.burnRate > 100000) {
      risks.push({
        level: 'high',
        title: 'High Burn Rate',
        description: 'Your burn rate is significantly high. Consider cost optimization.',
        impact: 'High',
        probability: 'Medium'
      });
    }
    
    if (metrics.ltvCacRatio < 3) {
      risks.push({
        level: 'medium',
        title: 'Low LTV:CAC Ratio',
        description: 'Customer acquisition costs are high relative to lifetime value.',
        impact: 'Medium',
        probability: 'High'
      });
    }
    
    if (metrics.churnRate > 10) {
      risks.push({
        level: 'high',
        title: 'High Churn Rate',
        description: 'Customer retention needs improvement.',
        impact: 'High',
        probability: 'High'
      });
    }
    
    return risks;
  };

  const loadInvestorInsights = () => {
    setInvestorInsights([
      {
        type: 'success',
        title: 'Strong Unit Economics',
        description: 'Your LTV:CAC ratio of 3.2 is attractive to investors.',
        icon: CheckCircle
      },
      {
        type: 'warning',
        title: 'Team Scaling',
        description: 'Consider team efficiency as you scale beyond 10 members.',
        icon: AlertCircle
      },
      {
        type: 'info',
        title: 'Market Opportunity',
        description: 'Your market share indicates room for growth.',
        icon: Lightbulb
      }
    ]);
  };

  const loadFundingHistory = () => {
    setFundingHistory([
      { month: 'Jan', amount: 0, stage: 'Pre-Seed' },
      { month: 'Feb', amount: 0, stage: 'Pre-Seed' },
      { month: 'Mar', amount: 50000, stage: 'Seed' },
      { month: 'Apr', amount: 75000, stage: 'Seed' },
      { month: 'May', amount: 100000, stage: 'Seed' },
      { month: 'Jun', amount: 150000, stage: 'Series A' }
    ]);
  };

  const generateRecommendations = (metrics) => {
    const recommendations = [];

    if (metrics.fundingNeeded > 1000000) {
      recommendations.push({
        type: 'warning',
        title: 'High Funding Requirement',
        message: 'Consider reducing burn rate or extending runway to lower funding needs.',
        icon: AlertCircle,
        priority: 'high'
      });
    }

    if (metrics.ltvCacRatio < 3) {
      recommendations.push({
        type: 'warning',
        title: 'Low LTV:CAC Ratio',
        message: 'Your customer acquisition cost is high relative to lifetime value. Focus on retention.',
        icon: AlertCircle,
        priority: 'high'
      });
    }

    if (metrics.growthRate > 50) {
      recommendations.push({
        type: 'success',
        title: 'Strong Growth Rate',
        message: 'Excellent growth rate! This will be attractive to investors.',
        icon: CheckCircle,
        priority: 'medium'
      });
    }

    if (metrics.netRetentionRate < 90) {
      recommendations.push({
        type: 'warning',
        title: 'Improve Customer Retention',
        message: 'Focus on reducing churn to improve unit economics.',
        icon: AlertCircle,
        priority: 'high'
      });
    }

    return recommendations;
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    setInputs(scenario.inputs);
  };

  const fundingStages = [
    { name: 'Pre-Seed', range: '$0-500K', equity: '10-20%', color: '#6b7280' },
    { name: 'Seed', range: '$500K-2M', equity: '15-25%', color: '#10b981' },
    { name: 'Series A', range: '$2M-15M', equity: '20-30%', color: '#667eea' },
    { name: 'Series B', range: '$15M-50M', equity: '15-25%', color: '#8b5cf6' }
  ];

  const tabs = [
    { id: 'calculator', label: 'Calculator', icon: Calculator },
    { id: 'scenarios', label: 'Scenarios', icon: BarChart3 },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'history', label: 'History', icon: LineChart }
  ];

  return (
    <div className="funding-calculator">
      {/* Enhanced Header */}
      <div className="calculator-header">
        <div className="header-content">
          <h1>Advanced Funding Calculator</h1>
          <p>Calculate funding needs, analyze scenarios, and get investor insights</p>
          <div className="header-stats">
            <span className="stat-badge">
              <Activity size={14} />
              Real-time calculations
            </span>
            <span className="stat-badge">
              <TargetIcon size={14} />
              Investor-ready metrics
            </span>
            <span className="stat-badge">
              <Shield size={14} />
              Risk assessment
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button className="action-btn">
            <Save size={16} />
            Save Scenario
          </button>
          <button className="action-btn">
            <Download size={16} />
            Export Report
          </button>
          <button className="action-btn">
            <Share2 size={16} />
            Share
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="calculator-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="calculator-content">
        {activeTab === 'calculator' && (
          <>
            {/* Inputs Section */}
            <div className="inputs-section">
              <div className="section-header">
                <h3>Business Metrics</h3>
                <div className="header-controls">
                  <button 
                    className={`advanced-toggle ${showAdvanced ? 'active' : ''}`}
                    onClick={() => setShowAdvanced(!showAdvanced)}
                  >
                    <Settings size={16} />
                    {showAdvanced ? 'Basic' : 'Advanced'}
                  </button>
                  <button className="reset-btn" onClick={() => setInputs({
                    monthlyRevenue: 0,
                    monthlyExpenses: 0,
                    teamSize: 1,
                    runway: 12,
                    growthRate: 20,
                    targetValuation: 0,
                    equityOffering: 20,
                    customerLifetimeValue: 0,
                    customerAcquisitionCost: 0,
                    churnRate: 5,
                    marketSize: 0,
                    competitiveAdvantage: 50
                  })}>
                    <RefreshCw size={16} />
                    Reset
                  </button>
                </div>
              </div>
              
              <div className="inputs-grid">
                <div className="input-group">
                  <label>Monthly Revenue ($)</label>
                  <div className="input-container">
                    <DollarSign size={16} />
                    <input
                      type="number"
                      value={inputs.monthlyRevenue}
                      onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Monthly Expenses ($)</label>
                  <div className="input-container">
                    <DollarSign size={16} />
                    <input
                      type="number"
                      value={inputs.monthlyExpenses}
                      onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Team Size</label>
                  <div className="input-container">
                    <Users size={16} />
                    <input
                      type="number"
                      value={inputs.teamSize}
                      onChange={(e) => handleInputChange('teamSize', e.target.value)}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Desired Runway (months)</label>
                  <div className="input-container">
                    <Calendar size={16} />
                    <input
                      type="number"
                      value={inputs.runway}
                      onChange={(e) => handleInputChange('runway', e.target.value)}
                      placeholder="12"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Monthly Growth Rate (%)</label>
                  <div className="input-container">
                    <TrendingUp size={16} />
                    <input
                      type="number"
                      value={inputs.growthRate}
                      onChange={(e) => handleInputChange('growthRate', e.target.value)}
                      placeholder="20"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Target Valuation ($)</label>
                  <div className="input-container">
                    <Target size={16} />
                    <input
                      type="number"
                      value={inputs.targetValuation}
                      onChange={(e) => handleInputChange('targetValuation', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                {showAdvanced && (
                  <>
                    <div className="input-group">
                      <label>Customer LTV ($)</label>
                      <div className="input-container">
                        <Heart size={16} />
                        <input
                          type="number"
                          value={inputs.customerLifetimeValue}
                          onChange={(e) => handleInputChange('customerLifetimeValue', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Customer CAC ($)</label>
                      <div className="input-container">
                        <Target size={16} />
                        <input
                          type="number"
                          value={inputs.customerAcquisitionCost}
                          onChange={(e) => handleInputChange('customerAcquisitionCost', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Churn Rate (%)</label>
                      <div className="input-container">
                        <TrendingDown size={16} />
                        <input
                          type="number"
                          value={inputs.churnRate}
                          onChange={(e) => handleInputChange('churnRate', e.target.value)}
                          placeholder="5"
                        />
                      </div>
                    </div>

                    <div className="input-group">
                      <label>Market Size ($)</label>
                      <div className="input-container">
                        <Globe size={16} />
                        <input
                          type="number"
                          value={inputs.marketSize}
                          onChange={(e) => handleInputChange('marketSize', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="results-section">
              {isCalculating ? (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <p>Calculating funding metrics...</p>
                </div>
              ) : results ? (
                <>
                  <div className="section-header">
                    <h3>Funding Analysis</h3>
                    <div className="attractiveness-score">
                      <span className="score-label">Investor Attractiveness</span>
                      <div className="score-circle" style={{ 
                        background: `conic-gradient(#10b981 ${results.attractivenessScore * 3.6}deg, #e5e7eb 0deg)` 
                      }}>
                        <span>{results.attractivenessScore}</span>
                      </div>
                    </div>
                  </div>

                  <div className="results-grid">
                    <div className="result-card primary">
                      <div className="result-header">
                        <h4>Funding Needed</h4>
                        <DollarSign size={20} color="#10b981" />
                      </div>
                      <div className="result-value">${results.fundingNeeded.toLocaleString()}</div>
                      <div className="result-subtitle">For {inputs.runway} months runway</div>
                      <div className="result-trend positive">
                        <ArrowUpRight size={16} />
                        +{Math.round(results.fundingNeeded * 0.1).toLocaleString()} buffer
                      </div>
                    </div>

                    <div className="result-card">
                      <div className="result-header">
                        <h4>Monthly Burn Rate</h4>
                        <TrendingDown size={20} color="#ef4444" />
                      </div>
                      <div className="result-value">${results.monthlyBurnRate.toLocaleString()}</div>
                      <div className="result-subtitle">Net monthly cash flow</div>
                      <div className="result-trend negative">
                        <ArrowDownRight size={16} />
                        {results.monthlyBurnRate > 100000 ? 'High burn' : 'Manageable'}
                      </div>
                    </div>

                    <div className="result-card">
                      <div className="result-header">
                        <h4>Current Runway</h4>
                        <Calendar size={20} color="#f59e0b" />
                      </div>
                      <div className="result-value">{results.currentRunway.toFixed(1)} months</div>
                      <div className="result-subtitle">At current burn rate</div>
                      <div className="result-trend positive">
                        <ArrowUpRight size={16} />
                        {results.currentRunway > 6 ? 'Good' : 'Critical'}
                      </div>
                    </div>

                    <div className="result-card">
                      <div className="result-header">
                        <h4>Funding Stage</h4>
                        <Target size={20} color={results.stageColor} />
                      </div>
                      <div className="result-value">{results.fundingStage}</div>
                      <div className="result-subtitle">Based on revenue</div>
                      <div className="stage-indicator" style={{ backgroundColor: results.stageColor + '20', color: results.stageColor }}>
                        {fundingStages.find(s => s.name === results.fundingStage)?.range}
                      </div>
                    </div>

                    <div className="result-card">
                      <div className="result-header">
                        <h4>LTV:CAC Ratio</h4>
                        <TrendingUp size={20} color="#06b6d4" />
                      </div>
                      <div className="result-value">{results.ltvCacRatio.toFixed(1)}:1</div>
                      <div className="result-subtitle">Customer economics</div>
                      <div className="result-trend positive">
                        <ArrowUpRight size={16} />
                        {results.ltvCacRatio >= 3 ? 'Excellent' : 'Needs improvement'}
                      </div>
                    </div>

                    <div className="result-card">
                      <div className="result-header">
                        <h4>Net Retention</h4>
                        <Heart size={20} color="#ec4899" />
                      </div>
                      <div className="result-value">{results.netRetentionRate}%</div>
                      <div className="result-subtitle">Customer retention</div>
                      <div className="result-trend positive">
                        <ArrowUpRight size={16} />
                        {results.netRetentionRate >= 90 ? 'Strong' : 'Improve'}
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="risk-assessment-section">
                    <h3>Risk Assessment</h3>
                    <div className="risks-grid">
                      {results.riskAssessment.map((risk, index) => (
                        <div key={index} className={`risk-item ${risk.level}`}>
                          <div className="risk-header">
                            <AlertCircle size={16} color={risk.level === 'high' ? '#ef4444' : risk.level === 'medium' ? '#f59e0b' : '#10b981'} />
                            <span className="risk-title">{risk.title}</span>
                            <span className={`risk-badge ${risk.level}`}>{risk.level}</span>
                          </div>
                          <p className="risk-description">{risk.description}</p>
                          <div className="risk-metrics">
                            <span>Impact: {risk.impact}</span>
                            <span>Probability: {risk.probability}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Recommendations */}
                  <div className="recommendations-section">
                    <h3>Recommendations</h3>
                    <div className="recommendations-list">
                      {results.recommendations.map((rec, index) => (
                        <div key={index} className={`recommendation-item ${rec.type} priority-${rec.priority}`}>
                          <rec.icon size={20} />
                          <div className="recommendation-content">
                            <h4>{rec.title}</h4>
                            <p>{rec.message}</p>
                          </div>
                          <div className="priority-indicator">
                            <span className={`priority-badge ${rec.priority}`}>{rec.priority}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </>
        )}

        {activeTab === 'scenarios' && (
          <div className="scenarios-section">
            <div className="section-header">
              <h3>Funding Scenarios</h3>
              <p>Compare different growth and burn rate scenarios</p>
            </div>
            <div className="scenarios-grid">
              {scenarios.map((scenario, index) => (
                <div 
                  key={index} 
                  className={`scenario-card ${selectedScenario?.name === scenario.name ? 'selected' : ''}`}
                  onClick={() => handleScenarioSelect(scenario)}
                >
                  <div className="scenario-header">
                    <h4>{scenario.name}</h4>
                    <span className="scenario-description">{scenario.description}</span>
                  </div>
                  <div className="scenario-metrics">
                    <div className="metric">
                      <span className="metric-label">Growth Rate</span>
                      <span className="metric-value">{scenario.inputs.growthRate}%</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Monthly Burn</span>
                      <span className="metric-value">${scenario.inputs.monthlyExpenses.toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="apply-scenario-btn">
                    <Play size={16} />
                    Apply Scenario
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="insights-section">
            <div className="section-header">
              <h3>Investor Insights</h3>
              <p>Key metrics that investors care about</p>
            </div>
            <div className="insights-grid">
              {investorInsights.map((insight, index) => (
                <div key={index} className={`insight-card ${insight.type}`}>
                  <div className="insight-icon">
                    <insight.icon size={24} />
                  </div>
                  <div className="insight-content">
                    <h4>{insight.title}</h4>
                    <p>{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-section">
            <div className="section-header">
              <h3>Funding History</h3>
              <p>Track your funding journey over time</p>
            </div>
            <div className="history-chart">
              <div className="chart-bars">
                {fundingHistory.map((item, index) => (
                  <div key={index} className="history-bar">
                    <div className="bar-tooltip">
                      <strong>${item.amount.toLocaleString()}</strong>
                      <br />
                      {item.stage}
                    </div>
                    <div 
                      className="bar-fill" 
                      style={{ 
                        height: `${(item.amount / Math.max(...fundingHistory.map(h => h.amount))) * 100}%`,
                        backgroundColor: fundingStages.find(s => s.name === item.stage)?.color || '#6b7280'
                      }}
                    ></div>
                    <span className="bar-label">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundingCalculator;
