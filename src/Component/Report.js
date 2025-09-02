import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Mail, ArrowLeft, TrendingUp, Users, Target, Share2, Bookmark, RefreshCw, Brain, ChevronDown, ChevronUp, DollarSign, Calendar, Shield, Zap, Star, BarChart3, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Report = ({ data }) => {
  const navigate = useNavigate();
  const [validationData, setValidationData] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [expandedSections, setExpandedSections] = useState({
    customerProfile: false,
    competitors: false,
    monetization: false,
    actionPlan: false,
    risks: false
  });

  useEffect(() => {
    if (data) {
      setValidationData(data);
    } else {
      const storedData = localStorage.getItem('validationData');
      if (storedData) {
        setValidationData(JSON.parse(storedData));
      } else {
        // Redirect to validation form if no data
        navigate('/validate');
      }
    }
  }, [data, navigate]);

  // Generate sample validation results
  const generateValidationResults = () => {
    if (!validationData) return null;

    const productName = validationData.productName;
    const category = validationData.category;
    
    // Use the scores from validation data (already out of 10)
    const demandScore = validationData.demandScore || Math.floor(Math.random() * 10) + 1;
    const competitionScore = validationData.competitionScore || Math.floor(Math.random() * 10) + 1;
    const urgencyScore = validationData.urgencyScore || Math.floor(Math.random() * 10) + 1;
    
    const overallScore = validationData.score || Math.round((demandScore + competitionScore + urgencyScore) / 3);
    
    let recommendation = '';
    let recommendationColor = '';
    let riskLevel = '';
    let validationStatus = '';
    let reasons = [];
    
    if (overallScore >= 8) {
      recommendation = '🚀 Go for validation!';
      recommendationColor = '#166534';
      riskLevel = 'Low Risk - VALIDATE';
      validationStatus = 'VALIDATE';
      reasons = [
        'Strong market demand with clear customer pain points - High search volume and active discussions indicate genuine need',
        'Competitive landscape shows opportunity for differentiation - Existing solutions have gaps that can be addressed',
        'Market timing is optimal with growing user interest - Industry trends support immediate market entry'
      ];
    } else if (overallScore >= 5) {
      recommendation = '⚡ Tweak needed before proceeding';
      recommendationColor = '#d97706';
      riskLevel = 'Medium Risk - TWEAK';
      validationStatus = 'TWEAK';
      reasons = [
        'Market demand exists but needs better positioning - Target audience needs clearer definition and messaging',
        'Competition is manageable with strategic adjustments - Requires unique value proposition to stand out',
        'Requires refinement to capture market urgency - Product-market fit needs optimization before launch'
      ];
    } else {
      recommendation = '❌ Not recommended at this time';
      recommendationColor = '#dc2626';
      riskLevel = 'High Risk - NO';
      validationStatus = 'NO';
      reasons = [
        'Market demand is insufficient or unclear - Limited evidence of customer willingness to pay',
        'Competition is too saturated for new entrants - Established players dominate with significant resources',
        'Market timing may not be optimal right now - Economic or industry factors create unfavorable conditions'
      ];
    }

    return {
      overallScore,
      demandScore,
      competitionScore,
      urgencyScore,
      recommendation,
      recommendationColor,
      riskLevel,
      validationStatus,
      reasons,
      insights: {
        demand: [
          `Strong interest in ${(category || '').toLowerCase()} solutions`,
          'Growing search trends for related keywords',
          'Active discussions in relevant online communities'
        ],
        competition: [
          `${Math.floor(Math.random() * 5) + 3} major competitors identified`,
          'Market is moderately saturated but growing',
          'Opportunity for differentiation exists'
        ],
        urgency: [
          'Users actively seeking solutions',
          'Pain points clearly identified',
          'Market timing appears favorable'
        ]
      },
      marketSize: Math.floor(Math.random() * 50) + 10, // $10B - $60B
      growthRate: Math.floor(Math.random() * 20) + 15, // 15% - 35%
      timeToMarket: Math.floor(Math.random() * 6) + 3, // 3-9 months
      
      // Ideal Customer Profile
      customerProfile: {
        tier1: {
          name: 'Enterprise Customers',
          description: 'Large organizations with significant budgets and complex needs',
          characteristics: ['500+ employees', 'Annual revenue $50M+', 'Complex workflows', 'High security requirements'],
          marketSize: '15% of total market',
          avgDealSize: '$50K-$200K',
          salesCycle: '6-12 months'
        },
        tier2: {
          name: 'Mid-Market Companies',
          description: 'Growing companies with established processes and moderate budgets',
          characteristics: ['50-500 employees', 'Annual revenue $5M-$50M', 'Standardized processes', 'Moderate complexity'],
          marketSize: '35% of total market',
          avgDealSize: '$10K-$50K',
          salesCycle: '3-6 months'
        },
        tier3: {
          name: 'Small Business & Startups',
          description: 'Small teams and early-stage companies with limited budgets',
          characteristics: ['1-50 employees', 'Annual revenue <$5M', 'Simple workflows', 'Cost-sensitive'],
          marketSize: '50% of total market',
          avgDealSize: '$1K-$10K',
          salesCycle: '1-3 months'
        }
      },
      
      // Competitors & Gaps
      competitors: [
        {
          name: 'Competitor A',
          strength: 'Market leader with strong brand recognition',
          weakness: 'High pricing, complex interface',
          marketShare: '25%',
          gap: 'Affordable pricing for SMBs'
        },
        {
          name: 'Competitor B',
          strength: 'User-friendly interface, good customer support',
          weakness: 'Limited features, scalability issues',
          marketShare: '20%',
          gap: 'Advanced features for enterprise'
        },
        {
          name: 'Competitor C',
          strength: 'Strong technical capabilities',
          weakness: 'Poor user experience, slow innovation',
          marketShare: '15%',
          gap: 'Modern UI/UX and rapid feature updates'
        }
      ],
      
      // Monetization Strategy
      monetization: {
        models: [
          {
            name: 'Freemium',
            description: 'Free basic version with premium features',
            pros: ['Low barrier to entry', 'Viral growth potential', 'Large user base'],
            cons: ['Low conversion rates', 'High support costs'],
            revenue: '$5-15/user/month'
          },
          {
            name: 'Subscription (SaaS)',
            description: 'Monthly/annual recurring revenue model',
            pros: ['Predictable revenue', 'High lifetime value', 'Scalable'],
            cons: ['Churn risk', 'Competitive pressure'],
            revenue: '$29-299/user/month'
          },
          {
            name: 'Usage-Based',
            description: 'Pay per transaction or usage',
            pros: ['Aligns with value', 'Scales with customer success'],
            cons: ['Revenue volatility', 'Complex billing'],
            revenue: '$0.10-2.00 per transaction'
          }
        ],
        recommendedModel: 'Subscription (SaaS)',
        pricingTiers: [
          { name: 'Starter', price: '$29/month', features: ['Basic features', 'Up to 5 users', 'Email support'] },
          { name: 'Professional', price: '$99/month', features: ['Advanced features', 'Up to 25 users', 'Priority support'] },
          { name: 'Enterprise', price: '$299/month', features: ['All features', 'Unlimited users', 'Dedicated support'] }
        ]
      },
      
      // 7-Day Action Plan
      actionPlan: [
        {
          day: 1,
          title: 'Market Research Deep Dive',
          tasks: ['Analyze top 10 competitors in detail', 'Study customer reviews and pain points', 'Research pricing strategies'],
          priority: 'High',
          estimatedTime: '4-6 hours'
        },
        {
          day: 2,
          title: 'Customer Discovery',
          tasks: ['Conduct 5 customer interviews', 'Create customer personas', 'Validate problem-solution fit'],
          priority: 'High',
          estimatedTime: '6-8 hours'
        },
        {
          day: 3,
          title: 'MVP Planning',
          tasks: ['Define core features for MVP', 'Create user stories', 'Plan development timeline'],
          priority: 'High',
          estimatedTime: '4-5 hours'
        },
        {
          day: 4,
          title: 'Competitive Analysis',
          tasks: ['Create competitive comparison matrix', 'Identify unique value proposition', 'Plan differentiation strategy'],
          priority: 'Medium',
          estimatedTime: '3-4 hours'
        },
        {
          day: 5,
          title: 'Business Model Validation',
          tasks: ['Test pricing with potential customers', 'Validate revenue assumptions', 'Plan go-to-market strategy'],
          priority: 'Medium',
          estimatedTime: '4-5 hours'
        },
        {
          day: 6,
          title: 'Technical Feasibility',
          tasks: ['Assess technical requirements', 'Research technology stack', 'Estimate development costs'],
          priority: 'Medium',
          estimatedTime: '3-4 hours'
        },
        {
          day: 7,
          title: 'Final Validation & Planning',
          tasks: ['Compile all research findings', 'Make final go/no-go decision', 'Create detailed project roadmap'],
          priority: 'High',
          estimatedTime: '5-6 hours'
        }
      ],
      
      // Risk Assessment
      risks: [
        {
          category: 'Market Risk',
          level: 'Medium',
          description: 'Market saturation or economic downturn',
          impact: 'High',
          probability: 'Medium',
          mitigation: 'Diversify target markets and create recession-resistant features'
        },
        {
          category: 'Competition Risk',
          level: 'High',
          description: 'Large competitors entering market with significant resources',
          impact: 'High',
          probability: 'High',
          mitigation: 'Focus on niche markets and build strong customer relationships'
        },
        {
          category: 'Technology Risk',
          level: 'Low',
          description: 'Technology becoming obsolete or security vulnerabilities',
          impact: 'Medium',
          probability: 'Low',
          mitigation: 'Stay updated with latest technologies and implement robust security'
        },
        {
          category: 'Financial Risk',
          level: 'Medium',
          description: 'Insufficient funding or higher than expected costs',
          impact: 'High',
          probability: 'Medium',
          mitigation: 'Secure adequate funding and maintain lean operations'
        }
      ]
    };
  };

  const handleDownloadPDF = async () => {
    if (!validationData) return;
    
    setIsGeneratingPDF(true);
    
    try {
      const reportElement = document.getElementById('validation-report');
      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${validationData.productName.replace(/\s+/g, '_')}_validation_report.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleEmailReport = () => {
    // In a real app, this would trigger an email API call
    alert('Report sent to your email! Check your inbox.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${validationData.productName} - SES Validation Report`,
        text: `Check out my idea validation report for ${validationData.productName}!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would save to user's bookmarks
    alert(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks!');
  };

  const handleRegenerate = () => {
    if (window.confirm('This will generate new scores and insights. Continue?')) {
      window.location.reload();
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'High': return <XCircle size={20} color="#dc2626" />;
      case 'Medium': return <AlertCircle size={20} color="#f59e0b" />;
      case 'Low': return <CheckCircle size={20} color="#10b981" />;
      default: return <AlertCircle size={20} color="#6b7280" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#dc2626';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (!validationData) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading report...</p>
      </div>
    );
  }

  const results = generateValidationResults();

  return (
    <div className="report-container">
      <div className="report-card" id="validation-report">
        <div className="report-header">
          <h1>{validationData.productName}</h1>
          <p>SES Idea Validation Report</p>
          <div className="score-circle">
            <span>{results.overallScore}/10</span>
          </div>
          <p>Overall Score</p>
          
          {/* Action Icons */}
          <div style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            display: 'flex', 
            gap: '0.5rem' 
          }}>
            <button
              onClick={handleBookmark}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <Bookmark size={20} fill={isBookmarked ? 'white' : 'none'} />
            </button>
            <button
              onClick={handleShare}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="report-content">
          {/* Risk Level Badge */}
          <div style={{
            background: results.recommendationColor,
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            display: 'inline-block',
            marginBottom: '2rem',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            {results.riskLevel}
          </div>

          {/* Validation Status Badge */}
          <div style={{
            background: results.recommendationColor,
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            display: 'inline-block',
            marginBottom: '2rem',
            marginLeft: '1rem',
            fontWeight: '700',
            fontSize: '1.1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {results.validationStatus}
          </div>

          <div className="metric-grid">
            <div className="metric-card">
              <div className="metric-title">
                <TrendingUp size={20} style={{ marginRight: '8px', color: '#10b981' }} />
                Demand Score
              </div>
              <div className="metric-value">{results.demandScore}/10</div>
              <div style={{ 
                background: '#e5e7eb', 
                height: '8px', 
                borderRadius: '4px', 
                marginTop: '0.5rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: '#10b981',
                  height: '100%',
                  width: `${(results.demandScore / 10) * 100}%`,
                  borderRadius: '4px',
                  transition: 'width 1s ease'
                }}></div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-title">
                <Users size={20} style={{ marginRight: '8px', color: '#667eea' }} />
                Competition Score
              </div>
              <div className="metric-value">{results.competitionScore}/10</div>
              <div style={{ 
                background: '#e5e7eb', 
                height: '8px', 
                borderRadius: '4px', 
                marginTop: '0.5rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: '#667eea',
                  height: '100%',
                  width: `${(results.competitionScore / 10) * 100}%`,
                  borderRadius: '4px',
                  transition: 'width 1s ease'
                }}></div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-title">
                <Target size={20} style={{ marginRight: '8px', color: '#f59e0b' }} />
                Urgency Score
              </div>
              <div className="metric-value">{results.urgencyScore}/10</div>
              <div style={{ 
                background: '#e5e7eb', 
                height: '8px', 
                borderRadius: '4px', 
                marginTop: '0.5rem',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: '#f59e0b',
                  height: '100%',
                  width: `${(results.urgencyScore / 10) * 100}%`,
                  borderRadius: '4px',
                  transition: 'width 1s ease'
                }}></div>
              </div>
            </div>
          </div>

          {/* Market Insights */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Market Overview</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              <div style={{ 
                background: '#f8fafc', 
                padding: '1rem', 
                borderRadius: '12px', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#667eea' }}>
                  ${results.marketSize}B
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Market Size</div>
              </div>
              <div style={{ 
                background: '#f8fafc', 
                padding: '1rem', 
                borderRadius: '12px', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                  {results.growthRate}%
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Growth Rate</div>
              </div>
              <div style={{ 
                background: '#f8fafc', 
                padding: '1rem', 
                borderRadius: '12px', 
                textAlign: 'center' 
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#f59e0b' }}>
                  {results.timeToMarket}m
                </div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Time to Market</div>
              </div>
            </div>
          </div>

          <div className="recommendation" style={{ borderColor: results.recommendationColor }}>
            <h3>🎯 Recommendation</h3>
            <p style={{ color: results.recommendationColor, fontWeight: '600' }}>
              {results.recommendation}
            </p>
          </div>

          {/* Validation Reasons */}
          <div style={{ 
            background: '#f8fafc', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            border: `2px solid ${results.recommendationColor}`,
            borderLeft: `6px solid ${results.recommendationColor}`
          }}>
            <h3 style={{ 
              marginBottom: '1rem', 
              color: results.recommendationColor,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {results.validationStatus === 'VALIDATE' && '✅ Why Validate?'}
              {results.validationStatus === 'TWEAK' && '⚡ Why Tweak?'}
              {results.validationStatus === 'NO' && '❌ Why Not Now?'}
            </h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              {results.reasons.map((reason, index) => (
                <li key={index} style={{ 
                  marginBottom: '0.75rem', 
                  color: '#374151',
                  fontSize: '0.95rem',
                  lineHeight: '1.5'
                }}>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Key Insights</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Demand Signals</h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                {results.insights.demand.map((insight, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{insight}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Competition Analysis</h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                {results.insights.competition.map((insight, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{insight}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>Market Urgency</h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                {results.insights.urgency.map((insight, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Product Details</h3>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <div>
                  <strong style={{ color: '#374151' }}>Category:</strong> {validationData.category}
                </div>
                <div>
                  <strong style={{ color: '#374151' }}>Target Audience:</strong> {validationData.targetAudience}
                </div>
                {validationData.budget && (
                  <div>
                    <strong style={{ color: '#374151' }}>Budget:</strong> {validationData.budget}
                  </div>
                )}
                {validationData.timeline && (
                  <div>
                    <strong style={{ color: '#374151' }}>Timeline:</strong> {validationData.timeline}
                  </div>
                )}
              </div>
              <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <strong style={{ color: '#374151' }}>Description:</strong> {validationData.description}
              </div>
            </div>
          </div>

          {/* Ideal Customer Profile Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('customerProfile')}>
              <h3 style={{ color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={24} color="#667eea" />
                Ideal Customer Profile
              </h3>
              {expandedSections.customerProfile ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            
            {expandedSections.customerProfile && (
              <div style={{ 
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {/* Tier 1 */}
                  <div style={{ 
                    background: 'white', 
                    padding: '1.5rem', 
                    borderRadius: '12px',
                    border: '2px solid #10b981',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      position: 'absolute', 
                      top: '-10px', 
                      left: '20px', 
                      background: '#10b981', 
                      color: 'white', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      TIER 1
                    </div>
                    <h4 style={{ color: '#10b981', marginBottom: '1rem', marginTop: '0.5rem' }}>
                      {results.customerProfile.tier1.name}
                    </h4>
                    <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      {results.customerProfile.tier1.description}
                    </p>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: '#374151' }}>Characteristics:</strong>
                      <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                        {results.customerProfile.tier1.characteristics.map((char, index) => (
                          <li key={index} style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <div><strong>Market Size:</strong> {results.customerProfile.tier1.marketSize}</div>
                      <div><strong>Deal Size:</strong> {results.customerProfile.tier1.avgDealSize}</div>
                      <div><strong>Sales Cycle:</strong> {results.customerProfile.tier1.salesCycle}</div>
                    </div>
                  </div>

                  {/* Tier 2 */}
                  <div style={{ 
                    background: 'white', 
                    padding: '1.5rem', 
                    borderRadius: '12px',
                    border: '2px solid #f59e0b',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      position: 'absolute', 
                      top: '-10px', 
                      left: '20px', 
                      background: '#f59e0b', 
                      color: 'white', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      TIER 2
                    </div>
                    <h4 style={{ color: '#f59e0b', marginBottom: '1rem', marginTop: '0.5rem' }}>
                      {results.customerProfile.tier2.name}
                    </h4>
                    <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      {results.customerProfile.tier2.description}
                    </p>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: '#374151' }}>Characteristics:</strong>
                      <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                        {results.customerProfile.tier2.characteristics.map((char, index) => (
                          <li key={index} style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <div><strong>Market Size:</strong> {results.customerProfile.tier2.marketSize}</div>
                      <div><strong>Deal Size:</strong> {results.customerProfile.tier2.avgDealSize}</div>
                      <div><strong>Sales Cycle:</strong> {results.customerProfile.tier2.salesCycle}</div>
                    </div>
                  </div>

                  {/* Tier 3 */}
                  <div style={{ 
                    background: 'white', 
                    padding: '1.5rem', 
                    borderRadius: '12px',
                    border: '2px solid #8b5cf6',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      position: 'absolute', 
                      top: '-10px', 
                      left: '20px', 
                      background: '#8b5cf6', 
                      color: 'white', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      TIER 3
                    </div>
                    <h4 style={{ color: '#8b5cf6', marginBottom: '1rem', marginTop: '0.5rem' }}>
                      {results.customerProfile.tier3.name}
                    </h4>
                    <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      {results.customerProfile.tier3.description}
                    </p>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: '#374151' }}>Characteristics:</strong>
                      <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                        {results.customerProfile.tier3.characteristics.map((char, index) => (
                          <li key={index} style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem' }}>
                      <div><strong>Market Size:</strong> {results.customerProfile.tier3.marketSize}</div>
                      <div><strong>Deal Size:</strong> {results.customerProfile.tier3.avgDealSize}</div>
                      <div><strong>Sales Cycle:</strong> {results.customerProfile.tier3.salesCycle}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Competitors & Gaps Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('competitors')}>
              <h3 style={{ color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart3 size={24} color="#f59e0b" />
                Top Competitors & Market Gaps
              </h3>
              {expandedSections.competitors ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            
            {expandedSections.competitors && (
              <div style={{ 
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #f59e0b'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {results.competitors.map((competitor, index) => (
                    <div key={index} style={{ 
                      background: 'white', 
                      padding: '1.5rem', 
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                    }}>
                      <h4 style={{ color: '#1f2937', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Star size={20} color="#f59e0b" />
                        {competitor.name}
                      </h4>
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ 
                          background: '#10b981', 
                          color: 'white', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          display: 'inline-block',
                          marginBottom: '0.5rem'
                        }}>
                          {competitor.marketShare} Market Share
                        </div>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#10b981' }}>Strengths:</strong>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                          {competitor.strength}
                        </p>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#dc2626' }}>Weaknesses:</strong>
                        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                          {competitor.weakness}
                        </p>
                      </div>
                      <div style={{ 
                        background: '#f0f9ff', 
                        padding: '1rem', 
                        borderRadius: '8px',
                        border: '1px solid #0ea5e9'
                      }}>
                        <strong style={{ color: '#0ea5e9' }}>Opportunity Gap:</strong>
                        <p style={{ color: '#0369a1', fontSize: '0.9rem', marginTop: '0.25rem', fontWeight: '500' }}>
                          {competitor.gap}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Monetization Strategy Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('monetization')}>
              <h3 style={{ color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <DollarSign size={24} color="#10b981" />
                Monetization Strategy
              </h3>
              {expandedSections.monetization ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            
            {expandedSections.monetization && (
              <div style={{ 
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #10b981'
              }}>
                {/* Recommended Model */}
                <div style={{ 
                  background: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '12px',
                  marginBottom: '1.5rem',
                  border: '2px solid #10b981'
                }}>
                  <h4 style={{ color: '#10b981', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={20} />
                    Recommended Model: {results.monetization.recommendedModel}
                  </h4>
                  <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    Based on market analysis and target customer segments, this model offers the best balance of revenue potential and market penetration.
                  </p>
                </div>

                {/* All Models */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  {results.monetization.models.map((model, index) => (
                    <div key={index} style={{ 
                      background: 'white', 
                      padding: '1.5rem', 
                      borderRadius: '12px',
                      border: model.name === results.monetization.recommendedModel ? '2px solid #10b981' : '1px solid #e5e7eb'
                    }}>
                      <h4 style={{ color: '#1f2937', marginBottom: '1rem' }}>{model.name}</h4>
                      <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {model.description}
                      </p>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#10b981' }}>Pros:</strong>
                        <ul style={{ paddingLeft: '1rem', marginTop: '0.25rem' }}>
                          {model.pros.map((pro, i) => (
                            <li key={i} style={{ color: '#6b7280', fontSize: '0.9rem' }}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong style={{ color: '#dc2626' }}>Cons:</strong>
                        <ul style={{ paddingLeft: '1rem', marginTop: '0.25rem' }}>
                          {model.cons.map((con, i) => (
                            <li key={i} style={{ color: '#6b7280', fontSize: '0.9rem' }}>{con}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ 
                        background: '#f0f9ff', 
                        padding: '0.75rem', 
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        <strong style={{ color: '#0ea5e9' }}>Revenue Range:</strong>
                        <div style={{ color: '#0369a1', fontWeight: '600' }}>{model.revenue}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Tiers */}
                <div>
                  <h4 style={{ color: '#1f2937', marginBottom: '1rem' }}>Recommended Pricing Tiers</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {results.monetization.pricingTiers.map((tier, index) => (
                      <div key={index} style={{ 
                        background: 'white', 
                        padding: '1.5rem', 
                        borderRadius: '12px',
                        border: '1px solid #e5e7eb',
                        textAlign: 'center'
                      }}>
                        <h5 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>{tier.name}</h5>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981', marginBottom: '1rem' }}>
                          {tier.price}
                        </div>
                        <ul style={{ paddingLeft: '1rem', textAlign: 'left' }}>
                          {tier.features.map((feature, i) => (
                            <li key={i} style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 7-Day Action Plan Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('actionPlan')}>
              <h3 style={{ color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={24} color="#8b5cf6" />
                7-Day Action Plan
              </h3>
              {expandedSections.actionPlan ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            
            {expandedSections.actionPlan && (
              <div style={{ 
                background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #8b5cf6'
              }}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {results.actionPlan.map((day, index) => (
                    <div key={index} style={{ 
                      background: 'white', 
                      padding: '1.5rem', 
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      position: 'relative'
                    }}>
                      <div style={{ 
                        position: 'absolute', 
                        top: '-10px', 
                        left: '20px', 
                        background: getPriorityColor(day.priority), 
                        color: 'white', 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        DAY {day.day}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.5rem' }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ color: '#1f2937', marginBottom: '1rem' }}>{day.title}</h4>
                          <div style={{ marginBottom: '1rem' }}>
                            <strong style={{ color: '#374151' }}>Tasks:</strong>
                            <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                              {day.tasks.map((task, i) => (
                                <li key={i} style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', marginLeft: '1rem' }}>
                          <div style={{ 
                            background: getPriorityColor(day.priority), 
                            color: 'white', 
                            padding: '0.25rem 0.5rem', 
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            marginBottom: '0.5rem',
                            display: 'inline-block'
                          }}>
                            {day.priority} Priority
                          </div>
                          <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                            <Clock size={16} style={{ marginRight: '4px' }} />
                            {day.estimatedTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Risk Assessment Section */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => toggleSection('risks')}>
              <h3 style={{ color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={24} color="#dc2626" />
                Risk Assessment
              </h3>
              {expandedSections.risks ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
            
            {expandedSections.risks && (
              <div style={{ 
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #dc2626'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  {results.risks.map((risk, index) => (
                    <div key={index} style={{ 
                      background: 'white', 
                      padding: '1.5rem', 
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        {getRiskIcon(risk.level)}
                        <h4 style={{ color: '#1f2937' }}>{risk.category}</h4>
                        <div style={{ 
                          background: getRiskIcon(risk.level).props.color, 
                          color: 'white', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          marginLeft: 'auto'
                        }}>
                          {risk.level} Risk
                        </div>
                      </div>
                      <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {risk.description}
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.8rem' }}>
                        <div><strong>Impact:</strong> {risk.impact}</div>
                        <div><strong>Probability:</strong> {risk.probability}</div>
                      </div>
                      <div style={{ 
                        background: '#f0f9ff', 
                        padding: '1rem', 
                        borderRadius: '8px',
                        border: '1px solid #0ea5e9'
                      }}>
                        <strong style={{ color: '#0ea5e9' }}>Mitigation Strategy:</strong>
                        <p style={{ color: '#0369a1', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                          {risk.mitigation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="action-buttons">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="action-button primary-button"
            >
              <Download size={20} />
              {isGeneratingPDF ? 'Generating PDF...' : 'Download PDF Report'}
            </button>
            
            <button
              onClick={() => {
                // Trigger AI suggestions modal
                const event = new CustomEvent('showAISuggestions', { detail: validationData });
                window.dispatchEvent(event);
              }}
              className="action-button primary-button"
              style={{ background: 'linear-gradient(45deg, #8b5cf6, #ec4899)' }}
            >
              <Brain size={20} />
              Get AI Suggestions
            </button>
            
            <button
              onClick={handleEmailReport}
              className="action-button secondary-button"
            >
              <Mail size={20} />
              Email Report
            </button>
            
            <button
              onClick={handleRegenerate}
              className="action-button secondary-button"
            >
              <RefreshCw size={20} />
              Regenerate
            </button>
            
            <button
              onClick={() => navigate('/validate')}
              className="action-button secondary-button"
            >
              <ArrowLeft size={20} />
              Validate Another Idea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;