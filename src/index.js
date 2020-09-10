import renderMathInElement from "katex/dist/contrib/auto-render";
import { Messages } from "./utils/constants";

function transformProblematicTags(readme) {
  readme.innerHTML = readme.innerHTML
    // replace "}<em> ... </em>" with "}\@@em@start@@_ ... \@@em@end@@_"
    .replace(/}<em.*?>([\s\S]*?)<\/em>/g, "}\\@@em@start@@_$1\\@@em@end@@_")
    // replace ")<em> ... </em>" with ")\@@em@start@@_ ... \@@em@end@@_"
    .replace(/\)<em.*?>([\s\S]*?)<\/em>/g, ")\\@@em@start@@_$1\\@@em@end@@_")
    // replace "^<em> ... </em>" with "^\@@em@start@@* ... \@@em@end@@*"
    .replace(/\^<em.*?>([\s\S]*?)<\/em>/g, "^\\@@em@start@@*$1\\@@em@end@@*")
    // replace "<br>" with "\@@br@@"
    .replace(/\\*<br.*?>/g, "\\@@br@@");
}

/**
 * Cleans and removes the custom tags introduced in {@function transformProblematicTags}
 * for all KaTeX nodes.
 *
 * @param {HTMLElement} readme
 */
function cleanTagsFromKatexElements(readme) {
  const katexElements = readme.getElementsByClassName("katex");
  for (const el of katexElements) {
    el.innerHTML = el.innerHTML
      .replace(/\\@@em@start@@/g, "")
      .replace(/\\@@em@end@@/g, "")
      .replace(/\\@@br@@/g, "\\\\");
  }
}

function revertNonProblematicTags(readme) {
  readme.innerHTML = readme.innerHTML
    .replace(/\\@@em@start@@_([\s\S]*?)\\@@em@end@@_/g, "<em>$1</em>")
    .replace(/\\@@em@start@@\*([\s\S]*?)\\@@em@end@@\*/g, "<em>$1</em>")
    .replace(/\\@@br@@/g, "<br>");
}

function renderMathViaKatex(readme) {
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

      // replace custom tags
      "\\@@em@start@@": "",
      "\\@@em@end@@": "",
      "\\@@br@@": "\\\\",
    },
  });

  console.log("math rendered");
}

function renderMath() {
  const readme = document.getElementById("readme");

  if (!readme) {
    return;
  }

  transformProblematicTags(readme);
  renderMathViaKatex(readme);
  cleanTagsFromKatexElements(readme);
  revertNonProblematicTags(readme);
}

// on detected dom changes (when previewing markdown)
const readmeObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    for (const addedNode of mutation.addedNodes) {
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
console.log("initial page load detected");
renderMath();
