// ==UserScript==
// @name         nazda pornolab
// @namespace    https://github.com/nazda/js/blob/master/nazda.pornolab.user.js
// @description  Optimize Rutracker
// @author       nazda
// @version        2016.03.18.5
// @updateURL      https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab.user.js
// @downloadURL    https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab.user.js
// @homepage       https://github.com/nazda/js
// @match          http://pornolab.net/*
// @icon           http://i.imgur.com/vCfrH6c.png
// ==/UserScript==
(function() {
    var css = [
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
		"A:visited { color: red ! important }",
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
ops = function() {
//alert("1");
	content.document.location.replace("#fullimg");
	Spoller();
  return false;
};

$('#topmenu').parent().append('<button id="batch-down" class="bold" style="margin-left: 20px; width: 140px; font-family: Verdana,sans-serif; font-size: 11px;">Download all</button>');

var error, match, regEx;
	
$('#fullimg').click(function(e){ 
    e.preventDefault();
    $('#batch-down').prop('disabled', true);
    count = 0;
    files = 0;
    number = $('#tor-tbl td:nth-child(6)').length;
    if (number) {
        $('#tor-tbl td:nth-child(6)').each(function(i, el){
            setTimeout(function(){
                url = $(el).find('.dl-stub').attr('href');
                addTorrent(url, number);
            }, 500 + ( i * 500 ));
        });
    } else return;
});

var tid = document.getElementsByClassName('maintitle');
if (tid.length > 0) {
	tid = tid[0].getElementsByTagName('a');
	//[0].href
	if (tid.length > 0) {
	tid = tid[0].href.replace(/.*t=/, "");
	tid = tid.replace(/&.*/, "");
	}
}


if (window.location.href.match(/\/forum\/tracker*/i))
    tracker();
else if (window.location.href.match(/\/forum\/viewforum*/i))
    viewforum();
else if (window.location.href.match(/\/forum\/viewtopic.*/i))
    viewtopic();
else if (window.location.href.match(/\/forum\/search*/i)){
    search();
}

	Menu();

function search() {
		var elem = document.getElementById('main_content_wrap');
	/*
	if (elem) {
		elem.innerHTML = elem.innerHTML.replace(/post/, 'get');
	}
	*/
	elem = document.getElementsByClassName("pagetitle")[0];
	var  count_found= elem.innerText;
	//alert(elem.innerText);
	 elem = document.getElementById("pagination");
	 elem = elem.getElementsByTagName('a');
	//elem = elem.getElementsByClassName("pg");
	var i_max = 1;
	
for (var i = 0; i < elem.length; i++) {
	match = elem[i];
	//regEx = /(?!.*start=)([0-9])\d+/g;
	//regEx = /(?!start=)(?=[0-9])\d{1,}/g;
	regEx = /start=([0-9])\d{1,2}/g;
	match = String(match).match(regEx);
	if(match){
		match = String(match).replace(/start=/, '');
		
			//	alert(match);	
		if (i_max < parseInt(match)) i_max = match;
		
	}
}
	var i_str = 1;
	if(i_max > 30){
		i_str = Math.ceil(i_max / 30);
	}
}
	
function viewtopic() {
    var info, Dinfo, profileurl, url;
    var v = document.getElementsByTagName('tbody');
    for (var i = 0; i < v.length; i++) {
        if ((v[i].className === 'row1') || (v[i].className === 'row2')) {
            info = v[i].getElementsByClassName('poster_btn td3')[0];
            if (info) {
                Dinfo = info.getElementsByTagName('div')[0];
                if (Dinfo) {
                    var TDinfo = Dinfo.innerHTML;
                    var Tinfo = Dinfo.getElementsByTagName('a')[0].href;
                    ID = Tinfo.replace('http://pornolab.net/forum/profile.php?mode=viewprofile&u=', '');
                    profileurl = "<a class='txtb' href='/forum/profile.php?mode=viewprofile&u=" + ID + "'>[Profile]</a>&nbsp;";
                    profileurl = profileurl + "<a class='txtb' href='/forum/search.php?search_author=1&uid=" + ID + "'>[Search]</a>";
                    profileurl = profileurl + "<p class='joined'>Full</p><a class='txtb' href='/forum/search.php?search_author=1&uid=" + ID + "&fullimg'>[Search]</a>";
                    profileurl = profileurl + "<a class='txtb' href='" + content.document.location.href + "&fullimg'>[This]</a>";
                    Dinfo.innerHTML = profileurl;
                }
            }

            info = v[i].getElementsByClassName("poster_info td1")[0];
            if (info) {
                Dinfo = info.getElementsByTagName('a')[0].name;
                if (Dinfo) {
                    Dinfo = info.getElementsByTagName('p')[0];
                    //alert(Dinfo.innerHTML);
                    Dinfo.innerHTML = Dinfo.innerHTML + '</p><div style="padding: 2px 6px 4px;" class="post_btn_2">' + profileurl + '</div>';
				}
        }
    }
	}
}

function Menu(){
                   var menu = document.getElementsByClassName('topmenu')[0];
                    if (menu) {
                        var menu2 = menu.getElementsByTagName('td')[1];
                        var menu_html;
						
                        var url = content.document.location.href;
					//	content.document.location.href.replace(url + '&fullimg');
						    if (content.document.location.href.match(/&fullimg/i)) {
                            url = url.replace('#fullimg', '');
							menu_html = '<a id="test"; href="' + url + '">UnFull</a>';
                        } else {
                            menu_html = '<a id="test"; href="' + url + '&fullimg">Full</a>';
                        }
                       menu_html += '&nbsp;<a href="#fullimg" onclick="ops(); return false;">FullNoReload</a> ';
						if (tid.length > 0)  menu_html += '&nbsp;<a href="dl.php?t=' + tid + '" class="dl-stub dl-link">Dl</a>';
if (tid.length > 0)  menu_html += '&nbsp;<a href="#" onclick="return post2url(\'dl.php?t='+ tid + '\', {id: '+ tid + '});">Dl2</a>';
                        menu2.innerHTML = menu_html;
                    }
}

function Spoller() {
    var info, spbody, spwrap, spbody_title, div1, Dinfo, profileurl, li, spbody_text;
    var v = document.getElementsByTagName('div');
    for (var i = 0; i < v.length; i++) {
        if (v[i].className === 'sp-wrap') {
            spbody = v[i].getElementsByTagName('div')[0];
			spbody_text = spbody.innerHTML;
			if ((spbody_text === 'MediaInfo') || (spbody_text === 'test')) {
			}else{
            spbody.click();
			}
            //alert(spbody.className);
            //alert(spbody.innerHTML);
            //('#sp-wrap').parent().append('<button id="batch-down" class="bold" style="margin-left: 20px; width: 140px; font-family: Verdana,sans-serif; font-size: 11px;">Download all</button>');
        }
    }
}
if (content.document.location.href.match(/fullimg/i)){
    Spoller();
}
	
	})();
