// @name Pornolab.AutoClick
// @namespace Pornolab.AutoClick
// @version 0.1
// @description Pornolab.AutoClick
// @include http://http://pornolab.net*
// @downloadURL https://raw.githubusercontent.com/nazda/js/master/Pornolab_AutoClick.user.js
// @updateURL https://raw.githubusercontent.com/nazda/js/master/Pornolab_AutoClick.user.js
// @grant GM_openInTab
// @run-at document-end
// ==/UserScript==
(function(){
var autoClose = false,delay = 500,standby = false;
var prefs = {
'rutracker': {
startReg: /^http:\/\/pornolab\.org\/net\/viewtopic\.php\?t=.*/i,
elements: function(){ return document.querySelectorAll('div[class="sp-head folded"]');} ,
delay: 500
},
'kafan': {
startReg: /http:\/\/bbs\.kafan\.cn\/(thread-\d+-\d+-\d+\.html|forum.php\?mod=viewthread.*)/,
elements: ['a.btn_s_close']
},
'kafan1': {
startReg: /http:\/\/bbs\.kafan\.cn\/$/,
elements: ['a#pper_a']
}
}

function autoClick1by1(){
var href = window.location.href,site = null,i = 0;
for (var key in prefs) if(prefs[key].startReg.test(href)) {site = key;break;}
alert(site);
if(site == null) return;
var elements = prefs[site].elements;
autoClose = prefs[site].autoClose || autoClose;
delay = prefs[site].delay || delay;
standby = prefs[site].standby || standby;
setTimeout(function(){
try {
if(elements instanceof Array) var els = prefs[site].elements;
else {//function
var els = prefs[site].elements();
}
while(els[i]){
var obj = (prefs[site].elements instanceof Array)?document.querySelector(els[i]):els[i];
if(obj == null) return;
if(obj.tagName=="A" && obj.href.indexOf("javascript")<0 && obj.onclick == "undefined") GM_openInTab(obj.href);
else obj.click();
i++;
}
} catch(e){alert(e);}
}, delay);
setTimeout(function(){
if(autoClose) window.close();
}, delay+100);
}
if(standby) {document.onreadystatechange = function () {
if(document.readyState == "complete")autoClick1by1();
}}
else autoClick1by1();
})();
