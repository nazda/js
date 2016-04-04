// ==UserScript==
// @name Skip-idiots
// @version 1
// @include http://*
// @exclude http://anonymouse.org/*
// ==/UserScript==

(function(){

if (document.title == 'Доступ ограничен') {
 var a = document.getElementsByTagName('a');
 if (a.length == 4 && a[1].href == 'http://www.zapret-info.gov.ru/') {
  location.href = 'http://anonymouse.org/cgi-bin/anon-www.cgi/' + location.href;
 }
}

})();
