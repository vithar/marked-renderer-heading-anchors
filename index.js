'use strict';

var GithubSlugger = require('github-slugger'),
    slugger = new GithubSlugger();

// Store used anchors here
// {
//      'anchor1': 1
//      'anchor2': 2 // there are two the same anchors used on a page, we will add '-2' suffix to second
// }
// var anchors = {};

module.exports = function(text, level) {
    // looking for {#anchor} in heading
    var anchorInText = text.match(/(.*)( {#(.+)})/);
    var anchor;

    if (anchorInText) {
        // text without anchor
        text = anchorInText[1];

        // anchor
        anchor = anchorInText[3];
    } else {
        // if {#anchor} not found — constructing automatic anchor from the text
        // anchor = text.replace(/[ .,:!#]+/g, '-').replace(/[-\?]*$/, '').replace(/([A-Z])+/g, function(s) { return s.toLowerCase() });
        anchor = slugger.slug(text);
    }

    // TODO: process anchors duplicates
/*
    if (anchors.hasOwnProperty(anchor)) {
        anchor += '-' + anchors[anchor]++;
    } else {
        anchors[anchor] = 1;
    }
*/
    var options = this.options,
        headingClass = options.headingClassName && ' class="' + options.headingClassName + level + '"',
        headingAnchorClass = options.headingAnchorClassName && ' class="' + options.headingAnchorClassName + '"';

    return '<h' + level + headingClass + ' id="' + anchor + '">' +
        '<a href="#' + anchor + '"' + headingAnchorClass + '></a>' + text + '</h' + level + '>';
}
