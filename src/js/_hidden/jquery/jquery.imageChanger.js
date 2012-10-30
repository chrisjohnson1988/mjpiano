/**
*
* @author       :- Christopher Johnson
* @date         :- 02-September-2011
* @dependencies :- JQuery 1.6.2, JQuery UI 1.8.5, jquery.replaceWithFade.js
* @notes		:- This Jquery widget enables an image to asynchronously loaded and animated over another image
*/
(function($, undefined){
	$.widget("ui.imageChanger", {
		options: { speed : 'slow', imageClass: 'ui-corner-all', loadingOpacity: 0.3 },
		_create: function() {
			this.element.append(this._loaderImageElement = $('<div>')).addClass('ui-imageChanger ui-widget ui-widget-content').addClass(this.options.imageClass); //place holder for images to go to
			this._loaderAnimation = $('<div>').addClass('ui-imageChanger-loading');
			this._loaderImage = new Image(); //create a image loader initially
		},
		_setImageElement: function(newElement) {
			this._loaderAnimation.stop(true, true).fadeTo(this.options.speed,0, function(){ $(this).detach(); });//remove the loading class
			this._loaderImageElement = this._loaderImageElement.replaceWithFade(newElement,this.options.speed);  //replace the image
		},
		setSrc:function(src, loaded) {
			var _me = this;
			delete this._loaderImage.onload; //remove last loading callback
			this._loaderImage = new Image(); //create a new loader
			this.element.append(this._loaderAnimation.stop(true, true).fadeTo(this.options.speed,this.options.loadingOpacity)); //show the loading animation
			this._loaderImage.onload = function() { _me._setImageElement($(_me._loaderImage).addClass(_me.options.imageClass)); };//create the loaded func
			this._loaderImage.src = src; //set the source and load
		},
		destroy: function() {
			this._loaderAnimation.remove(); this._loaderImageElement.remove(); //remove elements
			this.element.removeClass('ui-imageChanger');
		},
		removeImage: function() { if(this.getSrc()) {this._loaderImageElement.fadeTo(this.options.speed,0); this._setImageElement($('<div>')); } //if there is a src then I can remove
		},
		getSrc:	function() { return (this._loaderImageElement.is('img')) ? this._loaderImage.src : false; }
	});
})(jQuery);