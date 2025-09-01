import React, { useState, useEffect, useRef } from 'react';
import { User, Mail, Lock, Eye, EyeOff, LogIn, UserPlus, ArrowRight, Shield, CheckCircle, Github, Chrome, Facebook, AlertCircle, Zap, Star, Sparkles, TrendingUp, Award, Heart, Clock, Users, Globe } from 'lucide-react';

const Auth = ({ onAuthSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [socialLoading, setSocialLoading] = useState('');
  const [focusedField, setFocusedField] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  // Password strength calculation
  useEffect(() => {
    if (formData.password) {
      let strength = 0;
      if (formData.password.length >= 8) strength += 1;
      if (/[a-z]/.test(formData.password)) strength += 1;
      if (/[A-Z]/.test(formData.password)) strength += 1;
      if (/[0-9]/.test(formData.password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

  // Calculate form progress
  useEffect(() => {
    if (isLogin) {
      const filledFields = [formData.email, formData.password].filter(Boolean).length;
      setFormProgress((filledFields / 2) * 100);
    } else {
      const filledFields = [formData.name, formData.email, formData.password, formData.confirmPassword].filter(Boolean).length;
      setFormProgress((filledFields / 4) * 100);
    }
  }, [formData, isLogin]);

  // Custom scroll progress hook
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(progress);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleInputBlur = () => {
    setFocusedField('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock user data
      const userData = {
        id: Date.now(),
        name: formData.name || 'User',
        email: formData.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'User')}&background=667eea&color=fff`,
        joinDate: new Date().toISOString(),
        validatedIdeas: 0,
        savedIdeas: []
      };

      // Store in localStorage (in real app, this would be handled by backend)
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      setShowSuccess(true);
      setTimeout(() => {
        onAuthSuccess(userData);
      }, 1000);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);
    try {
      // Simulate social login
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`${provider} login clicked`);
    } catch (error) {
      console.error(`${provider} login error:`, error);
    } finally {
      setSocialLoading('');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    });
    setErrors({});

    setFormProgress(0);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return '';
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return '#ef4444';
    if (passwordStrength <= 3) return '#f59e0b';
    if (passwordStrength <= 4) return '#10b981';
    return '#059669';
  };

  if (showSuccess) {
    return (
      <div className="auth-overlay">
        <div className="auth-container success-state">
          <div className="success-content">
            <div className="success-icon">
              <CheckCircle size={64} />
            </div>
            <h2>Welcome aboard! 🎉</h2>
            <p>Your account has been created successfully. Redirecting you to the dashboard...</p>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-overlay">
      <div className="auth-container" ref={containerRef}>
        {/* Custom Scroll Indicator */}
        {scrollProgress > 0 && (
          <div className="custom-scroll-indicator">
            <div 
              className="scroll-progress-bar" 
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="form-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${formProgress}%` }}
            ></div>
          </div>
          <span className="progress-text">{Math.round(formProgress)}% Complete</span>
        </div>

        <div className="auth-header">
          <button 
            className="close-btn" 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#374151',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.2s ease',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 1)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.9)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ×
          </button>
          <div className="auth-logo">
            <div className="logo-icon">
              <Shield size={32} />
            </div>
            <h2>
              {isLogin ? (
                <>
                  <Sparkles size={24} className="sparkle-icon" />
                  Welcome Back
                </>
              ) : (
                <>
                  <TrendingUp size={24} className="trending-icon" />
                  Join Us
                </>
              )}
            </h2>
          </div>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Sign in to access your saved ideas and track your progress' 
              : 'Create your account to start validating ideas like a pro'
            }
          </p>
        </div>

        {/* Enhanced Social Login Section */}
        <div className="social-login-section">
          <div className="social-divider">
            <span>Or continue with</span>
          </div>
          <div className="social-buttons">
            <button 
              className={`social-btn google ${socialLoading === 'google' ? 'loading' : ''}`}
              onClick={() => handleSocialLogin('google')}
              disabled={socialLoading}
            >
              {socialLoading === 'google' ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <Chrome size={20} />
                  Google
                </>
              )}
            </button>
            <button 
              className={`social-btn github ${socialLoading === 'github' ? 'loading' : ''}`}
              onClick={() => handleSocialLogin('github')}
              disabled={socialLoading}
            >
              {socialLoading === 'github' ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <Github size={20} />
                  GitHub
                </>
              )}
            </button>
            <button 
              className={`social-btn facebook ${socialLoading === 'facebook' ? 'loading' : ''}`}
              onClick={() => handleSocialLogin('facebook')}
              disabled={socialLoading}
            >
              {socialLoading === 'github' ? (
                <div className="loading-spinner"></div>
              ) : (
                <>
                  <Facebook size={20} />
                  Facebook
                </>
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <div className="floating-label">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('name')}
                  onBlur={handleInputBlur}
                  className={`form-input ${errors.name ? 'error' : ''} ${focusedField === 'name' || formData.name ? 'focused' : ''}`}
                  placeholder=" "
                />
                <label className={`floating-label-text ${focusedField === 'name' || formData.name ? 'active' : ''}`}>
                  <User size={18} />
                  Full Name
                </label>
              </div>
              {errors.name && (
                <span className="error-message">
                  <AlertCircle size={14} />
                  {errors.name}
                </span>
              )}
            </div>
          )}

          <div className="form-group">
            <div className="floating-label">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus('email')}
                onBlur={handleInputBlur}
                className={`form-input ${errors.email ? 'error' : ''} ${focusedField === 'email' || formData.email ? 'focused' : ''}`}
                placeholder=" "
              />
              <label className={`floating-label-text ${focusedField === 'email' || formData.email ? 'active' : ''}`}>
                <Mail size={18} />
                Email Address
              </label>
            </div>
            {errors.email && (
              <span className="error-message">
                <AlertCircle size={14} />
                {errors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <div className="floating-label">
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => handleInputFocus('password')}
                  onBlur={handleInputBlur}
                  className={`form-input ${errors.password ? 'error' : ''} ${focusedField === 'password' || formData.password ? 'focused' : ''}`}
                  placeholder=" "
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <label className={`floating-label-text ${focusedField === 'password' || formData.password ? 'active' : ''}`}>
                <Lock size={18} />
                Password
              </label>
            </div>
            
            {/* Enhanced Password Strength Indicator */}
            {formData.password && (
              <div className="password-strength">
                <div className="strength-header">
                  <span>Password Strength</span>
                  <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="strength-bars">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <div
                      key={bar}
                      className={`strength-bar ${bar <= passwordStrength ? 'filled' : ''}`}
                      style={{
                        backgroundColor: bar <= passwordStrength ? getPasswordStrengthColor() : '#e5e7eb'
                      }}
                    ></div>
                  ))}
                </div>
                <div className="strength-requirements">
                  <div className={`requirement ${formData.password.length >= 8 ? 'met' : ''}`}>
                    <CheckCircle size={14} />
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`requirement ${/[a-z]/.test(formData.password) ? 'met' : ''}`}>
                    <CheckCircle size={14} />
                    <span>Lowercase letter</span>
                  </div>
                  <div className={`requirement ${/[A-Z]/.test(formData.password) ? 'met' : ''}`}>
                    <CheckCircle size={14} />
                    <span>Uppercase letter</span>
                  </div>
                  <div className={`requirement ${/[0-9]/.test(formData.password) ? 'met' : ''}`}>
                    <CheckCircle size={14} />
                    <span>Number</span>
                  </div>
                  <div className={`requirement ${/[^A-Za-z0-9]/.test(formData.password) ? 'met' : ''}`}>
                    <CheckCircle size={14} />
                    <span>Special character</span>
                  </div>
                </div>
              </div>
            )}
            
            {errors.password && (
              <span className="error-message">
                <AlertCircle size={14} />
                {errors.password}
              </span>
            )}
          </div>

          {!isLogin && (
            <div className="form-group">
              <div className="floating-label">
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => handleInputFocus('confirmPassword')}
                    onBlur={handleInputBlur}
                    className={`form-input ${errors.confirmPassword ? 'error' : ''} ${focusedField === 'confirmPassword' || formData.confirmPassword ? 'focused' : ''}`}
                    placeholder=" "
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <label className={`floating-label-text ${focusedField === 'confirmPassword' || formData.confirmPassword ? 'active' : ''}`}>
                  <Lock size={18} />
                  Confirm Password
                </label>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">
                  <AlertCircle size={14} />
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          )}

          {/* Enhanced Remember Me & Forgot Password */}
          <div className="form-options">
            {isLogin && (
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="checkmark"></span>
                  <span className="checkbox-text">Remember me</span>
                </label>
              </div>
            )}
            {isLogin && (
              <button type="button" className="forgot-password">
                <Clock size={16} />
                Forgot password?
              </button>
            )}
          </div>

          <button
            type="submit"
            className={`auth-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button className="toggle-mode" onClick={toggleMode}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Enhanced Benefits Section */}
        <div className="auth-benefits">
          <h4>
            <Star size={20} />
            Why create an account?
          </h4>
          <div className="benefits-list">
            <div className="benefit-item">
              <CheckCircle size={16} />
              <span>Save and track your ideas</span>
            </div>
            <div className="benefit-item">
              <CheckCircle size={16} />
              <span>Access detailed analytics</span>
            </div>
            <div className="benefit-item">
              <CheckCircle size={16} />
              <span>Export professional reports</span>
            </div>
            <div className="benefit-item">
              <CheckCircle size={16} />
              <span>Get AI-powered suggestions</span>
            </div>
            <div className="benefit-item">
              <Zap size={16} />
              <span>Priority customer support</span>
            </div>
            <div className="benefit-item">
              <Users size={16} />
              <span>Join our community</span>
            </div>
            <div className="benefit-item">
              <Globe size={16} />
              <span>Access from anywhere</span>
            </div>
            <div className="benefit-item">
              <Award size={16} />
              <span>Earn achievements</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <div className="trust-item">
            <Heart size={16} />
            <span>Trusted by 10,000+ founders</span>
          </div>
          <div className="trust-item">
            <Shield size={16} />
            <span>Bank-level security</span>
          </div>
          <div className="trust-item">
            <Clock size={16} />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
