Places = new Mongo.Collection('places');

Meteor.methods({
	'fetchNearbyLocations': function(coords){
		if(Meteor.isServer) {
			request = HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coords.latitude + "," + coords.longitude + "&radius=100&types=food&key=AIzaSyBW9fGuGpQDdo6_3J5LejtT0TLEsRoEVis&sensor=true")
			console.log(request)
			_(request.data.results).each(function(place){
				_.extend(place, {loc: {type: "Point", coordinates: [place.geometry.location.lng, place.geometry.location.lat]}})
				Places.upsert({id: place.id}, {$set: place})
			});
		}
	}
});