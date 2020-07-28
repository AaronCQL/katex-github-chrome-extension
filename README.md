# KaTeX GitHub Chrome Extension

Uses KaTeX to support display of LaTeX math equations in GitHub READMEs.

$$\pi \approx \frac{22}{7}$$

## Installing

This extension is not yet published. To install manually:

1. Clone this repo
2. Head to `chrome://extensions`
3. Ensure `Developer mode` is toggled
4. Click the "Load unpacked" button and select the `dist` folder within the cloned repo

## Developing

```bash
# install all dependencies
$ yarn
# develop with auto HMR
$ yarn watch
# build for production
$ yarn build
```

Head over to [`chrome://extensions/`](chrome://extensions/), and load the `dist` folder.

### [rollup-plugin-chrome-extension](https://github.com/extend-chrome/rollup-plugin-chrome-extension)

This is bootstrapped using rollup-plugin-chrome-extension. All code is written in the `src` folder, and the main point of entry is the `src/index.js` file.

### [KaTeX](https://katex.org/)

The [auto-render extension](https://katex.org/docs/autorender.html) is used to recursively search for all text nodes and replace them with the corresponding rendered math.

As per the docs, the css and font files must be included in `dist`. As such, `rollup-plugin-copy` is used to copy the KaTeX fonts and css located in `node_modules` to the `src` folder. These files are referenced in `src/manifest.json`, and will be automatically included in `dist` after running `yarn build`.

**Note: the `src/fonts` folder and `src/katex.css` should not be modified**. Any modifications will be overwritten anyways.

## Known issues

- Newlines using double backslashes `\\` does not render
  - GitHub's markdown automatically escapes the double backslash, resulting in only a single backslash in the output HTML (which throws an error when parsing)
