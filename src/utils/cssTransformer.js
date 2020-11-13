/**
 * Transforms the katex required CSS for use within this Chrome extension.
 *
 * @param {string | Buffer} css the katex CSS
 */
function transformCss(css) {
  if (typeof css !== "string" && !Buffer.isBuffer(css)) {
    throw new TypeError("Argument css must be of type string or buffer");
  }

  return css
    .toString()
    .replace(/\.woff2\)/g, '.woff2")')
    .replace(/\.woff\)/g, '.woff")')
    .replace(/\.ttf\)/g, '.ttf")')
    .replace(
      /fonts\//g,
      '"chrome-extension://__MSG_@@extension_id__/assets/fonts/'
    );
}

export default transformCss;
