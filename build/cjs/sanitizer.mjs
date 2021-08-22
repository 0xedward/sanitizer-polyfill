'use strict';

/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * sanitize a document fragment in-place
 * @param {object} config - configuration of the sanitizer object
 * @param {Node} input - a document fragment
 * @return Nothing - the operation is in-place
 */
const sanitizeDocFragment = function _sanitizeDocFragment(
  config,
  input
) {
  /* global DOMPurify */
  let domPurifyConfig = _transformConfig(config);
  domPurifyConfig.IN_PLACE = true;
  DOMPurify.sanitize(input, domPurifyConfig);
};

/**
 * normalize a supplied Sanitizer-API config, to ensure baseline safety
 * @param {object} config - a configuration object
 * @returns {object} - a secure config
 * @private
 */
const _normalizeConfig = function _normalizeConfig(config) {
  if (
    config &&
    Object.keys(config).length === 0 &&
    config.constructor === Object
  ) {
    config = {};
  }

  let normalizedConfig = {};
  // TODO https://github.com/mozilla/sanitizer-polyfill/issues/29
  for (let [configurationElementList, elements] of Object.entries(config)) {
    if (SUPPORTED_CONFIGURATION_LISTS.has(configurationElementList)) {
      normalizedConfig[configurationElementList] = elements.map((element) => {
        return element.toLowerCase();
      });
      if (configurationElementList === "allowElements") {
        normalizedConfig[configurationElementList].forEach((element) => {
          if (!DEFAULT_ALLOWED_ELEMENTS.has(element)) {
            throw new SanitizerConfigurationError(
              `${element} is not included in built-in element allow list`
            );
          }
        });
      }
    }
  }

  const allowElements =
    normalizedConfig.allowElements || Array.from(DEFAULT_ALLOWED_ELEMENTS);
  const allowAttributes =
    normalizedConfig.allowAttributes || DEFAULT_ALLOWED_ATTRIBUTES;
  const blockElements =
    normalizedConfig.blockElements || DEFAULT_BLOCKED_ELEMENTS;
  const dropElements = normalizedConfig.dropElements || DEFAULT_DROP_ELEMENTS;
  const dropAttributes =
    normalizedConfig.dropAttributes || DEFAULT_DROP_ATTRIBUTES;
  const allowComments = !!normalizedConfig.allowComments;
  const allowCustomElements = !!normalizedConfig.allowCustomElements;
  return {
    allowElements,
    allowAttributes,
    blockElements,
    dropElements,
    dropAttributes,
    allowCustomElements,
    allowComments,
  };
};

/**
 * transform a Sanitizer-API-shaped configuration object into a config for DOMPurify invocation
 * @param {object} config
 * @returns {object} - a DOMPurify-compatible configuration object
 * @private
 */
const _transformConfig = function transformConfig(config) {
  const allowElems = config.allowElements || [];
  const allowAttrs = config.allowAttributes || [];
  const blockElements = config.blockElements || [];
  const dropElements = config.dropElements || [];
  const dropAttrs = config.dropAttributes || [];
  // https://github.com/cure53/DOMPurify/issues/556
  // To drop elements and their children upon sanitization, those elements need to be in both DOMPurify's FORBID_TAGS and FORBID_CONTENTS lists
  const isdropElementsSet =
    dropElements !== DEFAULT_DROP_ELEMENTS && dropElements !== [];
  const isblockElementsSet =
    blockElements !== DEFAULT_BLOCKED_ELEMENTS && blockElements !== [];
  let domPurifyConfig = {
    ALLOWED_TAGS: allowElems,
    ALLOWED_ATTR: allowAttrs,
    FORBID_ATTR: dropAttrs,
  };
  if (isdropElementsSet && !isblockElementsSet) {
    // Set FORBID_CONTENTS to drop all elements in dropElements
    domPurifyConfig.FORBID_TAGS = dropElements;
    domPurifyConfig.FORBID_CONTENTS = dropElements;
  } else if (isdropElementsSet && isblockElementsSet) {
    // Include all dropElements in FORBID_TAGS and specify to only drop elements in dropElements and not elements in blockElements with FORBID_CONTENTS
    const union = new Set(blockElements.concat(dropElements));
    domPurifyConfig.FORBID_TAGS = Array.from(union);
    domPurifyConfig.FORBID_CONTENTS = dropElements;
  } else {
    domPurifyConfig.FORBID_TAGS = blockElements;
  }
  return domPurifyConfig;
};

class SanitizerConfigurationError extends Error {
  constructor(message) {
    super(message);
    this.name = "SanitizerConfigurationError";
  }
}

const SUPPORTED_CONFIGURATION_LISTS = new Set([
  "allowElements",
  "blockElements",
  "dropElements",
  "allowAttributes",
  "dropAttributes",
  "allowCustomElements",
  "allowComments",
]);

// from https://wicg.github.io/sanitizer-api/#constants
const DEFAULT_ALLOWED_ELEMENTS = new Set([
  "a",
  "abbr",
  "acronym",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "basefont",
  "bdi",
  "bdo",
  "bgsound",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "command",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "font",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "image",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "layer",
  "legend",
  "li",
  "link",
  "listing",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "meta",
  "meter",
  "nav",
  "nobr",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "plaintext",
  "popup",
  "portal",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "section",
  "select",
  "selectmenu",
  "slot",
  "small",
  "source",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
]);

const DEFAULT_ALLOWED_ATTRIBUTES = [
  "abbr",
  "accept",
  "accept-charset",
  "accesskey",
  "action",
  "align",
  "alink",
  "allow",
  "allowfullscreen",
  "allowpaymentrequest",
  "alt",
  "anchor",
  "archive",
  "as",
  "async",
  "autocapitalize",
  "autocomplete",
  "autocorrect",
  "autofocus",
  "autopictureinpicture",
  "autoplay",
  "axis",
  "background",
  "behavior",
  "bgcolor",
  "border",
  "bordercolor",
  "capture",
  "cellpadding",
  "cellspacing",
  "challenge",
  "char",
  "charoff",
  "charset",
  "checked",
  "cite",
  "class",
  "classid",
  "clear",
  "code",
  "codebase",
  "codetype",
  "color",
  "cols",
  "colspan",
  "compact",
  "content",
  "contenteditable",
  "controls",
  "controlslist",
  "conversiondestination",
  "coords",
  "crossorigin",
  "csp",
  "data",
  "datetime",
  "declare",
  "decoding",
  "default",
  "defer",
  "dir",
  "direction",
  "dirname",
  "disabled",
  "disablepictureinpicture",
  "disableremoteplayback",
  "disallowdocumentaccess",
  "download",
  "draggable",
  "elementtiming",
  "enctype",
  "end",
  "enterkeyhint",
  "event",
  "exportparts",
  "face",
  "for",
  "form",
  "formaction",
  "formenctype",
  "formmethod",
  "formnovalidate",
  "formtarget",
  "frame",
  "frameborder",
  "headers",
  "height",
  "hidden",
  "high",
  "href",
  "hreflang",
  "hreftranslate",
  "hspace",
  "http-equiv",
  "id",
  "imagesizes",
  "imagesrcset",
  "importance",
  "impressiondata",
  "impressionexpiry",
  "incremental",
  "inert",
  "inputmode",
  "integrity",
  "invisible",
  "is",
  "ismap",
  "keytype",
  "kind",
  "label",
  "lang",
  "language",
  "latencyhint",
  "leftmargin",
  "link",
  "list",
  "loading",
  "longdesc",
  "loop",
  "low",
  "lowsrc",
  "manifest",
  "marginheight",
  "marginwidth",
  "max",
  "maxlength",
  "mayscript",
  "media",
  "method",
  "min",
  "minlength",
  "multiple",
  "muted",
  "name",
  "nohref",
  "nomodule",
  "nonce",
  "noresize",
  "noshade",
  "novalidate",
  "nowrap",
  "object",
  "open",
  "optimum",
  "part",
  "pattern",
  "ping",
  "placeholder",
  "playsinline",
  "policy",
  "poster",
  "preload",
  "pseudo",
  "readonly",
  "referrerpolicy",
  "rel",
  "reportingorigin",
  "required",
  "resources",
  "rev",
  "reversed",
  "role",
  "rows",
  "rowspan",
  "rules",
  "sandbox",
  "scheme",
  "scope",
  "scopes",
  "scrollamount",
  "scrolldelay",
  "scrolling",
  "select",
  "selected",
  "shadowroot",
  "shadowrootdelegatesfocus",
  "shape",
  "size",
  "sizes",
  "slot",
  "span",
  "spellcheck",
  "src",
  "srcdoc",
  "srclang",
  "srcset",
  "standby",
  "start",
  "step",
  "style",
  "summary",
  "tabindex",
  "target",
  "text",
  "title",
  "topmargin",
  "translate",
  "truespeed",
  "trusttoken",
  "type",
  "usemap",
  "valign",
  "value",
  "valuetype",
  "version",
  "virtualkeyboardpolicy",
  "vlink",
  "vspace",
  "webkitdirectory",
  "width",
  "wrap",
];
const DEFAULT_BLOCKED_ELEMENTS = [
  "script",
  "iframe",
  "object",
  "embed",
  "param",
  "noscript",
  "noframes",
  "noembed",
  "nolayer",
  "base",
  "plaintext",
  "title",
  "textarea",
  "xmp",
  "basefont",
  "template",
  "slot",
  "portal",
  "data",
];
const DEFAULT_DROP_ELEMENTS = [];
const DEFAULT_DROP_ATTRIBUTES = [];

/* vim: set ts=8 sts=2 et sw=2 tw=80: */

/**
 * This function inserts the `Sanitizer` interface into `window`, if it exists.
 */
function setup() {
  // name of our global object
  const GLOBALNAME = "Sanitizer";

  // name of the innerHTML-setter,
  // https://github.com/WICG/sanitizer-api/issues/100
  // when changing this, also change the function declaration below manually.
  const SETTER_NAME = "setHTML";

  if (typeof window === "undefined") {
    return;
  }
  if (window.isSecureContext) {
    // don't polyfill if already defined
    if (
      typeof window[GLOBALNAME] === "function" &&
      location.hash.indexOf("mustpolyfill") === -1
    ) {
      console.warn("Sanitizer is already defined. Bailing out.");
      return;
    }
    //
    const sanitizer = function Sanitizer(config) {
      const api = Object.create({});

      let normalizedConfig = _normalizeConfig(config);
      Object.assign(api, {
        // implementation of `sanitize` pending spec further discussions.
        /*sanitize(input) {
          if (input instanceof DocumentFragment) {
            return _sanitizeDocFragment(config, input);
          }
          if (input instanceof Document) {
            return _sanitizeDocument(config, input)
          }
          return new TypeError("Can't Sanitize input of type " + input.prototype);
        }, */
        sanitizeFor(localName, input) {
          // The inactive document does not issue requests and does not execute scripts.
          const inactiveDocument = document.implementation.createHTMLDocument();
          if (!DEFAULT_ALLOWED_ELEMENTS.has(localName)) {
            throw new SanitizerError(
              `${localName} is not an element in built-in default allow list`
            );
          }
          const context = inactiveDocument.createElement(localName);
          context.innerHTML = input;
          sanitizeDocFragment(this.config, context);
          return context;
        },
        config: normalizedConfig,
        getConfiguration() {
          return normalizedConfig;
        },
      });
      return Object.freeze(api);
    };
    window[GLOBALNAME] = sanitizer;
    HTMLElement.prototype[SETTER_NAME] = function setHTML(input, sanitizerObj) {
      const inactiveDocument = document.implementation.createHTMLDocument();
      const context = inactiveDocument.createElement(this.localName);
      context.innerHTML = input;
      sanitizeDocFragment(sanitizerObj.config, context);
      this.replaceChildren(...context.children);
    };
  }
}

class SanitizerError extends Error {
  constructor(message) {
    super(message);
    this.name = "SanitizerError";
  }
}

setup();

module.exports = Sanitizer;
