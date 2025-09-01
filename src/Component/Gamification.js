import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Zap, Award, Crown, Medal, Gift, TrendingUp, Users, Calendar, CheckCircle, Lock, Unlock } from 'lucide-react';

const Gamification = () => {
  const [userStats, setUserStats] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [activeTab, setActiveTab] = useState('achievements');

  useEffect(() => {
    loadGamificationData();
  }, []);

  const loadGamificationData = () => {
    // Mock user stats
    setUserStats({
      level: 8,
      xp: 2450,
      xpToNext: 500,
      totalPoints: 12500,
      rank: 15,
      streak: 7,
      validationsCompleted: 23,
      ideasValidated: 45,
      reportsGenerated: 12,
      teamCollaborations: 8
    });

    // Mock achievements
    setAchievements([
      {
        id: 1,
        title: 'First Validation',
        description: 'Complete your first idea validation',
        icon: Target,
        points: 100,
        unlocked: true,
        unlockedDate: new Date('2024-01-15'),
        rarity: 'common'
      },
      {
        id: 2,
        title: 'Validation Master',
        description: 'Complete 10 idea validations',
        icon: Trophy,
        points: 500,
        unlocked: true,
        unlockedDate: new Date('2024-02-01'),
        rarity: 'rare'
      },
      {
        id: 3,
        title: 'Team Player',
        description: 'Collaborate with 5 team members',
        icon: Users,
        points: 300,
        unlocked: true,
        unlockedDate: new Date('2024-02-10'),
        rarity: 'uncommon'
      },
      {
        id: 4,
        title: 'Report Generator',
        description: 'Generate 5 detailed reports',
        icon: Award,
        points: 400,
        unlocked: false,
        progress: 3,
        target: 5,
        rarity: 'uncommon'
      },
      {
        id: 5,
        title: 'Streak Master',
        description: 'Maintain a 30-day validation streak',
        icon: Zap,
        points: 1000,
        unlocked: false,
        progress: 7,
        target: 30,
        rarity: 'epic'
      },
      {
        id: 6,
        title: 'Validation Legend',
        description: 'Complete 100 idea validations',
        icon: Crown,
        points: 2000,
        unlocked: false,
        progress: 23,
        target: 100,
        rarity: 'legendary'
      }
    ]);

    // Mock leaderboard
    setLeaderboard([
      { rank: 1, name: 'Alex Johnson', points: 25000, level: 15, avatar: 'AJ' },
      { rank: 2, name: 'Sarah Chen', points: 22000, level: 14, avatar: 'SC' },
      { rank: 3, name: 'Mike Rodriguez', points: 20000, level: 13, avatar: 'MR' },
      { rank: 4, name: 'Emma Wilson', points: 18500, level: 12, avatar: 'EW' },
      { rank: 5, name: 'David Kim', points: 17000, level: 11, avatar: 'DK' },
      { rank: 15, name: 'You', points: 12500, level: 8, avatar: 'ME', isCurrentUser: true }
    ]);

    // Mock challenges
    setChallenges([
      {
        id: 1,
        title: 'Weekly Validation Challenge',
        description: 'Complete 5 validations this week',
        reward: 200,
        type: 'weekly',
        progress: 3,
        target: 5,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        active: true
      },
      {
        id: 2,
        title: 'Team Collaboration',
        description: 'Invite 3 new team members',
        reward: 150,
        type: 'social',
        progress: 1,
        target: 3,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        active: true
      },
      {
        id: 3,
        title: 'Market Research Expert',
        description: 'Use trends dashboard 10 times',
        reward: 100,
        type: 'exploration',
        progress: 7,
        target: 10,
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        active: true
      }
    ]);
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#6b7280';
      case 'uncommon': return '#10b981';
      case 'rare': return '#3b82f6';
      case 'epic': return '#8b5cf6';
      case 'legendary': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getRarityIcon = (rarity) => {
    switch (rarity) {
      case 'common': return <Medal size={16} />;
      case 'uncommon': return <Award size={16} />;
      case 'rare': return <Trophy size={16} />;
      case 'epic': return <Crown size={16} />;
      case 'legendary': return <Star size={16} />;
      default: return <Medal size={16} />;
    }
  };

  const getLevelProgress = () => {
    if (!userStats) return 0;
    return (userStats.xp / (userStats.xp + userStats.xpToNext)) * 100;
  };

  const tabs = [
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Users },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'rewards', label: 'Rewards', icon: Gift }
  ];

  return (
    <div className="gamification">
      <div className="gamification-header">
        <div className="header-content">
          <h1>Gamification Hub</h1>
          <p>Track your progress, earn achievements, and compete with others</p>
        </div>
      </div>

      {/* User Stats Overview */}
      {userStats && (
        <div className="user-stats-overview">
          <div className="stats-card">
            <div className="level-info">
              <div className="level-badge">
                <Crown size={24} />
                <span>Level {userStats.level}</span>
              </div>
              <div className="xp-info">
                <div className="xp-text">{userStats.xp} XP</div>
                <div className="xp-to-next">{userStats.xpToNext} to next level</div>
              </div>
            </div>
            <div className="xp-progress">
              <div 
                className="xp-progress-fill" 
                style={{ width: `${getLevelProgress()}%` }}
              ></div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <Target size={20} color="#10b981" />
              </div>
              <div className="stat-content">
                <div className="stat-value">{userStats.validationsCompleted}</div>
                <div className="stat-label">Validations</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Trophy size={20} color="#f59e0b" />
              </div>
              <div className="stat-content">
                <div className="stat-value">{userStats.totalPoints}</div>
                <div className="stat-label">Total Points</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Zap size={20} color="#8b5cf6" />
              </div>
              <div className="stat-content">
                <div className="stat-value">{userStats.streak}</div>
                <div className="stat-label">Day Streak</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Users size={20} color="#667eea" />
              </div>
              <div className="stat-content">
                <div className="stat-value">#{userStats.rank}</div>
                <div className="stat-label">Global Rank</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="gamification-tabs">
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

      <div className="gamification-content">
        {activeTab === 'achievements' && (
          <div className="achievements-section">
            <div className="section-header">
              <h3>Achievements</h3>
              <div className="achievement-stats">
                <span>{achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked</span>
              </div>
            </div>

            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'} ${achievement.rarity}`}
                >
                  <div className="achievement-icon">
                    {achievement.unlocked ? (
                      <achievement.icon size={32} color={getRarityColor(achievement.rarity)} />
                    ) : (
                      <Lock size={32} color="#6b7280" />
                    )}
                  </div>
                  
                  <div className="achievement-content">
                    <h4 className="achievement-title">{achievement.title}</h4>
                    <p className="achievement-description">{achievement.description}</p>
                    
                    <div className="achievement-meta">
                      <div className="achievement-points">
                        <Star size={14} />
                        {achievement.points} points
                      </div>
                      <div className="achievement-rarity">
                        {getRarityIcon(achievement.rarity)}
                        {achievement.rarity}
                      </div>
                    </div>

                    {!achievement.unlocked && achievement.progress !== undefined && (
                      <div className="achievement-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          ></div>
                        </div>
                        <div className="progress-text">
                          {achievement.progress} / {achievement.target}
                        </div>
                      </div>
                    )}

                    {achievement.unlocked && achievement.unlockedDate && (
                      <div className="achievement-unlocked">
                        <CheckCircle size={14} color="#10b981" />
                        Unlocked {achievement.unlockedDate.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="leaderboard-section">
            <div className="section-header">
              <h3>Global Leaderboard</h3>
              <div className="leaderboard-stats">
                <span>Your rank: #{userStats?.rank}</span>
              </div>
            </div>

            <div className="leaderboard-list">
              {leaderboard.map(user => (
                <div key={user.rank} className={`leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}`}>
                  <div className="rank-badge">
                    {user.rank <= 3 ? (
                      <Trophy size={20} color={user.rank === 1 ? '#f59e0b' : user.rank === 2 ? '#6b7280' : '#cd7f32'} />
                    ) : (
                      <span className="rank-number">#{user.rank}</span>
                    )}
                  </div>

                  <div className="user-avatar">
                    <div className="avatar-circle">{user.avatar}</div>
                    {user.isCurrentUser && <div className="current-user-indicator">You</div>}
                  </div>

                  <div className="user-info">
                    <div className="user-name">{user.name}</div>
                    <div className="user-level">Level {user.level}</div>
                  </div>

                  <div className="user-points">
                    <div className="points-value">{user.points.toLocaleString()}</div>
                    <div className="points-label">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="challenges-section">
            <div className="section-header">
              <h3>Active Challenges</h3>
              <div className="challenge-stats">
                <span>{challenges.filter(c => c.active).length} active challenges</span>
              </div>
            </div>

            <div className="challenges-list">
              {challenges.map(challenge => (
                <div key={challenge.id} className="challenge-card">
                  <div className="challenge-header">
                    <div className="challenge-title">{challenge.title}</div>
                    <div className="challenge-reward">
                      <Gift size={16} />
                      {challenge.reward} points
                    </div>
                  </div>

                  <div className="challenge-description">{challenge.description}</div>

                  <div className="challenge-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {challenge.progress} / {challenge.target}
                    </div>
                  </div>

                  <div className="challenge-meta">
                    <div className="challenge-type">{challenge.type}</div>
                    <div className="challenge-expires">
                      Expires: {challenge.expiresAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="rewards-section">
            <div className="section-header">
              <h3>Rewards & Benefits</h3>
            </div>

            <div className="rewards-grid">
              <div className="reward-card">
                <div className="reward-icon">
                  <Crown size={32} color="#f59e0b" />
                </div>
                <h4>Premium Features</h4>
                <p>Unlock advanced analytics and unlimited validations</p>
                <div className="reward-requirement">Level 10 required</div>
              </div>

              <div className="reward-card">
                <div className="reward-icon">
                  <Users size={32} color="#667eea" />
                </div>
                <h4>Team Collaboration</h4>
                <p>Invite unlimited team members and collaborate</p>
                <div className="reward-requirement">5 validations completed</div>
              </div>

              <div className="reward-card">
                <div className="reward-icon">
                  <TrendingUp size={32} color="#10b981" />
                </div>
                <h4>Advanced Reports</h4>
                <p>Generate detailed market analysis reports</p>
                <div className="reward-requirement">Level 5 required</div>
              </div>

              <div className="reward-card">
                <div className="reward-icon">
                  <Gift size={32} color="#8b5cf6" />
                </div>
                <h4>Exclusive Content</h4>
                <p>Access to premium templates and guides</p>
                <div className="reward-requirement">1000 points earned</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gamification;
