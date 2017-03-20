// ==UserScript==
// @name         nazda pornolab sort
// @namespace    https://github.com/nazda/js/blob/master/nazda.pornolab.user.js
// @description  Sort
// @author       nazda
// @version        2017.03.20 2
// @updateURL      https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab_sort.user.js
// @downloadURL    https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab_sort.user.js
// @homepage       https://github.com/nazda/js
// @match          http://pornolab.net/*
// @grant GM_xmlhttpRequest
// @icon           http://i.imgur.com/vCfrH6c.png
// ==/UserScript==
(function() {
/*
	var search = document.getElementById("o");
for (var i = 0; i < search.length; i++) {
	if (search.options[i].value == "10") {
		search.selectedIndex = i;
		break;
	}
}
*/
if (!sessionStorage.getItem('changed')) {
	document.getElementById('o').value = 10;
	sessionStorage.setItem('changed', 'true');
	document.getElementById('tr-form').submit();
}

})();
