import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2, CheckCircle, TrendingUp, Users, Target, ArrowRight, Info } from 'lucide-react';

const ValidationForm = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    targetAudience: '',
    email: user?.email || '',
    budget: '',
    timeline: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const categories = [
    'SaaS / Software',
    'Mobile App',
    'E-commerce',
    'Content Platform',
    'Marketplace',
    'Fintech',
    'Health & Wellness',
    'Education',
    'Entertainment',
    'Productivity',
    'Social Media',
    'Other'
  ];

  const budgets = [
    'Under $5K',
    '$5K - $25K',
    '$25K - $100K',
    '$100K - $500K',
    'Over $500K'
  ];

  const timelines = [
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '1-2 years',
    'Over 2 years'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call and analysis
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
      
      // Generate mock validation results with scores out of 10
      const demandScore = Math.floor(Math.random() * 10) + 1; // 1-10
      const competitionScore = Math.floor(Math.random() * 10) + 1; // 1-10
      const urgencyScore = Math.floor(Math.random() * 10) + 1; // 1-10
      const overallScore = Math.round((demandScore + competitionScore + urgencyScore) / 3);
      
      let recommendation = '';
      let recommendationColor = '';
      let validationStatus = '';
      let reasons = [];
      
      if (overallScore >= 8) {
        recommendation = '🚀 Go for validation!';
        recommendationColor = '#166534';
        validationStatus = 'VALIDATE';
        reasons = [
          'Strong market demand with clear customer pain points',
          'Competitive landscape shows opportunity for differentiation',
          'Market timing is optimal with growing user interest'
        ];
      } else if (overallScore >= 5) {
        recommendation = '⚡ Tweak needed before proceeding';
        recommendationColor = '#d97706';
        validationStatus = 'TWEAK';
        reasons = [
          'Market demand exists but needs better positioning',
          'Competition is manageable with strategic adjustments',
          'Requires refinement to capture market urgency'
        ];
      } else {
        recommendation = '❌ Not recommended at this time';
        recommendationColor = '#dc2626';
        validationStatus = 'NO';
        reasons = [
          'Market demand is insufficient or unclear',
          'Competition is too saturated for new entrants',
          'Market timing may not be optimal right now'
        ];
      }
      
      const validationResults = {
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
        score: overallScore,
        demandScore: demandScore,
        competitionScore: competitionScore,
        urgencyScore: urgencyScore,
        recommendation: recommendation,
        recommendationColor: recommendationColor,
        validationStatus: validationStatus,
        reasons: reasons,
        insights: [
          'Strong market demand detected',
          'Moderate competition level',
          'Good timing for market entry'
        ]
      };
      
      // Store form data in localStorage for the report
      localStorage.setItem('validationData', JSON.stringify(validationResults));
      
      // Save to user's saved ideas if authenticated
      if (user) {
        const savedIdeas = JSON.parse(localStorage.getItem('savedIdeas') || '[]');
        savedIdeas.push(validationResults);
        localStorage.setItem('savedIdeas', JSON.stringify(savedIdeas));
      }
      
      // Redirect to report page after a brief delay
      setTimeout(() => {
        navigate('/report');
      }, 2000);
    }, 3000);
  };

  const isFormValid = formData.productName && formData.description && 
                     formData.category && formData.targetAudience && formData.email;

  const getProgressPercentage = () => {
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    return (filledFields / Object.keys(formData).length) * 100;
  };

  if (isComplete) {
    return (
      <div className="validation-container">
        <div className="validation-form">
          <div className="loading">
            <CheckCircle size={60} color="#10b981" />
            <h2>Analysis Complete!</h2>
            <p>Redirecting you to your validation report...</p>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="validation-container">
      <div className="validation-form">
        <h2 className="form-title">Validate Your Idea</h2>
        
        {/* Progress Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Form Progress</span>
            <span style={{ fontSize: '0.9rem', color: '#667eea', fontWeight: '600' }}>
              {Math.round(getProgressPercentage())}%
            </span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${getProgressPercentage()}%` }}></div>
          </div>
        </div>

        {/* Form Steps Indicator */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '2rem',
          gap: '1rem'
        }}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: currentStep >= step ? '#667eea' : '#e5e7eb',
                color: currentStep >= step ? 'white' : '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              {step}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
            <div className="form-group">
              <label htmlFor="productName" className="form-label">
                Product/Service Name *
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., TaskMaster Pro, AI Writing Assistant"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Describe what your product does, the problem it solves, and how it works..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                disabled={!formData.productName || !formData.description || !formData.category}
                className="submit-button"
                style={{ width: 'auto', padding: '1rem 2rem' }}
              >
                <span>
                  Next Step <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                </span>
              </button>
            </div>
          </div>

          {/* Step 2: Target & Budget */}
          <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
            <div className="form-group">
              <label htmlFor="targetAudience" className="form-label">
                Target Audience *
              </label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., Small business owners, Freelancers, Students"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="budget" className="form-label">
                Development Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select budget range</option>
                {budgets.map(budget => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="timeline" className="form-label">
                Development Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select timeline</option>
                {timelines.map(timeline => (
                  <option key={timeline} value={timeline}>
                    {timeline}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="secondary-button"
                style={{ 
                  width: 'auto', 
                  padding: '1rem 2rem', 
                  marginRight: '1rem',
                  background: '#6b7280'
                }}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                disabled={!formData.targetAudience}
                className="submit-button"
                style={{ width: 'auto', padding: '1rem 2rem' }}
              >
                <span>
                  Next Step <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                </span>
              </button>
            </div>
          </div>

          {/* Step 3: Contact & Submit */}
          <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="your@email.com"
                required
              />
              <small style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                We'll send your validation report to this email
              </small>
            </div>

            {/* Info Box */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              border: '1px solid #0ea5e9',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}>
              <Info size={20} color="#0ea5e9" style={{ marginTop: '2px' }} />
              <div>
                <h4 style={{ color: '#0ea5e9', marginBottom: '0.5rem', fontSize: '1rem' }}>
                  What happens next?
                </h4>
                <ul style={{ color: '#0369a1', fontSize: '0.9rem', paddingLeft: '1rem' }}>
                  <li>Our AI analyzes your idea using market data</li>
                  <li>We check demand signals, competition, and urgency</li>
                  <li>You receive a comprehensive PDF report in minutes</li>
                </ul>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="secondary-button"
                style={{ 
                  width: 'auto', 
                  padding: '1rem 2rem', 
                  marginRight: '1rem',
                  background: '#6b7280'
                }}
              >
                Previous
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={!isFormValid || isLoading}
                style={{ width: 'auto', padding: '1rem 2rem' }}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="spinner" style={{ marginRight: '8px' }} />
                    Analyzing Your Idea...
                  </>
                ) : (
                  <>
                    <Send size={20} style={{ marginRight: '8px' }} />
                    Validate My Idea
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <h3>Analyzing Your Idea...</h3>
            <p>Our AI is checking demand signals, competition, and market urgency...</p>
            
            {/* Analysis Steps */}
            <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '400px', margin: '2rem auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <TrendingUp size={16} color="#10b981" style={{ marginRight: '8px' }} />
                <span>Checking demand signals...</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Users size={16} color="#667eea" style={{ marginRight: '8px' }} />
                <span>Analyzing competition...</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <Target size={16} color="#f59e0b" style={{ marginRight: '8px' }} />
                <span>Evaluating market urgency...</span>
              </div>
            </div>
            
            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
              This usually takes 2-3 minutes
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationForm;
