import React, { useState, useEffect } from 'react';
import { Users, Plus, MessageCircle, FileText, Calendar, Bell, Settings, Crown, Shield, User, Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const TeamCollaboration = () => {
  const [activeTab, setActiveTab] = useState('members');
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

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = () => {
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
        joinedDate: new Date('2024-01-15')
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
        joinedDate: new Date('2024-02-01')
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
        joinedDate: new Date('2024-02-15')
      }
    ]);

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
        lastReply: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: 2,
        title: 'Competitor Analysis Results',
        author: 'Sarah Johnson',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        replies: 1,
        lastReply: new Date(Date.now() - 1 * 60 * 60 * 1000)
      }
    ]);
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
    // Simulate resending invitation
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

  const tabs = [
    { id: 'members', label: 'Team Members', icon: Users },
    { id: 'invitations', label: 'Invitations', icon: Mail },
    { id: 'discussions', label: 'Discussions', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="team-collaboration">
      <div className="collaboration-header">
        <div className="header-content">
          <h1>Team Collaboration</h1>
          <p>Manage your team, collaborate on ideas, and track progress</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={() => setIsInviting(true)}
            className="invite-btn"
          >
            <Plus size={16} />
            Invite Member
          </button>
        </div>
      </div>

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
              </div>
            </div>

            <div className="members-list">
              {teamMembers.map(member => (
                <div key={member.id} className="member-card">
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
                    <div className="member-meta">
                      <span className="role-badge">{member.role}</span>
                      <span className="last-active">
                        Last active: {member.lastActive.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="member-actions">
                    <button className="action-btn">
                      <MessageCircle size={16} />
                    </button>
                    <button className="action-btn">
                      <Settings size={16} />
                    </button>
                    {member.role !== 'owner' && (
                      <button 
                        onClick={() => handleRemoveMember(member.id)}
                        className="action-btn danger"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'invitations' && (
          <div className="invitations-section">
            <div className="section-header">
              <h3>Pending Invitations ({invitations.length})</h3>
            </div>

            <div className="invitations-list">
              {invitations.map(invitation => (
                <div key={invitation.id} className="invitation-card">
                  <div className="invitation-info">
                    <div className="invitation-email">{invitation.email}</div>
                    <div className="invitation-meta">
                      <span className="role-badge">{invitation.role}</span>
                      <span className="sent-date">
                        Sent {invitation.sentDate.toLocaleDateString()}
                      </span>
                    </div>
                    {invitation.message && (
                      <div className="invitation-message">{invitation.message}</div>
                    )}
                  </div>

                  <div className="invitation-actions">
                    <button 
                      onClick={() => handleResendInvitation(invitation.id)}
                      className="action-btn"
                    >
                      Resend
                    </button>
                    <button 
                      onClick={() => handleCancelInvitation(invitation.id)}
                      className="action-btn danger"
                    >
                      Cancel
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
                <div key={discussion.id} className="discussion-card">
                  <div className="discussion-content">
                    <h4 className="discussion-title">{discussion.title}</h4>
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
                  </div>
                  <div className="discussion-actions">
                    <button className="action-btn">
                      <MessageCircle size={16} />
                      Reply
                    </button>
                  </div>
                </div>
              ))}
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

      {/* Invite Member Modal */}
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
