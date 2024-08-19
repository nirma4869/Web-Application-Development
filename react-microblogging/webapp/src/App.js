// src/App.js
import React, { useState } from 'react';
import FeedScreen from './components/FeedScreen';
import UserScreen from './components/UserScreen';

function App() {
    const [currentUserId, setCurrentUserId] = useState(null);

    return (
        <div className="App">
            {currentUserId === null ? (
                <FeedScreen switchToUserPosts={(userId) => setCurrentUserId(userId)} />
            ) : (
                <UserScreen userId={currentUserId} switchToFeed={() => setCurrentUserId(null)} />
            )}
        </div>
    );
}

export default App;
