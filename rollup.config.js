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
        { src: "node_modules/katex/dist/fonts/*", dest: "dist/fonts" },
        {
          src: "node_modules/katex/dist/katex.css",
          dest: "src",
          transform: transformCss,
        },
      ],
      verbose: true,
      hook: "buildStart",
    }),
  ],
};
