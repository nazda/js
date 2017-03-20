// ==UserScript==
// @name         Plab
// @namespace    https://github.com/nazda/js/raw/master/plab/plab.user.js
// @description  Plab core
// @author       nazda
// @version        2017.03.20 6
// @updateURL      https://github.com/nazda/js/raw/master/plab/plab.user.js
// @downloadURL    https://github.com/nazda/js/raw/master/plab/plab.user.js
// @homepage       https://github.com/nazda/js/plab
// @match          http://pornolab.net/*
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @icon           http://i.imgur.com/vCfrH6c.png
// ==/UserScript==
var Store = {};
Store.setItem = function(key, obj) {
	//obj = String(obj);
	var serialObj = JSON.stringify(obj);
	window.localStorage.setItem(key, serialObj);
}
Store.getItem = function(key) {
	var returnObj = JSON.parse(window.localStorage.getItem(key));
	return returnObj;
}
Store.listItems = function() {
	var l = [];
	for (var n in window.localStorage) {
		l[l.length] = n;
	}
	return l;
}
Store.deleteItem = function(k) {
	window.localStorage.removeItem(k);
}

function TRFormCheck() {
	var search = document.getElementById("o");
	var t;
	for (var i = 0; i < search.length; i++) {
		t = Store.getItem("tr-form" + i);
		if (t) {
			alert(i + '->' + t);
		}
		Store.setItem("tr-form" + i, search.options[i].value);
		if (search.options[i].value == "10") {
			search.selectedIndex = i;
			//alert(' : no page');
			//break;
		}
	}
	if (!sessionStorage.getItem('changed')) {
		document.getElementById('o').value = 10;
		sessionStorage.setItem('changed', 'true');
		document.getElementById('tr-form').submit();
	}
}

function clearCache() {
	localStorage.clear();
	return 0;
	var vals = Store.listItems();
	window.console.log("Total stored: " + vals.length + " keys");
	for (var i = 0; i < vals.length; i++) {
		window.console.log("Deleting " + vals[i]);
		Store.deleteItem(vals[i]);
	}
}

function printItems() {
	var vals = Store.listItems();
	var arr = [];
	var p;
	for (var i = 0; i < vals.length; i++) {
		p = Store.getItem(vals[i]);
		arr[arr.length] = vals[i] + "=" + p;
	}
	Store.setItem("tr-form", arr);
	//  alert(arr);
}
// Add Clear cache in menu
GM_registerMenuCommand("Clear cache", clearCache);
GM_registerMenuCommand("list Items", printItems);
GM_registerMenuCommand("listCookies", listCookies);
GM_registerMenuCommand("TRFormCheck", TRFormCheck);
//TRFormCheck();
