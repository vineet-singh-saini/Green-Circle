import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import LogoutButton from '../../Components/Logout';
const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [content, setContent] = useState('');


 useEffect(() => {
  const fetchPosts = async () => {
    const res = await axios.get('https://green-circle-backend.onrender.com/feed/posts');
    setPosts(res.data);
  };

  fetchPosts();
}, [refreshTrigger]);


  const submitPost = async () => {
    try {
      const res = await axios.post('https://green-circle-backend.onrender.com/feed/posts', {
        authorId: user._id,
        content,
      });
      setPosts(prev => [res.data, ...prev]);
      setContent('');
        setRefreshTrigger(prev => !prev); 
    } catch (err) {
      console.error('Error posting:', err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://green-circle-backend.onrender.com/feed/posts');
        setPosts(res.data);
      } catch (err) {
        console.log('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (!storedUser) {
      navigate('/register');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  return (
    <div className="home-container-green">
      <h1 className="feed-heading-green">🌿 GreenCircle Feed </h1>
       <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <LogoutButton />
      </div>

      <div className="post-creator-green">
        <textarea
          placeholder="Share your thoughts..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button onClick={submitPost} disabled={!content.trim()}>Post</button>
      </div>

      <div className="posts-list-green">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} className="post-card-green">
              <div className="post-author-green">
                <Link to={`/profile/${post.author?._id}`}>
                  <strong>{post.author?.name || 'Unknown User'}</strong>
                </Link>
              </div>
              <div className="post-content-green">{post.content}</div>
              <div className="post-time-green">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="no-posts-text">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
