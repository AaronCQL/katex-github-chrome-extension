# KaTeX GitHub Chrome Extension

Chrome extension to display LaTeX math equations in GitHub markdown previews. If this is installed correctly, the following should show a properly rendered equation in the centre of the page:

$$ \nabla L_D(\vec{w}) = \left[ \frac{\partial L_D}{\partial w_0},\dots, \frac{\partial L_D}{\partial w_n}  \right] $$

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
# build production zip file for chrome store upload
$ yarn build:prod
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

|    Raw     | Rendered |      Working?      |
| :--------: | :------: | :----------------: |
| `$1 \\ 2$` | $1 \\ 2$ | :heavy_check_mark: |
| `$1\\ 2$`  | $1\\ 2$  | :heavy_check_mark: |
|  `$1\\2$`  |  $1\\2$  |        :x:         |

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
