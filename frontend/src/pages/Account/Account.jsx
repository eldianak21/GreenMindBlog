// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiEdit, FiLogOut, FiUser, FiMail, FiGlobe, FiMapPin, FiBook, FiHeart, FiUsers, FiUserPlus, FiUserMinus } from 'react-icons/fi';
// import './Account.css';

// const Account = () => {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [followers, setFollowers] = useState([]);
//   const [following, setFollowing] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     bio: '',
//     website: '',
//     location: ''
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch user data
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/signin');
//           return;
//         }

//         const response = await fetch('http://localhost:5000/api/users/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch user data');
//         }

//         const userData = await response.json();
//         setUser(userData);
//         setFormData({
//           name: userData.name,
//           bio: userData.bio || '',
//           website: userData.website || '',
//           location: userData.location || ''
//         });

//         // Fetch user posts
//         const postsResponse = await fetch('http://localhost:5000/api/users/posts', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         const postsData = await postsResponse.json();
//         setPosts(postsData);

//         // Fetch followers
//         const followersResponse = await fetch('http://localhost:5000/api/users/followers', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         const followersData = await followersResponse.json();
//         setFollowers(followersData);

//         // Fetch following
//         const followingResponse = await fetch('http://localhost:5000/api/users/following', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         const followingData = await followingResponse.json();
//         setFollowing(followingData);
//       } catch (error) {
//         console.error(error);
//         navigate('/signin');
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/signin');
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/users/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       const updatedUser = await response.json();
//       setUser(updatedUser);
//       setIsEditing(false);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleFollow = async (userId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/users/follow/${userId}`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to follow user');
//       }

//       // Refresh following list
//       const followingResponse = await fetch('http://localhost:5000/api/users/following', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const followingData = await followingResponse.json();
//       setFollowing(followingData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUnfollow = async (userId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/users/follow/${userId}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to unfollow user');
//       }

//       // Refresh following list
//       const followingResponse = await fetch('http://localhost:5000/api/users/following', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const followingData = await followingResponse.json();
//       setFollowing(followingData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const isFollowing = (userId) => {
//     return following.some(user => user.id === userId);
//   };

//   if (!user) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <div className="account-container">
//       <div className="account-header">
//         <div className="profile-header">
//           <div className="avatar-container">
//             {user.avatar_url ? (
//               <img src={user.avatar_url} alt="Profile" className="avatar" />
//             ) : (
//               <div className="avatar-default">
//                 <FiUser className="avatar-icon" />
//               </div>
//             )}
//           </div>
//           <div className="profile-actions">
//             <button onClick={handleEdit} className="edit-button">
//               <FiEdit /> Edit Profile
//             </button>
//             <button onClick={handleLogout} className="logout-button">
//               <FiLogOut /> Logout
//             </button>
//           </div>
//         </div>

//         <div className="profile-info">
//           <h2>{user.name}</h2>
//           <p className="email">
//             <FiMail /> {user.email}
//           </p>
//           {user.bio && <p className="bio">{user.bio}</p>}
//           <div className="profile-meta">
//             {user.website && (
//               <a href={user.website} target="_blank" rel="noopener noreferrer" className="meta-item">
//                 <FiGlobe /> {user.website}
//               </a>
//             )}
//             {user.location && (
//               <span className="meta-item">
//                 <FiMapPin /> {user.location}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="profile-stats">
//           <div className="stat-item">
//             <FiBook />
//             <span>{posts.length} Posts</span>
//           </div>
//           <div className="stat-item">
//             <FiUsers />
//             <span>{followers.length} Followers</span>
//           </div>
//           <div className="stat-item">
//             <FiUserPlus />
//             <span>{following.length} Following</span>
//           </div>
//         </div>
//       </div>

//       {isEditing && (
//         <div className="edit-profile-form">
//           <h3>Edit Profile</h3>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="bio">Bio</label>
//               <textarea
//                 id="bio"
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleChange}
//                 rows="3"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="website">Website</label>
//               <input
//                 type="url"
//                 id="website"
//                 name="website"
//                 value={formData.website}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="location">Location</label>
//               <input
//                 type="text"
//                 id="location"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-actions">
//               <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">
//                 Cancel
//               </button>
//               <button type="submit" className="save-button">
//                 Save Changes
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="account-content">
//         <div className="content-section">
//           <h3>Your Posts</h3>
//           {posts.length === 0 ? (
//             <p className="empty-message">You haven't posted anything yet.</p>
//           ) : (
//             <div className="posts-grid">
//               {posts.map(post => (
//                 <div key={post.id} className="post-card">
//                   <h4>{post.title}</h4>
//                   <p className="post-excerpt">{post.content.substring(0, 100)}...</p>
//                   <div className="post-meta">
//                     <span>{new Date(post.created_at).toLocaleDateString()}</span>
//                     <span>•</span>
//                     <span>{post.category}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="content-section">
//           <h3>Followers</h3>
//           {followers.length === 0 ? (
//             <p className="empty-message">You don't have any followers yet.</p>
//           ) : (
//             <div className="users-list">
//               {followers.map(follower => (
//                 <div key={follower.id} className="user-card">
//                   <div className="user-avatar">
//                     {follower.avatar_url ? (
//                       <img src={follower.avatar_url} alt={follower.name} />
//                     ) : (
//                       <FiUser />
//                     )}
//                   </div>
//                   <div className="user-info">
//                     <h4>{follower.name}</h4>
//                     <p>{follower.email}</p>
//                   </div>
//                   <button 
//                     onClick={() => isFollowing(follower.id) ? handleUnfollow(follower.id) : handleFollow(follower.id)}
//                     className={`follow-button ${isFollowing(follower.id) ? 'following' : ''}`}
//                   >
//                     {isFollowing(follower.id) ? <FiUserMinus /> : <FiUserPlus />}
//                     {isFollowing(follower.id) ? 'Following' : 'Follow'}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="content-section">
//           <h3>Following</h3>
//           {following.length === 0 ? (
//             <p className="empty-message">You're not following anyone yet.</p>
//           ) : (
//             <div className="users-list">
//               {following.map(followed => (
//                 <div key={followed.id} className="user-card">
//                   <div className="user-avatar">
//                     {followed.avatar_url ? (
//                       <img src={followed.avatar_url} alt={followed.name} />
//                     ) : (
//                       <FiUser />
//                     )}
//                   </div>
//                   <div className="user-info">
//                     <h4>{followed.name}</h4>
//                     <p>{followed.email}</p>
//                   </div>
//                   <button 
//                     onClick={() => handleUnfollow(followed.id)}
//                     className="follow-button following"
//                   >
//                     <FiUserMinus /> Following
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;

import React, { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiSettings, 
  FiBook, 
  FiHeart, 
  FiBookmark, 
  FiEdit, 
  FiLogOut,
  FiBell,
  FiLock,
  FiGlobe,
  FiCheck,
  FiX
} from 'react-icons/fi';
import './Account.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    website: '',
    location: ''
  });

  useEffect(() => {
    // Get user from localStorage
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        setUser(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          bio: userData.bio || 'Digital storyteller passionate about technology and sustainability.',
          website: userData.website || 'https://example.com',
          location: userData.location || 'San Francisco, CA'
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/signin';
  };

  const stats = {
    articles: 24,
    likes: 128,
    saved: 56,
    following: 89,
    followers: 234
  };

  const recentActivity = [
    { id: 1, type: 'published', title: 'The Future of Sustainable Technology', time: '2 days ago' },
    { id: 2, type: 'liked', title: 'Minimalist Design Principles', time: '3 days ago' },
    { id: 3, type: 'commented', title: 'Advanced React Patterns', time: '1 week ago' },
    { id: 4, type: 'saved', title: 'Modern CSS Techniques', time: '2 weeks ago' }
  ];

  const drafts = [
    { id: 1, title: 'AI in Healthcare', lastEdited: 'Yesterday', words: 1250 },
    { id: 2, title: 'Sustainable Web Development', lastEdited: '3 days ago', words: 850 }
  ];

  if (!user) {
    return (
      <div className="account-not-logged-in">
        <div className="not-logged-in-content">
          <h2>Please Sign In</h2>
          <p>You need to be logged in to view your account.</p>
          <a href="/signin" className="sign-in-button">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      {/* Header */}
      <header className="account-header">
        <div className="container">
          <h1>My Account</h1>
          <p className="header-subtitle">Manage your profile, content, and preferences</p>
        </div>
      </header>

      <div className="account-container">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <div className="user-summary">
            <div className="user-avatar-large">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-role">Member since 2023</p>
            </div>
          </div>

          <nav className="account-nav">
            <button 
              className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser className="nav-icon" />
              <span>Profile</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              <FiBook className="nav-icon" />
              <span>My Content</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <FiHeart className="nav-icon" />
              <span>Activity</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'saved' ? 'active' : ''}`}
              onClick={() => setActiveTab('saved')}
            >
              <FiBookmark className="nav-icon" />
              <span>Saved Articles</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <FiSettings className="nav-icon" />
              <span>Settings</span>
            </button>
          </nav>

          <button className="logout-button" onClick={handleLogout}>
            <FiLogOut className="logout-icon" />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="account-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-tab">
              <div className="tab-header">
                <h2>Profile Information</h2>
                {!isEditing ? (
                  <button 
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    <FiEdit /> Edit Profile
                  </button>
                ) : (
                  <div className="edit-actions">
                    <button 
                      className="save-button"
                      onClick={handleSaveProfile}
                    >
                      <FiCheck /> Save Changes
                    </button>
                    <button 
                      className="cancel-button"
                      onClick={() => setIsEditing(false)}
                    >
                      <FiX /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="profile-form">
                <div className="form-section">
                  <h3>Basic Information</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>
                        <FiUser className="form-icon" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>
                        <FiMail className="form-icon" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>
                        <FiGlobe className="form-icon" />
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>
                        <FiGlobe className="form-icon" />
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Bio</h3>
                  <div className="form-group">
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows="4"
                    />
                    <p className="form-help">
                      Tell us about yourself. This will be displayed on your public profile.
                    </p>
                  </div>
                </div>

                {!isEditing && (
                  <div className="stats-section">
                    <h3>Your Stats</h3>
                    <div className="stats-grid">
                      <div className="stat-card">
                        <h4>{stats.articles}</h4>
                        <p>Articles Published</p>
                      </div>
                      <div className="stat-card">
                        <h4>{stats.likes}</h4>
                        <p>Total Likes</p>
                      </div>
                      <div className="stat-card">
                        <h4>{stats.saved}</h4>
                        <p>Articles Saved</p>
                      </div>
                      <div className="stat-card">
                        <h4>{stats.followers}</h4>
                        <p>Followers</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="content-tab">
              <div className="tab-header">
                <h2>My Content</h2>
                <a href="/blog/create" className="new-article-button">
                  <FiEdit /> Write New Article
                </a>
              </div>

              <div className="content-sections">
                <section className="drafts-section">
                  <h3>Drafts</h3>
                  <div className="drafts-list">
                    {drafts.map(draft => (
                      <div key={draft.id} className="draft-card">
                        <h4>{draft.title}</h4>
                        <div className="draft-meta">
                          <span>{draft.words} words</span>
                          <span>•</span>
                          <span>Last edited: {draft.lastEdited}</span>
                        </div>
                        <div className="draft-actions">
                          <button className="edit-draft">
                            <FiEdit /> Continue Writing
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="published-section">
                  <h3>Published Articles</h3>
                  <div className="articles-list">
                    {[1, 2, 3].map(article => (
                      <div key={article} className="article-card">
                        <div className="article-content">
                          <h4>The Future of Sustainable Technology</h4>
                          <div className="article-meta">
                            <span className="status published">Published</span>
                            <span>•</span>
                            <span>May 15, 2023</span>
                            <span>•</span>
                            <span>124 likes</span>
                          </div>
                        </div>
                        <div className="article-actions">
                          <button className="view-stats">
                            View Stats
                          </button>
                          <button className="edit-article">
                            <FiEdit />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="activity-tab">
              <div className="tab-header">
                <h2>Recent Activity</h2>
              </div>

              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'published' && <FiBook />}
                      {activity.type === 'liked' && <FiHeart />}
                      {activity.type === 'commented' && <FiMail />}
                      {activity.type === 'saved' && <FiBookmark />}
                    </div>
                    <div className="activity-content">
                      <h4>
                        You {activity.type} "{activity.title}"
                      </h4>
                      <p className="activity-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Tab */}
          {activeTab === 'saved' && (
            <div className="saved-tab">
              <div className="tab-header">
                <h2>Saved Articles</h2>
              </div>

              <div className="saved-grid">
                {[1, 2, 3, 4].map(article => (
                  <div key={article} className="saved-card">
                    <div className="saved-content">
                      <span className="category">Technology</span>
                      <h4>Modern CSS Techniques You Should Know</h4>
                      <p className="excerpt">
                        Explore the latest CSS features and techniques for modern web development.
                      </p>
                      <div className="saved-meta">
                        <span>David Chen</span>
                        <span>•</span>
                        <span>Apr 28, 2023</span>
                        <span>•</span>
                        <span>7 min read</span>
                      </div>
                    </div>
                    <button className="unsave-button">
                      <FiBookmark /> Unsave
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="tab-header">
                <h2>Account Settings</h2>
              </div>

              <div className="settings-sections">
                <section className="notification-settings">
                  <h3>
                    <FiBell className="section-icon" />
                    Notifications
                  </h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Email Notifications</h4>
                      <p>Receive emails about your account activity</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Article Updates</h4>
                      <p>Get notified when someone comments on your articles</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                </section>

                <section className="privacy-settings">
                  <h3>
                    <FiLock className="section-icon" />
                    Privacy
                  </h3>
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Public Profile</h4>
                      <p>Allow others to view your profile and articles</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Show Reading Activity</h4>
                      <p>Display your reading activity to followers</p>
                    </div>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </section>

                <section className="danger-zone">
                  <h3>Danger Zone</h3>
                  <div className="danger-actions">
                    <button className="delete-account">
                      Delete Account
                    </button>
                    <p className="warning-text">
                      This will permanently delete your account and all associated data.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Account;