/**
*
* @author       :- Christopher Johnson
* @date         :- 02-September-2011
* @dependencies :- JQuery 1.6.2, JQuery UI 1.8.5
* @notes		:- This JQuery widget creates a message div which displays errors or messages 
*/
(function($, undefined){
	$.widget("ui.messageBox", {
		_create: function() { this.element.addClass('ui-widget ui-widget-content ui-messageBox ui-corner-all')},
		setMessage:function(message) { 	this.element.switchClass('ui-state-error','ui-messageBox-message',this.options.speed).html(message); this._trigger('message',0,message);},
		setError:function(message) { 	this.element.switchClass('ui-messageBox-message','ui-state-error',this.options.speed).html(message); this._trigger('error',0,message);},
		destroy: function() { this.element.removeClass('ui-widget ui-widget-content ui-messageBox ui-state-error ui-messageBox-message ui-corner-all'); }
	});
})(jQuery);