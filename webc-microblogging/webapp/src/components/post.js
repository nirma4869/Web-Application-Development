import { switchScreen } from "../action.js";

export class UserPost extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
      this.shadowRoot.innerHTML = `
          <style> @import "./src/output.css"; </style>
          <div class="flex items-center justify-center m-1 p-1">
              <div class="w-96 border bg-gray border-black min-h-24">
                  <div class="flex flex-row justify-between w-full p-2">
                      <p id="pUsername"><slot name="username"></slot></p>
                      <p class="text-gray-500"><slot name="date"></slot></p>
                  </div>
                  <p class="break-words p-2"><slot name="message"></slot></p>
              </div>
          </div>
      `;

      this.p = this.shadowRoot.querySelector("#pUsername");

      this.p.addEventListener("click", async (e) => {
        e.preventDefault();
        const idElement = this.querySelector("[id='id']");
        const userId = idElement ? idElement.getAttribute("userId") : null;
        if (userId) {
          const userScreen = document.createElement("user-screen");
          userScreen.setAttribute("user-id", userId);
          switchScreen(userScreen);
        } else {
          console.error("ID nicht gefunden.");
        }
      });
    }
  

  set post(postObject) {
      // Create elements to be passed into slots
      const usernameElem = document.createElement("span");
      usernameElem.textContent = postObject.username;
      usernameElem.slot = "username";

      const dateElem = document.createElement("span");
      dateElem.textContent = postObject.created_at.split("T")[0];
      dateElem.slot = "date";

      const messageElem = document.createElement("span");
      messageElem.textContent = postObject.body;
      messageElem.slot = "message";

      const idElement = document.createElement("div");
      idElement.setAttribute("userId", postObject.user_id);
      idElement.setAttribute("id", "id");
      idElement.slot = "username";

      // Append to light DOM so they fill slots in the shadow DOM
      this.appendChild(usernameElem);
      this.appendChild(dateElem);
      this.appendChild(messageElem);
      this.appendChild(idElement);
  }

  get post() {
      return this._post;
  }
}

customElements.define("user-post", UserPost);
