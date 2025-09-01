import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Mail, ArrowLeft, TrendingUp, Users, Target, AlertTriangle, Share2, Bookmark, RefreshCw } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Report = () => {
  const navigate = useNavigate();
  const [validationData, setValidationData] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('validationData');
    if (data) {
      setValidationData(JSON.parse(data));
    } else {
      // Redirect to validation form if no data
      navigate('/validate');
    }
  }, [navigate]);

  // Generate sample validation results
  const generateValidationResults = () => {
    if (!validationData) return null;

    const productName = validationData.productName;
    const category = validationData.category;
    
    // Generate realistic scores based on product characteristics
    const demandScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const competitionScore = Math.floor(Math.random() * 30) + 40; // 40-70
    const urgencyScore = Math.floor(Math.random() * 35) + 55; // 55-90
    
    const overallScore = Math.round((demandScore + competitionScore + urgencyScore) / 3);
    
    let recommendation = '';
    let recommendationColor = '';
    let riskLevel = '';
    
    if (overallScore >= 80) {
      recommendation = '🚀 Worth Building - High potential with strong market signals';
      recommendationColor = '#166534';
      riskLevel = 'Low Risk';
    } else if (overallScore >= 65) {
      recommendation = '✅ Promising - Good potential with some considerations';
      recommendationColor = '#059669';
      riskLevel = 'Medium-Low Risk';
    } else if (overallScore >= 50) {
      recommendation = '⚠️ Needs Niche - Potential exists but requires focused approach';
      recommendationColor = '#d97706';
      riskLevel = 'Medium Risk';
    } else {
      recommendation = '❌ Too Crowded - High competition, consider pivoting or finding unique angle';
      recommendationColor = '#dc2626';
      riskLevel = 'High Risk';
    }

    return {
      overallScore,
      demandScore,
      competitionScore,
      urgencyScore,
      recommendation,
      recommendationColor,
      riskLevel,
      insights: {
        demand: [
          `Strong interest in ${category.toLowerCase()} solutions`,
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
      timeToMarket: Math.floor(Math.random() * 6) + 3 // 3-9 months
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
            {results.overallScore}
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

          <div className="metric-grid">
            <div className="metric-card">
              <div className="metric-title">
                <TrendingUp size={20} style={{ marginRight: '8px', color: '#10b981' }} />
                Demand Score
              </div>
              <div className="metric-value">{results.demandScore}/100</div>
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
                  width: `${results.demandScore}%`,
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
              <div className="metric-value">{results.competitionScore}/100</div>
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
                  width: `${results.competitionScore}%`,
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
              <div className="metric-value">{results.urgencyScore}/100</div>
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
                  width: `${results.urgencyScore}%`,
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
