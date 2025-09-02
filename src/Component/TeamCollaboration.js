import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  MessageCircle, 
  FileText, 
  Calendar, 
  Bell, 
  Settings, 
  Crown, 
  Shield, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Activity,
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Zap,
  Rocket,
  Star,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  Filter,
  Search,
  BookOpen,
  Globe,
  Heart,
  Target as TargetIcon,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  SkipForward,
  RefreshCw,
  Save,
  Lock,
  Unlock
} from 'lucide-react';

const TeamCollaboration = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [teamMembers, setTeamMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [isInviting, setIsInviting] = useState(false);
  const [newInvite, setNewInvite] = useState({
    email: '',
    role: 'member',
    message: ''
  });
  const [discussions, setDiscussions] = useState([]);
  const [newDiscussion, setNewDiscussion] = useState('');
  const [projects, setProjects] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [teamStats, setTeamStats] = useState({});
  const [typingUserIds, setTypingUserIds] = useState([]);
  const [reactionsByDiscussion, setReactionsByDiscussion] = useState({});

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = () => {
    // Enhanced team members with more data
    setTeamMembers([
      {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        role: 'owner',
        avatar: 'JS',
        status: 'online',
        lastActive: new Date(),
        permissions: ['admin', 'edit', 'view'],
        joinedDate: new Date('2024-01-15'),
        skills: ['Product Management', 'Market Research', 'Strategy'],
        projects: 5,
        contributions: 127,
        performance: 95
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        role: 'admin',
        avatar: 'SJ',
        status: 'online',
        lastActive: new Date(Date.now() - 5 * 60 * 1000),
        permissions: ['edit', 'view'],
        joinedDate: new Date('2024-02-01'),
        skills: ['Data Analysis', 'UX Design', 'Research'],
        projects: 3,
        contributions: 89,
        performance: 88
      },
      {
        id: 3,
        name: 'Mike Chen',
        email: 'mike@example.com',
        role: 'member',
        avatar: 'MC',
        status: 'away',
        lastActive: new Date(Date.now() - 30 * 60 * 1000),
        permissions: ['view'],
        joinedDate: new Date('2024-02-15'),
        skills: ['Development', 'Technical Analysis'],
        projects: 2,
        contributions: 45,
        performance: 76
      }
    ]);

    // Enhanced projects
    setProjects([
      {
        id: 1,
        name: 'Market Research Strategy',
        description: 'Comprehensive market analysis for new product launch',
        status: 'active',
        progress: 75,
        dueDate: new Date('2024-04-15'),
        members: [1, 2],
        tasks: 12,
        completedTasks: 9,
        priority: 'high',
        category: 'Research'
      },
      {
        id: 2,
        name: 'Competitor Analysis',
        description: 'Deep dive into competitor landscape and positioning',
        status: 'active',
        progress: 45,
        dueDate: new Date('2024-03-30'),
        members: [1, 3],
        tasks: 8,
        completedTasks: 4,
        priority: 'medium',
        category: 'Analysis'
      },
      {
        id: 3,
        name: 'Product Validation',
        description: 'User testing and feedback collection',
        status: 'planning',
        progress: 20,
        dueDate: new Date('2024-05-01'),
        members: [2, 3],
        tasks: 15,
        completedTasks: 3,
        priority: 'high',
        category: 'Validation'
      }
    ]);

    // Enhanced analytics
    setAnalytics({
      totalProjects: 3,
      activeProjects: 2,
      completedProjects: 1,
      teamProductivity: 87,
      averageResponseTime: '2.3 hours',
      collaborationScore: 92,
      taskCompletionRate: 78,
      memberEngagement: 94
    });

    // Enhanced team stats
    setTeamStats({
      totalMembers: 3,
      onlineMembers: 2,
      adminMembers: 2,
      totalContributions: 261,
      averagePerformance: 86,
      projectSuccessRate: 85
    });

    setInvitations([
      {
        id: 1,
        email: 'alex@example.com',
        role: 'member',
        status: 'pending',
        sentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        message: 'Join our startup validation team!'
      }
    ]);

    setDiscussions([
      {
        id: 1,
        title: 'Market Research Strategy',
        author: 'John Smith',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        replies: 3,
        lastReply: new Date(Date.now() - 30 * 60 * 1000),
        category: 'Strategy',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Competitor Analysis Results',
        author: 'Sarah Johnson',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        replies: 1,
        lastReply: new Date(Date.now() - 1 * 60 * 60 * 1000),
        category: 'Analysis',
        priority: 'medium'
      }
    ]);

    // Seed reactions state
    setReactionsByDiscussion({ 1: { '👍': 3, '🔥': 1 }, 2: { '👍': 1 } });
  };

  const handleInviteMember = () => {
    if (!newInvite.email) return;

    const invitation = {
      id: Date.now(),
      ...newInvite,
      status: 'pending',
      sentDate: new Date()
    };

    setInvitations(prev => [...prev, invitation]);
    setNewInvite({ email: '', role: 'member', message: '' });
    setIsInviting(false);
  };

  const handleRemoveMember = (memberId) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const handleResendInvitation = (invitationId) => {
    console.log('Resending invitation:', invitationId);
  };

  const handleCancelInvitation = (invitationId) => {
    setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'owner': return <Crown size={16} color="#f59e0b" />;
      case 'admin': return <Shield size={16} color="#667eea" />;
      case 'member': return <User size={16} color="#6b7280" />;
      default: return <User size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'away': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return <CheckCircle size={12} />;
      case 'away': return <AlertCircle size={12} />;
      case 'offline': return <XCircle size={12} />;
      default: return <XCircle size={12} />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getProjectStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'planning': return '#f59e0b';
      case 'completed': return '#667eea';
      case 'paused': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const toggleTyping = (memberId, isTyping) => {
    setTypingUserIds(prev => {
      const set = new Set(prev);
      if (isTyping) set.add(memberId); else set.delete(memberId);
      return Array.from(set);
    });
  };

  const addReaction = (discussionId, emoji) => {
    setReactionsByDiscussion(prev => {
      const current = prev[discussionId] || {};
      const next = { ...current, [emoji]: (current[emoji] || 0) + 1 };
      return { ...prev, [discussionId]: next };
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'members', label: 'Team Members', icon: Users },
    { id: 'projects', label: 'Projects', icon: Target },
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="team-collaboration">
      {/* Enhanced Header */}
      <div className="collaboration-header">
        <div className="header-content">
          <h1>Advanced Team Collaboration</h1>
          <p>Manage your team, track projects, and boost productivity</p>
          <div className="header-stats">
            <span className="stat-badge">
              <Activity size={14} />
              {analytics.teamProductivity}% Productivity
            </span>
            <span className="stat-badge">
              <TargetIcon size={14} />
              {analytics.activeProjects} Active Projects
            </span>
            <span className="stat-badge">
              <Heart size={14} />
              {analytics.collaborationScore}% Collaboration Score
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setIsInviting(true)}
            className="invite-btn"
          >
            <Plus size={16} />
            Invite Member
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
      <div className="collaboration-tabs">
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

      <div className="collaboration-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            {/* Team Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card primary">
                <div className="stat-icon">
                  <Users size={24} />
                </div>
                <div className="stat-content">
                  <h3>{teamStats.totalMembers}</h3>
                  <p>Team Members</p>
                  <div className="stat-trend positive">
                    <ArrowUpRight size={16} />
                    {teamStats.onlineMembers} online
                  </div>
                </div>
              </div>
              
              <div className="stat-card success">
                <div className="stat-icon">
                  <Target size={24} />
                </div>
                <div className="stat-content">
                  <h3>{analytics.activeProjects}</h3>
                  <p>Active Projects</p>
                  <div className="stat-trend positive">
                    <ArrowUpRight size={16} />
                    {analytics.totalProjects} total
                  </div>
                </div>
              </div>
              
              <div className="stat-card warning">
                <div className="stat-icon">
                  <Activity size={24} />
                </div>
                <div className="stat-content">
                  <h3>{analytics.teamProductivity}%</h3>
                  <p>Productivity</p>
                  <div className="stat-trend positive">
                    <ArrowUpRight size={16} />
                    +5% this week
                  </div>
                </div>
              </div>
              
              <div className="stat-card info">
                <div className="stat-icon">
                  <Heart size={24} />
                </div>
                <div className="stat-content">
                  <h3>{analytics.collaborationScore}%</h3>
                  <p>Collaboration Score</p>
                  <div className="stat-trend positive">
                    <ArrowUpRight size={16} />
                    Excellent
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity-section">
              <div className="section-header">
                <h3>Recent Activity</h3>
                <button className="view-all-btn">
                  View All
                  <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="activity-list">
                {teamMembers.slice(0, 3).map((member) => (
                  <div key={member.id} className="activity-item">
                    <div className="activity-avatar">
                      <div className="avatar-circle">
                        {member.avatar}
                      </div>
                      <div 
                        className="status-indicator" 
                        style={{ backgroundColor: getStatusColor(member.status) }}
                      >
                        {getStatusIcon(member.status)}
                      </div>
                    </div>
                    <div className="activity-content">
                      <h4>{member.name} completed a task</h4>
                      <p>Updated project progress</p>
                      <span className="activity-time">
                        {member.lastActive.toLocaleTimeString()}
                      </span>
                      {typingUserIds.includes(member.id) && (
                        <span className="typing" style={{ marginLeft: '6px' }}>
                          <span>typing</span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
              <div className="section-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="actions-grid">
                <button className="action-card" onClick={() => setIsInviting(true)}>
                  <Plus size={24} />
                  <span>Invite Member</span>
                </button>
                <button className="action-card">
                  <Target size={24} />
                  <span>New Project</span>
                </button>
                <button className="action-card">
                  <MessageCircle size={24} />
                  <span>Start Discussion</span>
                </button>
                <button className="action-card">
                  <BarChart3 size={24} />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && (
          <div className="members-section">
            <div className="section-header">
              <h3>Team Members ({teamMembers.length})</h3>
              <div className="member-stats">
                <div className="stat-item">
                  <div className="stat-value">{teamMembers.filter(m => m.status === 'online').length}</div>
                  <div className="stat-label">Online</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{teamMembers.filter(m => m.role === 'admin' || m.role === 'owner').length}</div>
                  <div className="stat-label">Admins</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{teamStats.averagePerformance}%</div>
                  <div className="stat-label">Avg Performance</div>
                </div>
              </div>
            </div>

            <div className="members-list">
              {teamMembers.map(member => (
                <div key={member.id} className="member-card enhanced">
                  <div className="member-avatar">
                    <div className="avatar-circle">
                      {member.avatar}
                    </div>
                    <div 
                      className="status-indicator" 
                      style={{ backgroundColor: getStatusColor(member.status) }}
                    >
                      {getStatusIcon(member.status)}
                    </div>
                  </div>

                  <div className="member-info">
                    <div className="member-name">
                      {member.name}
                      {getRoleIcon(member.role)}
                    </div>
                    <div className="member-email">{member.email}</div>
                    <div className="member-skills">
                      {member.skills.slice(0, 2).map((skill, index) => (
                        <span key={index} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                    <div className="member-meta">
                      <span className="role-badge">{member.role}</span>
                      <span className="performance-badge" style={{ 
                        backgroundColor: member.performance >= 90 ? '#10b98120' : 
                        member.performance >= 80 ? '#f59e0b20' : '#ef444420',
                        color: member.performance >= 90 ? '#10b981' : 
                        member.performance >= 80 ? '#f59e0b' : '#ef4444'
                      }}>
                        {member.performance}% Performance
                      </span>
                    </div>
                  </div>

                  <div className="member-stats">
                    <div className="stat">
                      <span className="stat-value">{member.projects}</span>
                      <span className="stat-label">Projects</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{member.contributions}</span>
                      <span className="stat-label">Contributions</span>
                    </div>
                  </div>

                  <div className="member-actions">
                    <button className="action-btn">
                      <MessageCircle size={16} />
                    </button>
                    <button className="action-btn">
                      <Eye size={16} />
                    </button>
                    <button className="action-btn">
                      <Settings size={16} />
                    </button>
                    {member.role !== 'owner' && (
                      <button 
                        onClick={() => handleRemoveMember(member.id)}
                        className="action-btn danger"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="projects-section">
            <div className="section-header">
              <h3>Projects ({projects.length})</h3>
              <div className="project-controls">
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="search-input"
                />
                <select className="filter-select">
                  <option value="all">All Projects</option>
                  <option value="active">Active</option>
                  <option value="planning">Planning</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="projects-grid">
              {projects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-header">
                    <div className="project-title">
                      <h4>{project.name}</h4>
                      <span className="project-category">{project.category}</span>
                    </div>
                    <div className="project-status" style={{ color: getProjectStatusColor(project.status) }}>
                      <span className="status-dot" style={{ backgroundColor: getProjectStatusColor(project.status) }}></span>
                      {project.status}
                    </div>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${project.progress}%`,
                          backgroundColor: getProjectStatusColor(project.status)
                        }}
                      ></div>
                    </div>
                    <span className="progress-label">{project.progress}% Complete</span>
                  </div>

                  <div className="project-metrics">
                    <div className="metric">
                      <Clock size={16} />
                      <span>Due: {project.dueDate.toLocaleDateString()}</span>
                    </div>
                    <div className="metric">
                      <Target size={16} />
                      <span>{project.completedTasks}/{project.tasks} Tasks</span>
                    </div>
                    <div className="metric">
                      <Users size={16} />
                      <span>{project.members.length} Members</span>
                    </div>
                  </div>

                  <div className="project-priority" style={{ color: getPriorityColor(project.priority) }}>
                    <span className="priority-badge" style={{ backgroundColor: getPriorityColor(project.priority) + '20' }}>
                      {project.priority} Priority
                    </span>
                  </div>

                  <div className="project-actions">
                    <button className="action-btn">
                      <Eye size={16} />
                      View
                    </button>
                    <button className="action-btn">
                      <Edit size={16} />
                      Edit
                    </button>
                    <button className="action-btn">
                      <MessageCircle size={16} />
                      Discuss
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className="discussions-section">
            <div className="section-header">
              <h3>Team Discussions</h3>
              <button className="new-discussion-btn">
                <Plus size={16} />
                New Discussion
              </button>
            </div>

            <div className="discussions-list">
              {discussions.map(discussion => (
                <div key={discussion.id} className="discussion-card enhanced">
                  <div className="discussion-content">
                    <div className="discussion-header">
                      <h4 className="discussion-title">{discussion.title}</h4>
                      <span className="discussion-category">{discussion.category}</span>
                      <span className="discussion-priority" style={{ color: getPriorityColor(discussion.priority) }}>
                        {discussion.priority} Priority
                      </span>
                    </div>
                    <div className="discussion-meta">
                      <span className="author">by {discussion.author}</span>
                      <span className="timestamp">{discussion.timestamp.toLocaleString()}</span>
                    </div>
                    <div className="discussion-stats">
                      <span className="replies">{discussion.replies} replies</span>
                      <span className="last-reply">
                        Last reply: {discussion.lastReply.toLocaleString()}
                      </span>
                    </div>
                    <div className="reactions" style={{ marginTop: '.5rem' }}>
                      {Object.entries(reactionsByDiscussion[discussion.id] || {}).map(([emoji, count]) => (
                        <button key={emoji} className="reaction" onClick={() => addReaction(discussion.id, emoji)}>
                          <span>{emoji}</span>
                          <span className="count">{count}</span>
                        </button>
                      ))}
                      {['👍','🔥','🎯','💡'].map(emoji => (
                        <button key={emoji} className="reaction" onClick={() => addReaction(discussion.id, emoji)}>
                          <span>{emoji}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="discussion-actions">
                    <button className="action-btn">
                      <MessageCircle size={16} />
                      Reply
                    </button>
                    <button className="action-btn">
                      <Eye size={16} />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <div className="section-header">
              <h3>Team Analytics</h3>
              <div className="analytics-controls">
                <select className="timeframe-select">
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
            </div>

            <div className="analytics-grid">
              <div className="analytics-card">
                <h4>Productivity Trends</h4>
                <div className="trend-chart">
                  <div className="chart-bars">
                    {[85, 87, 89, 92, 88, 90, 87].map((value, index) => (
                      <div key={index} className="chart-bar">
                        <div 
                          className="bar-fill" 
                          style={{ height: `${value}%`, backgroundColor: '#10b981' }}
                        ></div>
                        <span className="bar-label">D{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="analytics-card">
                <h4>Task Completion Rate</h4>
                <div className="completion-circle">
                  <div className="circle-progress" style={{ 
                    background: `conic-gradient(#10b981 ${analytics.taskCompletionRate * 3.6}deg, #e5e7eb 0deg)` 
                  }}>
                    <span>{analytics.taskCompletionRate}%</span>
                  </div>
                </div>
              </div>

              <div className="analytics-card">
                <h4>Member Engagement</h4>
                <div className="engagement-metrics">
                  <div className="metric">
                    <span className="metric-label">Average Response Time</span>
                    <span className="metric-value">{analytics.averageResponseTime}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Collaboration Score</span>
                    <span className="metric-value">{analytics.collaborationScore}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <div className="section-header">
              <h3>Team Settings</h3>
            </div>

            <div className="settings-grid">
              <div className="setting-card">
                <h4>Team Permissions</h4>
                <p>Manage what team members can do</p>
                <button className="setting-btn">Configure</button>
              </div>

              <div className="setting-card">
                <h4>Notification Preferences</h4>
                <p>Set up team notifications</p>
                <button className="setting-btn">Configure</button>
              </div>

              <div className="setting-card">
                <h4>Integration Settings</h4>
                <p>Connect with external tools</p>
                <button className="setting-btn">Configure</button>
              </div>

              <div className="setting-card">
                <h4>Data Export</h4>
                <p>Export team and project data</p>
                <button className="setting-btn">Export</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Invite Member Modal */}
      {isInviting && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Invite Team Member</h3>
              <button 
                onClick={() => setIsInviting(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={newInvite.email}
                  onChange={(e) => setNewInvite(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="colleague@example.com"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  value={newInvite.role}
                  onChange={(e) => setNewInvite(prev => ({ ...prev, role: e.target.value }))}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Personal Message (Optional)</label>
                <textarea
                  value={newInvite.message}
                  onChange={(e) => setNewInvite(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Add a personal message to the invitation..."
                  rows={3}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                onClick={() => setIsInviting(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button 
                onClick={handleInviteMember}
                className="save-btn"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCollaboration;
