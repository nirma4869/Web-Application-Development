// src/components/FeedScreen.js
import React, { useEffect, useState } from 'react';
import Post from './Post';
import Header from './Header';
import { fetchUsers, fetchPosts } from '../api/api';

const FeedScreen = ({ switchToUserPosts }) => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const usersData = await fetchUsers();
            const postsData = await fetchPosts();
            setUsers(usersData);
            setPosts(postsData);
        };
        loadData();
    }, []);

    return (
        <div>
            <Header subtitle="Feed" switchToFeed={() => { }} />
            <div className="container mx-auto space-y-4 p-4" id="posts-container">
                {posts.map(post => {
                    const user = users.find(user => user.id === post.user_id);
                    return user && (
                        <Post
                            key={post.id}
                            user={user.name}
                            date={new Date(post.created_at).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short'
                            })}
                            body={post.body}
                            onClick={() => switchToUserPosts(user.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FeedScreen;
