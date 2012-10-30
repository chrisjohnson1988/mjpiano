/**
*
* @author       :- Christopher Johnson
* @date         :- 02-September-2011
* @dependencies :- JQuery 1.6.2
* @notes		:- This JScript enables an element to be faded in by another 
*/

(function($, undefined){
	$.fn.replaceWithFade = function(replacement, speed) {
		var _me = this, position = this.position(), replacementOpacity = replacement.css('opacity'); //get the position of the element to replace
		var replacementCSS = {/*position: replacement.css('position'), top: replacement.css('top'), left: replacement.css('left')*/}; //store the old css params
		this.after(replacement.css({position: 'absolute', top:position.top, left: position.left, opacity:0} )); //position the element on top of this element
		return replacement.animate({opacity: replacementOpacity}, speed, function() {_me.replaceWith(replacement.css(replacementCSS));}); //fade in the section, reset the css and replace this with the replacement element
	};
})(jQuery);