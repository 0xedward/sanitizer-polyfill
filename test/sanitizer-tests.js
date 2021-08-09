const sanitizer = require("../src/sanitizer");

QUnit.module("sanitizer.js");

QUnit.test("user inputs empty sanitizer config", (assert) => {
  assert.equal(sanitizer._normalizeConfig({}), {
    allowElements: sanitizer.DEFAULT_ALLOWED_ELEMENTS,
  });
});
