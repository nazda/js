// ==UserScript==
// @name           optitrackers
// @namespace      js
// @description    Optimize Rutracker and Pornolab
// @author         nazda
// @version        2016.03.17.1
// @updateURL      https://raw.githubusercontent.com/nazda/js/master/optitrackers.user.js
// @downloadURL    https://raw.githubusercontent.com/nazda/js/master/optitrackers.user.js
// @homepage       https://github.com/nazda/js
// @match          http://pornolab.net/*
// @match          http://rutracker.org/*
// @icon           http://i.imgur.com/vCfrH6c.png

if(window.location.href.match(/\/forum\/tracker*/i))
	tracker();
else if(window.location.href.match(/\/forum\/viewforum*/i))
	viewforum();
else if(window.location.href.match(/\/forum\/viewtopic*/i))
	viewtopic();
else if(window.location.href.match(/\/forum\/search*/i))
	search();
function search() {
  //GM_xmlhttpRequest();
}
function viewtopic() {
  
  var v = document.getElementsByTagName('tbody');
    for (var i = 0; i < v.length; i++) {
        if((v[i].className === 'row1') || (v[i].className === 'row2'))
          var info = v[i].getElementsByClassName("poster_btn td3")[0];
      if (info) {
  var Dinfo = info.getElementsByTagName('div')[0];
  if (Dinfo) {
    var TDinfo = Dinfo.innerHTML;
    var Tinfo = Dinfo.getElementsByTagName('a')[0].href;
    ID = Tinfo.replace('http://pornolab.net/forum/profile.php?mode=viewprofile&u=', '');
    var profileurl = "<a class='txtb' href='/forum/profile.php?mode=viewprofile&u=" + ID + "'>[Profile]</a>&nbsp;";
    profileurl = profileurl +  "<a class='txtb' href='/forum/search.php?search_author=1&uid=" + ID + "'>[Search]</a>";
    Dinfo.innerHTML = profileurl;
 }
}
      
          var info = v[i].getElementsByClassName("poster_info td1")[0];
         if (info) {
  var Dinfo = info.getElementsByTagName('a')[0].name;
  if (Dinfo) {
    var Dinfo = info.getElementsByTagName('p')[0];
   // alert(profileurl);
    Dinfo.innerHTML = profileurl;
  }

        }
    }
}
