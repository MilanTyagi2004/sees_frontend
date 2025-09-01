import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles, TrendingUp, Target, DollarSign, Users, Lightbulb, X, Minimize2, Maximize2 } from 'lucide-react';

const AIChat = ({ isOpen, onClose, validationData }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response with intelligent analysis
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, validationData);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponse.content,
        suggestions: aiResponse.suggestions,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (message, data) => {
    const lowerMessage = message.toLowerCase();
    
    // Market analysis responses
    if (lowerMessage.includes('market') || lowerMessage.includes('demand')) {
      return {
        content: `Based on your idea "${data?.productName || 'this product'}", I can see strong market potential. The current market size is estimated at $${Math.floor(Math.random() * 50) + 10}B with a ${Math.floor(Math.random() * 20) + 15}% annual growth rate. Your target audience shows high engagement with similar solutions.`,
        suggestions: [
          { icon: TrendingUp, text: 'Analyze market trends', action: 'trends' },
          { icon: Users, text: 'Research competitors', action: 'competitors' },
          { icon: Target, text: 'Define target segments', action: 'segments' }
        ]
      };
    }

    // Funding and financial responses
    if (lowerMessage.includes('funding') || lowerMessage.includes('money') || lowerMessage.includes('investment')) {
      return {
        content: `For your business idea, I recommend starting with a ${Math.floor(Math.random() * 500) + 100}K seed round. Based on your market size and growth potential, you could aim for a $${Math.floor(Math.random() * 5) + 2}M Series A in 18-24 months. Your unit economics look promising with a projected LTV:CAC ratio of 3:1.`,
        suggestions: [
          { icon: DollarSign, text: 'Calculate funding needs', action: 'funding' },
          { icon: Users, text: 'Find investors', action: 'investors' },
          { icon: Target, text: 'Create pitch deck', action: 'pitch' }
        ]
      };
    }

    // Competition analysis
    if (lowerMessage.includes('competitor') || lowerMessage.includes('competition')) {
      return {
        content: `I've identified ${Math.floor(Math.random() * 5) + 3} main competitors in your space. The market leader has ${Math.floor(Math.random() * 30) + 20}% market share, but there are clear gaps in ${['pricing', 'user experience', 'feature set', 'customer support'][Math.floor(Math.random() * 4)]} that you can exploit.`,
        suggestions: [
          { icon: TrendingUp, text: 'Track competitors', action: 'tracking' },
          { icon: Target, text: 'Find market gaps', action: 'gaps' },
          { icon: Lightbulb, text: 'Differentiation strategy', action: 'strategy' }
        ]
      };
    }

    // General business advice
    return {
      content: `That's a great question! Based on your idea validation data, I can help you with market analysis, funding strategies, competitive positioning, or business planning. What specific aspect would you like to explore further?`,
      suggestions: [
        { icon: TrendingUp, text: 'Market analysis', action: 'market' },
        { icon: DollarSign, text: 'Financial planning', action: 'financial' },
        { icon: Users, text: 'Team building', action: 'team' },
        { icon: Target, text: 'Go-to-market strategy', action: 'gtm' }
      ]
    };
  };

  const handleSuggestionClick = (action) => {
    const suggestionMessages = {
      trends: 'Can you show me the latest market trends for my industry?',
      competitors: 'Help me analyze my main competitors and their strategies.',
      segments: 'What are the best target customer segments for my product?',
      funding: 'Calculate how much funding I need for my startup.',
      investors: 'Help me find suitable investors for my stage and industry.',
      pitch: 'Guide me through creating an effective pitch deck.',
      tracking: 'Set up competitor tracking and monitoring.',
      gaps: 'Identify market gaps and opportunities.',
      strategy: 'Develop a differentiation strategy.',
      market: 'Provide detailed market analysis.',
      financial: 'Create financial projections and models.',
      team: 'Advise on team building and hiring.',
      gtm: 'Develop a go-to-market strategy.'
    };

    setInputMessage(suggestionMessages[action] || 'Tell me more about this.');
  };

  const quickQuestions = [
    "What's my market size?",
    "How much funding do I need?",
    "Who are my competitors?",
    "What's my competitive advantage?",
    "How do I price my product?",
    "What's my go-to-market strategy?"
  ];

  if (!isOpen) return null;
  return (
    <div className={`ai-chat-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="ai-chat-header">
        <div className="ai-chat-title">
          <Bot size={20} color="#667eea" />
          <span>AI Business Advisor</span>
          <div className="ai-status">
            <div className="status-dot"></div>
            <span>Online</span>
          </div>
        </div>
        <div className="ai-chat-controls">
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="control-btn"
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={onClose} className="control-btn close-btn">
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="ai-chat-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <div className="welcome-content">
                  <Sparkles size={32} color="#667eea" />
                  <h3>Hi! I'm your AI Business Advisor</h3>
                  <p>I can help you with market analysis, funding strategies, competitive research, and business planning. What would you like to know?</p>
                  
                  <div className="quick-questions">
                    <h4>Quick Questions:</h4>
                    <div className="question-chips">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          className="question-chip"
                          onClick={() => setInputMessage(question)}
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.content}</div>
                  {message.suggestions && (
                    <div className="message-suggestions">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="suggestion-btn"
                          onClick={() => handleSuggestionClick(suggestion.action)}
                        >
                          <suggestion.icon size={14} />
                          {suggestion.text}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="message bot">
                <div className="message-avatar">
                  <Bot size={16} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <Loader2 size={16} className="spinner" />
                    <span>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-input">
            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your business idea..."
                className="chat-input"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="send-btn"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="input-footer">
              <span>AI responses are for guidance only. Always consult with business experts.</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIChat;
