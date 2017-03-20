// ==UserScript==
// @name         Plab
// @namespace    https://github.com/nazda/js/raw/master/plab/plab.user.js
// @description  Plab core
// @author       nazda
// @version        2017.03.20 5
// @updateURL      https://github.com/nazda/js/raw/master/plab/plab.user.js
// @downloadURL    https://github.com/nazda/js/raw/master/plab/plab.user.js
// @homepage       https://github.com/nazda/js/plab
// @match          http://pornolab.net/*
// @require https://github.com/nazda/js/raw/master/plab/Super_GM_setValue_and_GM_getValue.js
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// @grant       GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @icon           http://i.imgur.com/vCfrH6c.png
// ==/UserScript==

var Store = {};

var ignore_threads_from = GM_SuperValue.get ("IgnoredUsers", []);



Store.setItem = function (k, v) {
    v = String(v);
    GM_setValue(window.location.hostname + "." + k, v);
}
Store.getItem = function (k) {
	var i = GM_getValue('k', 0);
	dump('GM_setValue Test has run ' + i + ' times.\n');
    return GM_getValue(window.location.hostname + "." + k);
}
Store.listItems = function () {
    return GM_listValues();
}
Store.deleteItem = function (k) {
    GM_deleteValue(window.location.hostname + "." + k);
}



function reloadPage() {
  location.reload();
}

function setCookie(sName,sValue) {
  document.cookie = sName + "=" + escape(sValue);
}

function getCookie(sName) {
  var aCookie = document.cookie.split(";");
  for(var i=0; i < aCookie.length; i++) {
    var aCrumb = aCookie[i].split("=");
    if(sName == aCrumb[0].trim()) {
      return unescape(aCrumb[1]).trim();
    }
  }
  return null;
}

function listCookies() {
	var aCookie = document.cookie.split(";");
	alert(aCookie);
	return aCookie;
    var l = [];
    for(var n in window.localStorage) {
        l[l.length] = n;
    }
    return l;
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

// Clear all stored values
	function clearCache() {
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
			 p = GM_getValue(vals[i]);
			 if (!p) {
				 p = "";
				 }
        arr[arr.length] = vals[i] + "=" + p; 
	}
		GM_SuperValue.set ("cfg", arr);
		alert(arr);
}




// Add Clear cache in menu
GM_registerMenuCommand("Clear cache", clearCache);
GM_registerMenuCommand("list Items", printItems);
GM_registerMenuCommand("listCookies", listCookies);
GM_registerMenuCommand("TRFormCheck", TRFormCheck);

va
//TRFormCheck();

	

