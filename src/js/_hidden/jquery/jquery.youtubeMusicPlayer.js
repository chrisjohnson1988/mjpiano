/**
*
* @author       :- Christopher Johnson
* @date         :- 04-September-2011
* @dependencies :- JQuery 1.6.2, Jquery UI, jquery-ease, swfobject, uniqueID
* @notes		:- This JScript creates a youtube music player
*/

(function($, undefined){
	var STATES = {UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, VIDEO_CUED: 5};
	var RESOLVED_STATES = {}; for(var i in STATES) RESOLVED_STATES[STATES[i]] = i; //build the reverse of the above

	$.widget("ui.youtubeMusicPlayer", {
		options: { nowPlayingAnimationSpeed: 500, volumeFadeOutSpeed: 1000, volumeFadeEaseing: 'swing', videoVisible: false},
		_createButton: function(icon, label, func) { return $('<button>').button({ text: false, label: label, icons: { primary: icon }}).click(func); },
		_setControlsEnabled: function(enable) { $.each([this._playButton, this._pauseButton, this._stopButton], function(i,element) {element.button((enable)? 'enable' : 'disable');}); },
		_setVideoTitle: function(title) { this._nowPlayingContainer.marquee('setContent', $('<span>').html(title || '')); },//set the title
		setVideoVisible: function(visible, speed) {	this._youtubeContainer.animate({height: (visible) ? 200 : 0}, speed); },
		
		_create: function() {
			var _me = this, playerContainer;
			this.element.addClass('ui-youtubeMusicPlayerWidget ui-widget ui-widget-content ui-corner-all');

			/*Define Buttons*/
			this._pauseButton = this._createButton("ui-icon-pause", "Pause", 					function(){ _me.pause(); });
			this.element.append( this._playButton = this._createButton("ui-icon-play", "Play", 	function(){ _me.play(); }));
			this.element.append( this._stopButton = this._createButton("ui-icon-stop", "Stop", 	function(){ _me.stop(); })); //reset the video and then stop it
			this.element.append( this._nowPlayingContainer = $('<span>').addClass('ui-widget-content ui-youtubeMusicPlayerWidget-nowPlaying').marquee() );
			
			function __setToPlayButton__(){ _me.element.prepend(_me._playButton); _me._pauseButton.detach(); };
			this.element.bind('youtubemusicplayerplaying', 	function(){ _me.element.prepend(_me._pauseButton); _me._playButton.detach();	});
			this.element.bind('youtubemusicplayerended', 		__setToPlayButton__);
			this.element.bind('youtubemusicplayerunstarted',	__setToPlayButton__);
			this.element.bind('youtubemusicplayerpaused', 		__setToPlayButton__);
			
			this.element.append(this._youtubeContainer = $('<div>').addClass('ui-youtubeMusicPlayerWidget-youtube-hidden').append( playerContainer = $('<div>').uniqueID() ));			
			var containerID = playerContainer.attr('id'), playerID = containerID + 'youtubeMusicPlayer'; //define id's
			window.onYouTubePlayerReady = function(playerId) { 
				if(playerId === playerID) {
					_me._ytplayer = document.getElementById(playerId);
					window[playerID] = function(newState){ _me._trigger(RESOLVED_STATES[newState],0); }; //declare global listening func
					_me._ytplayer.addEventListener('onStateChange', playerID);
				}
			}; //declare gobal function to store the loaded youtube player to the _ytplayer var of this object
			swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=" + playerID, containerID, "1", "1", "8", null, null, { allowScriptAccess: "always" }, { id: playerID });
			
			this._setControlsEnabled(false); //disable the controls initially
			this.setVideoVisible(this.options.videoVisible, 0); //disable the controls initially
		},
		
		_setVideoTitleFromYoutubeID: function(youtubeID) {
			var _me = this;
			if(_me._lastVideoTitleRequest) _me._lastVideoTitleRequest.abort(); //abort if one already exists
			_me._lastVideoTitleRequest = $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+ youtubeID +'?v=2&alt=jsonc&callback=?',function(result){ _me._setVideoTitle(result.data.title); });
		},	
		
		_fadeVolume: function(callback) {
			var _me = this, initialVolume = this._ytplayer.getVolume(); //save the initial volume
			if(this._ytplayer.getPlayerState() === STATES.PLAYING) {
				$.ease.call(this._ytplayer, this.options.volumeFadeOutSpeed, this.options.volumeFadeEaseing, this._ytplayer.setVolume, initialVolume, -initialVolume, function() {
					callback(); //call the callback
					_me._ytplayer.setVolume(initialVolume); //reset the volume when done
				});
			}
			else callback(); //no need to fade as not playing, just return
		},
		
		play : function(){this._ytplayer.playVideo();},
		pause : function(){this._ytplayer.pauseVideo();},
		stop : function(){this._ytplayer.seekTo(0,true); this._ytplayer.stopVideo(); } ,
		
		_performFunctionIfInitialised: function(toPerform) { return (this._ytplayer) ? toPerform.call(this) || true : false },
		loadVideoByID: function(youtubeID) { var _me = this; return this._performFunctionIfInitialised(function() { this._fadeVolume(function() { _me._setControlsEnabled(true); _me._setVideoTitleFromYoutubeID(youtubeID); _me._ytplayer.loadVideoById(youtubeID); }); });},
		loadVideo: function(url) { return this.loadVideoByID(url.split('v=')[1].substring(0,11)); },
		clearVideo: function() { var _me = this; return this._performFunctionIfInitialised(function() { this._fadeVolume(function() { _me._ytplayer.stopVideo(); _me._setVideoTitle(); _me._setControlsEnabled(false); });	}); },
		
		destroy: function() {
			this.element.removeClass('ui-youtubeMusicPlayerWidget ui-widget ui-widget-content ui-corner-all');
			this._nowPlayingContainer.remove(); this._pauseButton.remove(); this._stopButton.remove(); this._playButton.remove();
		}
	});
})(jQuery);