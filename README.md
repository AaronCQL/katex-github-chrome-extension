# KaTeX GitHub Chrome Extension

Chrome extension to display LaTeX math equations in GitHub markdown previews. If this is installed correctly, the following should show a properly rendered equation in the centre of the page:

$$ \nabla L_D(\vec{w}) = \left[ \frac{\partial L_D}{\partial w_0},\dots, \frac{\partial L_D}{\partial w_n}  \right] $$

## Installing

This extension is not yet published on the Chrome web store. To install manually:

1. Download the [latest release](https://github.com/AaronCQL/katex-github-chrome-extension/releases)
2. Extract `katex-github-chrome-extension-X.X.X.zip` to a folder
3. Head to `chrome://extensions`
4. Ensure `Developer mode` is toggled
5. Click the "Load unpacked" button and select the extracted `katex-github-chrome-extension-X.X.X` folder

## Developing

```bash
# install all dependencies
$ yarn
# build non-minified bundle to /dist
$ yarn build
# watch for changes and build non-minified bundle to /dist; use this for developing
$ yarn watch
```

Head over to [`chrome://extensions/`](chrome://extensions/), and load the `dist` folder.

## Publishing

```bash
# build minified bundle and zip it for chrome store upload
$ yarn build:prod
```

After running the above command, the built `.zip` file should be located in the `/releases` directory, which can then be uploaded to the Chrome webstore.

> Edit version in `package.json`; edit chrome extension's name and description in `manifest.json`.

### [rollup-plugin-chrome-extension](https://github.com/extend-chrome/rollup-plugin-chrome-extension)

This is bootstrapped using rollup-plugin-chrome-extension. All code is written in the `src` folder, and the main point of entry is the `src/index.js` file.

### [KaTeX](https://katex.org/)

The [auto-render extension](https://katex.org/docs/autorender.html) is used to recursively search for all text nodes and replace them with the corresponding rendered math.

As per the docs, the css and font files must be included in `dist`. As such, `rollup-plugin-copy` is used to copy the KaTeX fonts and css located in `node_modules` to the `src` folder. These files are referenced in `src/manifest.json`, and will be automatically included in `dist` after running `yarn build`.

**Note: the `src/fonts` folder and the `src/katex.css` file should not be modified**. Any modifications will be overwritten when building the files anyway.

## Known issues

### Newlines using double backslashes `\\` may not render correctly

> **FIXED**: custom macros are provided to the `katex` options such that every single backslash is macroed to a double backslash.

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

#### Examples

|    Raw     | Rendered |      Working?      |
| :--------: | :------: | :----------------: |
| `$1 \\ 2$` | $1 \\ 2$ | :heavy_check_mark: |
| `$1\\ 2$`  | $1\\ 2$  | :heavy_check_mark: |
|  `$1\\2$`  |  $1\\2$  | :heavy_check_mark: |

### Subscripts using `_` may not render correctly

```latex
% in original markdown file:
$ \text{H}_h + X_\text{x} $

% would result in HTML as:
$ \text{H}<em>h + X</em>\text{x} $
```

#### Examples

|             Raw             |         Rendered          |      Working?      |
| :-------------------------: | :-----------------------: | :----------------: |
|        `$H_h + X_x$`        |        $H_h + X_x$        | :heavy_check_mark: |
| `$\text{H}_h + X_\text{x}$` | $\text{H}_h + X_\text{x}$ |        :x:         |
