/* vim: set ts=8 sts=2 et sw=2 tw=80: */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */
 
// base algorithms for a sanitizer
import DOMPurify from 'dompurify';

// eslint-disable-next-line no-unused-vars
export const _sanitizeDocFragment = function _sanitizeDocFragment(config, input) {
    //use SET_CONFIG to ensure config has been applied to DOMPurify https://github1s.com/cure53/DOMPurify/blob/HEAD/dist/purify.js#L373-L374
    // TODO implement this function and remove eslint-disable comment above
    // TODO this function might be as easy as adding RETURN_DOM_FRAGMENT to DOMPurify config and then calling sanitize
};

// eslint-disable-next-line no-unused-vars
export const _sanitizeDocument = function _sanitizeDocument(config, input) {
    // TODO implement this function and remove eslint-disable comment above
};

// TODO consider using the builder pattern instead to customize creation of DOMPurify instances with sanitization configurations 
/**
 * @param {Object} config sanitizer configuration - https://wicg.github.io/sanitizer-api/#config
 * @returns {Object} returns a configuration compatible with DOMPurify - https://github.com/cure53/DOMPurify/blob/e15ae1e91e0ffb469f3e10131f05e53e29e9bd7e/dist/purify.js#L463-L484
 */
export const _normalizeConfig = function _normalizeConfig(config) {
    // https://www.samanthaming.com/tidbits/94-how-to-check-if-object-is-empty/#improve-empty-check-for-null-and-undefined
    if (config && Object.keys(config).length === 0 && config.constructor === Object) {
        //TODO validate what DOMPurify will do with no config 
        //TODO might need to return the "default" config we define in HTML Sanitizer spec 
        return {}; 
    }

    // TODO check config for missing elements (e.g. config doesn't contain dropElements, etc)
    // https://stackoverflow.com/questions/53361696/simple-way-to-return-default-value-if-accessing-properties-of-possibly-undefined/53362007

    // From sanitizer spec: Note: Element names are expected to be ascii lowercase and those that don’t conform will be lowercased.

    // TODO convert the following keys:
    // sanitizer config -> dompurify config
    // allowElements -> ALLOWED_TAGS
    // blockElements -> unknown DOMPurify equivalent - maybe FORBID_TAGS with KEEP_CONTENT, but then one can't use dropElements alongside blockElements
    // dropElements -> FORBID_TAGS
    // allowAttributes -> 
}
