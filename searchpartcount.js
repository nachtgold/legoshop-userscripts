// ==UserScript==
// @name         Part count for lego search
// @namespace    https://ceyxstudios.com/
// @version      0.1
// @description  Lego search with bricklink part count for sets
// @author       Kai Zimmermann
// @include      /^(https?:\/\/)?(www\.)?lego\.com/
// @grant        GM_xmlhttpRequest
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';

    var f = function() {
        var products = document.querySelectorAll('[data-test="product-leaf-product-code"]:not([patched])');

        products.forEach(function(p) {
            p.setAttribute("patched", "patched");
            var patt = /.*\>(\d+)\sparts\<\/a\>.*/gi;
            var id = p.attributes['data-test-code'];
            if(!!id) {
                var brick_url = "https://www.bricklink.com/v2/catalog/catalogitem.page?S=" + id.nodeValue;

                GM_xmlhttpRequest({
                    method: "GET",
                    url: brick_url,
                    onload: function(response) {
                        var t = response.responseText;
                        var parts = patt.exec(t);
                        if(!!parts && parts.length == 2) {
                            var link = document.createElement('a');
                            link.href = brick_url;
                            link.target = '_blank';
                            link.textContent = ' (' + parts[1] + ')';
                            p.appendChild(link);
                            p.setAttribute("patched", "patched");
                        }
                    }
                });
            }
        });

        setTimeout(f, 300);
    };

    setTimeout(f, 300);
})();
