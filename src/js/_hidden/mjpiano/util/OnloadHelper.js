/**
*
* @author       :- Christopher Johnson
* @date         :- 16th-May-2011
* @dependencies :- JQuery 1.6.2
*	prettyPhoto
* @notes		:- This JScript defines methods and defaults related to initial loading of pages
*/

window.mjpiano = window.mjpiano || {};
mjpiano.util = mjpiano.util || {};

mjpiano.util.OnloadHelper = {
	PRETTY_PHOTO_DEFAULTS: { //enable pretty photo
		theme:'dark_rounded',
		deeplinking: false,
		opacity: 0.5,
		default_width: 1000,
		default_height: 720,
		social_tools: ''
	},
	
	createPrettyPhoto: function(context) {
		$("a[rel^='prettyPhoto']", context).prettyPhoto(this.PRETTY_PHOTO_DEFAULTS);
	},
	
	createYoutubeVideoLinks: function(context) {
		$("a[rel^='video']", context).click(function () {
			$('#music-player').youtubeMusicPlayer('stop');
		}).prettyPhoto(this.PRETTY_PHOTO_DEFAULTS);
	},
	
	createYoutubeAudioLinks: function(context, player) {
		if(swfobject.hasFlashPlayerVersion('8')) {
			$("a[rel^='music']", context).click(function(event){
				if($('#music-player').youtubeMusicPlayer('loadVideo',$(this).attr('href')))
					event.preventDefault(); //only prevent default if successful at loading video
			});
		}
	}
}