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
// Q: is the purpose of _fragmentParser is to parse `input` under the context of `ctx`, so that `input` can be append to `ctx` correctly and returned?
export const _fragmentParser = function _fragmentParser(ctx, input) {
    // note: ctx is of type Node (element?)
    /* Reference: https://github.com/mozilla/sanitizer-polyfill/issues/3
    * https://html.spec.whatwg.org/#concept-frag-parse-context
    * https://w3c.github.io/DOM-Parsing/#parsing
    * /
    // Q: https://github.com/mozilla/sanitizer-polyfill/issues/3 references we need to call createHTMLDocument, but I don't know why it is necessary yet. Is the intention to attach the result of the parsing `input` to the empty Document we create?
    
 
    // Create a new Document node, and mark it as being an HTML document.
    let doc = document.implementation.createHTMLDocument()

    
    // Check if quirks, no-quirks, or limited-quirks mode
    // https://dom.spec.whatwg.org/#concept-document-quirks
    // https://dom.spec.whatwg.org/#dom-document-compatmode
    if (ctx.ownerDocument.compatMode === "CSS1Compat") {
        // https://developer.mozilla.org/en-US/docs/Mozilla/Mozilla_quirks_mode_behavior
    }


    // Create a new HTML parser, and associate it with the just created Document node.
    // TODO there should be documentfragment parser somewhere to reuse here...
    // Since input is a Document or DocumentFragment, we probably just need to traverse the existing DOM tree?

    // Switching parser state by node type
    // Q: For the items missing instructions on what state the tokenizer should be (e.g. xmp, style, etc), do we assume the tokenizer should be in data state? https://html.spec.whatwg.org/#concept-frag-parse-context
    switch (ctx.nodeType) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        case Node.ELEMENT_NODE:
            console.log(ctx.tagName," is type ELEMENT")
            // should be using ctx.childNodes instead of ctx.children b/c ctx.children only contains element nodes - https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes#notes
            // DocumentFragment doesn't have `childNodes` property only `children` property - https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment#methods 
        case Node.TEXT_NODE:
            // Q: Is it possible to get XSS through text and comment nodes? If not, we can append the TEXT node and return - https://stackoverflow.com/questions/476821/is-a-dom-text-node-guaranteed-to-not-be-interpreted-as-html
            console.log(ctx.tagName," is type TEXT")
            break;
        default:
            console.log("Unknown node type", ctx.nodeType)
            break;
    }

    // Q: If we accept string as `input`, we can probably replace the entire function body with following:
    let range = document.createRange();
    range.selectNode(ctx);
    let documentFragment = range.createContextualFragment(input)
    return documentFragment;
};

// eslint-disable-next-line no-unused-vars
export const _normalizeConfig = function _normalizeConfig(config) {
    // TODO implement this function and remove eslint-disable comment above
}