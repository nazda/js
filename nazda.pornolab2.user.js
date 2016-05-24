// ==UserScript==
// @name         nazda pornolab Thumbnail
// @namespace    https://github.com/nazda/js/blob/master/nazda.pornolab2.user.js
// @description  Thumbnail Rutracker
// @author       nazda
// @version        2016.05.24.6
// @updateURL      https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab2.user.js
// @downloadURL    https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab2.user.js
// @homepage       https://github.com/nazda/js
// @match          http://pornolab.net/*
// @grant        GM_xmlhttpRequest
// @icon           http://i.imgur.com/vCfrH6c.png
// ==/UserScript==
(function() {
	////////// SETTINGS: ////////////
	var auto_unfold = false; // auto unfold spoilers
	var auto_preload = false; // start loading images while the spoiler is closed
	var max_img_width = '1800px'; // max image widths, set to 'auto' to disable
	//  var max_img_width = 'auto';
	// thumbnails hosted on these sites will be removed:
	var blocked_hosts = ['piccash.net2'];
	/////////////////////////////////
	var targets = document.querySelectorAll('.sp-wrap');
	for (var i = 0; i < targets.length; i++) {
		var containers = targets[i].querySelectorAll('var.postImg');
		for (var j = 0; j < containers.length; j++) {
			var url = containers[j].title;
			if (url.indexOf('fastpic.ru/thumb/') != -1) {
				var filename = containers[j].parentNode.href.match(/([^/]+)\.html$/)[1];
				var baseurl = url.match(/^.+\//)[0];
				baseurl = baseurl.replace('fastpic.ru/thumb/', 'fastpic.ru/big/');
				url = baseurl + filename;
			} else if (url.indexOf('imagebam.com') != -1) {
				(function(target) {
					GM_xmlhttpRequest({
						method: "GET",
						url: target.parentNode.href,
						onload: function(response) {
							var matches = response.responseText.match(/<meta property="og:image" content="(.+?)"/i);
							if (matches.length > 1) {
								updateImageUrl(target, matches[1]);
							}
						}
					});
				})(containers[j]);
			} else if (url.indexOf('imagevenue.com') != -1) {
				(function(target) {
					GM_xmlhttpRequest({
						method: "GET",
						url: target.parentNode.href,
						onload: function(response) {
							var matches = response.responseText.match(/<img id="thepic".+?src="(.+?)"/i);
							if (matches.length > 1) {
								var baseurl = target.title.match(/^.+imagevenue.com\//i)
								updateImageUrl(target, baseurl + matches[1]);
							}
						}
					});
				})(containers[j]);
			} else {
				for (var b = 0; b < blocked_hosts.length; b++) {
					if (url.indexOf(blocked_hosts[b]) != -1) {
						url = null;
						break;
					}
				}
			}
			if (url) {
				updateImageUrl(containers[j], url);
			}
		}
		if (containers.length) {
			if (auto_unfold) {
				var headers = targets[i].querySelectorAll('.sp-head');
				for (var k = 0; k < headers.length; k++) {
					headers[k].className += ' unfolded';
				}
			}
			if (auto_unfold || auto_preload) {
				var bodies = targets[i].querySelectorAll('.sp-body');
				for (var k = 0; k < bodies.length; k++) {
					if (auto_preload) {
						bodies[k].className += ' inited';
					}
					if (auto_unfold) {
						bodies[k].style.display = 'block';
					}
				}
			}
		}
	}

	function updateImageUrl(node, url) {
		node.title = url;
		if (auto_preload) {
			node.innerHTML = '<img src="' + url + '" style="max-width:' + max_img_width + '"/>';
		}
	}
})();
