Places = new Mongo.Collection('places');

Meteor.methods({
	'fetchNearbyLocations': function(coords){
		if(Meteor.isServer) {
			request = HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coords.latitude + "," + coords.longitude + "&radius=500&types=food&key=AIzaSyA0edY1nU9H_PXmILX6Q7z4uJu-SRphrYg")
			_(request.data.results).each(function(place){
				_.extend(place, {loc: {type: "Point", coordinates: [place.geometry.location.lng, place.geometry.location.lat]}})
				Places.upsert({id: place.id}, {$set: place})
			});
		}
	}
});