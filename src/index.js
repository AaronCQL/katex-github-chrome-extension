import renderMathInElement from "katex/dist/contrib/auto-render";

const readme = document.getElementById("readme");

renderMathInElement(readme, {
  delimiters: [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true },
  ],
  throwOnError: false,
});
