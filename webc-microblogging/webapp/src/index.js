import { UserPost } from "./components/post.js";
import { FeedScreen } from "./screen/feed.js";
import { UserFeed } from "./screen/userFeed.js";
import { createNavbar } from "./components/navbar.js";


document.addEventListener('DOMContentLoaded', () => {
    const myComponent = document.createElement('feed-screen');
    const body = document.querySelector("body");
    body.appendChild(createNavbar());
    body.appendChild(myComponent);
});
