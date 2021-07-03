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
 * @param {Node} ctx DOM node
 * @param {Object} input Document or DocumentFragment
 */
// Q: it looks like the purpose of _fragmentParser is to parse `input` under the context of `ctx`, so that `input` can be append to `ctx` correctly
export const _fragmentParser = function _fragmentParser(ctx, input) {
    // note: ctx is of type Node (element?)
    // Reference: https://github.com/mozilla/sanitizer-polyfill/issues/3
    // https://html.spec.whatwg.org/#concept-frag-parse-context
    // Q: https://github.com/mozilla/sanitizer-polyfill/issues/3 references we need to call createHTMLDocument, but I don't know why it is necessary yet. Is the intention to attach the result of the parsing `input` to the empty Document we create?
    let doc = document.implementation.createHTMLDocument()
    switch (ctx.nodeType) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        case Node.ELEMENT_NODE:
            console.log("element")
            // Q: If we accept string as `input`, we can probably do something like the following below:
            let range = document.createRange();
            range.selectNode(ctx);
            let documentFragment = range.createContextualFragment(input)
            return documentFragment;
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