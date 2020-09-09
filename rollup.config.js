import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";
import zip from "rollup-plugin-zip";

import transformCss from "./src/utils/transformCss";

const isProd = process.env.NODE_ENV === "production";

export default [
  {
    input: "src/index.js",
    output: {
      dir: "dist",
      format: "esm",
    },
    plugins: [
      // delete the /dist folder
      ...(isProd ? [del({ targets: "dist/*", runOnce: true })] : []),
      // copy essential KaTeX files from /node_modules to /src
      copy({
        targets: [
          // copy KaTeX required fonts to /src, so that it gets bundled into /dist
          { src: "node_modules/katex/dist/fonts/*", dest: "src/assets/fonts" },
          // copy KaTeX required css to /src, so that it gets bundled into /dist
          {
            src: "node_modules/katex/dist/katex.css",
            dest: "src/assets",
            transform: transformCss,
          },
        ],
        copyOnce: true,
      }),
    ],
  },
  {
    input: "src/manifest.json",
    output: {
      dir: "dist",
      format: "esm",
      plugins: isProd
        ? [
            terser({
              compress: {
                drop_console: true,
              },
            }),
            zip({ dir: "releases" }),
          ]
        : [],
    },
    plugins: [
      // always put chromeExtension() before other plugins
      chromeExtension(),
      simpleReloader(),
      resolve(),
      commonjs(),
    ],
  },
];
