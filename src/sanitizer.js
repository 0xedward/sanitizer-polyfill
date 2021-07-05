/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
 
// base algorithms for a sanitizer

// eslint-disable-next-line no-unused-vars
export const _sanitizeDocFragment = function _sanitizeDocFragment(config, input) {
    // TODO implement this function and remove eslint-disable comment above
    // TODO maybe we can use https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator to traverse through nodes
};

// eslint-disable-next-line no-unused-vars
export const _sanitizeDocument = function _sanitizeDocument(config, input) {
    // TODO implement this function and remove eslint-disable comment above
};

/**
 * fragmentParser
 * a parser that doesn't run scripts or loads resources
 *
 * @param {Node} contextNode DOM node
 * @param {DOMString} input String containing HTML the caller wants to insert into contextNode's tree - Reference: https://w3c.github.io/DOM-Parsing/#webidl-1767075462
 * @returns {DocumentFragment} TODO add return description - Reference: https://github.com/0xedward/sanitizer-polyfill/pull/1#discussion_r663745143
 */
export const _fragmentParser = function _fragmentParser(contextNode, input) {
    // https://html.spec.whatwg.org/#concept-frag-parse-context
    // https://w3c.github.io/DOM-Parsing/#parsing
    // Q: How should we be handling exceptions here?
    let range = document.createRange();
    range.selectNode(contextNode);
    // https://w3c.github.io/DOM-Parsing/#ref-for-dom-range-createcontextualfragment-2
    let documentFragment = range.createContextualFragment(input)
    return documentFragment;
};

// eslint-disable-next-line no-unused-vars
export const _normalizeConfig = function _normalizeConfig(config) {
    // TODO implement this function and remove eslint-disable comment above
}