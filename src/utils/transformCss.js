export default function transformCss(css) {
  return css
    .toString()
    .replace(/\.woff2\)/g, '.woff2")')
    .replace(/\.woff\)/g, '.woff")')
    .replace(/\.ttf\)/g, '.ttf")')
    .replace(/fonts\//g, '"chrome-extension://__MSG_@@extension_id__/assets/fonts/');
}
