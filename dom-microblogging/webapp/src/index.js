import { createNavbar } from "./components/navbar.js";
import { createFeedScreen } from "./screen/feed.js";
import { createUserFeedScreen } from "./screen/userFeed.js";

const body = document.body;

export async function renderfeed() {
    try {
        const nav = await createFeedScreen();
        body.appendChild(nav);
    } catch (error) {
        console.error(error);

    }
}

renderfeed();
