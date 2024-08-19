import { fetchProjects,fetchUserNameByID } from "../api.js";

export class FeedScreen extends HTMLElement{
    constructor(){
        super();
    }
    async connectedCallback(){
        const shadow = this.attachShadow({mode: "open"});
        const div = document.createElement("div");
        const postList = await this.renderPost();
        div.appendChild(postList);
        div.id = "screen";
        shadow.appendChild(div);
    }

    async renderPost(){
        const list = document.createElement("div");
        const projects = await fetchProjects();
        for(const post of projects){
            const name = await fetchUserNameByID(post.user_id);
            const postElement = document.createElement("user-post");
            postElement.post = {
                username: name.name,
                created_at: post.created_at,
                body: post.body,
                user_id: post.user_id
            };

            list.appendChild(postElement);
        }
        return list;
    }
}
customElements.define("feed-screen", FeedScreen);