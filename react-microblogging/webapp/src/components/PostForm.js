// src/components/PostForm.js
import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => {
    const [body, setBody] = useState('');

    const handleSubmit = () => {
        onSubmit(body);
        setBody('');
    };

    return (
        <div className="bg-gray-100 rounded p-4 border border-black">
            <textarea
                className="w-full p-2 border border-black rounded"
                placeholder="What is happening?!"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button className="bg-black text-white p-2 mt-2" onClick={handleSubmit}>
                Post
            </button>
        </div>
    );
};

export default PostForm;
