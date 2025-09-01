import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Target, TrendingUp, Download, Clock, Shield, Star, Award, CheckCircle, ArrowRight, Sparkles, Rocket } from 'lucide-react';

const Home = ({ user, onLogin }) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 6);
    }, 4000);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <Target size={28} />,
      title: "Input Your Idea",
      description: "Describe your product idea, target audience, and category. Be as specific as possible for better analysis.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <TrendingUp size={28} />,
      title: "AI Analysis",
      description: "Our system analyzes demand signals, competition landscape, and market urgency using advanced LLM technology.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Download size={28} />,
      title: "Instant Report",
      description: "Get a comprehensive PDF report with scores, insights, and actionable recommendations in minutes.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Clock size={28} />,
      title: "Save Time & Money",
      description: "Validate ideas before building. Avoid months of development on products with no market demand.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Shield size={28} />,
      title: "Data-Driven Insights",
      description: "Based on real market data, Google trends, social media signals, and competitive analysis.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Zap size={28} />,
      title: "Quick & Easy",
      description: "Simple form submission. No complex setup required. Get results in under 5 minutes.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div className="home-container">
      {/* Enhanced Floating Elements */}
      <div className="floating-element floating-1" style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
      <div className="floating-element floating-2" style={{ transform: `translateY(${scrollY * -0.05}px)` }}></div>
      <div className="floating-element floating-3" style={{ transform: `translateY(${scrollY * 0.08}px)` }}></div>
      <div className="floating-element floating-4" style={{ transform: `translateY(${scrollY * -0.03}px)` }}></div>
      <div className="floating-element floating-5" style={{ transform: `translateY(${scrollY * 0.06}px)` }}></div>

      {/* Enhanced Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <div className="hero-glow"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>AI-Powered Validation</span>
          </div>
          <h1 className="hero-title">
            Validate Your Idea in
            <span className="gradient-text"> Minutes</span>
          </h1>
          <p className="hero-description">
            Stop wasting months building products nobody wants. Get instant validation 
            reports using AI-powered analysis of demand, competition, and market urgency.
          </p>
          <div className="hero-cta">
            <Link to="/validate" className="cta-button primary">
              <span>
                <Rocket size={20} />
                {user ? 'Validate New Idea' : 'Start Validation Now'}
                <ArrowRight size={20} />
              </span>
            </Link>
            <div className="hero-stats">
              <div className="stat-mini">
                <span className="stat-number">2.5min</span>
                <span className="stat-label">Average Time</span>
              </div>
              <div className="stat-mini">
                <span className="stat-number">95%</span>
                <span className="stat-label">Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-header">
            <h2>Trusted by Founders Worldwide</h2>
            <p>Join thousands who've already validated their ideas</p>
          </div>
          <div className="stats-grid">
            <div className="stat-item enhanced">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-number">10K+</div>
              <div className="stat-label">Ideas Validated</div>
              <div className="stat-trend positive">+15% this month</div>
            </div>
            <div className="stat-item enhanced">
              <div className="stat-icon">
                <Award size={24} />
              </div>
              <div className="stat-number">95%</div>
              <div className="stat-label">Accuracy Rate</div>
              <div className="stat-trend positive">Industry leading</div>
            </div>
            <div className="stat-item enhanced">
              <div className="stat-icon">
                <Clock size={24} />
              </div>
              <div className="stat-number">2.5min</div>
              <div className="stat-label">Average Time</div>
              <div className="stat-trend positive">Faster than ever</div>
            </div>
            <div className="stat-item enhanced">
              <div className="stat-icon">
                <Shield size={24} />
              </div>
              <div className="stat-number">$2M+</div>
              <div className="stat-label">Saved for Founders</div>
              <div className="stat-trend positive">Real savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for better visual separation */}
      <div className="section-spacer"></div>

      {/* Enhanced Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple, powerful, and lightning-fast validation process</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card enhanced ${currentFeature === index ? 'active' : ''}`}
                style={{
                  transform: currentFeature === index ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
              >
                <div className="feature-card-bg"></div>
                <div className={`feature-icon enhanced ${feature.color}`}>
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <div className="feature-step">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <h2>What Founders Say</h2>
            <p>Real feedback from real entrepreneurs</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card enhanced">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="star-filled" />
                ))}
              </div>
              <blockquote>
                "This tool saved me 6 months of development time. The insights were spot-on and helped me pivot before it was too late!"
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">SC</div>
                <div className="author-info">
                  <div className="author-name">Sarah Chen</div>
                  <div className="author-company">TechStart Founder</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card enhanced">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="star-filled" />
                ))}
              </div>
              <blockquote>
                "The competition analysis helped me understand the market landscape better than any consultant could. Game changer!"
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">MR</div>
                <div className="author-info">
                  <div className="author-name">Mike Rodriguez</div>
                  <div className="author-company">InnovateLab CEO</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card enhanced">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="star-filled" />
                ))}
              </div>
              <blockquote>
                "Finally, a tool that gives real data instead of just gut feelings! This is exactly what I needed for my startup."
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">ET</div>
                <div className="author-info">
                  <div className="author-name">Emma Thompson</div>
                  <div className="author-company">GrowthCo Founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Perfect For Section */}
      <section className="perfect-for-section">
        <div className="perfect-for-container">
          <div className="section-header">
            <h2>Perfect For</h2>
            <p>Whether you're just starting or scaling up</p>
          </div>
          <div className="perfect-for-grid">
            <div className="perfect-for-card enhanced">
              <div className="card-glow"></div>
              <div className="emoji">🚀</div>
              <h3>Startup Founders</h3>
              <p>Validate your MVP idea before raising funds or building the full product.</p>
              <div className="feature-tags">
                <div className="feature-tag">
                  <CheckCircle size={16} />
                  <span>Pre-funding validation</span>
                </div>
                <div className="feature-tag">
                  <CheckCircle size={16} />
                  <span>Market research</span>
                </div>
              </div>
            </div>
            <div className="perfect-for-card enhanced">
              <div className="card-glow"></div>
              <div className="emoji">💼</div>
              <h3>Freelancers</h3>
              <p>Test client project ideas and ensure they're worth your development time.</p>
              <div className="feature-tags">
                <div className="feature-tag">
                  <CheckCircle size={16} />
                  <span>Client project validation</span>
                </div>
                <div className="feature-tag">
                  <CheckCircle size={16} />
                  <span>Portfolio building</span>
                </div>
              </div>
            </div>
            <div className="perfect-for-card enhanced">
              <div className="card-glow"></div>
              <div className="emoji">🔬</div>
              <h3>Product Managers</h3>
              <p>Validate new feature ideas and prioritize development based on market demand.</p>
              <div className="feature-tags">
                <div className="feature-tag">
                  <CheckCircle size={16} />
                  <span>Feature prioritization</span>
                </div>
                <div className="feature-tag">
                  <CheckCircle size={16} />
                  <span>User research</span>
                </div>
              </div>
            </div>
            <div className="perfect-for-card enhanced">
              <div className="card-glow"></div>
              <div className="emoji">🎯</div>
              <h3>Entrepreneurs</h3>
              <p>Test business ideas across different markets and niches before committing resources.</p>
              <div className="feature-tags">
                <div className="feature-tag">
                  <CheckCircle size={16} />
                  <span>Market expansion</span>
                </div>
                <div className="feature-tag">
                  <CheckCircle size={16} />
                  <span>Risk assessment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-pattern"></div>
          <div className="cta-glow"></div>
        </div>
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to Validate Your Next Big Idea?</h2>
            <p>
              Join thousands of founders who've already saved time and money with our validation tool.
              Start your journey to success today.
            </p>
            <div className="cta-buttons">
              <Link to="/validate" className="cta-button primary large">
                <span>
                  <Rocket size={20} />
                  {user ? 'Validate New Idea' : 'Start Free Validation'}
                  <ArrowRight size={20} />
                </span>
              </Link>
              <div className="cta-guarantee">
                <Shield size={16} />
                <span>100% Free • No Credit Card Required</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
