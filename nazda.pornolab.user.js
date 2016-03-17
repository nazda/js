// ==UserScript==
// @name           nazda pornolab
// @description    Optimize Rutracker
// @author         nazda
// @version        2016.03.17.1
// @updateURL      https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab.user.js
// @downloadURL    https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab.user.js
// @homepage       https://github.com/nazda/js
// @match          http://pornolab.net/*
// @match          http://rutracker.org/*
// @icon           http://i.imgur.com/vCfrH6c.png

(function() {
    if (window.location.href.match(/\/forum\/tracker*/i))
        tracker();
    else if (window.location.href.match(/\/forum\/viewforum*/i))
        viewforum();
    else if (window.location.href.match(/\/forum\/viewtopic*/i))
        viewtopic();
    else if (window.location.href.match(/\/forum\/search*/i))
        search();

    function search() {
        //GM_xmlhttpRequest();
    }

    function viewtopic() {
        var info, Dinfo, profileurl;
        var v = document.getElementsByTagName('tbody');
        for (var i = 0; i < v.length; i++) {
            if ((v[i].className === 'row1') || (v[i].className === 'row2'))
				info = v[i].getElementsByClassName('poster_btn td3')[0];
            if (info){
                Dinfo = info.getElementsByTagName('div')[0];
                if (Dinfo) {
                    var TDinfo = Dinfo.innerHTML;
                    var Tinfo = Dinfo.getElementsByTagName('a')[0].href;
                    ID = Tinfo.replace('http://pornolab.net/forum/profile.php?mode=viewprofile&u=', '');
                    profileurl = "<a class='txtb' href='/forum/profile.php?mode=viewprofile&u=" + ID + "'>[Profile]</a>&nbsp;";
                    profileurl = profileurl + "<a class='txtb' href='/forum/search.php?search_author=1&uid=" + ID + "'>[Search]</a>";
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
})();
