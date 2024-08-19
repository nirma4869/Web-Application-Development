import { fetchUserProjects,fetchUserNameByID,createPost } from "../api.js";
import { createNavbar } from "../components/navbar.js";
import { getPost } from "../components/post.js";

export async function createUserFeedScreen(id){
     console.log("createUserFeedScreen called with ID:", id); // Debugging-Ausgabe
    try {
        const div = document.createElement("div");
        const nav = createNavbar(id);
        const message = createTextField(id); 
        div.appendChild(nav);
        div.appendChild(message);
        
        console.log("Fetching user feed"); // Debugging-Ausgabe
        const userFeed = await getUserFeed(id);
        console.log("User feed fetched:", userFeed); // Debugging-Ausgabe
        div.appendChild(userFeed);
        
        div.id = "screen";
        return div;
    } catch (error) {
        console.error("Error in createUserFeedScreen:", error); // Fehlerbehandlung
    }
}

//userfeed
export async function getUserFeed(id) {
    const userPosts = document.createElement("div");

    try {
        const userFeed = await fetchUserProjects(id);
        
        for (const feed of userFeed) {
            try {
                const nameResponse = await fetchUserNameByID(id);
                const name = nameResponse.name;
                const singlePost = getPost(name, feed.body, feed.created_at.split("T")[0]);
                userPosts.appendChild(singlePost);
            } catch (error) {
                console.error(error);
            }
        }
    } catch (error) {
        console.error(error);
    }

    return userPosts;
}


// create form to create new posts 
export function createTextField(userId){
    const userInter = document.createElement("div");
    const form = document.createElement("form");
    const text = document.createElement("textarea");
    const button = document.createElement("button");
    
    userInter.appendChild(form);
    form.appendChild(text);
    form.appendChild(button);
    
    button.innerText = "Post";
    button.type = "submit";
    text.setAttribute("placeholder","What is happening ?");
    
    userInter.classList.add("flex", "items-center", "justify-center","m-1","p-1")
    form.classList.add("flex","flex-col","w-96","border","bg-gray","border-black", "min-h-48");
    text.classList.add("h-40","p-2","border-none","outline-none")
    button.classList.add("flex", "bg-black","w-12","text-white","ml-auto" ,"items-center", "justify-center", "mr-2")
    
     form.addEventListener("submit", async (event) => {
        event.preventDefault();  
        await writeMessage(text.value, userId);  
        text.value = "";  
    });
    
    return userInter;
    }
    
    // Function to write a message to the user's feed
    export async function writeMessage(text,userId){
        try {
            await createPost({ body: text, user_id: userId });  
            const userFeed = await getUserFeed(userId);
            const div = document.querySelector("div");  
            div.replaceChild(userFeed, div.lastChild);  
        } catch (error) {
            console.error("Failed to create post:", error);
        } 
    
    }

