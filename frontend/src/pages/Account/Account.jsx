import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiLogOut, FiUser, FiMail, FiGlobe, FiMapPin, FiBook, FiHeart, FiUsers, FiUserPlus, FiUserMinus } from 'react-icons/fi';
import './Account.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    website: '',
    location: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await response.json();
        setUser(userData);
        setFormData({
          name: userData.name,
          bio: userData.bio || '',
          website: userData.website || '',
          location: userData.location || ''
        });

        // Fetch user posts
        const postsResponse = await fetch('http://localhost:5000/api/users/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Fetch followers
        const followersResponse = await fetch('http://localhost:5000/api/users/followers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const followersData = await followersResponse.json();
        setFollowers(followersData);

        // Fetch following
        const followingResponse = await fetch('http://localhost:5000/api/users/following', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const followingData = await followingResponse.json();
        setFollowing(followingData);
      } catch (error) {
        console.error(error);
        navigate('/signin');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/users/follow/${userId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to follow user');
      }

      // Refresh following list
      const followingResponse = await fetch('http://localhost:5000/api/users/following', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const followingData = await followingResponse.json();
      setFollowing(followingData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/users/follow/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to unfollow user');
      }

      // Refresh following list
      const followingResponse = await fetch('http://localhost:5000/api/users/following', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const followingData = await followingResponse.json();
      setFollowing(followingData);
    } catch (error) {
      console.error(error);
    }
  };

  const isFollowing = (userId) => {
    return following.some(user => user.id === userId);
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="account-container">
      <div className="account-header">
        <div className="profile-header">
          <div className="avatar-container">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="Profile" className="avatar" />
            ) : (
              <div className="avatar-default">
                <FiUser className="avatar-icon" />
              </div>
            )}
          </div>
          <div className="profile-actions">
            <button onClick={handleEdit} className="edit-button">
              <FiEdit /> Edit Profile
            </button>
            <button onClick={handleLogout} className="logout-button">
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="email">
            <FiMail /> {user.email}
          </p>
          {user.bio && <p className="bio">{user.bio}</p>}
          <div className="profile-meta">
            {user.website && (
              <a href={user.website} target="_blank" rel="noopener noreferrer" className="meta-item">
                <FiGlobe /> {user.website}
              </a>
            )}
            {user.location && (
              <span className="meta-item">
                <FiMapPin /> {user.location}
              </span>
            )}
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <FiBook />
            <span>{posts.length} Posts</span>
          </div>
          <div className="stat-item">
            <FiUsers />
            <span>{followers.length} Followers</span>
          </div>
          <div className="stat-item">
            <FiUserPlus />
            <span>{following.length} Following</span>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="edit-profile-form">
          <h3>Edit Profile</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">
                Cancel
              </button>
              <button type="submit" className="save-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="account-content">
        <div className="content-section">
          <h3>Your Posts</h3>
          {posts.length === 0 ? (
            <p className="empty-message">You haven't posted anything yet.</p>
          ) : (
            <div className="posts-grid">
              {posts.map(post => (
                <div key={post.id} className="post-card">
                  <h4>{post.title}</h4>
                  <p className="post-excerpt">{post.content.substring(0, 100)}...</p>
                  <div className="post-meta">
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="content-section">
          <h3>Followers</h3>
          {followers.length === 0 ? (
            <p className="empty-message">You don't have any followers yet.</p>
          ) : (
            <div className="users-list">
              {followers.map(follower => (
                <div key={follower.id} className="user-card">
                  <div className="user-avatar">
                    {follower.avatar_url ? (
                      <img src={follower.avatar_url} alt={follower.name} />
                    ) : (
                      <FiUser />
                    )}
                  </div>
                  <div className="user-info">
                    <h4>{follower.name}</h4>
                    <p>{follower.email}</p>
                  </div>
                  <button 
                    onClick={() => isFollowing(follower.id) ? handleUnfollow(follower.id) : handleFollow(follower.id)}
                    className={`follow-button ${isFollowing(follower.id) ? 'following' : ''}`}
                  >
                    {isFollowing(follower.id) ? <FiUserMinus /> : <FiUserPlus />}
                    {isFollowing(follower.id) ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="content-section">
          <h3>Following</h3>
          {following.length === 0 ? (
            <p className="empty-message">You're not following anyone yet.</p>
          ) : (
            <div className="users-list">
              {following.map(followed => (
                <div key={followed.id} className="user-card">
                  <div className="user-avatar">
                    {followed.avatar_url ? (
                      <img src={followed.avatar_url} alt={followed.name} />
                    ) : (
                      <FiUser />
                    )}
                  </div>
                  <div className="user-info">
                    <h4>{followed.name}</h4>
                    <p>{followed.email}</p>
                  </div>
                  <button 
                    onClick={() => handleUnfollow(followed.id)}
                    className="follow-button following"
                  >
                    <FiUserMinus /> Following
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;