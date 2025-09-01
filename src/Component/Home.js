import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Target, TrendingUp, Download, Clock, Shield, Star, Users, Award, CheckCircle } from 'lucide-react';

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Target size={24} />,
      title: "Input Your Idea",
      description: "Describe your product idea, target audience, and category. Be as specific as possible for better analysis."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "AI Analysis",
      description: "Our system analyzes demand signals, competition landscape, and market urgency using advanced LLM technology."
    },
    {
      icon: <Download size={24} />,
      title: "Instant Report",
      description: "Get a comprehensive PDF report with scores, insights, and actionable recommendations in minutes."
    },
    {
      icon: <Clock size={24} />,
      title: "Save Time & Money",
      description: "Validate ideas before building. Avoid months of development on products with no market demand."
    },
    {
      icon: <Shield size={24} />,
      title: "Data-Driven Insights",
      description: "Based on real market data, Google trends, social media signals, and competitive analysis."
    },
    {
      icon: <Zap size={24} />,
      title: "Quick & Easy",
      description: "Simple form submission. No complex setup required. Get results in under 5 minutes."
    }
  ];

  return (
    <div>
      {/* Floating Elements */}
      <div className="floating-element"></div>
      <div className="floating-element"></div>
      <div className="floating-element"></div>

      <section className="hero">
        <div className="hero-content">
          <h1>Validate Your Idea in Minutes</h1>
          <p>
            Stop wasting months building products nobody wants. Get instant validation 
            reports using AI-powered analysis of demand, competition, and market urgency.
          </p>
          <Link to="/validate" className="cta-button">
            <span>
              <Zap size={20} style={{ marginRight: '8px' }} />
              Start Validation Now
            </span>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Ideas Validated</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">95%</div>
            <div className="stat-label">Accuracy Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2.5min</div>
            <div className="stat-label">Average Time</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$2M+</div>
            <div className="stat-label">Saved for Founders</div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>How It Works</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card ${currentFeature === index ? 'active' : ''}`}
              style={{
                transform: currentFeature === index ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2>What Founders Say</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} color="#fbbf24" fill="#fbbf24" />
                ))}
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                "This tool saved me 6 months of development time. The insights were spot-on!"
              </p>
              <div style={{ fontWeight: '600', color: '#667eea' }}>Sarah Chen, TechStart</div>
            </div>
            <div className="feature-card">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} color="#fbbf24" fill="#fbbf24" />
                ))}
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                "The competition analysis helped me pivot my idea before it was too late."
              </p>
              <div style={{ fontWeight: '600', color: '#667eea' }}>Mike Rodriguez, InnovateLab</div>
            </div>
            <div className="feature-card">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} color="#fbbf24" fill="#fbbf24" />
                ))}
              </div>
              <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                "Finally, a tool that gives real data instead of just gut feelings!"
              </p>
              <div style={{ fontWeight: '600', color: '#667eea' }}>Emma Thompson, GrowthCo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section - Fixed */}
      <section className="perfect-for-section">
        <div className="perfect-for-container">
          <h2>Perfect For</h2>
          <div className="perfect-for-grid">
            <div className="perfect-for-card">
              <div className="emoji">🚀</div>
              <h3>Startup Founders</h3>
              <p>Validate your MVP idea before raising funds or building the full product.</p>
              <div className="feature-tag">
                <CheckCircle size={16} />
                <span>Pre-funding validation</span>
              </div>
            </div>
            <div className="perfect-for-card">
              <div className="emoji">💼</div>
              <h3>Freelancers</h3>
              <p>Test client project ideas and ensure they're worth your development time.</p>
              <div className="feature-tag">
                <CheckCircle size={16} />
                <span>Client project validation</span>
              </div>
            </div>
            <div className="perfect-for-card">
              <div className="emoji">🔬</div>
              <h3>Product Managers</h3>
              <p>Validate new feature ideas and prioritize development based on market demand.</p>
              <div className="feature-tag">
                <CheckCircle size={16} />
                <span>Feature prioritization</span>
              </div>
            </div>
            <div className="perfect-for-card">
              <div className="emoji">🎯</div>
              <h3>Entrepreneurs</h3>
              <p>Test business ideas across different markets and niches before committing resources.</p>
              <div className="feature-tag">
                <CheckCircle size={16} />
                <span>Market expansion</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Validate Your Next Big Idea?</h2>
          <p>
            Join thousands of founders who've already saved time and money with our validation tool.
          </p>
          <Link to="/validate" className="cta-button" style={{ 
            background: 'linear-gradient(45deg, #10b981, #059669)',
            display: 'inline-block'
          }}>
            <span>
              <Zap size={20} style={{ marginRight: '8px' }} />
              Start Free Validation
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
