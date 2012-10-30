/**
*
* @author       :- Christopher Johnson
* @date         :- 02-September-2011
* @dependencies :- JQuery 1.6.2
* @notes		:- This JScript enables easings to be performed on arbitary functions
*/
(function($, undefined) {
	$.ease = function(duration, easing, toSet, initial, delta, callback) {
		var _context = this; currTime = 0, interval = setInterval(function(){
			if((currTime+=jQuery.fx.interval) < duration)
				toSet.call(_context, $.easing[easing](0,currTime+=jQuery.fx.interval,initial, delta, duration));
			else { //all done
				clearInterval(interval);
				callback();
			}
		},jQuery.fx.interval);
	};
})(jQuery);