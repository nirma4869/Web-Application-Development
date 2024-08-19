import { fetchUserNameByID } from "../api.js";
import { switchScreen } from "../action.js";
import { createFeedScreen } from "../screen/feed.js";

export function createNavbar(){
// Create elements for the navbar
const header = document.createElement("div");
const leftHeader = document.createElement("div");
const paraFeed = document.createElement("p");
const paraMicro = document.createElement("p");
const underNav = document.createElement("p");

// Append elements to their respective parent elements
header.appendChild(leftHeader);
leftHeader.appendChild(paraMicro);
leftHeader.appendChild(paraFeed);
header.appendChild(underNav);

// Set the inner text for the paragraph elements
paraMicro.innerText = "MicroBlogging";
paraFeed.innerText = "Feed";
underNav.innerText = "Feed";

// Add CSS classes to the elements for styling
leftHeader.classList.add("flex", "flex-row", "bg-black","p-2","items-center", "justify-between");
paraFeed.classList.add("bg-white","p-2", "px-4","pr-4", "mr-8");
paraMicro.classList.add("text-white","pl-8","font-bold", "text-lg");
underNav.classList.add("font-bold","p-10", "text-lg");

// Add an event listener to the "Feed" paragraph
paraFeed.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const userScreen = await createFeedScreen();
        switchScreen(userScreen);
    } catch (error) {
        console.error(error);
    }
});


// Return the main header element
return header;
}

