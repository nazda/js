// ==UserScript==
// @name         Rutracker XRAY Def
// @namespace    https://raw.githubusercontent.com/nazda/js/master/Rutracker_XRAY.def.user.js
// @version      0.9
// @description  Display thumbnails in forums and in search results on rutracker and other sites.
// @author       bergmich
// @include      http://rutracker.org/forum/viewforum.php*
// @include      http://rutracker.org/forum/tracker.php*
// @include      http://free-torrents.org/forum/viewforum.php*
// @include      http://tr.free-torrents.org/forum/tracker.php*
// @include      http://pornolab.net/forum/viewforum.php*
// @include      http://pornolab.net/forum/tracker.php*
// @updateURL      https://raw.githubusercontent.com/nazda/js/master/Rutracker_XRAY.def.user.js
// @downloadURL    https://raw.githubusercontent.com/nazda/js/master/Rutracker_XRAY.def.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_registerMenuCommand
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// ==/UserScript==
/* jshint -W097 */


var Store = {};
// GM (tampermonkey) based
Store.setItem = function (k, v) {
    v = String(v);
    window.console.log("Setting " + window.location.hostname + "." + k + " = " + v);
    GM_setValue(window.location.hostname + "." + k, v);
}
Store.getItem = function (k) {
    return GM_getValue(window.location.hostname + "." + k);
}
Store.listItems = function () {
    return GM_listValues();
}
Store.deleteItem = function (k) {
    GM_deleteValue(window.location.hostname + "." + k);
}
*
// localStorage based
Store.setItem = function (k, v) {
    v = String(v);
    window.localStorage.setItem(k, v);
}
Store.getItem = function (k) {
    return window.localStorage.getItem(k);
}
Store.listItems = function () {
    var l = [];
    for(var n in window.localStorage) {
        l[l.length] = n;
    }
    return l;
}
Store.deleteItem = function (k) {
    window.localStorage.removeItem(k);
}

// Traverse up in parent nodes untile nodeName matches
function findParent(el, nodeName) {
 while (el != null && el.nodeName != nodeName) {
  el = el.parentNode;
 }
 return el;
}

// if async, next processing is handled by handler (invoke func in 4 param)
function handleQueue(list, handler, current, timeout, async) {
    if (typeof current == "undefined") {
        current = 0;
    }
    
    if (typeof timeout == "undefined") {
        timeout = 200;
    }
    
    if (current < list.length) {
        var nextInQueueHandler = function () {
             handleQueue(list, handler, current + 1, timeout);
        };
        
        window.setTimeout(function () {
            try {
                handler(list[current], current, list, async ? nextInQueueHandler : null);
            } catch (e) {
                window.console.log("Failed: " + e + " when processing: " + list[current]);
            }
            if (!async) {
                nextInQueueHandler();
            }
        }, current == 0 ? 0 : timeout);
    }
}

// All excludes images on topic page
var imgExclude = [ "rutracker.org", "openstat", "logo.png", "rambler.ru", "kinopoisk.ru", "imqur.ru", "kiev.ua", "pornolab.net", "reine.ru",
                  "free-torrents.org"
                 ];
// topics
var topics = []; // { row: element, link: element }

function findTopics() {
    // Topics in categories
    $("a.torTopic").each(function (idx, el) {
        var row = findParent(el, "TR");
        if (row != null) {
            var data = { row: row, link: el };
            $(row).find("img.topic_icon").each(function (idx, el) {
                data.icon = String(el.src);
            });
            data.type = "default";
            if (data.icon.indexOf("announce") >= 0) {
                data.type = "announce";
            }
            if (data.icon.indexOf("dl_new") >= 0) {
                data.type = "new";
            }
            if (data.icon.indexOf("sticky") >= 0) {
                data.type = "sticky";
            }
            data.posterCell = 0;
            data.imageCell = 1;
            data.id = row.cells[0].id;
            data.cors = false; 
            //if (topics.length < 5)
            topics[topics.length] = data;
        }
    });
    // Search results (rutracker)
    $("a.tLink").each(function (idx, el) {
        var row = findParent(el, "TR");
        if (row != null) {
            var data = { row: row, link: el };
            $(row).find("img.icon1").each(function (idx, el) {
                data.icon = String(el.src);
            });
            data.type = "default";
            data.posterCell = 0;
            data.imageCell = 3;
            data.id = String(el.href).replace(/.*t=/, "");
            data.cors = false;
            //if (topics.length < 5)
            topics[topics.length] = data;
        }
    });
    
    // Search results (free-torrents)
    $("a.genmed").each(function (idx, el) {
        var row = findParent(el, "TR");
        if (row != null) {
            var data = { row: row, link: el };
            $(row).find("img.icon1").each(function (idx, el) {
                data.icon = String(el.src);
            });
            data.type = "default";
            data.posterCell = 0;
            data.imageCell = 3;
            data.id = String(el.href).replace(/.*t=/, "");
            data.cors = true; // free-torrents CORS needed
            //if (topics.length < 5)
            topics[topics.length] = data;
        }
    });
    
    window.console.log("Found topics: " + topics.length);
    return topics;
}

// Find first image larger than 200x200
function findCandidatePoster(id, v, posters, index, onComplete) {
    if (typeof index == "undefined") {
        index = 0;
    }
    
    if (index >= posters.length) {
        if (onComplete) onComplete();
        return;
    }
    
    var img = new Image();
    img.onload = function () {
        if (img.width > 200 && img.height > 200) {
            window.console.log("Candidate image " + img.src + " dim " + img.width + "x" + img.height);
            var poster = Store.getItem("poster." + id);
            if (!poster) {
                Store.setItem("poster." + id, img.src);
            }
        }
        findCandidatePoster(id, v, posters, index + 1, onComplete);
    };
    img.onerror = function () {
        findCandidatePoster(id, v, posters, index + 1, onComplete);
    };
    // window.console.log("Fetching image: " + posters[index]);
    img.src = posters[index];
}

function displayPoster(id, v, poster) {
    var span = document.createElement("span");
    span.setAttribute("id", "poster_" + id);
    // thumbnail
    var img = new Image();
    img.setAttribute("id", "poster_" + id + "_thumbnail");
    img.src = poster;
    img.className = "posterThumbnail";
    // Disable rutracker setting height to max for images
    img.style.maxWidth = "200px";
    img.style.maxHeight = "200px";
    img.onmouseover = function () {
        var id = this.parentNode.id + "_image";
        var el = document.getElementById(id);
        el.style.display = "";
    }
    img.onmouseout = function () {
        var id = this.parentNode.id + "_image";
        var el = document.getElementById(id);
        el.style.display = "none";
    }
    span.appendChild(img);
    // full size
    var img = new Image();
    img.setAttribute("id", "poster_" + id + "_image");
    img.src = poster;
    img.className = "posterImage";
    img.style.display = "none";
    img.style.position = "absolute";
    span.appendChild(img);
    v.row.cells[v.posterCell].appendChild(span);
}

function displayImages(id, v, images) {
    var span = document.createElement("span");
    span.setAttribute("id", "image_" + id);
    for (var i = 0; i < images.length; i++) {
        // thumbnail
        var img = new Image();
        img.setAttribute("id", "image_" + id + "_thumbnail" + i);
        img.src = images[i];
        img.className = "topicThumbnail";
        // Disable rutracker setting height to max for images
        img.style.maxWidth = "64px";
        img.style.maxHeight = "64px";
        img.style.padding = "2px";
        img.onmouseover = function () {
            var id = String(this.id).replace("_thumbnail", "_image");
            var el = document.getElementById(id);
            el.style.display = "";
        }
        img.onmouseout = function () {
            var id = String(this.id).replace("_thumbnail", "_image");
            var el = document.getElementById(id);
            el.style.display = "none";
        }
        span.appendChild(img);
        // full size
        var img = new Image();
        img.setAttribute("id", "image_" + id + "_image" + i);
        img.src = images[i];
        img.className = "topicImage";
        img.style.display = "none";
        img.style.position = "absolute";
        span.appendChild(img);
    }
    v.row.cells[v.imageCell].appendChild(span);
}

function processTopic(id, v, html) {
    var poster = Store.getItem("poster." + id);
    var images = Store.getItem("images." + id);
    
    if (poster) {
        displayPoster(id, v, poster);
    }
    
    if (images) {
        displayImages(id, v, images.split("##"));
    }
    
    if (!poster || !images) {
        //var doc = $.parseHTML(html);
        var p = new DOMParser();
        var doc = p.parseFromString(html, "text/html");
        doc = [ doc ];
        var images = [];
        for (var j = 0; j < doc.length; j++) {
            // Find images <img src=....
            $(doc[j]).find("img").each(function (idx, el) {
                var url = String(el.src);
                for (var i = 0; i < imgExclude.length; i++) {
                    if (url.indexOf(imgExclude[i]) >= 0) {
                        url = null;
                        break;
                    }
                }
                if (url) {
                    images[images.length] = url;
                }
            });
            // Find hidden <var title=
            $(doc[j]).find(".postImg").each(function (idx, el) {
                var url = String(el.title);
                for (var i = 0; i < imgExclude.length; i++) {
                    if (url.indexOf(imgExclude[i]) >= 0) {
                        url = null;
                        break;
                    }
                }
                if (url) {
                    images[images.length] = url;
                }
            });
        }

        window.console.log("Topic images", images);
        
        if (!poster)
        findCandidatePoster(id, v, images, 0, function () {
            var poster = Store.getItem("poster." + id);
            if (poster) {
                displayPoster(id, v, poster);
            }
            
            var s = "";
            for (var i = 0; i < images.length; i++) {
                if (s != "") {
                    s += "##";
                }
                if (images[i] != poster) {
                    s += images[i];
                }
            }
            Store.setItem("images." + id, s);
            displayImages(id, v, images);
        });
    }
}

function readTopic(v, index, list, handler) {
    var href = v.link.href;
    var id = v.id;
    window.console.log(id + ", " + href + " " + v.type);
    
    // Don`t parse HTML, go straight to processing
    var poster = Store.getItem("poster." + id);
    var images = Store.getItem("images." + id);
    if (poster && images) {
        processTopic(id, v, null);
        if (handler) {
            handler();
        }
        return;
    }
    
    var onreadystatechange = function (id, v, xhr, handler) {
        // window.console.log("readystatechange " + xhr.status + ", " + xhr.readyState);
        if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) { // DONE & good status
            processTopic(id, v, xhr.responseText);
            if (handler) {
                handler();
            }
        }
    };
    
    var onerror = function (e, handler) {
        window.console.log("Failed to request: " + e);
        if (handler) {
            handler();
        }
    };
    
    // Request new
    if (v.cors) {
        GM_xmlhttpRequest({
            method: "GET",
            timeout: 10000,
            url: href,
            onreadystatechange: function (xhr) { onreadystatechange(id, v, xhr, handler); },
            onerror: function (err) { onerror(err, handler); }
        });
    } else {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 10000;
        xhr.withCredentials = true;
        xhr.onreadystatechange = function () { onreadystatechange(id, v, this, handler); };
        xhr.onerror = function (e) { onerror(e, handler); };
        window.console.log("Requesting " + href);
        xhr.open("GET", href, true);
        xhr.send(null);
    }
}

// Clear all stored values
function clearCache() {
	var vals = Store.listItems();
    window.console.log("Total stored: " + vals.length + " keys");
    for (var i = 0; i < vals.length; i++) {
        window.console.log("Deleting " + vals[i]);
        Store.deleteItem(vals[i]);
	}
}

// Add Clear cache in menu
GM_registerMenuCommand("Clear cache", clearCache);

topics = findTopics();
window.topics = topics;
handleQueue(topics, readTopic, 0, 100, true);
