import transformCss from "./../../src/utils/cssTransformer";

const ORIGINAL_CSS_SNIPPET_1 = `@font-face {
  font-family: 'KaTeX_AMS';
  src: url(fonts/KaTeX_AMS-Regular.woff2) format('woff2'), url(fonts/KaTeX_AMS-Regular.woff) format('woff'), url(fonts/KaTeX_AMS-Regular.ttf) format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'KaTeX_Caligraphic';
  src: url(fonts/KaTeX_Caligraphic-Bold.woff2) format('woff2'), url(fonts/KaTeX_Caligraphic-Bold.woff) format('woff'), url(fonts/KaTeX_Caligraphic-Bold.ttf) format('truetype');
  font-weight: bold;
  font-style: normal;
}`;
const TRANSFORMED_CSS_SNIPPET = `@font-face {
  font-family: 'KaTeX_AMS';
  src: url("chrome-extension://__MSG_@@extension_id__/assets/fonts/KaTeX_AMS-Regular.woff2") format('woff2'), url("chrome-extension://__MSG_@@extension_id__/assets/fonts/KaTeX_AMS-Regular.woff") format('woff'), url("chrome-extension://__MSG_@@extension_id__/assets/fonts/KaTeX_AMS-Regular.ttf") format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'KaTeX_Caligraphic';
  src: url("chrome-extension://__MSG_@@extension_id__/assets/fonts/KaTeX_Caligraphic-Bold.woff2") format('woff2'), url("chrome-extension://__MSG_@@extension_id__/assets/fonts/KaTeX_Caligraphic-Bold.woff") format('woff'), url("chrome-extension://__MSG_@@extension_id__/assets/fonts/KaTeX_Caligraphic-Bold.ttf") format('truetype');
  font-weight: bold;
  font-style: normal;
}`;

const ORIGINAL_CSS_SNIPPET_2 = `.katex {
  font: normal 1.21em KaTeX_Main, Times New Roman, serif;
  line-height: 1.2;
  text-indent: 0;
  text-rendering: auto;
  border-color: currentColor;
}
.katex * {
  -ms-high-contrast-adjust: none !important;
}
.katex .katex-version::after {
  content: "0.12.0";
}
.katex .katex-mathml {
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
}`;

describe("argument type check", () => {
  it("should throw type error if argument is not a string", () => {
    expect(() => transformCss(new Date())).toThrow(TypeError);
    expect(() => transformCss(1)).toThrow(TypeError);
    expect(() => transformCss({})).toThrow(TypeError);
  });

  it("should not throw any errors if argument is a string", () => {
    expect(() => transformCss("")).not.toThrow();
    expect(() => transformCss("   ")).not.toThrow();
    expect(() => transformCss("testing")).not.toThrow();
  });
});

describe("check transformed output", () => {
  it("should properly transform the font urls", () => {
    const transformedCss = transformCss(ORIGINAL_CSS_SNIPPET_1);
    expect(transformedCss).toBe(TRANSFORMED_CSS_SNIPPET);
  });

  it("should not affect other css rules", () => {
    const transformedCss = transformCss(ORIGINAL_CSS_SNIPPET_2);
    expect(transformedCss).toBe(ORIGINAL_CSS_SNIPPET_2);
  });
});
