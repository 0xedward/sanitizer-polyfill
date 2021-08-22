// import Sanitizer from '../build/cjs/sanitizer.mjs';
// import Sanitizer from '../build/cjs/sanitizer.js';
// import Sanitizer from '../cjs/polyfill.js';
// import SanitizerError from '../build/es/sanitizer.js';

describe("Sanitizer", function () {
  // var Sanitizer = import("../build/cjs/sanitizer.mjs");
  // var Sanitizer = require("../build/cjs/sanitizer.mjs");
  // var Sanitizer = require("../build/cjs/sanitizer.mjs");
  var Sanitizer = require("../cjs/polyfill.js");
  // var Sanitizer = setup();

  it("print Sanitizer", () => {
    expect(Sanitizer).toBe(false);
  });

  it("is frozen", () => {
    expect(Object.isFrozen(Sanitizer)).toBe(true);
  });

  // describe('getDefaultConfiguration', () => {
  //   it('returns the default configuration', () => {
  //     const config = Sanitizer.getDefaultConfiguration();

  //     expect(config instanceof Object).toBe(true);
  //   });
  // });

  describe("sanitizeFor", () => {
    it("`Some text <b><i>with</i></b> <blink><i>tags</i></blink>.` returns", () => {
      const sanitizerInstance = new Sanitizer({
        blockElements: ["blink"],
        dropElements: ["b"],
      });
      const sanitizedInput = sanitizerInstance.sanitizeFor(
        "p",
        "Some text <b><i>with</i></b> <blink><i>tags</i></blink>."
      );
      expect(sanitizedInput instanceof Node).toBe(true);
      expect(sanitizedInput).toBe("<p>Some text  <i>tags</i>.</p>");
    });
  });
});
