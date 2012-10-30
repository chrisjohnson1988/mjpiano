[#ftl]
/**
*
* @author       :- Christopher Johnson
* @date         :- 16th-May-2011
* @dependencies :- JQuery 1.6.2
* @notes		:- This JScript defines all the logic for loading and animation navigation changes
*/
(function() {
	var currSection, data = [#include "data.json.ftl"/]; //perform an annotated import
	
	/* START DEEP LINKING */
	$(window).bind("popstate", function(evt) {
		var state = evt.originalEvent.state; //TODO. No need to reload currently viewed page
		navigationAnimation((state && state.href) ? state.href : document.location.pathname.substring(1) || 'index.htm'); //hack to keep curr nav link selected
	});
	
	function saveHistory(href) {
		if (history && history.pushState) {
			history.pushState({href: href}, document.title, '/' + href);
		}
	}
	/* END DEEP LINKING */
	
	function createSection(secJSON, href) {
		var content = $('<div>').addClass('content');
		content.append(secJSON.content); //add the conent
		if(mjpiano.onloadFuncs[href]) //if there is an onload function
			mjpiano.onloadFuncs[href](content); //execute
		return $('<div>').append(content).addClass('section').addClass(secJSON.css); //wrap the content up as a section
	}
	
	function navigationAnimation(href) {
		var secJSON = data.content[href];
		$('#navigation').replaceWith(createNavigation(href));
		document.title = (secJSON.title || secJSON.label) + ' - Mark Johnson'; //set the title
		currSection = currSection.stop(true,true).replaceWithFade(createSection(secJSON, href), 'slow'); //replace the section with a new section and store the reference
	}

	function navigationAnimationHandler(event) { //enable animations
		var href = $(this).attr('href');
		event.preventDefault();
		navigationAnimation(href);
		saveHistory(href);
	}
	
	function createNavigation(currHref) { //create the navigation, given the selected element
		var toReturn = $('<ul>').attr('id','navigation');
		$.each(data.navigation, function(i, currElement) {
			var toAdd = $('<li>').addClass(currElement.css);
			if(currHref === currElement.href)
				toAdd.append($('<span>').addClass("selected-image").html(currElement.navTitle));
			else {
				toAdd.append($('<a>')
					.attr('href',currElement.href)
					.click(navigationAnimationHandler)
					.append($('<span>').addClass("image").html(currElement.navTitle))
					.append($('<span>').addClass("hover"))
				);
			}
			toReturn.append(toAdd);
		});
		enableNavbarAnimation($(".hover", toReturn));
		return toReturn;
	}
	
	function enableNavbarAnimation(context) {
		context.hover(function() {
			$(".image", $(this).parent()).stop().animate({opacity: "0"}, 'slow');
			$(this).stop().animate({opacity: "1"}, 'slow');
		}, function() {
			$(".image", $(this).parent()).stop().animate({opacity: "1"}, 'slow');
			$(this).stop().animate({opacity: "0"}, 'slow');
		});
	}
	
	$(document).ready(function(){	
		currSection = $('#container .section'); //get a reference to the current section element
		enableNavbarAnimation($("#navigation .hover"));
		$("#navigation a").click(navigationAnimationHandler); //register to all existing navs
		$('#container').fadeTo('slow',1); //fade in on start up
		if(swfobject.hasFlashPlayerVersion('8')) //check to see if flash 8 is available
			$('#music-player').youtubeMusicPlayer(); //create the youtube music player
	});
})();