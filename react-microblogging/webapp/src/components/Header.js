// src/components/Header.js
import React from 'react';

const Header = ({ subtitle, switchToFeed }) => {
    return (
        <div>
            <div className="bg-black text-white p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">MicroBlogging</h1>
                <button
                    id="feed-button"
                    className="bg-white text-black p-4"
                    onClick={switchToFeed}
                >
                    Feed
                </button>
            </div>
            <div className="container mx-auto space-y-4 p-4">
                <h2 className="font-bold text-2xl">{subtitle}</h2>
            </div>
        </div>
    );
};

export default Header;
