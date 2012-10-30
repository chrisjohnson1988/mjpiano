/**
*
* @author       :- Christopher Johnson
* @date         :- 24th-Aug-2011
* @descripton	:- Defines the onload function for the test page
*/

window.mjpiano = window.mjpiano || {};
mjpiano.onloadFuncs = mjpiano.onloadFuncs || {};

mjpiano.onloadFuncs['music.htm'] = function(element) {
	mjpiano.util.OnloadHelper.createYoutubeAudioLinks(element); //add youtube music player links to new content
	mjpiano.util.OnloadHelper.createYoutubeVideoLinks(element); //add pretty photo to new content
};