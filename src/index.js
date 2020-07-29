import renderMathInElement from "katex/dist/contrib/auto-render";

const readme = document.getElementById("readme");

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
