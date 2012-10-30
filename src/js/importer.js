/**
*
* @author       :- Christopher Johnson
* @date         :- 16th-May-2011
* @dependencies :- Absolutely nothing.
*/
(function() {
	function loadScript(src) {
		document.write('<script src="' + src + '" type="text/javascript"></script>');
	};
	function loadCSS(src) {
		document.write('<link href="' + src + '" rel="stylesheet" type="text/css">');
	};
	loadScript('http://maps.googleapis.com/maps/api/js?sensor=false'); //import jquery
	loadScript('http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js'); //import jquery
	loadScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js'); //import jquery
	loadCSS('http://ajax.microsoft.com/ajax/jquery.ui/1.8.5/themes/ui-darkness/jquery-ui.css'); //import jquery theme
	loadCSS('css/mjpianoJS.css');//Import website styings and css
	loadScript('js/mjpiano.js');
	loadScript('http://connect.facebook.net/en_US/all.js#xfbml=1.js'); //add facebook api for like button
})();