// ==UserScript==
// @name         Part count for lego
// @namespace    https://ceyxstudios.com/
// @version      0.1
// @description  Lego shop with bricklist part count
// @author       Kai Zimmermann
// @include      /^(https?:\/\/)?(www\.)?lego\.com(\/.+)?\/product(.+)$/
// @grant        GM_xmlhttpRequest
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';

    var patt = /.*\>(\d+)\sparts\<\/a\>.*/gi
    var prod = document.querySelector('[itemprop="productID"]')
    if(!!prod) {
        var id = prod.textContent;
        var brick_url = "https://www.bricklink.com/v2/catalog/catalogitem.page?S=" + id;

        GM_xmlhttpRequest({
            method: "GET",
            url: brick_url,
            onload: function(response) {
                var t = response.responseText;
                var parts = patt.exec(t);
                if(parts.length == 2) {
                    var pieces = document.querySelector('[data-test="product-details__piece-count"]');
                    if(!!pieces) {
                        pieces.textContent += " (" + parts[1] + ")";
                    }
                }
            }
        });
    }
})();
