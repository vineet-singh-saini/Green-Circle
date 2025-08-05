import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'

const Profile = () => {
    const { id } = useParams();
    const [userPosts, setUserPosts] = useState([]);
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await axios.get(`https://mini-linkedin-backend-f2ky.onrender.com/feed/user/${id}`);
                setUserPosts(res.data);

              
                const userRes = await axios.get(`https://mini-linkedin-backend-f2ky.onrender.com/auth/user/${id}`);
                console.log(userRes);
                setUserName(userRes.data.name);
                setBio(userRes.data.bio);
                setEmail(userRes.data.email);
            } catch (err) {
                console.error('Error fetching user profile:', err);
            }
        };

        fetchProfileData();
    }, [id]);


    return (
       <div className="profile-container">
    <div className="profile-card">
        <div className="profile-header">
            <i className="fas fa-user-circle profile-icon"></i>
            <div>
                <h2>{userName || 'User Profile'}</h2>
                <p><i className="fas fa-envelope"></i> {email}</p>
                <p><i className="fas fa-quote-left"></i> {bio || 'No bio available'}</p>
            </div>
        </div>
    </div>

    <h3 className="profile-posts-heading">User's Posts</h3>
    {userPosts.length > 0 ? (
        userPosts.map(post => (
            <div className="profile-post-card" key={post._id}>
                <p>{post.content}</p>
                <small>
                    <i className="far fa-clock"></i> {new Date(post.createdAt).toLocaleString()}
                </small>
            </div>
        ))
    ) : (
        <p className="profile-no-posts">No posts from this user</p>
    )}
</div>
    );


}

export default Profile