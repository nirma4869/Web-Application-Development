/**
 * Removes the current screen and replaces it with a new one. Shitty, but works.
 * @param {HTMLElement} newScreen - The new screen element to display.
 */
export function switchScreen(newScreen) {
    const container = document.querySelector("body"); // or a specific 'div' that contains your screens.
  
    // Remove the current screen
    const currentScreen = container.querySelector("#screen");
    if (currentScreen) {
      container.removeChild(currentScreen);
    }
    // Add the new screen
    container.appendChild(newScreen);
  }
  
  /**
   * Initializes the application by showing the initial screen.
   * @param {HTMLElement} initialScreen - The initial screen element to display.
   */
  export function initializeApp(initialScreen) {
    const container = document.querySelector("body"); // or the specific container for your screens.
    container.appendChild(initialScreen);
  }
  