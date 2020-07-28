import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";

import transformCss from "./utils/transformCss";

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    simpleReloader(),
    resolve(),
    commonjs(),
    copy({
      targets: [
        // copy KaTeX required fonts to /src, so that it gets bundled into /dist
        { src: "node_modules/katex/dist/fonts/*", dest: "src/fonts" },
        // copy KaTeX required css to /src, so that it gets bundled into /dist
        {
          src: "node_modules/katex/dist/katex.css",
          dest: "src",
          transform: transformCss,
        },
      ],
      hook: "buildStart",
    }),
  ],
};
