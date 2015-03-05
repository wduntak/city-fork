Meteor.publish('nerbyPlaces', function(bottomLeft, topRight){
	if(!bottomLeft && !topRight) {
		return [];
	}
	return Places.find( {loc: {$geoWithin: {$box : [bottomLeft, topRight]} }})
});