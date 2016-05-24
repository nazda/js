// ==UserScript==
// @name         nazda pornolab extender
// @namespace    https://github.com/nazda/js/blob/master/nazda.pornolab3.user.js
// @description  Thumbnail Rutracker extender
// @author       nazda
// @version        2016.05.24.8
// @updateURL      https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab3.user.js
// @downloadURL    https://raw.githubusercontent.com/nazda/js/master/nazda.pornolab3.user.js
// @homepage       https://github.com/nazda/js
// @include     http://pornolab.net/forum/tracker.php*
// @include     http://pornolab.net/forum/viewforum.php*
// @icon           http://i.imgur.com/vCfrH6c.png
// ==/UserScript==
(function() {
	var rt = {
		torrents_base_url: '/forum/',
		speed: 400,
		forum_width: 200,
		tracker_width: 200,
		// tracker
		line_selector: '#tor-tbl > tbody > tr',
		title_column_index: 2,
		title_selector: 'td:eq(5) a',
		// forum
		forumstart: '#main_content_wrap table.forumline.forum',
		forumline_selector: '#main_content_wrap table.forumline.forum > tbody > tr',
		forum_column_index: 0,
		forum_selector: 'td:eq(2) a.tt-text',
		// ajax selectors
		torrent_main_selector: '#topic_main .row1 .message .post_body',
		torrent_poster: '.postImg:first',
		torrent_fold: '> .sp-wrap'
	}
	var postImg_MaxWidth = 500;
	var postImgAligned_MaxWidth = rt.tracker_width;

	function tracker() {
		if (null == document.getElementById('tor-tbl')) return;
		console.log('Tracker extender started');
		$('#tor-tbl th:eq(' + rt.title_column_index + ')').after('<th class="{sorter: false} header">Постер</th>');
		$(rt.line_selector).each(function() {
			$(this).find('td:eq(' + rt.title_column_index + ')').after('<td class="row4 posterz"></td>');
		});
		$('#tor-tbl td').css('vertical-align', 'top');
		$('#tor-tbl > thead > tr > th:eq(6)').detach().insertBefore('#tor-tbl > thead > tr > th:eq(4)');
		$('#tor-tbl > tbody tr').each(function() {
			$(this).find('td:eq(6)').detach().insertBefore($('td:eq(4)', $(this)))
		});
		var elements = $(rt.line_selector);
		var index = 0;
		var interval = setInterval(function() {
			//setTimeout(function() {
			//console.log(index);
			if (index > elements.length) {
				clearInterval(interval); /*$('#tor-tbl').trigger("sorton");*/
			}
			var $line = $(elements).get(index);
			var url = $(rt.title_selector, $line).attr('href').replace(/^http:\/\/(.+)\/viewtopic/ig, "viewtopic");
			//console.log(url);
			$.get(rt.torrents_base_url + url, function(res) {
				var page = $(rt.torrent_main_selector, $(res));
				var poster = page.find(rt.torrent_poster);
				var screens = page.find(rt.torrent_fold);
				//console.log(screens);
				//console.log(screens.length);
				if (screens.length == 1 && screens.find('var.postImg').length < 7) var move = true;
				else var move = false;
				var posterline = $($line).find('td:eq(' + (rt.title_column_index + 1) + ')');
				posterline.html(poster);
				initPostImagez(posterline, false);
				$($line).find(rt.title_selector).after(initSpoilerz(screens, move));
				//$('#tor-tbl').trigger("update");
			})
			index++;
		}, rt.speed);
		setclear(interval);
	}
	var postImg_MaxWidth = 500;
	var postImgAligned_MaxWidth = rt.forum_width;

	function forum() {
		if (null == document.getElementById('main_content_wrap')) return;
		console.log('Tracker extender started');
		$(rt.forumstart).each(function() {
			$(this).find('th:eq(' + rt.forum_column_index + ')').before('<th>Постер</th>');
		});
		$(rt.forumline_selector).each(function() {
			$(this).find('td:eq(' + rt.forum_column_index + ')').before('<td></td>');
		});
		$(rt.forumstart + ' > colgroup col:first').after('<col class="row1">');
		$(rt.forumstart + ' td').css('vertical-align', 'top');
		var elements = $(rt.forumline_selector);
		var index = 0;
		var interval = setInterval(function() {
			//setTimeout(function() {
			//console.log(index);
			if (index > elements.length) clearInterval(interval);
			var $line = $(elements).get(index);
			//console.log($line);
			if ($($line).attr('id')) {
				var url = $(rt.forum_selector, $line).attr('href').replace(/^http:\/\/(.+)\/viewtopic/ig, "viewtopic");
				//console.log(url);
				$.get(rt.torrents_base_url + url, function(res) {
					var page = $(rt.torrent_main_selector, $(res));
					var poster = page.find(rt.torrent_poster);
					if (poster.length > 0) {
						var screens = page.find(rt.torrent_fold);
						//console.log(screens);
						//console.log(screens.length);
						if (screens.length == 1 && screens.find('var.postImg').length < 7) var move = true;
						else var move = false;
						var posterline = $($line).find('td:eq(' + (rt.forum_column_index) + ')');
						posterline.html(poster);
						initPostImagez(posterline, false);
						$($line).find(rt.forum_selector).parent().parent().append(initSpoilerz(screens, move));
					}
				})
			}
			index++;
		}, rt.speed);
		setclear(interval);
	}

	function setclear(interval) {
		$(document).keyup(function(e) {
			if (e.keyCode == 27) {
				clearInterval(interval);
				//if($('#tor-tbl').length>0) $('#tor-tbl').trigger("sorton");
			}
		});
	}
	// --------- functions ---------- //
	function initSpoilerz(context, move) {
		$('div.sp-body', context).each(function() {
			var $sp_body = $(this);
			var name = $.trim(this.title) || '^';
			this.title = '';
			if (move) initPostImagez($sp_body, true);
			else {
				var $sp_head = $('<div class="sp-head folded clickable">' + name + '</div>');
				$sp_head.insertBefore($sp_body).click(function(e) {
					if (!$sp_body.hasClass('inited')) {
						initPostImagez($sp_body, false);
						var $sp_fold_btn = $('<div class="sp-fold clickable">[^]</div>').click(function() {
							$.scrollTo($sp_head, {
								duration: 200,
								axis: 'y',
								offset: -200
							});
							$sp_head.click().animate({
								opacity: 0.1
							}, 500).animate({
								opacity: 1
							}, 700);
						});
						$sp_body.prepend('<div class="clear"></div>').append('<div class="clear"></div>').append($sp_fold_btn).addClass('inited');
					}
					if (e.shiftKey) {
						e.stopPropagation();
						e.shiftKey = false;
						var fold = $(this).hasClass('unfolded');
						$('div.sp-head', $($sp_body.parents('td')[0])).filter(function() {
							return $(this).hasClass('unfolded') ? fold : !fold
						}).click();
					} else {
						$(this).toggleClass('unfolded');
						$sp_body.slideToggle('fast');
					}
				});
			}
		});
		return context;
	}

	function initPostImagez(context, move) {
		var $in_spoilers = $('div.sp-body var.postImg', context);
		$('var.postImg', context).not($in_spoilers).each(function() {
			var $v = $(this);
			if (move) {
				if ($v.parent().attr('href')) var el = $v.parent();
				else var el = $v;
				el.detach().appendTo(context.parent());
			}
			var src = $v.attr('title');
			var $img = $('<img src="' + src + '" class="' + $v.attr('className') + '" alt="pic" style="display:none" />');
			var maxW = ($v.hasClass('postImgAligned')) ? postImgAligned_MaxWidth : postImg_MaxWidth;
			$img.bind('click', function() {
				return imgFit(this, maxW, $img.closest('td.row4'));
			});
			$('#preload').append($img);
			var loading_icon = '<a href="' + src + '" target="_blank"><img src="http://static.pornolab.net/templates/default/images/loading_3.gif" alt="" /></a>';
			$v.html(loading_icon);
			if ($.browser.msie) {
				$v.after('<wbr>');
			}
			$img.one('load', function() {
				imgFit(this, maxW, false);
				$v.empty().append(this);
			})
		});
		if (move) context.find('h3, br').remove();
	}

	function imgFit(img, maxW, move) {
		img.style.display = 'inline';
		if (typeof(img.naturalHeight) == 'undefined') {
			img.naturalHeight = img.height;
			img.naturalWidth = img.width;
		}
		if (img.width > maxW) {
			img.height = Math.round((maxW / img.width) * img.height);
			img.width = maxW;
			img.title = 'Click image to view full size';
			img.style.cursor = 'move';
			if (move) {
				var movetop = move.offset().top - 50;
				setTimeout(function() {
					$('html,body').animate({
						scrollTop: movetop
					}, 300)
				});
			}
			return false;
		} else if (img.width == maxW && img.width < img.naturalWidth) {
			img.height = img.naturalHeight;
			img.width = img.naturalWidth;
			img.title = 'Click to fit in the browser window';
			var movetop = move.offset().top - 50;
			if (move) {
				var movetop = move.offset().top - 50;
				setTimeout(function() {
					$('html,body').animate({
						scrollTop: movetop
					}, 300)
				});
			}
			return false;
		} else {
			return true;
		}
	}
	if (window.location.href.match(/\/forum\/tracker*/i)) tracker();
	else if (window.location.href.match(/\/forum\/viewforum*/i)) forum();
})();
