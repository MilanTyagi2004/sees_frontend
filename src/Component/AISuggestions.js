import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  BarChart3,
  Zap
} from 'lucide-react';

const AISuggestions = ({ validationData, onApplySuggestion }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  useEffect(() => {
    generateSuggestions();
  }, [validationData]);

  const generateSuggestions = async () => {
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockSuggestions = [
      {
        id: 1,
        type: 'market',
        title: 'Market Positioning Strategy',
        description: 'Based on your competition analysis, consider positioning as a premium solution with focus on enterprise customers.',
        impact: 'high',
        effort: 'medium',
        category: 'Strategy',
        icon: <Target size={20} />,
        details: [
          'Target enterprise customers willing to pay premium',
          'Emphasize security and compliance features',
          'Develop white-label solutions for B2B market'
        ],
        estimatedImpact: '+25% market share'
      },
      {
        id: 2,
        type: 'feature',
        title: 'AI-Powered Automation',
        description: 'Add AI features to differentiate from competitors and increase user engagement.',
        impact: 'high',
        effort: 'high',
        category: 'Features',
        icon: <Brain size={20} />,
        details: [
          'Implement smart recommendations',
          'Add predictive analytics',
          'Create automated workflows'
        ],
        estimatedImpact: '+40% user retention'
      },
      {
        id: 3,
        type: 'pricing',
        title: 'Freemium Model',
        description: 'Implement a freemium pricing strategy to increase user acquisition and reduce competition.',
        impact: 'medium',
        effort: 'low',
        category: 'Business Model',
        icon: <DollarSign size={20} />,
        details: [
          'Offer basic features for free',
          'Premium features for paid users',
          'Volume-based pricing for enterprises'
        ],
        estimatedImpact: '+60% user acquisition'
      },
      {
        id: 4,
        type: 'timing',
        title: 'Launch Timing Optimization',
        description: 'Consider launching during Q2 when market demand peaks for your category.',
        impact: 'medium',
        effort: 'low',
        category: 'Timing',
        icon: <Clock size={20} />,
        details: [
          'Q2 shows 30% higher demand',
          'Less competition during this period',
          'Better funding opportunities'
        ],
        estimatedImpact: '+35% launch success'
      },
      {
        id: 5,
        type: 'targeting',
        title: 'Expand Target Audience',
        description: 'Consider targeting small businesses in addition to your current enterprise focus.',
        impact: 'high',
        effort: 'medium',
        category: 'Targeting',
        icon: <Users size={20} />,
        details: [
          'Small businesses have 3x higher adoption rate',
          'Lower customer acquisition cost',
          'Faster sales cycles'
        ],
        estimatedImpact: '+50% market size'
      },
      {
        id: 6,
        type: 'partnership',
        title: 'Strategic Partnerships',
        description: 'Form partnerships with complementary services to accelerate growth.',
        impact: 'high',
        effort: 'high',
        category: 'Partnerships',
        icon: <TrendingUp size={20} />,
        details: [
          'Partner with CRM providers',
          'Integrate with popular tools',
          'Create referral programs'
        ],
        estimatedImpact: '+80% growth rate'
      }
    ];

    setSuggestions(mockSuggestions);
    setLoading(false);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'low': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getEffortColor = (effort) => {
    switch (effort) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="ai-suggestions loading">
        <div className="loading-header">
          <div className="loading-icon">
            <Brain size={32} />
          </div>
          <h3>AI is analyzing your idea...</h3>
          <p>Generating personalized suggestions based on market data</p>
        </div>
        <div className="loading-animation">
          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-suggestions">
      <div className="suggestions-header">
        <div className="header-content">
          <div className="header-icon">
            <Sparkles size={24} />
          </div>
          <div className="header-text">
            <h3>AI-Powered Suggestions</h3>
            <p>Personalized recommendations to improve your idea's success</p>
          </div>
        </div>
        <div className="suggestions-stats">
          <div className="stat">
            <span className="stat-number">{suggestions.length}</span>
            <span className="stat-label">Suggestions</span>
          </div>
          <div className="stat">
            <span className="stat-number">{suggestions.filter(s => s.impact === 'high').length}</span>
            <span className="stat-label">High Impact</span>
          </div>
        </div>
      </div>

      <div className="suggestions-grid">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id} 
            className={`suggestion-card ${selectedSuggestion === suggestion.id ? 'selected' : ''}`}
            onClick={() => setSelectedSuggestion(
              selectedSuggestion === suggestion.id ? null : suggestion.id
            )}
          >
            <div className="suggestion-header">
              <div className="suggestion-icon">
                {suggestion.icon}
              </div>
              <div className="suggestion-meta">
                <span className="suggestion-category">{suggestion.category}</span>
                <div className="suggestion-badges">
                  <span 
                    className="badge impact" 
                    style={{ backgroundColor: getImpactColor(suggestion.impact) }}
                  >
                    {suggestion.impact} impact
                  </span>
                  <span 
                    className="badge effort" 
                    style={{ backgroundColor: getEffortColor(suggestion.effort) }}
                  >
                    {suggestion.effort} effort
                  </span>
                </div>
              </div>
            </div>

            <div className="suggestion-content">
              <h4>{suggestion.title}</h4>
              <p>{suggestion.description}</p>
              
              {selectedSuggestion === suggestion.id && (
                <div className="suggestion-details">
                  <div className="details-section">
                    <h5>Implementation Details:</h5>
                    <ul>
                      {suggestion.details.map((detail, index) => (
                        <li key={index}>
                          <CheckCircle size={14} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="impact-estimate">
                    <div className="impact-icon">
                      <BarChart3 size={16} />
                    </div>
                    <div className="impact-text">
                      <span className="impact-label">Estimated Impact:</span>
                      <span className="impact-value">{suggestion.estimatedImpact}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="suggestion-actions">
              <button 
                className="btn-apply"
                onClick={(e) => {
                  e.stopPropagation();
                  onApplySuggestion(suggestion);
                }}
              >
                <Zap size={16} />
                Apply Suggestion
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="suggestions-footer">
        <div className="footer-content">
          <div className="footer-icon">
            <Brain size={20} />
          </div>
          <div className="footer-text">
            <p>These suggestions are generated using advanced AI analysis of market trends, competitor data, and user behavior patterns.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;
