# KaTeX GitHub Chrome Extension

Displays LaTeX math equations in GitHub READMEs using KaTeX. If this is installed correctly, the following should show a properly rendered equation in the centre of the page:

$$\pi \approx \frac{22}{7}$$

## Installing

This extension is not yet published on the Chrome web store. To install manually:

1. Download the [latest release](https://github.com/AaronCQL/katex-github-chrome-extension/releases)
2. Extract the `dist` folder within `dist.zip`
3. Head to `chrome://extensions`
4. Ensure `Developer mode` is toggled
5. Click the "Load unpacked" button and select the extracted `dist` folder

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

**Note: the `src/fonts` folder and the `src/katex.css` file should not be modified**. Any modifications will be overwritten when building the files anyway.

## Known issues

### Newlines using double backslashes `\\` may not render correctly

GitHub's markdown automatically escapes the double backslash, resulting in only a single backslash in the output HTML.

```latex
% in original markdown file:
$$
x = 23 \\
x + 2 = 25
$$

% would result in HTML as:
$$ x = 23 \ x + 2 = 25 $$
```

A quick fix for this has been implemented to recursively walk through all text nodes, and replace all instances of `\` that has any of the following: new line (`\n`), carriage return (`\r`), or spaces (`\s`), with `\\`.

#### Examples

Works: $1 \\ 2$

Fails: $1\\2$

### Subscripts using `_` may not render correctly

```latex
% in original markdown file:
$ \text{H}_h + X_\text{x} $

% would result in HTML as:
$ \text{H}<em>h + X</em>\text{x} $
```

#### Examples

Works: $H_h + X_x$

Fails: $\text{H}_h + X_\text{x}$