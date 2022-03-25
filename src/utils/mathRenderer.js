import renderMathInElement from "katex/dist/contrib/auto-render";

/**
 * Transforms all problematic tags to custom tags.
 *
 * @param {HTMLElement} renderEl the element to transform
 */
function transformProblematicTags(renderEl) {
  renderEl.innerHTML = renderEl.innerHTML
    // replace "}<em> ... </em>" with "}\@@em@start@@_ ... \@@em@end@@_"
    .replace(/}<em.*?>([\s\S]*?)<\/em>/g, "}\\@@em@start@@_$1\\@@em@end@@_")
    // replace ")<em> ... </em>" with ")\@@em@start@@_ ... \@@em@end@@_"
    .replace(/\)<em.*?>([\s\S]*?)<\/em>/g, ")\\@@em@start@@_$1\\@@em@end@@_")
    // replace "^<em> ... </em>" with "^\@@em@start@@* ... \@@em@end@@*"
    .replace(/\^<em.*?>([\s\S]*?)<\/em>/g, "^\\@@em@start@@*$1\\@@em@end@@*")
    // replace "+<em> ... </em>" with "+\@@em@start@@_ ... \@@em@end@@_"
    // assumes it's always "+_"; this will break if the math block contains a "+*"
    .replace(/\+<em.*?>([\s\S]*?)<\/em>/g, "+\\@@em@start@@_$1\\@@em@end@@_")
    // replace "<br>" or "\<br>" with "\@@br@@"
    .replace(/\\*<br.*?>/g, "\\@@br@@");
}

/**
 * Renders all math blocks by calling Katex's {@function renderMathInElement}.
 *
 * @param {HTMLElement} renderEl
 */
function renderMathViaKatex(renderEl) {
  renderMathInElement(renderEl, {
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

/**
 * Removes the custom tags introduced in {@function transformProblematicTags}
 * for all KaTeX nodes.
 *
 * @param {HTMLElement} renderEl
 */
function removeTagsFromKatexElements(renderEl) {
  const katexElements = renderEl.getElementsByClassName("katex");
  for (const el of katexElements) {
    el.innerHTML = el.innerHTML
      .replace(/\\@@em@start@@/g, "")
      .replace(/\\@@em@end@@/g, "")
      .replace(/\\@@br@@/g, "\\\\");
  }
}

/**
 * Reverts all custom tags introducted in {@function transformProblematicTags}
 * to their respective HTML tags.
 *
 * This function must be called after {@function removeTagsFromKatexElements}
 * to avoid changing the custom tags within the katex rendered blocks.
 *
 * @param {HTMLElement} renderEl
 */
function revertNonProblematicTags(renderEl) {
  renderEl.innerHTML = renderEl.innerHTML
    .replace(/\\@@em@start@@_([\s\S]*?)\\@@em@end@@_/g, "<em>$1</em>")
    .replace(/\\@@em@start@@\*([\s\S]*?)\\@@em@end@@\*/g, "<em>$1</em>")
    .replace(/\\@@br@@/g, "<br>");
}

/**
 * Renders all math in the `readme` element by calling the required
 * functions sequentially.
 */
function renderMath() {
  const readmeEl = document.getElementById("readme");
  const wikiEl = document.getElementById("wiki-body");
  const issueEl = document.getElementById("show_issue");

  if (!readmeEl && !wikiEl && !issueEl) {
    return;
  }

  const renderEl = readmeEl || wikiEl || issueEl;

  transformProblematicTags(renderEl);
  renderMathViaKatex(renderEl);
  removeTagsFromKatexElements(renderEl);
  revertNonProblematicTags(renderEl);
}

function debounce(func, timeout) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export default debounce(renderMath, 1000);
