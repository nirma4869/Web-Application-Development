import { switchScreen } from "../action.js";
import { fetchProjects,fetchUserNameByID } from "../api.js";
import { createUserFeedScreen } from "../screen/userFeed.js";

// Function to create a post element with user's name, message, and date
export function getPost(name,message,date){

// Create elements for the post
const postPage = document.createElement("div");
const div = document.createElement("div");
const nameDate = document.createElement("div");
const userName = document.createElement("p");
const postDate = document.createElement("p");
const textPost = document.createElement("p");

// Append elements to their respective parent elements
postPage.appendChild(div);
div.appendChild(nameDate)
nameDate.appendChild(userName);
nameDate.appendChild(postDate);
div.appendChild(textPost)

// Set the text content for the elements
userName.innerText = name;
postDate.innerText = date;
textPost.innerText = message;

// Add CSS classes to style the elements
postPage.classList.add("flex", "items-center", "justify-center","m-1","p-1");
div.classList.add("w-96", "border","bg-gray","border-black", "min-h-24");
nameDate.classList.add("flex", "flex-row", "justify-between","w-full","p-2");
textPost.classList.add("break-words","p-2");
postDate.classList.add("text-gray-500");

// Add an event listener to the username element
userName.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const userScreen = await createUserFeedScreen(parseInt(postPage.id));
        switchScreen(userScreen);
        console.log(postPage.id);
    } catch (error) {
        console.error(error);
    }
});

// Return the main post container
return postPage;

}

// Function to fetch all posts and display them
export async function getAllPosts() {
    const list = document.createElement("div");

    try {
        const posts = await fetchProjects();

        for (const post of posts) {
            try {
                const name = await fetchUserNameByID(post.user_id);
                const add = getPost(name.name, post.body, post.created_at.split("T")[0]);
                add.setAttribute("id", post.user_id);
                list.appendChild(add);
            } catch (innerError) {
                console.error(innerError);
            
            }
        }
    } catch (error) {
        console.error(error);
    }

    return list;
}

