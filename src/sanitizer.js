/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
 
// base algorithms for a sanitizer

// eslint-disable-next-line no-unused-vars
export const _sanitizeDocFragment = function _sanitizeDocFragment(config, input) {
    // TODO implement this function and remove eslint-disable comment above
};

// eslint-disable-next-line no-unused-vars
export const _sanitizeDocument = function _sanitizeDocument(config, input) {
    // TODO implement this function and remove eslint-disable comment above
};

/**
 * fragmentParser
 * a parser that doesn't run scripts or loads resources
 *
 * @param {Node} ctx DOM node
 * @param {Object} input Document or DocumentFragment
 */
export const _fragmentParser = function _fragmentParser(ctx, input) {
    // note: ctx is of type Node (element?)
    // TODO https://github.com/mozilla/sanitizer-polyfill/issues/3
    // https://html.spec.whatwg.org/#concept-frag-parse-context
    let doc = document.implementation.createHTMLDocument()
    switch (ctx.nodeType) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        case Node.ELEMENT_NODE:
            console.log("element")
            break;
        case Node.TEXT_NODE:
            console.log("text")
            break;
        default:
            console.log("Unknown node type", ctx.nodeType)
            break;
    }

};

// eslint-disable-next-line no-unused-vars
export const _normalizeConfig = function _normalizeConfig(config) {
    // TODO implement this function and remove eslint-disable comment above
}