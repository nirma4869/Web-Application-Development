// src/components/Post.js
import React from 'react';

const Post = ({ user, date, body, onClick }) => {
    return (
        <div className="bg-gray-100 rounded p-4 mt-2 border border-black">
            <div className="flex justify-between items-center">
                <div className="font-bold text-lg cursor-pointer" onClick={onClick}>
                    {user}
                </div>
                <div className="text-gray-500 text-sm">{date}</div>
            </div>
            <div className="body">{body}</div>
        </div>
    );
};

export default Post;
