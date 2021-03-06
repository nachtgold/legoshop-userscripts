// ==UserScript==
// @name         Part count for products
// @namespace    https://ceyxstudios.com/
// @version      0.3
// @description  Product page with bricklink part count
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
                if(!!parts && parts.length == 2) {
                    var pieces = document.querySelector('[data-test="product-details__piece-count"]');
                    if(!!pieces) {
                        var link = document.createElement('a');
                        link.href = brick_url;
                        link.target = '_blank';
                        link.textContent = ' (' + parts[1] + ')';
                        pieces.appendChild(link);
                    }
                }
            }
        });
    }
})();
