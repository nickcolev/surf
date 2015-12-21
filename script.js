/*
 * Sample custom JavaScript for surf browser
 * Customize and use at your convenience
 * Author: "Nick Kolev" <nickcolev@gmail.com>
 */

document.addEventListener("keyup", function(e) {	// Hook at key up event
	var backend = "https://example.com/bm.php";		// Backup script to handle user bookmarks (replace with your actual one)
	if (e.altKey) {									// [Alt] key pressed?
//alert(e.which);				 					// (uncomment to test key codes)
		switch(e.which) {							// Dispatch
			case 66:	// B for Bookmark
				if (confirm("Add bookmark?")) {
					surf.async(backend+"?url="+encodeURIComponent(document.location)+"&ttl="+encodeURIComponent(document.title)+"&ajax=1");
				}
				break;
			case 71:	// G for Google
				var h = window.open("http://www.google.com/", "google");
				h.focus();
				break;
			case 76:	// L for localhost
				document.location = "http://localhost/";
				break;
			case 78:	// N for NC bookmarks
				document.location = backend;
				break;
			case 84:	// T for Translate
				var s = surf.selection();
				if (s == null)  surf.Tooltip("Nothing selected");
				else {
					var u = backend+"?word="+s,
						h = window.open(u,"dict","width=200");
					h.focus();
				}
				break;
			// (add more key handling here)
		}
	}
}, false);

// Implementation
var surf = {
	async: function(url) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4)
				if (xhr.status == 200) {
					surf.Tooltip(xhr.responseText);
				}
		}
		xhr.open('GET',url,true);
		xhr.send(null);
	},
	selection: function() {
		var selected = window.getSelection();
		if (selected.rangeCount > 0) {
			var range = selected.getRangeAt(0);
			return range.startContainer.data.substring(range.startOffset,range.endOffset);
		}
		return null;
	},
	Tooltip: function(s) {
		var o = document.getElementById("SurfExtra");
		if (o) {
			o.innerHTML = s;
			o.style.visibility = "visible";
			// Hide on timer
			var tid = window.setTimeout(function(s){
				o.style.visibility = "hidden";
				window.clearTimeout(tid);
			},1900);	// Adjust timing
		}
	}
}

// Add DOM element to display messages
window.addEventListener('load',function(e){		// When document loaded...
	// ... add a div for tooltip, help, etc.
	document.body.innerHTML += '<div id="SurfExtra"'
		+' style="position:absolute;top:50%;left:50%;color:#ffc;background-color:#121;padding:3px 9px 3px 9px;visibility:hidden;"></div>';
}, false);
