/**
 * Entry point of this Chrome extension.
 *
 * The {@function renderMath} function should be called on initial page load,
 * on spa-like route changes, and on detected DOM changes.
 */
import { Messages } from "./utils/constants";
import renderMath from "./utils/mathRenderer";

// on detected dom changes (when previewing markdown)
const readmeObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const addedNode of mutation.addedNodes) {
      if (!addedNode.tagName) {
        continue;
      }
      if (addedNode.id === "readme") {
        console.log("readme dom change detected");
        renderMath();
        return; // break from all loops
      }
    }
  }
});
readmeObserver.observe(document.body, { childList: true, subtree: true });

// on spa-like route changes
chrome.runtime.onMessage.addListener((request) => {
  if (request.type === Messages.ROUTE_CHANGED) {
    console.log("route change detected");
    renderMath();
  }
});

// on initial page load
// calls renderMath in the next event loop after document is ready
// this prevents rendering before the markdown is properly initialised
setTimeout(() => {
  console.log("initial page load detected");
  renderMath();
});
