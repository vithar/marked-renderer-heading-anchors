'use strict';

// Store used anchors here
// {
//      'anchor1': 1
//      'anchor2': 2 // there are two the same anchors used on a page, we will add '-2' suffix to second
// }
var anchors = {};

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
        anchor = text.toLowerCase().replace(/[ .,:!#]+/g, '-').replace(/-$/, '');
    }

    if (anchors.hasOwnProperty(anchor)) {
        anchor += '-' + anchors[anchor]++;
    } else {
        anchors[anchor] = 1;
    }

    // TODO: class for hN anf hN > a
    return '<h' + level + ' id="' + anchor + '"><a anchor="#' + anchor + '"></a>' + text + '</h' + level + '>';
}
