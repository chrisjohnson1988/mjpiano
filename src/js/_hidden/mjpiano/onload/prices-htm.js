/**
*
* @author       :- Christopher Johnson
* @date         :- 24th-Aug-2011
* @descripton	:- Defines the onload function for the test page
*/

window.mjpiano = window.mjpiano || {};
mjpiano.onloadFuncs = mjpiano.onloadFuncs || {};

mjpiano.onloadFuncs['prices.htm'] = function(element) {
	$('.no-calculator', element).remove(); //remove the no script styled stuff

	var marksHouse = new google.maps.LatLng(53.369836,-2.155337), messageBox = $('<div>').messageBox();
	
	var marksQuoteCalculator = new function marksPriceCalculator() {
		var BASE_PRICE = 80, MAXIMUM_PRICE = 150, MAXDISTANCE = 50000, HIRE_PIANO_PRICE=30, POUNDS_PER_METRE = 0.00124274238; /*£2 per mile*/
		var variables = {};

		function _createCallBackMessage() {
			if(variables.distance <= MAXDISTANCE) { //distance is okay
				var price = BASE_PRICE + (POUNDS_PER_METRE * variables.distance) + ((variables.pianoRequired) ? HIRE_PIANO_PRICE : 0); //calculate price
				price = (price>MAXIMUM_PRICE) ? MAXIMUM_PRICE : price; //ensure price does not exceed 150
				return "The estimated price is &pound;" + price.toFixed(0) + ".00. To check availability please contact Mark.";
			}
			else
				return "The venue location is outside of Mark's area";
		}
		this.setVariable = function(toSet, value) {
			variables[toSet] = value;
			messageBox.messageBox('setMessage',_createCallBackMessage()); //notify the callback of change
		}
	};
	
	(function() { //construct html stuff
		var checkbox = $('<input>').attr('type','checkbox'), map = $('<div>').imageChanger().addClass('googleMap'), geocoder = new google.maps.Geocoder(), directions = new google.maps.DirectionsService();		
		function createGoogleMapImg(latLng) {return 'http://maps.googleapis.com/maps/api/staticmap?center=' + latLng + '&zoom=14&size=' + map.width() + 'x' + map.height() + '&maptype=roadmap&markers=color:blue%7C' + latLng + '&sensor=false';}
		function resetOutputs() { map.imageChanger('removeImage'); }
		
		messageBox.bind('messageboxerror', resetOutputs); //link errors to clear map
		searchBox = $('<input>').attr('type','text').change(resetOutputs).autocomplete({ 
			source: function(request, response) { //This bit uses the geocoder to fetch address values
				geocoder.geocode( {address: request.term/*, bounds: mapBounds */}, function(results, status) {
					response($.map(results, function(item) {
						return { label:  item.formatted_address, value: item.formatted_address,	position: new google.maps.LatLng(item.geometry.location.lat(), item.geometry.location.lng()) };
					}));
				});
			},
			select: function(event, ui) { //This bit is executed upon selection of an address
				directions.route({ destination: ui.item.position, origin: marksHouse, travelMode: google.maps.TravelMode.DRIVING }, function(directions, status) {
					switch(status) {
						case google.maps.DirectionsStatus.OK :
							if(directions.routes[0].legs.length === 1) {
								marksQuoteCalculator.setVariable('distance',directions.routes[0].legs[0].distance.value);
								map.imageChanger('setSrc', createGoogleMapImg(ui.item.position));
							}
							else
								messageBox.messageBox('setError','I am unable to get to your destination');
						break;
						default:
							messageBox.messageBox('setError','It has not been possible to locate your destination');
						break;
					}
				});					  
			}
		});
		
		checkbox.click(function(){ marksQuoteCalculator.setVariable('pianoRequired',$(this).is(':checked'));}); //create a checkbox
		
		messageBox.messageBox('setMessage','Please fill in the above form to generate an estimated quote');
		element
			.append($('<div>').addClass('quoteCalculator')
				.append($('<h1>').html('Price Calculator'))
				.append(map)
				.append($('<div>').addClass('formRow').append($('<span>').addClass('label').html('Please enter the venue postcode or town?')).append(searchBox))
				.append($('<div>').addClass('formRow').append($('<span>').addClass('label').html('Please tick if you require Mark to bring his digital piano to your special occasion?')).append(checkbox))
				.append(messageBox)
			);
	})();
};