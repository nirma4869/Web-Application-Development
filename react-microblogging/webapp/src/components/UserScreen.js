import React, { useEffect, useState } from 'react';
import Post from './Post';
import PostForm from './PostForm';
import Header from './Header';
import { fetchUsers, fetchPosts, createPost } from '../api/api';

const UserScreen = ({ userId, switchToFeed }) => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const usersData = await fetchUsers();
                const postsData = await fetchPosts();
                setUsers(usersData);
                const userData = usersData.find(u => u.id === userId);
                setUser(userData);
                const userPosts = postsData.filter(post => post.user_id === userId);
                setPosts(userPosts);
            } catch (error) {
                console.error('Error loading data:', error);
                // Handle error
            }
        };
        loadData();
    }, [userId]);

    useEffect(() => {
        const fetchAndSetPosts = async () => {
            try {
                const updatedPosts = await fetchPosts();
                setPosts(updatedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
                // Handle error
            }
        };

        fetchAndSetPosts(); 


    }, [userId]); 

    const handleNewPost = async (body) => {
        const newPost = {
            user_id: userId,
            body: body,
            created_at: new Date().toISOString(),
        };

        try {
            await createPost(newPost);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <Header subtitle={user.name} switchToFeed={switchToFeed} />
            <div className="container mx-auto space-y-4 p-4">
                <PostForm onSubmit={handleNewPost} />
                <div className="space-y-4" id="posts-container">
                    {posts.map((post, index) => (
                        <Post
                            key={index}
                            user={user.name}
                            date={new Date(post.created_at).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                            })}
                            body={post.body}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserScreen;
