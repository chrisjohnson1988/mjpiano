/**
*
* @author       :- Christopher Johnson
* @date         :- 8-August-2011
* @description  :- This script enables the Google Analytics 
* @dependencies :- Absolutely nothing.
*/
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-25043089-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	
	//add analytics to navigation bar
	$(document).ready(function(){	
		$("#navigation a").live('click', function(){
			_gaq.push(['_trackPageview',  '/' + $(this).attr('href')]);
		});
	});
})();