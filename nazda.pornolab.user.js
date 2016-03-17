// ==UserScript==
// @name         nazda pornolab
// @namespace    https://github.com/nazda/js/blob/master/nazda.pornolab.user.js
// @description  Optimize Rutracker
// @author       nazda
// @version        2016.03.17.2
// @updateURL      https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab.user.js
// @downloadURL    https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab.user.js
// @homepage       https://github.com/nazda/js
// @match          http://pornolab.net/*
// @icon           http://i.imgur.com/vCfrH6c.png
// ==/UserScript==
(function() {var css = [
	"#logo, DIV[style=\"padding: 8px 0 0;\"][class=\"tCenter\"], #latest_news > TABLE > TBODY > TR > TD:last-child, DIV[style=\"padding: 8px 0 0 0;\"], #page_footer, #adriver-240x120, DIV[style=\"margin: 4px auto 6px; text-align: center;\"] {",
	"   display: none !important; }",
	"#page_header {",
	"   position: fixed !important;",
	"   top: 0 !important;",
	"   z-index: 999 !important; }",
	"  ",
	"#page_header {",
	"   background: #D9DDE0 !important; }",
	"HTML {",
	"   overflow-x: auto !important;",
	"   A:visited: color: red ! important;",
	"   padding-top: 60px !important;",
	"/* scComment05777284095492219   ",
	"   background: none !important; */ }",
	".topmenu {",
	"   height: 30px !important;",
	"   overflow: hidden !important;",
	"/* scComment05777284095492219",
	"   border-bottom: 1px black solid !important; ",
	"   background: none !important; */  }",
	".topmenu, #main-nav {",
	"   border-radius: 4px !important;",
	"   border-width: 2px !important;",
	"   box-shadow:3px 3px 10px -2px #0d0d0d !important;",
	"}",
	"#bn-idx-skidka, #bn-molodost, #bn-idx-2, #bgn, #bn-idx-4, #idx-sidebar2{display:none !important;}"
].join("\n");
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node);
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}

}
})();



if (window.location.href.match(/\/forum\/tracker*/i))
    tracker();
else if (window.location.href.match(/\/forum\/viewforum*/i))
    viewforum();
else if (window.location.href.match(/\/forum\/viewtopic*/i))
    viewtopic();
else if (window.location.href.match(/\/forum\/search*/i))
    viewtopic();



function viewtopic() {
    var info, Dinfo, profileurl;
    var v = document.getElementsByTagName('tbody');
    for (var i = 0; i < v.length; i++) {
        if ((v[i].className === 'row1') || (v[i].className === 'row2'))
            info = v[i].getElementsByClassName('poster_btn td3')[0];
        if (info) {
            Dinfo = info.getElementsByTagName('div')[0];
            if (Dinfo) {
                var TDinfo = Dinfo.innerHTML;
                var Tinfo = Dinfo.getElementsByTagName('a')[0].href;
                ID = Tinfo.replace('http://pornolab.net/forum/profile.php?mode=viewprofile&u=', '');
                profileurl = "<a class='txtb' href='/forum/profile.php?mode=viewprofile&u=" + ID + "'>[Profile]</a>&nbsp;";
                profileurl = profileurl + "<a class='txtb' href='/forum/search.php?search_author=1&uid=" + ID + "'>[Search]</a>";
                profileurl = profileurl + "<p class='nick nick-author'>Full</p><a class='txtb' href='/forum/search.php?search_author=1&uid=" + ID + "&full_img#full_img'>[Search]</a>";
				profileurl = profileurl + "<a class='txtb' href='" + content.document.location.href + "&full_img#full_img'>[This]</a>";
                Dinfo.innerHTML = profileurl;
            }
        }

        info = v[i].getElementsByClassName("poster_info td1")[0];
        if (info) {
            Dinfo = info.getElementsByTagName('a')[0].name;
            if (Dinfo) {
                Dinfo = info.getElementsByTagName('p')[0];
                // alert(profileurl);
                Dinfo.innerHTML = profileurl;
            }

        }
    }
}

function Spoller() {
 var info,spbody,spwrap,spbody_title,div1, Dinfo, profileurl, li;
	//$('div.post-align',document).append('<a id="toggle" class="collapse">AAAAAA</a>');
    
	
	//$('div.sp-align', $($sp_body.parents('td')[0])).filter( { 
	//	return $(this).hasClass('unfolded') ? fold : !fold 
	//} ).click();
	
	var v = document.getElementsByTagName('div');
    for (var i = 0; i < v.length; i++) {
        if (v[i].className === 'sp-wrap'){
			spbody = v[i].getElementsByTagName('div')[0];
			spbody.click();
			//alert(spbody.className);
			//alert(spbody.innerHTML);
			//('#sp-wrap').parent().append('<button id="batch-down" class="bold" style="margin-left: 20px; width: 140px; font-family: Verdana,sans-serif; font-size: 11px;">Download all</button>');
			}
    }
}
if (content.document.location.href.match(/full_img/i))
	Spoller();
