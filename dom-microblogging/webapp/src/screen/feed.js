import { createNavbar } from "../components/navbar.js";
import { getAllPosts } from "../components/post.js";

// Function to create the feed screen
export async function createFeedScreen() {
    const div = document.createElement("div");
    const nav = createNavbar();
    div.appendChild(nav);

    try {
        const list = await getAllPosts();
        div.appendChild(list);
    } catch (error) {
        console.error(error);
    }

    div.id = "screen";
    return div;
}
