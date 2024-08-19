export function switchScreen(newScreen) {
    const container = document.querySelector("body");
  
    const feedScreen = container.querySelector("feed-screen");
    const userFeedScreen = container.querySelector("user-screen");
  
    if (feedScreen) {
      container.removeChild(feedScreen);
    }
    if (userFeedScreen) {
      container.removeChild(userFeedScreen);
    }
    container.appendChild(newScreen);
  }
  
  export function initializeApp(initialScreen) {
    const container = document.querySelector("body");
    container.appendChild(initialScreen);
  }
  