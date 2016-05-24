// ==UserScript==
// @name         nazda pornolab
// @namespace    https://github.com/nazda/js/blob/master/nazda.pornolab.user.js
// @description  Optimize Rutracker
// @author       nazda
// @version        2016.05.24.6
// @updateURL      https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab.user.js
// @downloadURL    https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab.user.js
// @homepage       https://github.com/nazda/js
// @match          http://pornolab.net/*
// @match          https://femdomcult.org/*
// @grant        GM_xmlhttpRequest
// @icon           http://i.imgur.com/vCfrH6c.png
// ==/UserScript==
(function() {
	var css = ["#logo, DIV[style=\"padding: 8px 0 0;\"][class=\"tCenter\"], #latest_news > TABLE > TBODY > TR > TD:last-child, DIV[style=\"padding: 8px 0 0 0;\"], #page_footer, #adriver-240x120, DIV[style=\"margin: 4px auto 6px; text-align: center;\"] {", "   display: none !important; }", "#page_header {", "   position: fixed !important;", "   top: 0 !important;", "   z-index: 999 !important; }", "  ", "#page_header {", "   background: #D9DDE0 !important; }", "HTML {", "   overflow-x: auto !important;", "   A:visited: color: red ! important;", "   padding-top: 30px !important;", "/* scComment05777284095492219   ", "   background: none !important; */ }", "A:visited { color: red ! important }", ".topmenu {", "   height: 30px !important;", "   overflow: hidden !important;", "/* scComment05777284095492219", "   border-bottom: 1px black solid !important; ", "   background: none !important; */  }", ".topmenu, #main-nav {", "   border-radius: 4px !important;", "   border-width: 2px !important;", "   box-shadow:3px 3px 10px -2px #0d0d0d !important;", "}", "#bn-idx-skidka, #bn-molodost, #bn-idx-2, #bgn, #bn-idx-4, #idx-sidebar2{display:none !important;}"].join("\n");
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
			document.documentElement.appendChild(node);
		}
	}

	function inject(func) {
		var script = document.createElement("script");
		script.setAttribute("type", "application/javascript");
		script.appendChild(document.createTextNode(func));
		document.body.appendChild(script);
	}

	function insertButton() {
		var firstWrap;
		var wraps = document.getElementsByClassName("sp-wrap");
		for (var i = 0; i < wraps.length; ++i) {
			if (wraps[i].parentNode.className != "sig-body") {
				firstWrap = wraps[i];
				break;
			}
		}
		if (!firstWrap) return;
		inject(expandAll);
		var button = document.createElement("input");
		button.type = "button";
		button.value = "All";
		button.setAttribute("onclick", "expandAll()");
		firstWrap.insertBefore(button, firstWrap.firstChild);
	}

	function W(s) {
		var win = window.open('my.html', 'scrollbars=1,resizable=1,toolbar=1,location=1,menubar=1,status=1,directories=0');
		wind.blur();
		// var win = window.open (s);
		//win.blur();
		var t = setTimeout("window.focus()", 0);
		window.focus();
		return false;
	}
	inject(W);

	function expandAll() {
		var menu = document.getElementsByClassName('expandAll')[0];
		var mode;
		if (menu.innerHTML == '+') {
			menu.innerHTML = '-';
			mode = 0;
		} else if (menu.innerHTML == '?') {
			menu.innerHTML = '-';
			mode = 1;
		} else {
			menu.innerHTML = '+';
			mode = 1;
		}
		var wraps = document.getElementsByClassName("sp-wrap");
		for (var i = 0; i < wraps.length; ++i) {
			elem = wraps[i];
			var elem2 = elem.getElementsByClassName("sp-head folded clickable unfolded")[0];
			var array = elem.getElementsByClassName("sp-head");
			var txt = elem.getElementsByClassName("sp-head")[0];
			txt = txt.innerHTML;
			if ((txt === 'MediaInfo') || (txt === 'test') || (txt === 'Последние поблагодарившие')) {
				// mode = 0;
			}
			if (elem2) {
				var mode_t = 0;
			} else {
				var mode_t = 1;
			}
			if (mode != mode_t) {
				for (var key in array) {
					var elem = array[key];
					if (typeof elem.dispatchEvent === "function") {
						var evt = document.createEvent("MouseEvents");
						evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						elem.dispatchEvent(evt);
					}
				}
			}
		}
	}

	function search() {
		var cur_page, cur_post = '',
			hash = '',
			hash_url = '';
		var elem = document.getElementById('main_content_wrap');
		var _url = content.document.location.href;
		var err_sess = document.getElementsByClassName("mrg_16")[0];
		if (err_sess) {
			if (err_sess.innerText == 'Подходящих тем или сообщений не найдено') {
				alert(err_sess.innerText);
			} else if (err_sess.innerText == 'Сессия устарела') {
				var _url = StrParam(_url, 'id')[1] + '&id=rehash';
				redirect(_url, 1);
			}
		}
		_url = content.document.location.href;
		cur_post = document.getElementsByClassName("pagetitle")[0].innerHTML;
		if (cur_post) {
			regEx = / ([0-9])\d+/g;
			cur_post = String(cur_post).match(regEx);
		}
		elem = document.getElementById("pagination");
		elem = elem.getElementsByTagName('a');
		var i_max = 1;
		for (var i = 0; i < elem.length; i++) {
			i2 = StrParam(elem[i].href, 'start')[0];
			hash = StrParam(elem[i].href, 'id')[0];
			hash_url = '&id=' + hash;
			if (i2) {
				if (i_max < parseInt(i2)) i_max = i2;
			}
		}
		var rehash = StrParam(_url, 'id');
		if (rehash[0] == 'rehash') {
			_url = rehash[1];
			_url += hash_url;
			redirect(_url, 1);
		}
		if (rehash[0]) _url = rehash[1];
		var url_s = StrParam(_url, 'start');
		if (url_s[0]) cur_page = url_s[0];
		if (url_s[1]) _url = url_s[1];
		if (cur_page > 1) {
			cur_page = Math.ceil(cur_page / 30);
			cur_page = cur_page + 1;
		} else cur_page = 1;
		var i_str = 1;
		var page = '',
			next = '',
			prev = '';
		if (i_max > 30) {
			i_str = Math.ceil(i_max / 30);
			for (var i = 1; i < i_str + 2; i++) {
				var start = 30 * (i - 1);
				if (cur_page == i) {
					page += '<b>' + i + '</b>';
					prev = '<a class="pg" href="' + _url + '&start=' + (start - 30) + hash_url + '">«</a>&nbsp;';
					if (i == 1) prev = '<b>«</b>&nbsp;';
					if (i < i_str + 1) {
						next = '&nbsp;<a class="pg" href="' + _url + '&start=' + (start + 30) + hash_url + '">»</a>';
					} else next = '&nbsp;<b>»</b>';
				} else page += '<a class="pg" href="' + _url + '&start=' + start + hash_url + '">' + i + '</a>';
				if (i < i_str + 1) page += ', ';
			}
		}
		info_nick = document.getElementsByClassName("nick")[0].innerText;
		if (info_nick) {
			//info_id = document.getElementsByClassName("nick")[0].innerHTML;
			info_id = StrParam(_url, 'uid')[0];
			if (info_id) {
				var info_nick2 = '';
				for (var i = 0; i < info_nick.length; i++) {
					if (i !== 0) info_nick2 += info_nick[i];
				}
				document.title = info_nick;
				var info_nick_url = '<b><a href="http://pornolab.net/forum/search.php?uid=' + info_id + '&search_author=1" target="_blank">' + info_nick[0] + '</a>';
				info_nick_url += '<a href="http://pornolab.net/forum/tracker.php?rid=' + info_id + '" target="_blank">' + info_nick2 + '</a></b>&nbsp;';
			}
		}
		var r = info_nick_url + prev + page + next + '&nbsp;&nbsp;<span class="leech">Posts:&nbsp; <b>' + cur_post + '</b></span>';
		r = multiReplace(r, '&&', '&');
		return r;
	}

	function StrParam(str, _m) {
		var found = '';
		if (str == '') str = 'test';
		str = multiReplace(str, '?', '!h!&');
		var m = '&' + _m + '=';
		if (str.indexOf(m) !== -1) {
			//found = 0;
		} else {}
		str = multiReplace(str, m, 'xStartx');
		regEx = String(regEx).replace(/xStartx/, m);
		// regEx = /xStartx([0-9])\d{1,20}/g;
		regEx = /xStartx([^?&#\/])\w+/g;
		found = String(str).match(regEx);
		if (found) {
			found = String(found).replace(/xStartx/, '');
		} else found = 0;
		str = multiReplace(str, '!h!', '?');
		str = multiReplace(str, 'xStartx' + found, '');
		str = multiReplace(str, 'xStartx1', '');
		str = multiReplace(str, '&&', '&');
		str = multiReplace(str, '?&', '?');
		str = multiReplace(str, '?&amp;', '?');
		var array = [found, str];
		return array;
	}

	function redirect(url, allowBack) {
		if (allowBack) location.href = url;
		else location.replace(url);
		exit;
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
						Dinfo.innerHTML = profileurl;
						info_id = ID;
					}
				}
				info_topic = document.getElementsByClassName('maintitle');
				if (info_topic.length > 0) {
					info_topic = info_topic[0].getElementsByTagName('a');
					if (info_topic.length > 0) {
						info_topic = info_topic[0].href.replace(/.*t=/, "");
						info_topic = info_topic.replace(/&.*/, "");
					}
				}
				info = v[i].getElementsByClassName("poster_info td1")[0];
				info_size = document.getElementsByClassName('borderless bCenter pad_8')[0];
				info_nick = v[i].getElementsByClassName("nick nick-author")[0].innerHTML;
				if (info) {
					Dinfo = info.getElementsByTagName('a')[0].name;
					if (Dinfo) {
						Dinfo = info.getElementsByTagName('p')[0];
						Dinfo.innerHTML = Dinfo.innerHTML + '</p><div style="padding: 2px 6px 4px;" class="post_btn_2">' + profileurl + '</div>';
						info_size = document.getElementsByClassName('borderless bCenter pad_8')[0].innerHTML;
						i = 100;
					}
				}
			}
		}
	}

	function multiReplace(str, match, repl) {
		if (match === repl) return str;
		do {
			str = str.replace(match, repl);
		} while (str.indexOf(match) !== -1);
		return str;
	}

	function replaceAll(str, find, replace) {
		var i = str.indexOf(find);
		if (i > -1) {
			str = str.replace(find, replace);
			i = i + replace.length;
			var st2 = str.substring(i);
			if (st2.indexOf(find) > -1) {
				str = str.substring(0, i) + replaceAll(st2, find, replace);
			}
		}
		return str;
	}

	function IsNumeric(input) {
		return (input - 0) == input && ('' + input).trim().length > 0;
	}
	var array = document.getElementsByTagName('a');
	for (var i = 0; i < array.length; i++) {
		if (array[i]) {
			var elem = array[i];
			elem.setAttribute("target", "_blank");
		}
	}

	function ChangeImg() {
		array = document.getElementsByClassName('postImg');
		for (var i = 0; i < array.length; i++) {
			if (array[i]) {
				elem = array[i];
				if (elem.title.indexOf('imagebam.com') != -1) {
					if (elem.title.indexOf('thumbnails') != -1) {
						// elem.setAttribute("target", "_blank");
						// var url2 = elem.title.match(/thumbnails.imagebam.com([^/]+)\.html$/)[1];
						var _src = elem.title.match(/thumbnails\w+.imagebam.com\/\w+\/(.+?)\./i)[1];
						// elem.title='http://www.imagebam.com/image/'+_src;
					}
				}
			}
		}
	}

	function Menu() {
		var menu = document.getElementById('main-nav');
		var name_topic_date = '',
			name_topic = '',
			info_search = '';
		var name_url;
		if (menu) {
			var menu_html;
			menu_html = '';
			if (info_id != 0) {
				var nick2 = '';
				for (var i = 0; i < info_nick.length; i++) {
					if (i !== 0) nick2 += info_nick[i];
				}
				menu_html += '<b><a href="http://pornolab.net/forum/search.php?uid=' + info_id + '&search_author=1" target="_blank">' + info_nick[0] + '</a>';
				menu_html += '<a href="http://pornolab.net/forum/tracker.php?pid=' + info_id + '" target="_blank">' + nick2 + '</a></b>&nbsp;';
				if (info_size != 0) {
					var size = info_size.split(">");
					if (size) {
						info_size = replaceAll(size[1], '</b', '');
						menu_html += '&nbsp;<a href="dl.php?t=' + info_topic + '" class="dl-stub dl-link">' + info_size + '</a>';
					}
				}
				var menu2 = document.getElementById('tr-menu');
				if (menu2) {
					var v = menu2.getElementsByTagName('a');
					for (var i = 0; i < v.length; i++) {
						if (v[i]) {
							var name = v[i].innerHTML;
							var id_cat = v[i].href;
							var id_cat = id_cat.replace('http://pornolab.net/forum/tracker.php?f=', '');
							var name_eng = name.match(/([^/]+)$/)[1];
							name_eng = replaceAll(name_eng, '&nbsp;', '');
							menu_html += '<a href="./viewforum.php?f=' + id_cat + '" target="_blank">' + name_eng + '</a><em>»</em>';
						}
					}
				}
				var info = document.getElementsByClassName("maintitle")[0];
				if (info) {
					var name_topic = info.getElementsByTagName('a')[0].innerHTML;
					if (name_topic) {
						name_topic = replaceAll(name_topic, '<wbr>', '');
						name_topic = replaceAll(name_topic, 'Обновление', '');
						name_topic = replaceAll(name_topic, 'ролик', '');
						name_topic = replaceAll(name_topic, ' г.', '');
						name_topic = replaceAll(name_topic, ']', '#');
						name_topic = replaceAll(name_topic, ' - ', '#');
						name_topic = replaceAll(name_topic, '[', '#');
						name_topic = replaceAll(name_topic, ' / ', '#');
						name_topic = replaceAll(name_topic, ', ', '#');
						name_topic = replaceAll(name_topic, '(', '#');
						name_topic = replaceAll(name_topic, ')', '#');
						name_topic = replaceAll(name_topic, '# #', '#');
						name_topic = replaceAll(name_topic, '  ', ' ');
						name_topic = replaceAll(name_topic, ' #', '#');
						name_topic = replaceAll(name_topic, '# ', '#');
						name_topic = replaceAll(name_topic, '.com', '');
						name_topic = replaceAll(name_topic, '.net', '');
						name_topic = replaceAll(name_topic, '.org', '');
						var name_topic2 = name_topic.split("#");
						name_topic = '';
						for (var i in name_topic2) {
							if (name_topic2[i]) {
								if (IsNumeric(name_topic2[i])) {
									name_topic_date += '<a href="http://pornolab.net/forum/tracker.php?nm=' + name_topic2[i] + '">' + name_topic2[i] + '</a><em>»</em>';
								} else {
									var name_topic3 = replaceAll(name_topic2[i], '.', '');
									name_topic3 = name_topic3.split(" ");
									if (IsNumeric(name_topic3[0])) {
										name_topic2[i] = replaceAll(name_topic2[i], name_topic3, '');
										name_topic2[i] = name_topic3[1];
									}
									name_topic_small += '<b><a href="http://pornolab.net/forum/tracker.php?nm=' + name_topic2[i] + '" target="_blank">' + name_topic2[i] + '</a></b><em>»</em>';
								}
							}
						}
					}
				}
			}
			info_search += '<div style="position: absolute; top: 4px; right: 9px;"><a class="expandAll" href="#" onclick="return expandAll(); return false;">?</a><a class="menu-root" href="#topic-options"></a></div>';
			menu.innerHTML = '<p style="float: right; padding: 3px 2px 4px;" class="nav"><table width="100%" cellpadding="0" cellspacing="0"><tbody><tr class="nowrap">' + menu_html + name_topic_small + '</tr></tbody>' + info_search + '</table></p>';
		}
	}

	function tracker() {
		var info_nm;
		var elem = document.getElementById("search_opt");
		if (elem) {
			elem = elem.getElementsByTagName('form')[0];
			//	elem.setAttribute("method", "get");
			//	elem.setAttribute("submit", "get");
		}
		var cur_page, cur_post = '',
			hash = '',
			hash_url = '';
		var _url = content.document.location.href;
		elem = document.getElementById("main_content_wrap");
		cur_post = elem.getElementsByClassName("med bold")[0].innerHTML;
		if (cur_post) {
			regEx = /([0-9])\d+ /g
			cur_post = String(cur_post).match(regEx);
		}
		elem = document.getElementsByClassName("pg");
		//  elem = elem.getElementsByTagName('a');
		var i_max = 1;
		for (var i = 0; i < elem.length; i++) {
			i2 = StrParam(elem[i].href, 'start')[0];
			hash = StrParam(elem[i].href, 'search_id')[0];
			hash_url = '&search_id=' + hash;
			if (i2) {
				if (i_max < parseInt(i2)) i_max = i2;
			}
		}
		if (i_max < parseInt(cur_post)) i_max = cur_post;
		var rehash = StrParam(_url, 'search_id');
		if (rehash[0] == 'rehash') {
			_url = rehash[1];
			_url += hash_url;
			redirect(_url, 1);
		}
		var url_s = StrParam(_url, 'pid');
		if (url_s[0]) info_id = url_s[0];
		else {
			var url_s = StrParam(_url, 'nm');
			if (url_s[0]) info_nm = url_s[0];
		}
		if (info_nm) {
			info_id = info_nm;
			info_nick = info_nm;
		}
		if (url_s[1]) _url = url_s[1];
		var url_s = StrParam(_url, 'start');
		var _start = 0;
		if (url_s[0]) _start = url_s[0];
		if (url_s[1]) _url = url_s[1];
		if (_start > 1) {
			cur_page = Math.ceil(_start / 50);
			cur_page = cur_page + 1;
		} else cur_page = 1;
		var _page = 0;
		var i_str = 1;
		var page = '',
			next = '',
			prev = '';
		if (i_max > 50) {
			i_str = Math.ceil(i_max / 50);
			var p = 1;
			for (var i = 0; i < i_str; i++) {
				var s = i * 50;
				if (s == _start) {
					page += '<b>' + p + '</b>';
					_page = i;
				} else {
					if (s) s = '&start=' + s;
					else s = '';
					page += '<a class="pg" href="' + _url + s + '">' + p + '</a>';
				}
				if (p++ < i_str) page += ', ';
			}
		}
		if (_page > 0) prev = '<a class="pg" href="' + _url + '&start=' + (_page - 1) * 50 + '">«</a>&nbsp;';
		else prev = '<b>«</b>&nbsp;';
		if (_page + 1 < i_str) next = '&nbsp;<a class="pg" href="' + _url + '&start=' + (_page + 1) * 50 + '">»</a>';
		else next = '&nbsp;<b>»</b>';
		var v = document.getElementsByTagName('input');
		for (var i = 0; i < v.length; i++) {
			if ((v[i].name === 'pn') || (v[i].name === 'row2')) {
				if (v[i].value) var info_nick = v[i].value;
			}
		}
		if (info_nick) {
			if (info_id) {
				var info_nick2 = '';
				for (var i = 0; i < info_nick.length; i++) {
					if (i !== 0) info_nick2 += info_nick[i];
				}
				document.title = info_nick;
				var info_nick_url = '<b><a href="http://pornolab.net/forum/search.php?uid=' + info_id + '&search_author=1" target="_blank">' + info_nick[0] + '</a>';
				info_nick_url += '<a href="http://pornolab.net/forum/tracker.php?rid=' + info_id + '" target="_blank">' + info_nick2 + '</a></b>&nbsp;';
			}
		}
		var r = info_nick_url + prev + page + next + '&nbsp;&nbsp;<span class="leech">Posts:&nbsp; <b>' + cur_post + '</b></span>';
		r = multiReplace(r, '&&', '&');
		r = multiReplace(r, '?&', '?');
		return r;
	}

	function SetMenu(str) {
		var menu = document.getElementById('main-nav');
		if (menu) {
			var info_search = '<div style="position: absolute; top: 4px; right: 9px;"><a class="expandAll" href="#" onclick="return expandAll(); return false;">?</a><a class="menu-root" href="#topic-options"></a></div>';
			menu.innerHTML = '<p style="float: right; padding: 3px 2px 4px;" class="post_btn_1"><table width="100%" cellpadding="0" cellspacing="0"><tbody><tr class="nowrap">' + str + '</tr></tbody>' + info_search + '</table></p>';
		}
	}

	function changeScreenshots() {
		function formYQLRequest(url) {
			return "http://query.yahooapis.com/v1/public/yql?q=select%20src%20from%20html%20where%20url%3D%22" + encodeURIComponent(url) + "%22%20AND%20xpath%3D%22%2F%2Fimg%5B%40onclick%3D'scale(this)%3B'%5D%22&format=xml'&callback=?"
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
					$.getJSON(formYQLRequest(vars[i].parentNode.href), (function() {
						var image = vars[i];
						return function(data) {
							image.title = data.results[0].match(/src="([^"]+)/)[1];
						}
					})());
				}
			}
		}
		//Add max-width to pictures.
		var sheet = document.styleSheets[document.styleSheets.length - 1];
		sheet.insertRule('img.postImg { max-width:' + (window.innerWidth - 250) + 'px !important; height: auto !important; }', sheet.cssRules.length);
	}

	function removeChildren(elem) {
		var children = elem.childNodes;
		for (; 0 < children.length;) {
			elem.removeChild(children[0]);
		}
	}

	function viewforum() {
		var _url = content.document.location.href;
		i_max = 2000;
		var url_s = StrParam(_url, 'start');
		var _start = 0;
		if (url_s[0]) _start = url_s[0];
		if (url_s[1]) _url = url_s[1];
		if (_start > 1) {
			cur_page = Math.ceil(_start / 50);
			cur_page = cur_page + 1;
		} else cur_page = 1;
		var _page = 0;
		var i_str = 1;
		var page = '',
			next = '',
			prev = '';
		if (i_max > 50) {
			var i_str = Math.ceil(i_max / 50);
			var p = 1;
			for (var i = 0; i < i_str; i++) {
				var s = i * 50;
				if (s == _start) {
					page += '<b>' + p + '</b>';
					_page = i;
				} else {
					if (s) s = '&start=' + s;
					else s = '';
					page += '<a class="pg" href="' + _url + s + '">' + p + '</a>';
				}
				if (p++ < i_str) page += ', ';
			}
		}
		if (_page > 0) prev = '<a class="pg" href="' + _url + '&start=' + (_page - 1) * 50 + '">«</a>&nbsp;';
		else prev = '<b>«</b>&nbsp;';
		if (_page + 1 < i_str) next = '&nbsp;<a class="pg" href="' + _url + '&start=' + (_page + 1) * 50 + '">»</a>';
		else next = '&nbsp;<b>»</b>';
		var r = prev + page + next + '</span>';
		r = multiReplace(r, '&&', '&');
		r = multiReplace(r, '?&', '?');
		return r;
	}

	function ClearHtml() {
		var ok;
		var wraps = document.getElementsByClassName("sp-wrap");
		for (var i = 0; i < wraps.length; ++i) {
			var ok = wraps[i].getElementsByClassName('postImg');
			if (ok.length > 0) {} else {
				removeChildren(wraps[i]);
			}
			//else alert(wraps[i].innerHTML);
		}
	}

	function AllFormsGet() {
		var wraps = document.getElementsByTagName("form");
		for (var i = 0; i < wraps.length; ++i) {
			wraps[i].setAttribute("method", "get");
			//elem.setAttribute("submit", "get");
		}
	}
	var error, match, regEx;
	var elem;
	var ID = 0,
		info_id = 0,
		info_size = 0,
		info_nick = 0,
		info_topic = 0,
		name_topic_small = '';
	var url = content.document.location.href;
	ClearHtml();
	//AllFormsGet();
	if (url.match(/\/forum\/viewtopic.*/i)) {
		viewtopic();
	} else if (url.match(/\/forum\/tracker.*/i)) {
		var m = tracker();
	} else if (url.match(/\/forum\/viewforum.*/i)) {
		var m = viewforum();
		SetMenu(m);
		exit();
	} else if (url.match(/\/forum\/search.*/i)) {
		var m = search();
	}
	SetMenu('1');
	SetMenu(m);
	Menu();
	ChangeImg()
		//img_size();
	insertButton();
	expandAll();
})();
