import renderMathInElement from "katex/dist/contrib/auto-render";
import { Messages } from "./utils/constants";

function renderMath() {
  const readme = document.getElementById("readme");

  if (!readme) {
    return;
  }

  renderMathInElement(readme, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    throwOnError: false,
    strict: false,
    macros: {
      // replace all instances of single backslash \ to double backslash \\
      "\\ ": "\\\\",
      "\\\r": "\\\\",
      "\\\n": "\\\\",
      "\\0": "\\\\0",
      "\\1": "\\\\1",
      "\\2": "\\\\2",
      "\\3": "\\\\3",
      "\\4": "\\\\4",
      "\\5": "\\\\5",
      "\\6": "\\\\6",
      "\\7": "\\\\7",
      "\\8": "\\\\8",
      "\\9": "\\\\9",

      // for \; spacing
      ";": "\\;",
    },
  });

  console.log("math rendered");
}

// on detected dom changes (when previewing markdown)
const readmeObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const addedNode of mutation.addedNodes) {
      if (addedNode.id === "readme") {
        console.log("readme dom change detected");
        return renderMath();
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
console.log("initial page load detected");
renderMath();
