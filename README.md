[cws]: https://chrome.google.com/webstore/detail/github-math-display/cgolaobglebjonjiblcjagnpmdmlgmda "Chrome Web Store link"
[license]: https://github.com/AaronCQL/katex-github-chrome-extension/blob/master/LICENSE "License"

# KaTeX GitHub Chrome Extension

[![Chrome Web Store version](https://img.shields.io/chrome-web-store/v/cgolaobglebjonjiblcjagnpmdmlgmda)][cws]
[![Chrome Web Store users](https://img.shields.io/chrome-web-store/users/cgolaobglebjonjiblcjagnpmdmlgmda?color=%234fb8ae)][cws]
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![MIT license](https://img.shields.io/github/license/aaroncql/katex-github-chrome-extension)][license]

**Display LaTeX flavoured math in GitHub Markdown previews.**

If this is installed correctly, the following should show a properly rendered equation in the centre of the page:

$$ \nabla L_D(\vec{w}) = \left[ \frac{\partial L_D}{\partial w_0},\dots, \frac{\partial L_D}{\partial w_n}  \right] $$

## Features

- **Only targets Markdown previews**: code blocks and code previews will not be affected
- **Fast and efficient rendering** using KaTeX
- **Supports current GitHub website**: including internal navigations, and when previewing an edited Markdown file

## Installing

[![Chrome Web Store version](https://img.shields.io/chrome-web-store/v/cgolaobglebjonjiblcjagnpmdmlgmda?label=GitHub%20Math%20Display)][cws]

Install via the [Chrome Web Store][cws].

## Developer guide

### Dependencies

#### [rollup-plugin-chrome-extension](https://github.com/extend-chrome/rollup-plugin-chrome-extension)

This project is bootstrapped using rollup-plugin-chrome-extension. All code is written in the `src` folder, and the main point of entry is the `src/index.js` file.

#### [KaTeX](https://katex.org/)

The [auto-render extension](https://katex.org/docs/autorender.html) is used to recursively search for all text nodes and replace them with the corresponding rendered math.

As per the docs, the css and font files must be included in `dist`. As such, `rollup-plugin-copy` is used to copy the KaTeX fonts and css located in `node_modules` to the `src/assets` folder. These files are referenced in `src/manifest.json`, and will be automatically included in `dist` after running `yarn build`.

**Note: files in the `src/assets` folder SHOULD NOT be modified**. Any modifications will be overwritten when building the files anyway.

### Local development

```bash
# install all dependencies
$ yarn
# build non-minified bundle to /dist
$ yarn build
# watch for changes and build non-minified bundle to /dist; use this for developing
$ yarn watch
```

Head over to [`chrome://extensions/`](chrome://extensions/), and load the `dist` folder.

### Publishing

```bash
# build minified bundle and zip it for chrome store upload
$ yarn build:prod
```

After running the above command, the built `.zip` file should be located in the `/releases` directory, which can then be uploaded to the Chrome webstore.

> Edit version in `package.json`; edit chrome extension's name and description in `manifest.json`.

## Known issues

### (FIXED) Newlines using double backslashes `\\` may not render correctly

> **FIX**: custom macros are provided to the `katex` options such that every single backslash is macroed to a double backslash.

GitHub's Markdown automatically escapes the double backslash, resulting in only a single backslash in the output HTML.

```latex
% in original Markdown file:
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

### (FIXED) Subscripts using `_` may not render correctly

> **FIX**: see https://github.com/AaronCQL/katex-github-chrome-extension/pull/2

```latex
% in original Markdown file:
$ \text{H}_h + X_\text{x} $

% would result in HTML as:
$ \text{H}<em>h + X</em>\text{x} $
```

#### Examples

|             Raw             |         Rendered          |      Working?      |
| :-------------------------: | :-----------------------: | :----------------: |
|        `$H_h + X_x$`        |        $H_h + X_x$        | :heavy_check_mark: |
| `$\text{H}_h + X_\text{x}$` | $\text{H}_h + X_\text{x}$ |        :heavy_check_mark:         |

## Contributing

Feature requests, bug reports, and PRs are welcome!

## License

[MIT License](https://github.com/AaronCQL/katex-github-chrome-extension/blob/master/license)
