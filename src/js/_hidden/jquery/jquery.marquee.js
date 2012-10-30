/**
*
* @author       :- Chrisstopher Johnson
* @date         :- 04-September-2011
* @dependencies :- JQuery 1.6.2, JQuery UI 1.8.5
* @notes		:- This JQuery widget creates a basic left scrolling marquee
*/
(function($, undefined){
	$.widget("ui.marquee", {
		options: {fadeSpeed: 'slow', marqueePixelsPerMilliSecond: 50, content: $('<div>')},
		
		_create: function() {  this.element.append(this.options.content); },
		
		_reset: function(middleCallback, finalCallback) {
			var _me = this;
			this.options.content.fadeTo(this.options.fadeSpeed, 0, function(){
				middleCallback.call(_me.options.content);
				_me.options.content.css({ left: 0 }).fadeTo(_me.options.fadeSpeed, 1, finalCallback);
			});
		},
		
		reset: function(callback) { 
			this.options.content.stop(true,false);
			this._reset(function(){}, callback);
		},
		
		startAnimation: function() {
			var _me = this; animationDistance = this.options.content.width();
			if(this.element.width() < animationDistance) {
				this.options.content.animate( {left : '-=' + animationDistance + 'px'}, {
					duration: animationDistance * this.options.marqueePixelsPerMilliSecond,
					easing: 'linear',
					complete: function() {_me._reset(function(){}, function(){_me.startAnimation();}); }
				});
			}
		},
		
		setContent: function(content) {
			var _me = this;
			this.options.content.stop(true,false);
			this._reset(function() { 
					content.addClass('ui-marquee-content'); 
					_me.options.content.remove(); 
					_me.element.append(_me.options.content = content.css({opacity: 0 })); 
				}, function() { _me.startAnimation(); }
			);
		}
	});
})(jQuery);