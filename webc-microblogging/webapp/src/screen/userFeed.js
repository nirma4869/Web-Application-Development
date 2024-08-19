import { fetchUserProjects,fetchUserNameByID,createPost } from "../api.js";

export class UserFeed extends HTMLElement{

    constructor(){
        super();
        const id = {};
    }
    async connectedCallback(){
        const shadow = this.attachShadow({mode: "open"});
        const div = document.createElement("div");
        shadow.innerHTML = `
        <style> @import "./src/output.css"; </style>
        <div class="flex items-center justify-center m-1 p-1">
            <div class="relative flex flex-col w-96 border bg-gray-200 border-black min-h-48 p-4">
                <form id="form" class="flex flex-col h-full">
                    <textarea id="text" placeholder="What is happening" class="flex-grow p-2 border border-gray-300 rounded-md mb-12 resize-none"></textarea>
                    <div class="flex justify-end mt-auto">
                        <button type="submit" class="bg-black text-white px-4 py-2 rounded-md">
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `;
    this.form = this.shadowRoot.querySelector("#form");
    this.textarea = this.shadowRoot.querySelector("#text");
    const userId = this.getAttribute("user-id");
    this.form.addEventListener("submit", async (event) => {
      event.preventDefault();
      await this.writeMessage(this.textarea.value.trim(),parseInt(userId));
      await this.updatePostList(parseInt(userId)); 
    });
        const postList = await this.renderUserPost(parseInt(userId));
        shadow.appendChild(postList);
    }

    async renderUserPost(userId){
        const list = document.createElement("div");
        const projects = await fetchUserProjects(userId);
        for(const post of projects){
            const name = await fetchUserNameByID(userId);
            const postElement = document.createElement("user-post");
            postElement.post = {
                username: name.name,        // Username fetched from fetchUserNameByID
                created_at: post.created_at,
                body: post.body,
                user_id: post.user_id
            };

            list.appendChild(postElement);
        }
        return list;
    }
    async writeMessage(text,userId){
        try {
            await createPost({ body: text, user_id: userId });  
        } catch (error) {
            console.error("Failed to create post:", error);
        } 
    }
    async updatePostList(userId) {
        try {
            const projects = await fetchUserProjects(userId);
            if (projects.length === 0) {
                return; // Keine neuen Projekte, nichts zu tun
            }
    
            // Hole den letzten Beitrag (nehmen wir an, dass die Liste nach Erstellungsdatum sortiert ist)
            const latestPost = projects[projects.length - 1];
            const name = await fetchUserNameByID(latestPost.user_id);
            
            const postElement = document.createElement("user-post");
            postElement.post = {
                username: name.name,
                created_at: latestPost.created_at,
                body: latestPost.body,
                user_id: latestPost.user_id
            };
    
            // Füge das neue Post-Element am Anfang der Liste hinzu, um es oben anzuzeigen
            this.shadowRoot.appendChild(postElement);
    
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        }
    }
    
    set id(id){
        this.id = id;
    }

}
customElements.define("user-screen", UserFeed);