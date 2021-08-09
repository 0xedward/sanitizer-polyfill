const sanitizer = require("../src/polyfill");

test("user inputs empty sanitizer config", () => {
  expect(sanitizer._normalizeConfig({})).toBe({
    allowElements: sanitizer.DEFAULT_ALLOWED_ELEMENTS,
  });
});
