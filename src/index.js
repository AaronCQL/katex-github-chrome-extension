import renderMathInElement from "katex/dist/contrib/auto-render";
import { Messages } from "../utils/constants";

function renderMath() {
  const readme = document.getElementById("readme");

  if (!readme) {
    return;
  }

  // replaces all instances of single backslash \ to double backslash \\
  const treeWalker = document.createTreeWalker(readme, NodeFilter.SHOW_TEXT);
  while (treeWalker.nextNode()) {
    const node = treeWalker.currentNode;
    node.nodeValue = node.nodeValue.replace(/\\[\n\s\r]+/g, "\\\\");
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
