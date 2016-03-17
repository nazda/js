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
// ==/UserScript==
var e = document.getElementById("tor-hash");
if (e) {
    var hash = e.innerText;
    if (/^[0-9A-F]{40}$/.test(hash)) {
       e.innerHTML = "<a href='magnet:?xt=urn:btih:" + hash + "&tr=http%3A%2F%2Fbt2.rutracker.cc%2Fann%3Fmagnet&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969'>" + hash + "</a>";
    }
}

var vr = document.getElementsByClassName("post_btn_2")[0];
vr.src = i.src.replace('./profile.php?mode=viewprofile&amp;u=', '');
alert(vr);

if(window.location.href.match(/\/forum\/tracker*/i))
	tracker();
else if(window.location.href.match(/\/forum\/viewforum*/i))
	viewforum();
else if(window.location.href.match(/\/forum\/viewtopic*/i))
	viewtopic();
function tracker() {

//	alert("tracker");
}
function viewforum() {

//	alert("viewforum");
      var e = document.getElementById("search-f-form");
      if (e) {
	 // var hash = e.innerText;
	 // alert(e);
	 	e.innerHTML = "<a href='magnet:?xt=urn:btih:hhhh"'>jghjhgjhjh</a>";

     }
}
function viewtopic() {
	//tor-hash
      var e = document.getElementById("tor-hash");
      if (e) {
	  var hash = e.innerText;
	 if (/^[0-9A-F]{40}$/.test(hash)) {
		e.innerHTML = "<a href='magnet:?xt=urn:btih:" + hash + "'>" + hash + "</a>";
	  }
     }
}

//load jQuery (if you know the way to getJSON with callback and without jQuery, please, contact me).
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
}, false);
  document.body.appendChild(script);
}

function changeScreenshots() {
    function formYQLRequest (url) {
        return "http://query.yahooapis.com/v1/public/yql?q=select%20src%20from%20html%20where%20url%3D%22"+
               encodeURIComponent(url) + "%22%20AND%20xpath%3D%22%2F%2Fimg%5B%40onclick%3D'scale(this)%3B'%5D%22&format=xml'&callback=?"
    }

    var vars = document.getElementsByTagName('var');
    var fastpicRE = /^(http:\/\/.*\.fastpic\.ru\/)thumb(.*)(jpe?g)$/;
    var imagebamRE = /imagebam\.com/;
    var matches;
    
    for (var i = 0; i < vars.length; i++) {
        if (vars[i].className === 'postImg') {
            //Fastpic screenshots
            if (matches = vars[i].title.match(fastpicRE)) {
                vars[i].title = matches[1] + 'big' + matches[2] + 'jpg';
            }
            //ImageBam screenshots
            else if (vars[i].title.match(imagebamRE)) {
                $.getJSON(formYQLRequest(vars[i].parentNode.href),
                          (function() {
                              var image = vars[i];
                              return function(data){ image.title = data.results[0].match(/src="([^"]+)/)[1]; }
                          })()
                         );
            }
        }
    }

    //Add max-width to pictures.
    var sheet = document.styleSheets[document.styleSheets.length - 1];
    sheet.insertRule('img.postImg { max-width:' + (window.innerWidth - 250) + 'px !important; height: auto !important; }', sheet.cssRules.length);
}
addJQuery(changeScreenshots);
