import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, TrendingDown, Users, Calendar, Target, PieChart, Download, Share2, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';

const FundingCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyRevenue: 0,
    monthlyExpenses: 0,
    teamSize: 1,
    runway: 12,
    growthRate: 20,
    targetValuation: 0,
    equityOffering: 20
  });

  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    calculateFunding();
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
        equityOffering
      } = inputs;

      // Calculate burn rate
      const burnRate = monthlyExpenses - monthlyRevenue;
      const monthlyBurnRate = Math.max(0, burnRate);

      // Calculate funding needed
      const fundingNeeded = monthlyBurnRate * runway;

      // Calculate runway with current funding
      const currentRunway = monthlyRevenue > 0 ? (monthlyRevenue / monthlyBurnRate) * 12 : 0;

      // Calculate valuation metrics
      const revenueMultiple = targetValuation > 0 ? targetValuation / (monthlyRevenue * 12) : 0;
      const equityValue = targetValuation * (equityOffering / 100);

      // Calculate team costs
      const avgSalary = 80000; // Average startup salary
      const teamCosts = teamSize * avgSalary;

      // Calculate growth projections
      const projectedRevenue = monthlyRevenue * Math.pow(1 + growthRate / 100, runway / 12);

      // Calculate key metrics
      const ltv = monthlyRevenue * 24; // Assuming 24 month LTV
      const cac = teamCosts / (monthlyRevenue * 12) * 1000; // Rough CAC calculation
      const ltvCacRatio = ltv / cac;

      // Determine funding stage
      let fundingStage = 'Pre-Seed';
      if (monthlyRevenue > 10000) fundingStage = 'Seed';
      if (monthlyRevenue > 50000) fundingStage = 'Series A';
      if (monthlyRevenue > 200000) fundingStage = 'Series B';

      // Calculate investor returns
      const investorReturn = targetValuation > 0 ? 
        (targetValuation * (equityOffering / 100)) / fundingNeeded : 0;

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
        investorReturn,
        recommendations: generateRecommendations({
          fundingNeeded,
          monthlyBurnRate,
          ltvCacRatio,
          growthRate,
          teamSize
        })
      });
      setIsCalculating(false);
    }, 500);
  };

  const generateRecommendations = (metrics) => {
    const recommendations = [];

    if (metrics.fundingNeeded > 1000000) {
      recommendations.push({
        type: 'warning',
        title: 'High Funding Requirement',
        message: 'Consider reducing burn rate or extending runway to lower funding needs.',
        icon: AlertCircle
      });
    }

    if (metrics.ltvCacRatio < 3) {
      recommendations.push({
        type: 'warning',
        title: 'Low LTV:CAC Ratio',
        message: 'Your customer acquisition cost is high relative to lifetime value. Focus on retention.',
        icon: AlertCircle
      });
    }

    if (metrics.growthRate > 50) {
      recommendations.push({
        type: 'success',
        title: 'Strong Growth Rate',
        message: 'Excellent growth rate! This will be attractive to investors.',
        icon: CheckCircle
      });
    }

    if (metrics.teamSize > 10) {
      recommendations.push({
        type: 'info',
        title: 'Team Scaling',
        message: 'Consider team efficiency and productivity as you scale.',
        icon: Lightbulb
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

  const fundingStages = [
    { name: 'Pre-Seed', range: '$0-500K', equity: '10-20%' },
    { name: 'Seed', range: '$500K-2M', equity: '15-25%' },
    { name: 'Series A', range: '$2M-15M', equity: '20-30%' },
    { name: 'Series B', range: '$15M-50M', equity: '15-25%' }
  ];

  return (
    <div className="funding-calculator">
      <div className="calculator-header">
        <div className="header-content">
          <h1>Funding Calculator</h1>
          <p>Calculate your funding needs, runway, and investor metrics</p>
        </div>
        <div className="header-actions">
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

      <div className="calculator-content">
        <div className="inputs-section">
          <div className="section-header">
            <h3>Business Metrics</h3>
            <Calculator size={20} color="#667eea" />
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

            <div className="input-group">
              <label>Equity Offering (%)</label>
              <div className="input-container">
                <PieChart size={16} />
                <input
                  type="number"
                  value={inputs.equityOffering}
                  onChange={(e) => handleInputChange('equityOffering', e.target.value)}
                  placeholder="20"
                />
              </div>
            </div>
          </div>
        </div>

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
                <TrendingUp size={20} color="#10b981" />
              </div>

              <div className="results-grid">
                <div className="result-card primary">
                  <div className="result-header">
                    <h4>Funding Needed</h4>
                    <DollarSign size={20} color="#10b981" />
                  </div>
                  <div className="result-value">${results.fundingNeeded.toLocaleString()}</div>
                  <div className="result-subtitle">For {inputs.runway} months runway</div>
                </div>

                <div className="result-card">
                  <div className="result-header">
                    <h4>Monthly Burn Rate</h4>
                    <TrendingDown size={20} color="#ef4444" />
                  </div>
                  <div className="result-value">${results.monthlyBurnRate.toLocaleString()}</div>
                  <div className="result-subtitle">Net monthly cash flow</div>
                </div>

                <div className="result-card">
                  <div className="result-header">
                    <h4>Current Runway</h4>
                    <Calendar size={20} color="#f59e0b" />
                  </div>
                  <div className="result-value">{results.currentRunway.toFixed(1)} months</div>
                  <div className="result-subtitle">At current burn rate</div>
                </div>

                <div className="result-card">
                  <div className="result-header">
                    <h4>Funding Stage</h4>
                    <Target size={20} color="#8b5cf6" />
                  </div>
                  <div className="result-value">{results.fundingStage}</div>
                  <div className="result-subtitle">Based on revenue</div>
                </div>

                <div className="result-card">
                  <div className="result-header">
                    <h4>LTV:CAC Ratio</h4>
                    <TrendingUp size={20} color="#06b6d4" />
                  </div>
                  <div className="result-value">{results.ltvCacRatio.toFixed(1)}:1</div>
                  <div className="result-subtitle">Customer economics</div>
                </div>

                <div className="result-card">
                  <div className="result-header">
                    <h4>Equity Value</h4>
                    <PieChart size={20} color="#ec4899" />
                  </div>
                  <div className="result-value">${results.equityValue.toLocaleString()}</div>
                  <div className="result-subtitle">At target valuation</div>
                </div>
              </div>

              <div className="projections-section">
                <h3>Growth Projections</h3>
                <div className="projections-grid">
                  <div className="projection-item">
                    <div className="projection-label">Projected Revenue (12 months)</div>
                    <div className="projection-value">${results.projectedRevenue.toLocaleString()}</div>
                  </div>
                  <div className="projection-item">
                    <div className="projection-label">Customer Lifetime Value</div>
                    <div className="projection-value">${results.ltv.toLocaleString()}</div>
                  </div>
                  <div className="projection-item">
                    <div className="projection-label">Customer Acquisition Cost</div>
                    <div className="projection-value">${results.cac.toFixed(0)}</div>
                  </div>
                </div>
              </div>

              <div className="recommendations-section">
                <h3>Recommendations</h3>
                <div className="recommendations-list">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className={`recommendation-item ${rec.type}`}>
                      <rec.icon size={20} />
                      <div className="recommendation-content">
                        <h4>{rec.title}</h4>
                        <p>{rec.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="funding-stages-section">
                <h3>Funding Stages Overview</h3>
                <div className="stages-grid">
                  {fundingStages.map((stage, index) => (
                    <div key={index} className="stage-card">
                      <div className="stage-name">{stage.name}</div>
                      <div className="stage-range">{stage.range}</div>
                      <div className="stage-equity">{stage.equity} equity</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FundingCalculator;
